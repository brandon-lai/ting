---
name: Ting
colors:
  background: "oklch(0.975 0.008 245)"
  foreground: "oklch(0.27 0.045 250)"
  primary: "oklch(0.42 0.11 248)"
  primary-foreground: "oklch(0.985 0.007 245)"
  secondary: "oklch(0.93 0.024 245)"
  muted: "oklch(0.94 0.015 245)"
  muted-foreground: "oklch(0.48 0.032 250)"
  accent: "oklch(0.91 0.13 95)"
  accent-foreground: "oklch(0.29 0.04 85)"
  border: "oklch(0.86 0.019 245)"
  destructive: "oklch(0.48 0.17 27)"
typography:
  body:
    fontFamily: "Nunito Sans"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  heading:
    fontFamily: "Nunito Sans"
    fontSize: "48px"
    fontWeight: 800
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  chinese:
    fontFamily: "Noto Sans SC"
    fontSize: "64px"
    fontWeight: 400
    lineHeight: 1.5
spacing:
  unit: "4px"
  small: "8px"
  medium: "16px"
  large: "24px"
  section: "40px"
rounded:
  control: "12px"
  surface: "24px"
shadows:
  floating: "0 16px 40px oklch(0.27 0.045 250 / 0.12)"
---

# A conversation, not a scoreboard

**Mode:** Operate on every learning route, Read on the guide and policies.

**Scene:** A learner fits Chinese into a quiet morning at the kitchen table or a train ride, on a phone in daylight. Mist-blue paper and legible navy ink work in both scenes; a derived dark scheme supports evening practice.

**Mechanism:** Recall a word, meet it in a sentence, hear it, say it, and retrieve it later.

**The rut:** A game-like map of locked circles and invented streaks. Ting instead puts the next real conversation and its actual study material in view.

**Audience world:** A blue language-exchange notebook, a transit ticket, a yellow bookmark, a library listening booth, a cafe conversation and a bilingual phrasebook. These span paper, textiles, architecture and speech rituals. The language-exchange notebook carries the mechanism: small daily entries become a conversation.

**Color posture:** Restrained navy and tinted blue neutrals, with a citrus bookmark used only for the current lesson and the current sentence. No cream/serif nostalgia, neon, gradients or ornamental glows.

**Type:** Nunito Sans has open, friendly counters without making dense lesson text childish. Noto Sans SC gives Mandarin stable, highly readable forms. Only these two faces; compared figures use tabular numerals. The heading maximum is 48px, fluid down to 32px on phones.

**Atoms:** 12px controls, 24px primary surfaces, hairlines before cards. Floating dialogs alone receive a tinted shadow. Lucide outlines are the sole icon system.

**Signature:** A six-part 30-minute lesson itinerary beside an oversized real Mandarin phrase. Within the lesson, a learner moves from seeing the phrase to hearing and producing it. The accent names the active step, never a fake progress statistic.

**Motion:** Keyboard-driven navigation and question changes are immediate. Press feedback alone uses 120ms and cubic-bezier(0.23, 1, 0.32, 1). Occasional overlays settle in 200ms and exit in 150ms, reduced motion turns this off. No perpetual animation.

**Phone tradeoff:** The sidebar becomes a five-destination bottom navigation. Secondary study context moves below the primary task. Chinese text stays large, options span the width, audio controls stay explicit, and safe-area padding protects the bottom action.

**Mirror test:** An exam prep dashboard would usually use green completion rings or a playful locked trail. Ting deliberately uses a notebook-like open course ledger, navy/mist-blue and a sentence-led lesson ticket instead.

**Copy and honesty:** Actual syllabus counts are labeled as such. New accounts show zero real progress. Videos, browser voices and recognition limitations are attributed and explained. No testimonials or missing-material slots are needed.

## Review record

Final independent verdict: **APPROVE / SHIP**, confirmed in the second fixes-only round. Axe reports zero WCAG A/AA violations across the phone route renders and dark home screen.

Static sloplint: no failures, reflexes or warnings. The motion scanner cannot trace a shadcn Dialog call site to its owned DialogContent and mislabels centered modals as dropdowns. The actual backdrop/popup use tokenized 200ms enter motion and global reduced-motion fallbacks. Frequent pointer color changes and keyboard operations deliberately remain immediate; only transform and opacity animate. Unused upstream menu/tooltip recipes are not part of the rendered learning surfaces.

Real Chrome review covered every route at 1440px and 390px, plus tablet widths, a dark scheme, and a 320px no-spill assertion. Fifteen keyboard stops on desktop and phone all had names and visible rings; Escape dismissal and return focus were exercised. Session changes now focus the new activity heading and client-side route changes announce the new heading. Physical screen-reader behavior remains unverified.

The independent fresh-context reviewer judged Ting product-specific and approved shipping. Its refinements were applied together: vocabulary distinguishes repeated grammar-block sessions, Mandarin is more prominent during recall, lesson entry carries the real sentence and itinerary, and mock explanations are paginated five at a time.

Rendering found a real contrast defect on primary links: an unlayered inherited anchor color overrode the themed button foreground. Excluding button links from that rule restores 8.09:1 contrast. A 320px tab overflow was fixed with existing spacing tokens, and the lesson completion result is scoped to its actual level/session.

No material placeholders remain. Google cloud setup is deliberately unavailable rather than imitated; the quota and owner-credential steps are documented in README.md.
