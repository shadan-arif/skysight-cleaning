#!/usr/bin/env bash
# fix-lovable-assets.sh
# ─────────────────────────────────────────────────────────────────────────────
# Rewrites relative Lovable asset URLs in all *.asset.json files so that
# images load correctly when the project is cloned and run locally.
#
# Usage:
#   ./scripts/fix-lovable-assets.sh <lovable-site-url> [assets-dir]
#
# Examples:
#   ./scripts/fix-lovable-assets.sh https://thebionicgroup.lovable.app
#   ./scripts/fix-lovable-assets.sh https://myproject.lovable.app ./src/assets
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

SITE_URL="${1:-}"
ASSETS_DIR="${2:-./src/assets}"

# ── Validation ────────────────────────────────────────────────────────────────
if [[ -z "$SITE_URL" ]]; then
  echo "❌ Error: Lovable site URL is required."
  echo ""
  echo "Usage: $0 <lovable-site-url> [assets-dir]"
  echo "  e.g. $0 https://myproject.lovable.app"
  exit 1
fi

# Strip trailing slash
SITE_URL="${SITE_URL%/}"

if [[ ! -d "$ASSETS_DIR" ]]; then
  echo "❌ Error: Assets directory not found: $ASSETS_DIR"
  exit 1
fi

# ── Find files that still use relative paths ──────────────────────────────────
RELATIVE_FILES=$(find "$ASSETS_DIR" -name "*.asset.json" \
  -exec grep -l '"url": "/__l5e' {} \; 2>/dev/null || true)

if [[ -z "$RELATIVE_FILES" ]]; then
  echo "✅ No asset files with relative URLs found — nothing to do."
  exit 0
fi

echo "🔍 Found files to update:"
echo "$RELATIVE_FILES" | sed 's/^/   /'
echo ""

# ── Patch URLs ────────────────────────────────────────────────────────────────
echo "$RELATIVE_FILES" | xargs sed -i '' \
  "s|\"url\": \"/__l5e/|\"url\": \"${SITE_URL}/__l5e/|g"

COUNT=$(echo "$RELATIVE_FILES" | wc -l | tr -d ' ')
echo "✅ Updated $COUNT file(s) → prefixed with: $SITE_URL"
