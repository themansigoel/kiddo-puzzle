# Kiddo Puzzle website agent guide

This checkout is a static HTML/CSS/JavaScript website, not the native app. Native source: /Users/rahulgoel/kiddo-puzzle-ios-code; read that repo's AGENTS.md before editing the app. Do not run Xcode builds from this website or treat historical RELEASE_NOTES/test documents as live store state.

## Editing and verification
- Start with git status and inspect only relevant HTML/CSS/JS. Preserve existing page routes, assets, accessibility, responsive behavior and working contact forms. Do not send test emails/forms without authorization.
- Match website feature, pricing-model and privacy claims to actual source and current ASC metadata. Do not invent testimonials, rating counts, downloads or compliance certifications. App ID/locale/path configuration is in /Users/rahulgoel/aso-intelligence/apps.json under kiddo_puzzle.
- Use the existing static-site workflow; do not add packages/frameworks for simple edits. Check changed links/assets and relevant desktop/mobile layouts. Inspect tests/ for a usable website test before executing it; native-app test recipes are not website tests.
- SEO: verify the real public URL, HTTP status, sitemap XML, robots/canonical/hreflang and indexability. Keep structured data and llms.txt consistent with visible content. No keyword stuffing, fake reviews, doorway pages or promises of search/AI placement.
- git diff --check is required for changed text. Publishing/commit/push must stay within user authorization. For App Store or portfolio policy tasks, read the relevant section of /Users/rahulgoel/aso-intelligence/docs/agent-guidance/PORTFOLIO_RULES.md once.
