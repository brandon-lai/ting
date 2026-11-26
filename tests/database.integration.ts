import postgres from "postgres"
import { readFileSync } from "node:fs"
import assert from "node:assert/strict"

async function main() {
  const url = process.env.DATABASE_TEST_URL
  if (!url)
    throw new Error(
      "Set DATABASE_TEST_URL to the isolated test cluster, never a production database."
    )
  const sql = postgres(url, { max: 1, prepare: false })
  try {
    const database = await sql`select current_database() as name`
    if (database[0].name !== "ting_test")
      throw new Error(
        "Database integration tests only run in a database named ting_test."
      )
    await sql.unsafe(`
      create role anon nologin;
      create role authenticated nologin;
      create schema auth;
      create table auth.users(id uuid primary key);
      create function auth.uid() returns uuid language sql stable as
        $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
      grant usage on schema auth, public to authenticated, anon;
      grant execute on function auth.uid() to authenticated, anon;
      insert into auth.users(id) values ('11111111-1111-4111-8111-111111111111'),('22222222-2222-4222-8222-222222222222');
    `)
    await sql.unsafe(
      readFileSync(
        new URL(
          "../supabase/migrations/20261126000100_learning_progress.sql",
          import.meta.url
        ),
        "utf8"
      )
    )
    const columns =
      await sql`select relrowsecurity, relforcerowsecurity from pg_class where relname='learning_progress'`
    assert.equal(columns[0].relrowsecurity, true)
    assert.equal(columns[0].relforcerowsecurity, true)
    await sql.unsafe("set role authenticated")
    await sql`select set_config('request.jwt.claim.sub','11111111-1111-4111-8111-111111111111',false)`
    const first =
      await sql`select public.save_learning_progress(${sql.json({ schema: 1, level: 1 })}, 0) as version`
    assert.equal(Number(first[0].version), 1)
    await assert.rejects(
      () =>
        sql`select public.save_learning_progress(${sql.json({ schema: 1 })}, 0)`,
      (e: unknown) => e instanceof postgres.PostgresError && e.code === "40001"
    )
    const second =
      await sql`select public.save_learning_progress(${sql.json({ schema: 1, level: 2 })}, 1) as version`
    assert.equal(Number(second[0].version), 2)
    await assert.rejects(
      () =>
        sql`select public.save_learning_progress(${sql.json({ schema: 1 })}, 1)`,
      (e: unknown) => e instanceof postgres.PostgresError && e.code === "40001"
    )
    await sql`select set_config('request.jwt.claim.sub','22222222-2222-4222-8222-222222222222',false)`
    const foreign = await sql`select * from public.learning_progress`
    assert.equal(foreign.length, 0)
    await assert.rejects(
      () =>
        sql`insert into public.learning_progress (user_id,data) values ('11111111-1111-4111-8111-111111111111', ${sql.json({ schema: 1 })})`,
      (e: unknown) => e instanceof postgres.PostgresError && e.code === "42501"
    )
    const own =
      await sql`select public.save_learning_progress(${sql.json({ schema: 1, level: 3 })}, 0) as version`
    assert.equal(Number(own[0].version), 1)
    const visible = await sql`select user_id from public.learning_progress`
    assert.equal(visible.length, 1)
    assert.equal(visible[0].user_id, "22222222-2222-4222-8222-222222222222")
    const deletedForeign =
      await sql`delete from public.learning_progress where user_id='11111111-1111-4111-8111-111111111111' returning user_id`
    assert.equal(deletedForeign.length, 0)
    await sql`select set_config('request.jwt.claim.sub','',false)`
    await assert.rejects(
      () =>
        sql`select public.save_learning_progress(${sql.json({ schema: 1 })}, 0)`,
      (e: unknown) => e instanceof postgres.PostgresError && e.code === "28000"
    )
    await sql.unsafe("reset role; set role anon")
    await assert.rejects(
      () => sql`select * from public.learning_progress`,
      (e: unknown) => e instanceof postgres.PostgresError && e.code === "42501"
    )
    await sql.unsafe("reset role")
    const final =
      await sql`select data,version from public.learning_progress order by user_id`
    assert.equal(final.length, 2)
    assert.equal(final[0].data.level, 2)
    console.log(
      "Database integration: RLS ownership, anonymous denial, real jsonb round-trip, replay/stale-version rejection and two-account isolation passed."
    )
  } finally {
    await sql.end()
  }
}
main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
