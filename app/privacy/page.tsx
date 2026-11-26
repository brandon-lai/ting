import type { Metadata } from "next"
export const metadata: Metadata = { title: "Privacy" }
export default function Page() {
  return (
    <article className="prose">
      <h1>Your practice belongs to you.</h1>
      <p className="muted space-above">Privacy notice / November 26, 2026</p>
      <h2>Local study data</h2>
      <p>
        Ting saves your selected level, preferences, lesson results, word-review
        schedule, mock answers and history in this browser’s local storage.
        Offline downloads use the browser cache. These records are not sent to
        Ting unless you sign in and choose a cloud save. Other people using this
        browser profile can access its local data. Use a private device and
        export before clearing storage.
      </p>
      <h2>Accounts and cloud copies</h2>
      <p>
        Where Google sign-in is enabled, Supabase handles OAuth and account
        identity. Google and Supabase process the account information needed to
        sign you in. Cloud study data is tied to your account ID and protected
        by row-level ownership. Google credentials are never included in a Ting
        progress export. On deployments without configured cloud accounts,
        sign-in and cloud storage are unavailable; no account is silently
        created.
      </p>
      <h2>Microphone and recordings</h2>
      <p>
        Recording begins only after you choose to record and grant microphone
        permission. Ting keeps the recording as a temporary blob on your device,
        does not upload it, and releases it when you leave the activity.
        Playback speech uses your device’s installed voices. A voice may have
        its own device-provider behavior.
      </p>
      <h2>Optional recognition</h2>
      <p>
        Browser speech recognition is separate from local recording. It requires
        explicit consent and may send audio to the browser’s speech provider,
        such as Google. Ting does not receive or store that audio. You can use
        local record/replay instead. Recognition is not a validated tone or
        pronunciation assessment.
      </p>
      <h2>Videos and hosting</h2>
      <p>
        YouTube receives requests only after you load an embed or open a
        creator’s link. Privacy-enhanced embeds still contact YouTube and may
        process technical information under its policies. Vercel hosts Ting and
        may retain standard infrastructure request logs. Ting adds no analytics,
        advertising cookies or tracking pixels.
      </p>
      <h2>Export and deletion</h2>
      <p>
        Settings offers a JSON export, confirmed import, local reset and, when
        signed in, cloud study-data deletion. Signing out removes this account’s
        local copy from the current browser. Cloud progress deletion does not
        delete your Google identity or necessarily remove Supabase’s
        authentication record. Contact the deployment owner for full account
        deletion. Offline downloads can be removed individually.
      </p>
      <h2>Policies of providers</h2>
      <p>
        <a href="https://supabase.com/privacy" target="_blank" rel="noreferrer">
          Supabase privacy
        </a>
        ,{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noreferrer"
        >
          Google and YouTube privacy
        </a>
        , and{" "}
        <a
          href="https://vercel.com/legal/privacy-policy"
          target="_blank"
          rel="noreferrer"
        >
          Vercel privacy
        </a>{" "}
        govern their respective services.
      </p>
    </article>
  )
}
