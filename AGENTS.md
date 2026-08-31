# 🤖 Kiddo Puzzle: AI Agent & Developer Architecture Guidelines

Welcome to the **Kiddo Puzzle** codebase. This document outlines development architecture, release guidelines, and ASO growth suite workflows.

---

## 📱 App Overview & Scope
- **App ID:** `6742179258` | **Bundle ID:** `com.puzzle.kiddo`
- **Platform:** iOS (`software`)
- **Core Features:** Interactive shape matching puzzles, wooden block physics, Space Adventure & Aquatic themes, and math-gated parental lock.
- **In-App Purchase (IAP):** `com.kiddopuzzle.lifetime_pro` (Lifetime Pro)

---

## 🍎 ASO Intelligence, Pricing & Growth Suite Integration

All App Store analytics, rankings, keyword optimization, metadata synchronization, and TestFlight deployments for **Kiddo Puzzle** are centrally managed by the **ASO Intelligence Suite** at `/Users/rahulgoel/aso-intelligence`.

Whenever you need to review rankings, analyze sales, optimize keywords, or deploy builds:

```bash
# 1. Daily morning briefing (sales, rank gainers/losers, review alerts):
/Users/rahulgoel/aso-intelligence/aso morning

# 2. Algorithmic ASO optimizer (removes deadweight keywords, generates 100-char knapsack):
/Users/rahulgoel/aso-intelligence/aso optimize kiddo_puzzle [--apply]

# 3. 1-Command Automated TestFlight Deployment (bump, build, sign, upload, poll):
/Users/rahulgoel/aso-intelligence/aso tf kiddo_puzzle

# 4. Check live search rankings on demand:
/Users/rahulgoel/aso-intelligence/aso track 6742179258 "kids puzzle" "toddler puzzle" "shapes puzzle" --country us
/Users/rahulgoel/aso-intelligence/aso track 6742179258 "kids puzzle" "baby puzzle" --country in

# 5. Run full 8-phase intelligence scan (ranks, volume, competitors, autocompletes, difficulty):
/Users/rahulgoel/aso-intelligence/aso scan

# 6. Real App Store Connect sales & proceeds sync (multi-currency conversion):
/Users/rahulgoel/aso-intelligence/aso sales

# 7. Harvest Apple search autocompletes & ASA high-converting queries:
/Users/rahulgoel/aso-intelligence/aso autocomplete --app kiddo_puzzle --country us
/Users/rahulgoel/aso-intelligence/aso harvest kiddo_puzzle --country us --harvest --auto-apply

# 8. Score keyword difficulty (0-100) vs competitor rating depth:
/Users/rahulgoel/aso-intelligence/aso difficulty "kids puzzle,toddler puzzle,shapes puzzle" --country us --entity software

# 9. Audit or push localized metadata directly to Apple ASC API:
/Users/rahulgoel/aso-intelligence/aso audit kiddo_puzzle
/Users/rahulgoel/aso-intelligence/aso push kiddo_puzzle --dry-run
/Users/rahulgoel/aso-intelligence/aso push kiddo_puzzle

# 10. Launch browser visualizer dashboard:
/Users/rahulgoel/aso-intelligence/aso dash
```

---

## 💵 Strict Real Sales Data Mandate & Lifetime Baseline
- **Never assume or extrapolate revenue**: Always use real `developer_proceeds` and `customer_price` synced directly from Apple's `/v1/salesReports` API.
- **Promo Codes**: 17 free lifetime offer codes given away for free appear as `$0.00` proceeds or with `promo_code` populated.
- **Official App Store Connect Lifetime Performance (UTC)**:
  - **Total Units**: **1,084 units** (755 free downloads + 325 lifetime_pro + 4 monthly_pro)
  - **Gross Customer Sales**: **$60.88 USD**
  - **Net Developer Proceeds**: **$44.14 USD** (Apple deposits)

---

## 🗄️ Centralized ASO Intelligence Database (`aso_intelligence.db`)

All intelligence across Kiddo Puzzle and the portfolio is stored in SQLite at `~/.vibe-aso/aso_intelligence.db` (and versioned in `/Users/rahulgoel/aso-intelligence/data/aso_intelligence.db`):

| Table Name | Description | Kiddo Puzzle Focus |
|---|---|---|
| `app_portfolio_snapshots` | Master app records & ratings | App ID `6742179258`, 13 ratings, 4.38 ★ avg, live v1.3 |
| `app_sales_reports` | Daily sales, downloads & IAPs | 1,084 total units, $60.88 gross sales, $44.14 net proceeds |
| `app_store_impressions` | Daily impressions history | 41,833 impressions across 485 days (avg 86.3/day, peak 500) |
| `app_worldwide_ratings` | Ratings across 25 storefronts | IN: 9 (4.56★), BR: 3 (3.67★), AE: 1 (5.0★) |
| `autocomplete_suggestions` | Apple Search typed hints | 3,310 suggestions (`kids puzzle`, `toddler puzzle`, `baby puzzle`) |
| `competitor_keywords` | Competitor metadata & ratings | 1,234 competitors tracked |
| `customer_reviews` | Live customer reviews from ASC | 5 written reviews in ASC (100% 5.0 ★) |
| `keyword_difficulty` | 0-100 keyword difficulty scores | Logarithmic competitor rating scores for toddler puzzle queries |
| `keyword_volume` | Search density & result proxies | 2,236 volume records |
| `rank_snapshots` | Keyword rank trajectory | US, IN, and international ranks for `toddler puzzle`, `baby puzzle` |

### Direct SQL Query Recipes for Kiddo Puzzle:
```bash
# Check live search rankings
sqlite3 ~/.vibe-aso/aso_intelligence.db "SELECT country, keyword, rank, total_in_results FROM rank_snapshots WHERE app_id = '6742179258' AND recorded_at = (SELECT max(recorded_at) FROM rank_snapshots WHERE app_id = '6742179258') ORDER BY rank ASC;"

# View real sales and proceeds
sqlite3 ~/.vibe-aso/aso_intelligence.db "SELECT report_date, product_type_id, sum(units), round(sum(developer_proceeds), 2), proceeds_currency, country FROM app_sales_reports WHERE app_id = '6742179258' OR sku LIKE '%puzzle%' GROUP BY report_date, product_type_id, country ORDER BY report_date DESC LIMIT 20;"
```

---

## 📋 Release History & Documentation
Refer to [`RELEASE_NOTES.md`](RELEASE_NOTES.md) and `/Users/rahulgoel/aso-intelligence/PORTFOLIO_RELEASE_HISTORY.md` for full version history and release notes.
