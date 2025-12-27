#!/bin/bash
set -e

# inspir SEO Asset Generator
# Generates all OG images, favicons, author avatars, and brand assets

CD_DIR="/root/inspir/nextjs-seo"
ASSETS_DIR="$CD_DIR/public/assets"

# Brand colors (inspir purple gradient)
PRIMARY_COLOR="#7C3AED"
SECONDARY_COLOR="#0030AB"
ACCENT_COLOR="#10B981"

echo "🎨 Generating inspir SEO Assets..."

# ============================================================================
# 1. GENERATE TOOL OG IMAGES (1200x630)
# ============================================================================

echo "📱 Generating 15 tool OG images..."

declare -A TOOLS
TOOLS=(
  ["ai-planner"]="AI Study Planner"
  ["draw-sketch"]="Visual Learning Canvas"
  ["explain-concept"]="AI Concept Explainer"
  ["flashcards"]="AI Flashcards"
  ["goal-setter"]="Academic Goal Tracker"
  ["habit-tracker"]="Study Habit Tracker"
  ["image-analysis"]="Image Homework Helper"
  ["math-solver"]="AI Math Solver"
  ["notes-sync"]="AI Note-Taking"
  ["practice-tests"]="AI Practice Tests"
  ["quiz-generator"]="AI Quiz Generator"
  ["science-lab"]="Virtual Science Lab"
  ["study-music"]="Study Music Player"
  ["study-timer"]="Study Timer"
  ["visual-learning"]="Mind Maps & Diagrams"
)

for slug in "${!TOOLS[@]}"; do
  title="${TOOLS[$slug]}"
  echo "  Creating OG image for: $title"

  convert -size 1200x630 \
    gradient:"$PRIMARY_COLOR"-"$SECONDARY_COLOR" \
    -gravity center \
    -fill white \
    -font DejaVu-Sans-Bold \
    -pointsize 72 \
    -annotate +0-50 "$title" \
    -pointsize 36 \
    -annotate +0+50 "inspir - AI Study Platform" \
    "$ASSETS_DIR/og-images/$slug-og.png"
done

# ============================================================================
# 2. GENERATE GENERAL OG IMAGES
# ============================================================================

echo "🏠 Generating general OG images..."

# Home OG
convert -size 1200x630 \
  gradient:"$PRIMARY_COLOR"-"$ACCENT_COLOR" \
  -gravity center \
  -fill white \
  -font DejaVu-Sans-Bold \
  -pointsize 84 \
  -annotate +0-80 "inspir" \
  -pointsize 48 \
  -annotate +0+20 "AI-Powered Study Platform" \
  -pointsize 32 \
  -annotate +0+80 "Your Personal AI Tutor for Smarter Learning" \
  "$ASSETS_DIR/og-images/home-og.png"

# Blog Default OG
convert -size 1200x630 \
  gradient:"$SECONDARY_COLOR"-"$PRIMARY_COLOR" \
  -gravity center \
  -fill white \
  -font DejaVu-Sans-Bold \
  -pointsize 72 \
  -annotate +0-50 "inspir Blog" \
  -pointsize 36 \
  -annotate +0+50 "Study Tips & Learning Strategies" \
  "$ASSETS_DIR/og-images/blog-default-og.png"

# Pricing OG
convert -size 1200x630 \
  gradient:"$PRIMARY_COLOR"-"$SECONDARY_COLOR" \
  -gravity center \
  -fill white \
  -font DejaVu-Sans-Bold \
  -pointsize 72 \
  -annotate +0-80 "Start Your Free Trial" \
  -pointsize 48 \
  -annotate +0+10 "14 Days Free" \
  -pointsize 32 \
  -annotate +0+70 "No Credit Card Required" \
  "$ASSETS_DIR/og-images/pricing-og.png"

# ============================================================================
# 3. GENERATE AUTHOR AVATARS (200x200)
# ============================================================================

echo "👤 Generating author avatars..."

declare -A AUTHORS
AUTHORS=(
  ["alex-chen"]="AC"
  ["sarah-mitchell"]="SM"
  ["emily-parker"]="EP"
)

AVATAR_COLORS=("#7C3AED" "#0030AB" "#10B981")
idx=0

for slug in "${!AUTHORS[@]}"; do
  initials="${AUTHORS[$slug]}"
  color="${AVATAR_COLORS[$idx]}"
  echo "  Creating avatar for: $initials"

  convert -size 200x200 \
    xc:"$color" \
    -gravity center \
    -fill white \
    -font DejaVu-Sans-Bold \
    -pointsize 72 \
    -annotate +0+0 "$initials" \
    "$ASSETS_DIR/authors/$slug.png"

  idx=$((idx+1))
done

# ============================================================================
# 4. GENERATE FAVICONS
# ============================================================================

echo "⭐ Generating favicons..."

# Create base 512x512 icon with sparkle ✨
convert -size 512x512 \
  xc:"$PRIMARY_COLOR" \
  -gravity center \
  -fill white \
  -font DejaVu-Sans-Bold \
  -pointsize 320 \
  -annotate +0+0 "✨" \
  "$ASSETS_DIR/favicons/base-icon.png"

# Generate all favicon sizes
convert "$ASSETS_DIR/favicons/base-icon.png" -resize 16x16 "$ASSETS_DIR/favicons/favicon-16x16.png"
convert "$ASSETS_DIR/favicons/base-icon.png" -resize 32x32 "$ASSETS_DIR/favicons/favicon-32x32.png"
convert "$ASSETS_DIR/favicons/base-icon.png" -resize 180x180 "$ASSETS_DIR/favicons/apple-touch-icon.png"
convert "$ASSETS_DIR/favicons/base-icon.png" -resize 192x192 "$ASSETS_DIR/favicons/android-chrome-192x192.png"
convert "$ASSETS_DIR/favicons/base-icon.png" -resize 512x512 "$ASSETS_DIR/favicons/android-chrome-512x512.png"

# Generate multi-resolution favicon.ico
convert "$ASSETS_DIR/favicons/favicon-16x16.png" \
        "$ASSETS_DIR/favicons/favicon-32x32.png" \
        "$ASSETS_DIR/favicons/favicon.ico"

# ============================================================================
# 5. GENERATE BRAND LOGOS
# ============================================================================

echo "🎯 Generating brand logos..."

# Logo with text
convert -size 800x200 \
  xc:none \
  -gravity west \
  -fill "$PRIMARY_COLOR" \
  -font DejaVu-Sans-Bold \
  -pointsize 120 \
  -annotate +50+0 "✨ inspir" \
  "$ASSETS_DIR/brand/logo.png"

# Logo white version
convert -size 800x200 \
  xc:none \
  -gravity west \
  -fill white \
  -font DejaVu-Sans-Bold \
  -pointsize 120 \
  -annotate +50+0 "✨ inspir" \
  "$ASSETS_DIR/brand/logo-white.png"

# Icon only (sparkle)
convert -size 200x200 \
  xc:none \
  -gravity center \
  -fill "$PRIMARY_COLOR" \
  -font DejaVu-Sans-Bold \
  -pointsize 160 \
  -annotate +0+0 "✨" \
  "$ASSETS_DIR/brand/logo-icon.png"

# Remove temp base icon
rm -f "$ASSETS_DIR/favicons/base-icon.png"

echo "✅ Asset generation complete!"
echo ""
echo "📊 Summary:"
echo "  - Tool OG images: 15"
echo "  - General OG images: 3"
echo "  - Author avatars: 3"
echo "  - Favicons: 7"
echo "  - Brand logos: 3"
echo ""
echo "Total: 31 assets generated"
