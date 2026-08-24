/* The Cosy Cairn - Product Data */

const products = [
  {
    id: 1,
    title: "Hand-Poured Lavender Candle",
    category: "candles",
    collection: "candles",
    price: 18.00,
    originalPrice: null,
    image: "https://placehold.co/600x700/b8c9a9/ffffff?text=Lavender+Candle",
    badge: "Best Seller",
    isNew: false
  },
  {
    id: 2,
    title: "Vintage Floral Teacup Set",
    category: "kitchen-dining",
    collection: "kitchen-dining",
    price: 32.00,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&h=700&fit=crop",
    badge: null,
    isNew: true
  },
  {
    id: 3,
    title: "Woven Seagrass Basket",
    category: "home-decor",
    collection: "home-decor",
    price: 24.50,
    originalPrice: 30.00,
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=600&h=700&fit=crop",
    badge: "Sale",
    isNew: false
  },
  {
    id: 4,
    title: "Linen Throw Pillow",
    category: "textiles",
    collection: "textiles",
    price: 28.00,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&h=700&fit=crop",
    badge: null,
    isNew: true
  },
  {
    id: 5,
    title: "Dried Flower Bouquet",
    category: "home-decor",
    collection: "home-decor",
    price: 22.00,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&h=700&fit=crop",
    badge: null,
    isNew: false
  },
  {
    id: 6,
    title: "Artisan Ceramic Vase",
    category: "home-decor",
    collection: "home-decor",
    price: 36.00,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&h=700&fit=crop",
    badge: "New",
    isNew: true
  },
  {
    id: 7,
    title: "Chunky Knit Throw Blanket",
    category: "textiles",
    collection: "textiles",
    price: 58.00,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=700&fit=crop",
    badge: null,
    isNew: false
  },
  {
    id: 8,
    title: "Soy Wax Candle Trio",
    category: "candles",
    collection: "candles",
    price: 42.00,
    originalPrice: 48.00,
    image: "https://placehold.co/600x700/b8c9a9/ffffff?text=Candle+Trio",
    badge: "Sale",
    isNew: false
  },
  {
    id: 9,
    title: "Handmade Beeswax Candle",
    category: "candles",
    collection: "candles",
    price: 16.00,
    originalPrice: null,
    image: "https://placehold.co/600x700/d4c4a8/ffffff?text=Beeswax+Candle",
    badge: null,
    isNew: true
  },
  {
    id: 10,
    title: "Rustic Wooden Serving Board",
    category: "kitchen-dining",
    collection: "kitchen-dining",
    price: 38.00,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1594226801341-41427b4e5c22?w=600&h=700&fit=crop",
    badge: null,
    isNew: false
  },
  {
    id: 11,
    title: "Embroidered Cotton Napkins",
    category: "textiles",
    collection: "textiles",
    price: 19.50,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=600&h=700&fit=crop",
    badge: null,
    isNew: true
  },
  {
    id: 12,
    title: "Botanical Wall Art Print",
    category: "home-decor",
    collection: "home-decor",
    price: 26.00,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1533575770077-052fa2c809f6?w=600&h=700&fit=crop",
    badge: null,
    isNew: false
  },
  {
    id: 13,
    title: "Scented Reed Diffuser",
    category: "candles",
    collection: "candles",
    price: 21.00,
    originalPrice: null,
    image: "https://placehold.co/600x700/b8c9a9/ffffff?text=Reed+Diffuser",
    badge: null,
    isNew: true
  },
  {
    id: 14,
    title: "Vintage Brass Picture Frame",
    category: "home-decor",
    collection: "home-decor",
    price: 29.00,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&h=700&fit=crop",
    badge: null,
    isNew: false
  },
  {
    id: 15,
    title: "Handwoven Table Runner",
    category: "textiles",
    collection: "textiles",
    price: 34.00,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=700&fit=crop",
    badge: null,
    isNew: true
  },
  {
    id: 16,
    title: "Ceramic Storage Jars Set",
    category: "kitchen-dining",
    collection: "kitchen-dining",
    price: 45.00,
    originalPrice: 52.00,
    image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&h=700&fit=crop",
    badge: "Sale",
    isNew: false
  }
];

const categories = [
  {
    id: "home-decor",
    name: "Home Decor",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=700&fit=crop",
    description: "Beautiful pieces to make your house feel like home."
  },
  {
    id: "candles",
    name: "Candles",
    image: "https://placehold.co/600x700/b8c9a9/ffffff?text=Candles",
    description: "Hand-poured scents to fill your home with warmth."
  },
  {
    id: "kitchen-dining",
    name: "Kitchen & Dining",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=700&fit=crop",
    description: "Charming tableware for slow mornings and cosy suppers."
  },
  {
    id: "textiles",
    name: "Textiles",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&h=700&fit=crop",
    description: "Soft throws, cushions, and linens in gentle tones."
  },
  {
    id: "gifts",
    name: "Gifts",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&h=700&fit=crop",
    description: "Thoughtful finds for the ones you love."
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { products, categories };
}
