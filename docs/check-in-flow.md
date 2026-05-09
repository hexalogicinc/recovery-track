# Daily recovery check-in flow

This document describes how the **prototype** check-in works in code and UX. There is **no persistence**: answers live only in React state until you leave the page or finish the flow.

---

## Where it lives

| Piece | Path |
|--------|------|
| Route (shell + back link) | `app/check-in/page.tsx` |
| Step logic, inputs, navigation | `components/check-in/check-in-flow.tsx` |

The flow component is a **Client Component** (`"use client"`) because it uses `useState`, `useRouter`, and interactive controls.

---

## Step model

- **`step`** is an integer from **`0` to `3`** (four screens).
- **Progress UI:** four horizontal pill segments at the top — current step highlighted, completed steps dimmer, upcoming steps muted. Text shows **`{current} / 4`**.
- **Transitions:** the step body wrapper uses **`key={step}`** and the **`animate-fade-in`** class (Tailwind) so each step change animates in without extra libraries.

---

## Steps (in order)

### Step 0 — Soreness

- **Title:** “How sore do you feel?”
- **Overall soreness:** Radix **slider** from **1 to 10** (step 1). Large numeric display plus a short label derived from the value:
  - ≤2: Fresh  
  - ≤5: Manageable  
  - ≤8: Elevated  
  - ≥9: Extremely sore  
- Helper copy: **1 = Fresh · 10 = Max**
- **Body areas (optional):** multi-select **pills** — Legs, Back, Shoulders, Arms, Knees. Toggle on/off; not required to continue.
- **Advancement:** **Next** is always enabled (no required answer on this step beyond having a slider value, which defaults to **4**).

### Step 1 — Hydration

- **Title:** “Hydration check”
- **Input:** exactly one of **Excellent**, **Good**, **Average**, **Poor** (2×2 button grid).
- **Advancement:** **Next** disabled until one option is selected.

### Step 2 — Sleep

- **Title:** “Sleep quality”
- **Hours slept:** one required choice among **Under 5**, **5–6**, **6–7**, **7–8**, **8+** (pill buttons).
- **Sleep quality:** slider **0–100** in steps of **5**; helper text maps to **rough** / **okay** / **restorative** from the numeric value.
- **Defaults:** quality slider defaults to **72** (restorative band); hours start unset.
- **Advancement:** **Next** disabled until **hours** are selected (quality always has a value).

### Step 3 — Mood

- **Title:** “Mood & energy”
- **Input:** one of **Motivated**, **Neutral**, **Stressed**, **Exhausted**, **Anxious** (large tappable buttons; two columns on wider breakpoints).
- **Advancement:** primary button shows **Finish**; disabled until a mood is selected.

---

## Footer actions

| Control | Behavior |
|---------|----------|
| **Back** | Decrements `step`; **disabled** when `step === 0`. |
| **Next** | Increments `step` while `step < 3`. |
| **Finish** | Shown when `step === 3`; calls **`router.push('/')`** — returns to the athlete home. **No API call and no saved payload.** |

---

## State summary (prototype)

| State | Role |
|--------|------|
| `soreness` | `[number]` for slider (1–10), default `[4]` |
| `areas` | `string[]` of selected body areas |
| `hydration` | Selected hydration label or `null` |
| `sleepHours` | Selected bucket or `null` |
| `sleepQuality` | `[number]` 0–100 for quality slider |
| `mood` | Selected mood or `null` |

---

## Page chrome

- **`app/check-in/page.tsx`** adds a **← Home** link to `/` and a small **~45 sec** hint next to the progress area.

---

## Design intent

Matches the product goal of a **fast, thumb-friendly** daily check-in: sliders and taps, minimal typing, clear progress, and large touch targets for mobile demos and interviews.

---

## Related

- [Recovery Track — App overview](recovery-track-app-overview.md)
