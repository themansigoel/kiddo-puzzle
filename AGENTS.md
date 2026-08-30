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

This app is centrally managed by the **ASO Intelligence Suite** at `/Users/rahulgoel/aso-intelligence`.

When asked in chat to review, audit, check rankings, research keywords, optimize pricing, or push metadata for Kiddo Puzzle, execute the corresponding command via `/Users/rahulgoel/aso-intelligence/aso`:

```bash
# 1. Check live search rankings on demand:
/Users/rahulgoel/aso-intelligence/aso track 6742179258 "kids puzzle" "toddler puzzle" "shapes puzzle" --country us
/Users/rahulgoel/aso-intelligence/aso track 6742179258 "kids puzzle" "baby puzzle" --country in

# 2. Run full portfolio scan across all countries & competitor signals:
/Users/rahulgoel/aso-intelligence/aso scan

# 3. Harvest high-converting toddler learning queries (Zero Ad Spend):
/Users/rahulgoel/aso-intelligence/aso harvest kiddo_puzzle --country us --harvest --auto-apply
/Users/rahulgoel/aso-intelligence/aso harvest kiddo_puzzle --country in --harvest --auto-apply

# 4. Run 0-100 difficulty & competitor n-gram research:
/Users/rahulgoel/aso-intelligence/aso research "kids puzzle" --country us --entity software
/Users/rahulgoel/aso-intelligence/aso research "toddler puzzle" --country us --entity software

# 5. Audit or apply Purchasing Power Parity (PPP) Pricing:
/Users/rahulgoel/aso-intelligence/aso ppp kiddo_puzzle --model gni_bands --base-price 4.99 --dry-run

# 6. Audit or push localized metadata directly to Apple App Store Connect API:
/Users/rahulgoel/aso-intelligence/aso audit kiddo_puzzle
/Users/rahulgoel/aso-intelligence/aso push kiddo_puzzle --dry-run
/Users/rahulgoel/aso-intelligence/aso push kiddo_puzzle

# 7. Launch the local web dashboard:
/Users/rahulgoel/aso-intelligence/aso dash
```

---

## 🗄️ Centralized ASO Intelligence Database (`aso_intelligence.db`)

All intelligence across Kiddo Puzzle and the portfolio is stored in SQLite at `~/.vibe-aso/aso_intelligence.db` (and versioned in `/Users/rahulgoel/aso-intelligence/data/aso_intelligence.db`):

| Table Name | Description | Kiddo Puzzle Focus |
|---|---|---|
| `app_portfolio_snapshots` | Master app records & ratings | App ID `6742179258`, 13 ratings, 4.38 ★ avg, live v1.3 |
| `app_sales_reports` | Daily sales, downloads & IAPs | 36 downloads in last 14 days (US, France, Germany, Japan, Brazil) |
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

# View daily sales and downloads
sqlite3 ~/.vibe-aso/aso_intelligence.db "SELECT report_date, product_type_id, sum(units), sum(developer_proceeds), country FROM app_sales_reports WHERE app_id = '6742179258' OR sku LIKE '%puzzle%' GROUP BY report_date, product_type_id, country ORDER BY report_date DESC LIMIT 20;"

# View daily impressions history
sqlite3 ~/.vibe-aso/aso_intelligence.db "SELECT date, impressions FROM app_store_impressions WHERE app_id = '6742179258' ORDER BY date DESC LIMIT 30;"
```

---

## 📋 Release History & Documentation
Refer to [`RELEASE_NOTES.md`](RELEASE_NOTES.md) and `/Users/rahulgoel/aso-intelligence/PORTFOLIO_RELEASE_HISTORY.md` for full version history and release notes.
