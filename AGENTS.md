# ASO Intelligence & Organic Growth Suite — Agent Guidelines & Rules

This document outlines the operational rules, data schemas, API interfaces, and prompt workflows for the **ASO Intelligence Suite** (`/Users/rahulgoel/aso-intelligence`).

---

## 📁 Repository Directory Map
- `apps.json`: Central configuration of all live tracked apps, keywords per storefront, and multi-locale metadata.
- `sun.sh`: Master launcher script (starts Flask server on `http://localhost:7777`, verifies health, and opens browser).
- `aso_db.py`: SQLite engine (`~/.vibe-aso/aso_intelligence.db`) for tracking snapshots, rank history, volume proxies, and competitors.
- `fetch_all.py`: Parallel full-scan engine scraping ranks, volume, competitor intelligence, autocompletes, and difficulty scores.
- `autocomplete_harvest.py`: Apple App Store search autocomplete harvester — pulls real user search queries directly from Apple's hints API.
- `keyword_difficulty.py`: Competitor-strength keyword difficulty scoring engine (0-100 scale) based on top competitor rating depth.
- `metadata_snapshots/`: Historical snapshots of live App Store metadata per version for rollback and auditing.
- `rank_tracker.py`: Real-time on-demand App Store search rank checker.
- `push_metadata.py`: Direct App Store Connect API metadata updater (Title, Subtitle, Keywords) with strict validation.
- `audit_submission.py`: Pre-flight audit checklist (verifies API fields vs manual requirements).
- `asc.rb`: Ruby JWT client communicating directly with Apple App Store Connect API.
- `PORTFOLIO_RELEASE_HISTORY.md`: Master centralized release history, build versions, and changelogs across all portfolio apps.
- `web/server.py`: Flask backend providing REST APIs and Server-Sent Events (SSE) for streaming CLI operations to the browser.
- `web/templates/index.html`: Modern single-page ASO dashboard with Chart.js rank history and growth playbooks.

---

## 🎯 Supported Apps & Scope Rules
1. **Live & Pre-Release Tracking Policy**: Track portfolio apps across macOS and iOS:
   - **Step Away** (`6754695723`, Mac, `READY_FOR_SALE`)
   - **Mantra Chanting** (`6791468380`, iOS, `READY_FOR_SALE`)
   - **Go Phonics** (`6756431312`, iOS, `READY_FOR_SALE`)
   - **Kiddo Puzzle** (`6742179258`, iOS, `READY_FOR_SALE`)
   - **InkFlux** (`6779729953`, Mac, `com.sunshine.inkflux.app`, `PREPARE_FOR_SUBMISSION` — Full 6-locale metadata & StoreKit 2 IAPs synchronized to ASC)
2. **Explicit Exclusions**: Do NOT track or scan `Cookie King` (`6773855897`) or `Block Master` (`6778909840`).
3. **Pending Apps**: When `GrowFocus` (`6774886246`) or `Gym Workout` (`6761177535`) are approved and live, add their IDs to `apps.json`.
4. **Strict Real Apple API Verification Mandate**: NEVER guess, assume, or rely on stale local JSON files for live App Store metadata (Title, Subtitle, Keywords, Version, State). ALWAYS query the real App Store Connect API (`asc.rb GET "/v1/apps/<id>/appInfos?include=appInfoLocalizations"` and `/v1/apps/<id>/appStoreVersions?include=appStoreVersionLocalizations`) before analyzing, auditing, or creating plans.

---

## 🤖 Universal `./aso` CLI & Prompt-Driven Workflows

You can now run any operation via the master `./aso` executable or direct Python scripts:

### 1. Master CLI Quick Reference
```bash
./aso morning                   # ☀️ 30-sec executive daily briefing (sales, rank movers, review alerts, AI action)
./aso optimize <app> [--apply]  # 🤖 Algorithmic ASO optimizer (removes deadweight, knapsack 100-char generator)
./aso site                      # 🌐 Full health & SEO audit of all portfolio websites
./aso tf <app_name>             # 1-Command TestFlight release (auto-bump, archive, sign, upload, poll)
./aso dash                      # Launch web visualizer on http://localhost:7777
./aso scan                      # Parallel 8-phase scan across all live apps (ranks, volume, competitors, autocompletes, difficulty, ratings, reviews, sales)
./aso sales [options]           # Sync daily downloads, paid IAPs & proceeds directly from Apple API
./aso impressions [options]     # View daily impressions and acquisition analytics history
./aso ratings                   # Scrape worldwide rating counts and averages across 25 global storefronts
./aso autocomplete [options]    # Harvest Apple App Store autocomplete suggestions (what users type)
./aso difficulty "<kws...>"     # Score keyword difficulty (0-100) vs competitor ratings
./aso harvest <app>             # Zero-ad-spend search query harvester & ASA auto-bidding
./aso research "<seed_keyword>" # Popularity & difficulty (0-100) research engine
./aso ppp <app>                 # Worldwide Purchasing Power Parity pricing engine
./aso track <app_id> <kws...>   # Check live search rankings on demand
./aso push <app> [--dry-run]    # Push localized metadata directly to Apple ASC API
./aso audit <app>               # Compare apps.json vs live Apple Storefront values
./aso test <app>                # 🧪 12-Step full-fidelity visual simulator test suite with HTML report
./aso preflight <app>           # Pre-flight submission checklist
./aso db dashboard <app_id>     # View historical SQLite ranking trajectory
```

### 2. Keyword Research & Volume Check
When asked to research keywords or check competition:
```bash
python3 aso_db.py volume "<keyword1>,<keyword2>,<keyword3>" --country <us|in|gb|de> --entity <macSoftware|software>
```

### 3. Competitor Intelligence & Keyword Mining
When analyzing competitor titles, ratings, and extracted keywords:
```bash
python3 aso_db.py competitors "<keyword>" --country <us|in|gb|de> --entity <macSoftware|software>
```

### 4. Check Live Rankings
When verifying current rank positions on-demand:
```bash
python3 rank_tracker.py <app_id> "<kw1>" "<kw2>" "<kw3>" --country <us|in|gb|de>
```

### 5. Full-Portfolio Intelligence Scan
When pulling fresh ranks, competition signals, autocompletes, and difficulty across all live apps:
```bash
python3 fetch_all.py
```

### 6. Audit Metadata vs Live App Store
Before pushing changes, compare `apps.json` against live Apple values:
```bash
python3 push_metadata.py <app_key> --audit
```

### 7. Push Metadata to App Store Connect
Always test with `--dry-run` first:
```bash
# 1. Dry run
python3 push_metadata.py <app_key> --dry-run

# 2. Live write to Apple API
python3 push_metadata.py <app_key>
```

### 8. Popularity & Difficulty Keyword Research
When discovering intent-matched keywords and generating Title/Subtitle/Keywords:
```bash
python3 keyword_research.py "<seed_keyword>" --country <us|in|gb|de> --entity <macSoftware|software>
```

### 9. Worldwide PPP Pricing Engine
When auditing or applying Purchasing Power Parity pricing models (uniform, gni_bands, big_mac, netflix):
```bash
# Audit current live pricing schedule across territories
python3 worldwide_pricing.py <app_key> --audit

# Dry run calculation of territory prices
python3 worldwide_pricing.py <app_key> --model gni_bands --base-price 2.99 --dry-run

# Apply worldwide pricing schedule to Apple API
python3 worldwide_pricing.py <app_key> --model gni_bands --base-price 2.99
```

### 10. Apple Search Ads (ASA) Auto-Bidding & Keyword Harvesting
When discovering high-converting ad search queries, auto-pruning CPA waste, and harvesting organic keywords:
```bash
# Run full scan (harvesting + CPA bidding rules) across all apps:
python3 asa_sync.py all

# Harvest winners and automatically inject them into apps.json organic metadata:
python3 asa_sync.py step_away --harvest --auto-apply

# Run CPA auto-bidding rules with custom target CPA:
python3 asa_sync.py mantra_chanting --optimize-bids --target-cpa 1.00
```

### 11. Autocomplete Search Query Discovery
When discovering what real users type directly into the App Store search bar:
```bash
# Harvest autocomplete suggestions across all apps:
python3 autocomplete_harvest.py

# Harvest for a specific app + country:
python3 autocomplete_harvest.py --app mantra_chanting --country in

# Show stored suggestions from DB:
python3 autocomplete_harvest.py --show
```

### 12. Competitor-Strength Keyword Difficulty Scoring
When evaluating how hard it is to rank for a keyword (0-100 scale, logarithmic competitor rating depth):
```bash
# Score specific keywords:
python3 keyword_difficulty.py "jaap mala,tasbeeh,naam jap,om chanting" --country in --entity software

# Score and persist to DB:
python3 keyword_difficulty.py "jaap mala,tasbeeh" --country in --save

# View stored difficulty scores:
python3 keyword_difficulty.py --show
```

**Difficulty Scale:**
- `0–20` = **Easy** (top competitors have <50 ratings)
- `21–50` = **Medium** (top competitors have 50–500 ratings)
- `51–80` = **Hard** (top competitors have 500–5,000 ratings)
- `81–100` = **Very Hard** (top competitors have 5,000+ ratings)

### 13. Metadata Snapshots & Rollback
Before pushing metadata changes, always archive current state in `metadata_snapshots/<app_key>_v<version>_<locale>.json`.

---

## 🕉️ Mantra Chanting v1.4 — Active ASO Context

### Live Rankings (Aug 24, 2026)
- `mantra chanting`: **#1 IN, #1 US, #1 GB** (Title-anchored, immutable)
- `chanting tracker`: **#5 IN, #3 US, #8 GB** (Title+Subtitle-anchored)
- `108 bead counter`: **#7 IN** (Subtitle-anchored)
- `japa mala`: **#21 IN, #14 US, #12 GB** (Title-anchored)
- `om chanting`: **#11 US** (Live verified)

### v1.4 Metadata Setup (`apps.json`)
- **en-US Keywords (94 chars):** `jaap,tasbih,naam,jap,om,rosary,dhikr,prayer,sadhana,hindu,krishna,meditation,rudraksha,digital`
- **Hindi Locale (`hi`):** Name: `मंत्र जाप - जप माला` | Subtitle: `१०८ माला काउंटर व ट्रैकर` | Keywords: `जप,माला,जाप,मंत्र,हरे,कृष्ण,ओम,नमः,शिवाय,राम,गायत्री,साधना,नाम,ध्यान,रुद्राक्ष`
- **v1.3 Metadata Archive:** `metadata_snapshots/mantra_chanting_v1.3_en-US.json`

---

## 📏 Apple Character Limits & ASO Golden Rules
- **Immutable Title Formula**: $\le 30$ characters. ALWAYS format as: `[Highest-Volume Keyword(s)] - [Exact Brand Name]`
  - Put the highest-volume search intent FIRST for 5x algorithmic ranking weight.
  - Keep the EXACT unmodified app brand name at the END after standard ASCII hyphen ` - <Exact Brand Name>`.
  - Portfolio Title Standards:
    - **Step Away:** `Break Reminder - Step Away` (26/30 chars, `Step Away` = Brand)
    - **Mantra Chanting:** `Mantra Chanting - Japa Mala` (27/30 chars, `Japa Mala` = Brand)
    - **Kiddo Puzzle:** `Shape Puzzles - Kiddo Puzzle` (28/30 chars, `Kiddo Puzzle` = Exact Brand)
    - **Go Phonics:** `Learn to Read - Go Phonics` (26/30 chars, `Go Phonics` = Exact Brand)
    - **InkFlux:** `Web to EPUB - InkFlux` (21/30 chars, `InkFlux` = Exact Brand)
- **Punctuation Rule**: NEVER use colons (`:`), em-dashes (`—`), or en-dashes (`–`) in titles; ALWAYS use standard ASCII hyphen with single spaces (` - `).
- **Subtitle**: $\le 30$ characters. Never repeat words already in the Title.
- **Keywords**: $\le 100$ characters. Comma-separated, no spaces after commas, ZERO duplicate words from Title or Subtitle, no brand competitor names.
- **Promotional Text & What's New Rule**: Promotional Text ($\le 170$ chars) and What's New release notes must ALWAYS be written from the **user's emotional benefit & trust perspective** (e.g. 100% ad-free, offline play, toddler-safe, peaceful practice), NEVER as internal developer changelogs.
- **Entity Flag**: Pass `entity=macSoftware` for macOS apps (Step Away, InkFlux) and `entity=software` for iOS apps.

---

## ⭐ Proven High-Converting App Store Review & Rating Architecture

Every app in the portfolio must implement this standardized, high-converting `SKStoreReviewController` rating architecture:

### 1. The 4 Proven Review Triggers:
1. **Immediate Post-Purchase Delight (#1 5★ Driver)**:
   - Always trigger `SKStoreReviewController.requestReview()` **1.5 seconds after a successful IAP unlock or Subscription purchase**.
   - *Rationale:* Users who just paid are at peak psychological satisfaction and give 5-star ratings over 90% of the time.
2. **First-Session Drop-off Prevention (Early Delight Trigger)**:
   - Trigger on the **2nd completed core action / victory** (e.g. 2nd puzzle completed, 2nd break completed, 1st mantra completion).
   - *Rationale:* Average initial session duration in consumer apps is 2–4 minutes; requiring 3+ or 5+ actions misses 60%+ of initial users before they exit.
3. **Category / Pack Mastery & Euphoria**:
   - Trigger immediately after completing a full set, level pack, or reaching a sacred milestone (e.g. 108th bead in Mantra Chanting, 6/6 medals in a Kiddo Puzzle category).
4. **Streak / Daily Reward Milestone**:
   - Trigger when claiming a Day 3 or Day 7 retention streak bonus.

### 2. Standardized Timing & Safety Rules:
- **3-Day Active Cooldown**: Space subsequent milestone prompt attempts by at least **3 days** (never 7+ days which misses active user momentum).
- **Apple Quota Harmony**: Apple natively limits `SKStoreReviewController` to **3 system prompts per 365-day period per user**. Keeping client cooldown at 3 days ensures the system prompt appears the exact moment Apple's OS quota unlocks.
- **1.5-Second Animation Buffer**: Always delay `SKStoreReviewController` by 1.5 seconds so celebratory confetti, haptics, and medal animations complete before the dialog appears.
- **Strict Negative Moment Ban**: NEVER prompt on launch, during active flow/timers, on transaction failure/cancellation, on errors, or on paywall dismissal.
- **Permission Stacking Ban**: NEVER trigger Push Notification system permission dialogs and StoreKit Review dialogs in the same session.

---

## 🧪 Mandatory Pre-Launch Visual Simulator Automation Testing Mandate

To eliminate manual quality assurance and guarantee zero App Store rejections or user regressions, **every portfolio release must pass the automated human-like visual simulator test pipeline before submission**.

### 1. Master Execution Command:
```bash
./aso test <app_key>     # Runs complete human-like simulator journey and generates visual HTML report
```

### 2. Standard 12-Step Test Matrix:
1. **Simulator Discovery & Build Verification**: Automatically acquires or boots iOS/macOS simulators, compiles binary, and performs a clean bundle installation.
2. **Splash Screen & Motion Animation**: Asserts audio playback, Lottie animation entry, and smooth transition to interactive views.
3. **Soft First-Launch Onboarding Sheet**: Asserts 1-page value proposition, COPPA Kid-Safe badges, and dismissal/upgrade CTAs.
4. **Home Screen & Glassmorphic HUD**: Verifies Play CTA pulse, audio mute toggle, settings navigation, and crown store buttons.
5. **Daily Visit Reward Popup**: Asserts streak counters, reward claim animations, and bonus level unlocking.
6. **Multi-Theme Category Carousel**: Verifies horizontal/vertical scroll fidelity across all unlocked and premium theme tiles.
7. **Level Listing & Lock Indicators**: Asserts free level indicators vs. premium lock badges.
8. **Interactive Gameplay Canvas**: Verifies touch/drag physics, snapping feedback, hint animations, and victory audio.
9. **End-of-Free-Sample Celebration Dialog**: Asserts proactive celebratory modal upon solving the free tier with theme previews.
10. **Apple Guideline 1.3 Parental Gate**: Asserts arithmetic verification ($4 \times 3 = 12$) strictly intercepts all commercial purchasing flows.
11. **StoreKit 2 Paywall Architecture**: Verifies Hero Lifetime Pro preselection, Monthly Subscription tier, COPPA badges, and Restore Purchases.
12. **Multi-Language Parity & Dark Mode Smoke Test**: Launches with `-AppleLanguages (es|ja|de|pt-BR|fr|zh-Hans|ko)` to assert 0 unlocalized keys and contrast legibility.

### 3. Visual Artifacts & HTML Report:
- High-resolution screenshots are automatically saved to `<repo>/test_artifacts/screenshots/`.
- An interactive visual test report is compiled at `<repo>/test_artifacts/visual_report.html` for immediate inspection.

---

## 💵 Financial Data & Real App Store Sales Invariants
- **Strict Real Data Mandate**: NEVER assume, extrapolate, or estimate revenue (e.g. NEVER multiply unit downloads by list price). ALWAYS use the exact `developer_proceeds` and `customer_price` returned directly by Apple App Store Connect Sales Reports API (`/v1/salesReports`).
- **Free Lifetime Promo Codes & Offer Codes**: The developer gives away free lifetime promo codes and offer codes. In Apple Sales Reports, these appear as `IA1` / `IAY` transactions with `developer_proceeds = 0.0` or `promo_code` populated.
- **Multi-Currency FX Engine**: Apple reports `developer_proceeds` and `customer_price` in the local currency of each transaction (`IDR`, `PHP`, `INR`, `AUD`, `EUR`, `CAD`, `GBP`, `SEK`, `TRY`, `THB`, `MYR`, `AED`, `KRW`, `VND`, `ZAR`). NEVER do a raw SQL `SUM(developer_proceeds)` without converting each row to USD via the foreign exchange table.
- **Strict Revenue & Unit Distinction in All Queries & Reports**:
  - **Paid IAP Purchases**: `product_type_id LIKE 'IA%' AND developer_proceeds > 0`
  - **Promo / Free Code Redemptions**: `product_type_id LIKE 'IA%' AND (developer_proceeds = 0 OR (promo_code IS NOT NULL AND promo_code != ''))`
  - **Free App Downloads**: `product_type_id NOT LIKE 'IA%'`
  - **Gross Customer Sales**: Sum of customer price in USD eq. (~**$157 USD** lifetime benchmark from App Store Connect).
  - **Net Developer Proceeds**: Sum of actual Apple deposits in USD eq. (~**$118 USD** lifetime benchmark from App Store Connect).

### 📊 Official App Store Connect Account Baseline (Lifetime UTC):
- **Total Account Units**: **2,205 units** (2.21K units in ASC dashboard)
- **Gross Customer Sales**: **$157.31 USD** ($157 in ASC dashboard)
- **Net Developer Proceeds**: **$117.61 USD** ($118 in ASC dashboard)
- **Tracked App Performance**:
  - **Kiddo Puzzle:** 755 free downloads + 325 lifetime_pro + 4 monthly_pro = 1,084 units | $60.88 sales | $44.14 net proceeds
  - **Break Reminder - Step Away:** 194 macOS units | $44.99 sales | $33.10 net proceeds
  - **Mantra Chanting - Japa Mala:** 210 free downloads + 60 lifetime_pro + 2 subscriptions = 272 units | $40.64 sales | $31.78 net proceeds
  - **Go Phonics: Kids Learn to Read:** 363 free downloads + 47 lifetime_pro = 410 units | $10.80 sales | $8.59 net proceeds

---

## 🔒 Security & Database Architecture

- **Credentials Policy**: Stored strictly in `~/.vibe-aso/` (`config.json` + `AuthKey.p8`, `chmod 600`). NEVER hardcode or commit keys, tokens, or vendor numbers into git repository files. All scripts dynamically read credentials from `~/.vibe-aso/config.json` or environment variables.
- **SQLite Engine**: Primary local database at `~/.vibe-aso/aso_intelligence.db`, with version-controlled snapshots and SQL dumps in `data/aso_intelligence.db` and `data/aso_intelligence_dump.sql`.
- **Thread Safety**: In Python scripts using `ThreadPoolExecutor`, execute network searches in parallel worker threads, but **always execute SQLite writes on the main thread**.

### 🗄️ Full Database Map — All 10 Intelligence Tables

```sql
-- 1. App Portfolio Snapshots (Master live app records)
CREATE TABLE app_portfolio_snapshots (
    app_id TEXT PRIMARY KEY,
    app_name TEXT NOT NULL,
    category TEXT,
    total_worldwide_ratings INTEGER DEFAULT 0,
    weighted_average_rating REAL DEFAULT 0.0,
    live_version TEXT,
    initial_release_date TEXT,
    latest_release_date TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Daily Sales & Downloads from Apple /v1/salesReports API
CREATE TABLE app_sales_reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    app_id TEXT NOT NULL,
    app_name TEXT,
    sku TEXT,
    developer TEXT,
    version TEXT,
    product_type_id TEXT,
    units INTEGER NOT NULL,
    developer_proceeds REAL NOT NULL,
    proceeds_currency TEXT,
    customer_price REAL,
    customer_currency TEXT,
    country TEXT NOT NULL,
    device TEXT,
    supported_platforms TEXT,
    promo_code TEXT,
    order_type TEXT,
    report_date TEXT NOT NULL,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(app_id, report_date, sku, product_type_id, country, device)
);

-- 3. Daily App Store Impressions & Acquisition History
CREATE TABLE app_store_impressions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    app_id TEXT NOT NULL,
    date TEXT NOT NULL,
    impressions INTEGER NOT NULL,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(app_id, date)
);

-- 4. Worldwide Rating Counts & Breakdown Across 25 Storefronts
CREATE TABLE app_worldwide_ratings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    app_id TEXT NOT NULL,
    country TEXT NOT NULL,
    rating_count INTEGER NOT NULL,
    average_rating REAL NOT NULL,
    app_version TEXT,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(app_id, country, app_version)
);

-- 5. Apple App Store Search Autocomplete Queries (What users type)
CREATE TABLE autocomplete_suggestions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    seed_keyword TEXT NOT NULL,
    suggestion TEXT NOT NULL,
    country TEXT NOT NULL,
    entity TEXT NOT NULL,
    position INTEGER,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(seed_keyword, suggestion, country, entity)
);

-- 6. Competitor Metadata & Rating Depth Intelligence
CREATE TABLE competitor_keywords (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    search_term TEXT NOT NULL,
    competitor_app_id TEXT NOT NULL,
    competitor_name TEXT NOT NULL,
    competitor_title TEXT,
    competitor_subtitle TEXT,
    rank_in_results INTEGER,
    country TEXT NOT NULL,
    entity TEXT NOT NULL,
    extracted_keywords TEXT,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    competitor_user_rating_count INTEGER DEFAULT 0,
    competitor_avg_rating REAL DEFAULT 0.0,
    UNIQUE(search_term, competitor_app_id, country)
);

-- 7. Live Written Customer Reviews Synced from App Store Connect API
CREATE TABLE customer_reviews (
    id TEXT PRIMARY KEY,
    app_id TEXT NOT NULL,
    rating INTEGER NOT NULL,
    title TEXT,
    body TEXT,
    reviewer_nickname TEXT,
    created_date TEXT,
    territory TEXT,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Competitor-Strength Keyword Difficulty Scores (0-100 scale)
CREATE TABLE keyword_difficulty (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    keyword TEXT NOT NULL,
    country TEXT NOT NULL,
    entity TEXT NOT NULL,
    difficulty INTEGER NOT NULL,
    top_competitor_ratings INTEGER DEFAULT 0,
    avg_top5_ratings INTEGER DEFAULT 0,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(keyword, country, entity)
);

-- 9. Search Volume & Competitive Result Count Proxies
CREATE TABLE keyword_volume (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    keyword TEXT NOT NULL,
    country TEXT NOT NULL,
    entity TEXT NOT NULL,
    result_count INTEGER NOT NULL,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(keyword, country, entity, recorded_at)
);

-- 10. Keyword Search Ranking Trajectory Per App & Storefront
CREATE TABLE rank_snapshots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    app_id TEXT NOT NULL,
    keyword TEXT NOT NULL,
    country TEXT NOT NULL,
    entity TEXT NOT NULL,
    rank INTEGER,
    total_in_results INTEGER,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(app_id, keyword, country, recorded_at)
);
```

---

## 📱 Portfolio App IDs & Quick SQL Query Guide

Any agent or developer can directly query the database across the 4 live portfolio apps:

| App Name | App ID | Platform | Category | Primary Focus |
|---|---|---|---|---|
| **Mantra Chanting - Japa Mala** | `6791468380` | iOS | Health & Fitness | Spiritual meditation, Japa counter, Hindi/Spanish/Portuguese ASO |
| **Break Reminder - Step Away** | `6754695723` | macOS | Health & Fitness | Desk posture, eye rest, global Mac #1 rank |
| **Go Phonics: Kids Learn to Read** | `6756431312` | iOS | Education | Preschool literacy, sound matching, back-to-school surge |
| **Kiddo Puzzle: Learning Game** | `6742179258` | iOS | Games | Toddler cognitive puzzles, high-volume summer discovery |

### Direct SQL Query Recipes:

```bash
# 1. Check all live search rankings across all 4 apps
sqlite3 ~/.vibe-aso/aso_intelligence.db "
SELECT p.app_name, r.country, r.keyword, r.rank, r.total_in_results 
FROM rank_snapshots r 
JOIN app_portfolio_snapshots p ON r.app_id = p.app_id 
WHERE r.recorded_at = (SELECT max(recorded_at) FROM rank_snapshots WHERE app_id = r.app_id) AND r.rank IS NOT NULL 
ORDER BY r.rank ASC LIMIT 20;
"

# 2. View 14-day sales, paid IAPs, and downloads by app
sqlite3 ~/.vibe-aso/aso_intelligence.db "
SELECT app_name, sum(units) as total_units, 
       sum(CASE WHEN product_type_id LIKE 'IA%' THEN units ELSE 0 END) as iaps,
       sum(CASE WHEN product_type_id NOT LIKE 'IA%' THEN units ELSE 0 END) as free_downloads,
       round(sum(developer_proceeds), 2) as proceeds_usd
FROM app_sales_reports GROUP BY app_id ORDER BY total_units DESC;
"

# 3. View lifetime impressions summary
sqlite3 ~/.vibe-aso/aso_intelligence.db "
SELECT p.app_name, count(i.id) as days, sum(i.impressions) as total_imp, round(avg(i.impressions), 1) as avg_day, max(i.impressions) as peak
FROM app_portfolio_snapshots p 
LEFT JOIN app_store_impressions i ON p.app_id = i.app_id 
GROUP BY p.app_id;
"

# 4. View worldwide ratings across all 25 storefronts
sqlite3 ~/.vibe-aso/aso_intelligence.db "
SELECT p.app_name, w.country, w.rating_count, w.average_rating 
FROM app_worldwide_ratings w 
JOIN app_portfolio_snapshots p ON w.app_id = p.app_id 
ORDER BY p.app_name, w.rating_count DESC;
"
```

