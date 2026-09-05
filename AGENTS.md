# 🧩 Kiddo Puzzle — Agent Guidelines & Developer Architecture

This document defines the operational rules, architecture standards, and ASO intelligence workflows for **Kiddo Puzzle: Learning Game** (iOS).

---

## 📱 App Overview & Scope
- **App Name:** Kiddo Puzzle: Learning Game
- **App Store Track ID:** `6742179258` | **Bundle ID:** `com.sunshinestudios.kiddopuzzle`
- **Platform:** iOS (16.0+) (`software`)
- **Live Version:** `1.4.0` — `READY_FOR_SALE` ✅
- **App Store Link:** `https://apps.apple.com/app/kiddo-puzzle-learning-game/id6742179258`
- **Product Website:** `https://themansigoel.github.io/kiddo-puzzle/`
- **Core Features:** 70+ toddler shape matching puzzles across 6 themes (Animals, Vehicles, Fruits, Dinosaurs, Space, Ocean), squishy tactile haptics, celebratory particle confetti, and offline safe play.
- **StoreKit 2 IAP Products:**
  - `com.sunshinestudios.kiddopuzzle.lifetime_pro` (Lifetime Pro — Hero Preselection)
  - `com.sunshinestudios.kiddopuzzle.monthly_pro` (Monthly Subscription)

---

## 🛑 Universal Core Rules (Mandatory for All Agents)

1. **Strict Real Data & Zero Assumption Mandate**:
   - Never assume or guess code implementation, paywalls, review triggers, or features without thoroughly searching and reading source code call-sites.
   - NEVER invent or extrapolate metrics (sales, units, proceeds, ratings, review counts, ranks, or keyword volumes). Always query the real App Store Connect API or `~/.vibe-aso/aso_intelligence.db`.
   - **ALWAYS Discard Firebase Revenue Figures**: Apple App Store Connect API (`/v1/salesReports`) is the **SOLE SOURCE OF TRUTH** for all revenue and sales numbers.
2. **Strict Standard Hyphen Rule (NO Em-Dashes `—` or En-Dashes `–`)**:
   - NEVER use em-dash (`—`) or en-dash (`–`) anywhere in App Store metadata (Title, Subtitle, Description, Promotional Text, What's New, or Keywords). Always use standard ASCII hyphen (`-`) (e.g. `Shape Puzzles - Kiddo Puzzle`).
3. **Apple Kids Category & COPPA Compliance (Guideline 1.3 & 5.1.4)**:
   - **Parental Gate**: Strict arithmetic verification ($4 \times 3 = 12$) must intercept all commercial purchasing flows, paywalls, and external links.
   - **100% Offline & Ad-Free**: No third-party SDK trackers or advertisements.
4. **Automated 12-Step Visual Simulator Pipeline**:
   - All release branches must pass the automated human-like simulator test runner (`./test_artifacts/visual_report.html`) before submission.

---

## 🛠️ Xcode Build & Test Commands

```bash
# 1. Build iOS Target:
xcodebuild -project KiddoPuzzle.xcodeproj -scheme KiddoPuzzle -destination "generic/platform=iOS" build

# 2. Run Human-Like Automated Simulator QA Suite:
/Users/rahulgoel/aso-intelligence/aso test kiddo_puzzle
```

---

## 🍎 Centralized ASO Intelligence Suite Integration (`/Users/rahulgoel/aso-intelligence`)

All App Store Connect operations (metadata pushing, screenshot uploads, IAP synchronization, rank tracking, and TestFlight builds) are centrally handled by the **ASO Intelligence Suite**:

```bash
# 1. Audit & Push Localized Metadata to App Store Connect:
/Users/rahulgoel/aso-intelligence/aso audit kiddo_puzzle
/Users/rahulgoel/aso-intelligence/aso push kiddo_puzzle [--dry-run]

# 2. 1-Command TestFlight Release (auto-bump, archive, sign, upload, poll):
/Users/rahulgoel/aso-intelligence/aso tf kiddo_puzzle

# 3. AI Keyword Optimizer & Knapsack Generator:
/Users/rahulgoel/aso-intelligence/aso optimize kiddo_puzzle [--apply]

# 4. Astro+ / AppTweak AI Opportunity Keyword Suggestions:
/Users/rahulgoel/aso-intelligence/aso suggest 6742179258 --country us

# 5. Live Search Rank Tracking:
/Users/rahulgoel/aso-intelligence/aso track 6742179258 "kids puzzle" "toddler shape puzzle" --country us

# 6. Real Sales, Ratings & Daily Briefing:
/Users/rahulgoel/aso-intelligence/aso morning
/Users/rahulgoel/aso-intelligence/aso sales
/Users/rahulgoel/aso-intelligence/aso ratings

# 7. AI Short Video Marketing Generator (Shorts, Reels, TikTok):
/Users/rahulgoel/aso-intelligence/aso video kiddo_puzzle
```

---

## 🌐 Universal Portfolio Rules & Standards (Mandatory Across All Repositories)

### 1. 🛑 Zero-Assumption & Strict Real Data Mandate
- **Never Guess, Assume, or Extrapolate Code or Features**: Never conclude that an app lacks a feature, review trigger, paywall tier, localization, or logic without thoroughly searching and reading the actual source code call-sites across the entire project. Trace all function definitions AND all their invocations before providing critique or recommendations.
- **Never Assume or Extrapolate Metrics**: Never invent, estimate, or extrapolate metrics (sales, units, proceed figures, ratings, ranks, difficulty, keyword volumes, or review counts). ALWAYS query the real App Store Connect API (`/v1/salesReports` via `./aso sales`), live SQLite database (`~/.vibe-aso/aso_intelligence.db`), or `./aso` CLI before reporting numbers.
- **ALWAYS Discard Revenue Data from Firebase Analytics**: NEVER use, report, or mix Firebase revenue figures into financial or proceeds analysis. Firebase event revenue is based on unvalidated client-side events, sandbox test runs, and inaccurate default currency conversions. Firebase is ONLY used for user engagement funnels (sessions, milestones, onboarding steps). Apple App Store Connect API (`/v1/salesReports`) is the **SOLE SOURCE OF TRUTH** for all revenue, sales, and proceed numbers.
- **Strict Apple Product Type Identifiers Mandate (Never Conflate Downloads & Updates)**:
  - `1F` / `F1` / `1` = **First-time new user download** (1F = Universal iOS, F1 = Mac app, 1 = First-time download).
  - `3F` / `F3` / `3` = **User Re-download**.
  - `7F` / `F7` / `7` = **App Update** (existing users updating version). **NEVER count or report app updates as new downloads!**
  - `IA1` / `IAY` = **In-App Purchase / Subscription** (Paid or Free Promo Code redemption).
- **Free Lifetime Promo Codes & Offer Codes**: In Apple Sales Reports, developer giveaway promo codes appear as `IA1` / `IAY` transactions with `developer_proceeds = 0.0` or `promo_code` populated.
- **Multi-Currency FX Engine**: Apple reports proceeds in local currencies (`IDR`, `PHP`, `INR`, `AUD`, `EUR`, `CAD`, `GBP`, etc.). NEVER do a raw SQL sum without foreign exchange conversion to USD.
- **Reporting Intra-Day vs Batch Settlement Data**: Clearly distinguish between real-time rolling 24-hour web portal data and finalized daily batch reports from `/v1/salesReports` (which finalize ~24-48 hours later). If Apple reports for the current date are not ready (HTTP 404), report that settlement is in progress rather than guessing.

### 2. 📏 Apple Storefront Metadata Constraints & Character Limits
- **Immutable Title Formula ($\le 30$ chars)**: ALWAYS format as: `[Highest-Volume Keyword(s)] - [Exact Brand Name]`
  - Put the highest-volume search intent FIRST for 5x algorithmic ranking weight.
  - Keep the EXACT unmodified app brand name at the END after standard ASCII hyphen ` - <Exact Brand Name>`.
- **Strict Standard Hyphen Rule (NO Em-Dashes `—` or En-Dashes `–`)**: NEVER use em-dash (`—`), en-dash (`–`), or colons (`:`) in App Store titles or metadata (Title, Subtitle, Description, Promotional Text, What's New, or Keywords). Always use standard ASCII hyphen with spaces (` - `). This ensures optimal tokenization, keyword indexing, and prevents encoding corruption across global storefronts.
- **Subtitle ($\le 30$ chars)**: High-intent benefits or keywords. Never duplicate any words that already appear in the Title.
- **Keywords Field ($\le 100$ chars)**: Comma-separated, no spaces after commas, zero duplicate words from Title or Subtitle, no competitor brand names. Maximize value with algorithmic knapsack filling.
- **Promotional Text ($\le 170$ chars) & Release Notes**: Must ALWAYS be written from the **user's emotional benefit and trust perspective** (e.g. 100% ad-free, toddler-safe, private, offline play), NEVER as internal developer jargon or changelogs.

### 3. ⭐ Proven High-Converting App Store Review & Rating Architecture
Every app in the portfolio must adhere to this standardized, high-converting rating prompt structure:
1. **Immediate Post-Purchase Delight (#1 5★ Driver)**: Trigger `SKStoreReviewController.requestReview()` **1.5 seconds after a successful IAP unlock, subscription purchase, or Promo Code redemption**.
2. **In-App Promo Code Redemption Mandate**: Every paywall must provide a native **"Redeem Code"** button invoking `SKPaymentQueue.default().presentCodeRedemptionSheet()` (or `AppStore.presentOfferCodeRedeemSheet(in:)`). This ensures community giveaway users redeem inside the app and receive the review prompt immediately during their delight peak.
3. **First-Session Early Delight Trigger**: Trigger on the **2nd completed core action / victory** (e.g. 2nd break completed, 2nd puzzle solved, 27th bead completed). Initial sessions average 2–4 minutes; delaying until 5+ actions misses 60%+ of users.
4. **Milestone / Streak Delight**: Trigger immediately upon achieving a major milestone (e.g. 100% category mastery, sacred milestone, or Day 3/Day 7 retention streak claim).
5. **Standard Safety Rules**:
   - **3-Day Active Cooldown**: Space subsequent milestone prompt attempts by at least 3 days to harmonize with Apple's native quota (3 system prompts per 365-day period per user).
   - **1.5-Second Animation Decoupling**: Delay review requests by 1.5 seconds after paywall or modal dismissal so celebratory animations finish and `UIWindowScene` / modal view controller hierarchy settles, preventing the "Submit" button from hanging.
   - **Strict Negative Moment Ban**: NEVER prompt on app launch, during active timers/focus flows, upon transaction failure/cancellation, on errors, or immediately upon paywall dismissal.
   - **Permission Stacking Ban**: NEVER present system notification permission dialogs and StoreKit review dialogs in the same session.

### 4. 🌍 Mandatory Full Localization for All User-Facing UI
- NEVER add hardcoded, unlocalized strings in UI views, menu bars, buttons, headers, or alerts.
- All user-facing copy must be routed through centralized localization (`Localizable.xcstrings`, `Localizable.strings`, or `Strings.swift`).
- When introducing or altering UI text, translations must be updated across all supported locales before compiling, committing, or submitting releases.

### 5. ⚡ 120Hz ProMotion Tactile Haptics & Non-Blocking Performance
- **High-Performance Micro-Debouncing (30ms–35ms)**: Rapid taps, sliders, or tick gestures must be micro-debounced to prevent flooding the Taptic Engine IPC queue and keep the main runloop completely free for 120 FPS animations.
- **Thread Safety (`performOnMain`)**: Non-UI events, audio callbacks, and background tasks must check `Thread.isMainThread` directly or dispatch asynchronously via `DispatchQueue.main.async` to avoid thread hopping and latency hitches.
- **Pre-warming Generators**: Pre-warm feedback generators at launch (`prepareAll()`). Avoid synchronous `.prepare()` calls in hot touch/drag paths.

### 6. 🧪 Mandatory Pre-Launch Automated Simulator Verification
- Release builds must pass automated simulator test runs (verifying splash, onboarding, UI canvas, StoreKit paywall, restore flow, and multi-language smoke test) before submitting to Apple App Review or TestFlight.
