# Shopify AI Prompt — The Cosy Cairn

Use this document as a complete brief when using Shopify AI (Sidekick / Magic) or any AI tool to recreate or customise **The Cosy Cairn** Shopify store. Paste the relevant sections into the AI chat.

---

## 1. Brand Identity

**Store name:** The Cosy Cairn  
**Tagline:** "For homes full of light & wonder"  
**Sub-tagline:** "Beautiful little finds for homes full of light and a little wonder"  
**Brand personality:** Warm, intimate, artisanal, slow-living. Think cottagecore meets Scandinavian calm. NOT minimalist or clinical — always cosy, soft, natural.  
**Target customer:** Women 25–45, home-lovers, gift-buyers, sustainability-conscious.  
**Tone of voice:** Gentle, poetic, conversational. Italic flourishes. Short sentences. No exclamation marks overuse. Words like: cosy, wonder, thoughtful, lovingly, softness, warmth.

---

## 2. Colour Palette

| Variable         | Hex       | Use                          |
|------------------|-----------|------------------------------|
| Sage             | `#9caf88` | Primary buttons, accents, announcement bar, newsletter bg |
| Sage Dark        | `#7a8f6a` | Hover states, secondary text accents |
| Sage Light       | `#b8c9a9` | Hero italic title colour, badge backgrounds |
| Cream            | `#fdfbf7` | Page background, header background |
| Cream Warm       | `#f8f5f0` | Section backgrounds, hover states, card backs |
| Blush / Dusty Rose | `#e8d5d0` | Featured banner background gradient |
| Beige            | `#e5ddd3` | Borders, dividers, subtle UI elements |
| Text Dark        | `#3d3d35` | Body text, headings |
| Text Medium      | `#5c5c52` | Secondary text, nav links |
| Text Light       | `#8a8a80` | Captions, placeholders, muted text |

**Never use:** Stark white backgrounds, black text, cold blues or greys. Always stay in the warm neutral/sage palette.

---

## 3. Typography

**Primary heading font:** Playfair Display — weights 700, 800, 900 (italic variants too)  
**Body / secondary font:** Cormorant Garamond — weights 300, 400, 500, 600 (italic variants)  
**Google Fonts import:**
```
https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&display=swap
```

**Heading style rules:**
- Section titles: Playfair Display 700, ~2.8rem, tighter letter-spacing (-0.5px to 1px), NOT all-caps
- Hero title: Playfair Display 800, `clamp(3.2rem, 9vw, 7rem)`, line-height 1.0, white
- Hero title second line: italic, sage-light colour (`#b8c9a9`)
- Buttons / nav / labels: Cormorant Garamond 600, UPPERCASE, letter-spacing 2–3px

---

## 4. Homepage Sections (in order)

### 4.1 Announcement Bar
- Background: Sage (`#9caf88`), white text
- 4 rotating items with small SVG icons (outline style, 14px):
  1. ✦ "Thoughtfully chosen for your home"
  2. 🛡 "Secure checkout & payments"
  3. ♥ "Small shop, big heart"
  4. 🌿 "Eco friendly packaging"
- Display all 4 side by side on desktop, wraps on mobile

### 4.2 Sticky Header
- Background: Cream (`#fdfbf7`), subtle bottom shadow
- Left: Logo image (circle, 60px) + store name (uppercase, 1.3rem, letter-spacing 2px) + italic tagline below
- Centre: Navigation links — Home, Shop (dropdown), New In, Collections, About, Contact
- Right: Search icon, Account icon, Cart icon (with item count badge in sage), Hamburger (mobile only)
- Hamburger: 44×44px rounded square, border, animated 3-bar → X transition on open
- Mobile nav: Right-side drawer (300px wide), slides in with cubic-bezier ease, dark overlay with blur behind it. Drawer has header (brand name + ✕ close button), nav links with bottom borders, footer with tagline + social icons

### 4.3 Hero Section
- Full-width, min-height 680px
- Background: Full-cover image with `scale(1.04)` zoom that eases to `scale(1)` on hover
- Overlay: diagonal gradient `rgba(30,25,20,0.55) → rgba(30,25,20,0.3) → rgba(30,25,20,0.65)`
- Content (centred, max-width 820px):
  - **Eyebrow row:** thin line — "Welcome to" text (uppercase, 6px letter-spacing) — thin line
  - **H1:** "The Cosy" (line 1, white) + "Cairn" (line 2, italic, sage-light `#b8c9a9`) — Playfair Display 800
  - **Ornament:** line — tiny diamond SVG — line
  - **Tagline:** "Beautiful little finds for homes full of light and a little wonder" — Cormorant Garamond italic 300, ~1.4rem, white 93% opacity
  - **Two CTA buttons side by side:**
    - "Shop Now" — solid sage, pill shape (border-radius 40px)
    - "Explore Collections" — ghost/outline, white border, blur backdrop
  - **Scroll hint:** animated bouncing "↓ Scroll to discover" text, fades out on mobile

### 4.4 Trust Badges
- White background, border top+bottom in beige
- 4-column grid (2 cols on tablet, 1 col on mobile)
- Each badge: circular icon container (48px, cream-warm bg) + title (uppercase 0.82rem) + italic description
- Dividers between badges (border-right on desktop)
- Hover: badge bg goes cream-warm, icon circle goes sage-light
- Badges: Thoughtful Pieces / Small Shop / Eco Friendly / Secure Checkout

### 4.5 Shop by Category
- Section title: "Shop by Category" (Playfair Display 700)
- Subtitle: "Curated collections for every cosy corner" (italic, text-light)
- Gradient line divider (sage)
- 5-column grid of category cards:
  - Each card: portrait aspect ratio (3:4), full-bleed image, gradient overlay (bottom-heavy dark)
  - On hover: image zooms 1.06, card lifts, "Shop Now" text fades in at bottom
  - Categories: Home Decor / Candles / Kitchen & Dining / Textiles / Gifts

### 4.6 Shop Our Favourites
- Background: Cream Warm (`#f8f5f0`)
- Section title: "Shop Our Favourites"
- Subtitle: "Hand-picked pieces we think you'll love"
- 4-column product grid (3 on tablet, 2 on mobile)
- Product cards: white bg, rounded corners, shadow. Image (3:4 ratio), badge (Sale/New/Best Seller), hover reveals "Add to Cart" bar sliding up from bottom
- Price: if on sale show red sale price + struck-through original
- CTA: "View All Products" outline button centred below grid

### 4.7 Featured Banner
- Background: Blush gradient (`#ecddd8 → #e8d5d0 → #dfd0cc`) with two decorative soft circles
- 2-column layout (stacks on mobile)
- Left content:
  - Pill label badge: "New Season" (sage-dark text, sage-tinted bg + border)
  - H2: "New Season," + italic "New Cosy" (Playfair Display 800)
  - Body text about latest arrivals
  - "Explore New In" sage button
- Right: product image, slightly rotated 1.5deg, straightens + scales on hover, box shadow

### 4.8 Newsletter
- Background: Sage gradient (`#9caf88 → #7a8f6a`)
- White text throughout
- Envelope icon in frosted circle (56px)
- H2: "Join Our Cosy Corner" (Playfair Display 800)
- Subtitle: "Be the first to know about new arrivals, exclusive offers, and little moments of wonder."
- Email input + "Subscribe" button in a single pill-shaped container (frosted glass look)
- Privacy note below: "No spam, ever. Unsubscribe any time." (small, 60% opacity)

### 4.9 Footer
- Background: Text Dark (`#3d3d35`)
- 4-column grid: Brand column (2fr) + Shop / Help / About columns (1fr each)
- Brand column: store name (white, uppercase) + description + social icons (Instagram, Pinterest, Facebook) in circular bordered buttons
- Link columns: white uppercase heading (letter-spacing 2px) + links (70% opacity, hover → 100% + sage-light)
- Bottom bar: copyright + "Designed with love for cosy homes." — both sides, small, 50% opacity
- Divider line between grid and bottom bar

---

## 5. Product Categories

| ID               | Name              | Description |
|------------------|-------------------|-------------|
| home-decor       | Home Decor        | Beautiful pieces to make your house feel like home |
| candles          | Candles           | Hand-poured scents to fill your home with warmth |
| kitchen-dining   | Kitchen & Dining  | Charming tableware for slow mornings and cosy suppers |
| textiles         | Textiles          | Soft throws, cushions, and linens in gentle tones |
| gifts            | Gifts             | Thoughtful finds for the ones you love |

---

## 6. Sample Products to Create

| Title | Category | Price | Notes |
|-------|----------|-------|-------|
| Hand-Poured Lavender Candle | Candles | £18.00 | Badge: Best Seller |
| Vintage Floral Teacup Set | Kitchen & Dining | £32.00 | Badge: New |
| Woven Seagrass Basket | Home Decor | £24.50 (was £30) | Badge: Sale |
| Linen Throw Pillow | Textiles | £28.00 | Badge: New |
| Dried Flower Bouquet | Home Decor | £22.00 | — |
| Artisan Ceramic Vase | Home Decor | £36.00 | Badge: New |
| Chunky Knit Throw Blanket | Textiles | £58.00 | — |
| Soy Wax Candle Trio | Candles | £42.00 (was £48) | Badge: Sale |
| Handmade Beeswax Candle | Candles | £16.00 | Badge: New |
| Rustic Wooden Serving Board | Kitchen & Dining | £38.00 | — |
| Embroidered Cotton Napkins | Textiles | £19.50 | Badge: New |
| Botanical Wall Art Print | Home Decor | £26.00 | — |
| Scented Reed Diffuser | Candles | £21.00 | Badge: New |
| Vintage Brass Picture Frame | Home Decor | £29.00 | — |
| Handwoven Table Runner | Textiles | £34.00 | Badge: New |
| Ceramic Storage Jars Set | Kitchen & Dining | £45.00 (was £52) | Badge: Sale |

---

## 7. Navigation Structure

**Main Menu:**
- Home → /
- Shop → /collections/all
  - Home Decor → /collections/home-decor
  - Candles → /collections/candles
  - Kitchen & Dining → /collections/kitchen-dining
  - Textiles → /collections/textiles
  - Gifts → /collections/gifts
- New In → /collections/new-in
- Collections → /collections
- About → /pages/about
- Contact → /pages/contact

**Footer Menus:**
- Footer Shop: All Products, New In, Collections, Gifts
- Footer Help: Contact Us, Shipping & Returns, FAQ, Privacy Policy
- Footer About: Our Story, Sustainability, Stockists

---

## 8. Pages to Create

### About Page
**Title:** Our Story  
**Content:** Tell the story of a small, passionate homeware shop. Mention: started as a love of finding beautiful things for the home, sustainability values, eco packaging, handpicked items, personal touch in every order. Warm and personal tone.

### Contact Page
**Title:** Get in Touch  
**Content:** Friendly contact form + email address. Mention response time of 1–2 business days. Warm sign-off.

---

## 9. Shopify Settings to Configure

- **Currency:** GBP (£)
- **Theme fonts:** Cormorant Garamond (body + headings), Playfair Display (hero + section titles)
- **Primary colour:** `#9caf88` (Sage)
- **Background colour:** `#fdfbf7` (Cream)
- **Button style:** Pill (border-radius: 40px), uppercase, letter-spacing 2px
- **Favicon:** Upload the logo.png cropped to square
- **Social links:** Add Instagram, Pinterest, Facebook URLs in theme settings

---

## 10. Shopify AI Prompt Templates

### Prompt A — Create the store from scratch
```
Create a Shopify store called "The Cosy Cairn" with the tagline "For homes full of light & wonder". It sells artisan homeware: candles, home decor, textiles, kitchen & dining items, and gifts. The brand is warm, cosy, and intimate — think cottagecore meets Scandinavian calm.

Colour palette: sage green (#9caf88), cream (#fdfbf7), warm cream (#f8f5f0), dusty blush (#e8d5d0), beige (#e5ddd3), text dark (#3d3d35).
Fonts: Playfair Display for headings (800 weight, italic), Cormorant Garamond for body (300–600 weight, italic).

Homepage sections needed:
1. Sage announcement bar with 4 trust messages
2. Sticky cream header with logo, nav, cart icon, animated hamburger
3. Full-width hero with large Playfair Display title, two CTA buttons, scroll hint
4. 4 trust badge icons in a row
5. 5-column shop by category grid (cards with hover zoom)
6. 4-column featured products grid (cards with slide-up add-to-cart)
7. Split featured banner with blush gradient background
8. Sage gradient newsletter signup section
9. Dark footer with 4 columns and social icons

Use natural, poetic language throughout. The tone is warm and personal.
```

### Prompt B — Style an existing theme
```
Restyle my Shopify theme to match The Cosy Cairn brand:
- Primary colour: sage green #9caf88
- Background: warm cream #fdfbf7
- Accent: dusty blush #e8d5d0
- Heading font: Playfair Display, weight 800, with italic styling
- Body font: Cormorant Garamond, weight 400
- Buttons: pill-shaped (border-radius 40px), uppercase, letter-spacing 2px
- All borders and dividers: beige (#e5ddd3)
- Hover effects: soft lift (translateY -4px) with increased shadow
- Section padding: generous (80–96px vertical)
- Cards: white background, rounded corners (12px), soft shadows
- The overall feel should be: warm, artisan, cottagecore, cosy — never stark or clinical.
```

### Prompt C — Add specific sections
```
Add the following sections to my Cosy Cairn Shopify homepage:

HERO: Full-width background image. Overlay gradient (dark top-left and bottom-right, lighter centre). Centred content with: eyebrow text "Welcome to" flanked by thin lines, large Playfair Display heading "The Cosy / Cairn" (second word italic in sage colour), ornament divider, italic tagline, two pill buttons side by side ("Shop Now" solid sage, "Explore Collections" ghost white), animated scroll hint at bottom.

TRUST BADGES: 4 columns, each with a circular icon (48px, cream background), bold small-caps title, italic description. Dividers between columns. Hover background changes to cream-warm.

NEWSLETTER: Sage green gradient background. Envelope icon in frosted circle. Playfair Display heading. Email input and button combined in single pill container with frosted glass border. Privacy note in small faded text below.
```

### Prompt D — Product descriptions
```
Write product descriptions for The Cosy Cairn in the brand voice: warm, poetic, intimate. 2–3 short paragraphs each. Use sensory language. Mention texture, scent, or visual quality. Sign off with why it makes a lovely gift or a treat for yourself. Examples of brand words: cosy, wonder, warmth, gentle, lovingly, soft, home, wonder, slow morning, quiet evening.

Products to write for:
- Hand-Poured Lavender Candle (£18)
- Woven Seagrass Basket (£24.50)
- Linen Throw Pillow (£28)
- Artisan Ceramic Vase (£36)
- Chunky Knit Throw Blanket (£58)
```

---

## 11. File Structure (Custom Theme — ready to upload)

If uploading the custom `.zip` theme directly:

```
cosy-cairn-theme.zip
├── assets/
│   ├── base.css          ← All styles (exact replica)
│   ├── theme.css         ← Empty placeholder
│   └── theme.js          ← Cart + mobile menu + animations
├── config/
│   ├── settings_schema.json
│   └── settings_data.json
├── layout/
│   └── theme.liquid      ← Base HTML wrapper
├── locales/
│   └── en.default.json
├── sections/
│   ├── announcement-bar.liquid
│   ├── header.liquid
│   ├── hero.liquid
│   ├── trust-badges.liquid
│   ├── featured-categories.liquid
│   ├── featured-products.liquid
│   ├── featured-banner.liquid
│   ├── newsletter.liquid
│   ├── footer.liquid
│   ├── product-main.liquid
│   ├── collection-main.liquid
│   ├── cart-main.liquid
│   ├── page-main.liquid
│   ├── search-main.liquid
│   └── not-found.liquid
├── snippets/
│   └── product-card.liquid
└── templates/
    ├── index.json
    ├── product.json
    ├── collection.json
    ├── cart.json
    ├── page.json
    ├── search.json
    └── 404.json
```

**Upload instructions:**
1. Zip the `shopify-theme` folder (contents only, not the folder itself — see step 3)
2. In Shopify Admin → Online Store → Themes → Add theme → Upload zip file
3. Upload `cosy-cairn-theme.zip`
4. Click **Customise** to add your logo image and hero background image
5. Go to **Theme settings** → add your social media URLs
6. Create your navigation menus (main-menu, footer-shop, footer-help, footer-about) in **Navigation**
7. Upload your products and assign them to collections

---

*Document generated for The Cosy Cairn · cosycairn.com*
