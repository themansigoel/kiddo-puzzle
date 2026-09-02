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
