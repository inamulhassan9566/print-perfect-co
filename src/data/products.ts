export interface Product {
  id: string;
  name: string;
  price: number;
  type: "basic" | "premium" | "oversized";
  colors: string[];
  image: string;
  description: string;
  material: string;
  care: string;
}

export const products: Product[] = [
  {
    id: "classic-white",
    name: "Classic White Tee",
    price: 24.99,
    type: "basic",
    colors: ["White", "Black", "Gray"],
    image: "/placeholder.svg",
    description: "A timeless essential. Our Classic White Tee is crafted from ultra-soft ring-spun cotton for everyday comfort and a clean canvas for any design.",
    material: "100% Ring-Spun Combed Cotton, 180 GSM",
    care: "Machine wash cold, tumble dry low. Do not bleach.",
  },
  {
    id: "midnight-black",
    name: "Midnight Black Tee",
    price: 24.99,
    type: "basic",
    colors: ["Black"],
    image: "/placeholder.svg",
    description: "Sleek, versatile, and endlessly stylish. The Midnight Black Tee pairs with everything and prints beautifully with bold, vibrant designs.",
    material: "100% Ring-Spun Combed Cotton, 180 GSM",
    care: "Machine wash cold inside out, tumble dry low.",
  },
  {
    id: "heather-gray",
    name: "Heather Gray Tee",
    price: 26.99,
    type: "basic",
    colors: ["Gray"],
    image: "/placeholder.svg",
    description: "The perfect middle ground. Our Heather Gray Tee offers a soft, muted backdrop that makes colorful prints pop.",
    material: "60% Cotton, 40% Polyester Blend, 180 GSM",
    care: "Machine wash cold, tumble dry low.",
  },
  {
    id: "premium-navy",
    name: "Premium Navy Tee",
    price: 32.99,
    type: "premium",
    colors: ["Navy"],
    image: "/placeholder.svg",
    description: "Elevated basics. The Premium Navy Tee features a denser weave and reinforced stitching for a polished, long-lasting fit.",
    material: "100% Organic Pima Cotton, 220 GSM",
    care: "Machine wash cold, hang dry recommended.",
  },
  {
    id: "premium-forest",
    name: "Premium Forest Green Tee",
    price: 32.99,
    type: "premium",
    colors: ["Green"],
    image: "/placeholder.svg",
    description: "Nature-inspired and luxuriously soft. This premium tee in deep forest green is perfect for earthy, organic design aesthetics.",
    material: "100% Organic Pima Cotton, 220 GSM",
    care: "Machine wash cold, hang dry recommended.",
  },
  {
    id: "premium-burgundy",
    name: "Premium Burgundy Tee",
    price: 34.99,
    type: "premium",
    colors: ["Red"],
    image: "/placeholder.svg",
    description: "Rich and refined. The Burgundy Premium Tee adds a touch of sophistication to custom prints and branded apparel.",
    material: "100% Organic Pima Cotton, 220 GSM",
    care: "Machine wash cold, hang dry recommended.",
  },
  {
    id: "oversized-cloud",
    name: "Oversized Cloud White Tee",
    price: 36.99,
    type: "oversized",
    colors: ["White", "Black"],
    image: "/placeholder.svg",
    description: "Relaxed, street-ready, and ultra-comfortable. The Oversized Cloud White is a modern staple with a dropped shoulder and boxy fit.",
    material: "100% Heavyweight Cotton, 240 GSM",
    care: "Machine wash cold, tumble dry low. Do not iron print.",
  },
  {
    id: "oversized-charcoal",
    name: "Oversized Charcoal Tee",
    price: 36.99,
    type: "oversized",
    colors: ["Black", "Gray"],
    image: "/placeholder.svg",
    description: "Dark, bold, and effortlessly cool. This oversized charcoal tee is built for statement prints and all-day wearability.",
    material: "100% Heavyweight Cotton, 240 GSM",
    care: "Machine wash cold inside out, tumble dry low.",
  },
  {
    id: "oversized-sand",
    name: "Oversized Sand Tee",
    price: 38.99,
    type: "oversized",
    colors: ["White"],
    image: "/placeholder.svg",
    description: "Warm, neutral, and on-trend. The Sand Oversized Tee brings a vintage aesthetic with modern construction and a generous fit.",
    material: "100% Heavyweight Washed Cotton, 240 GSM",
    care: "Machine wash cold, hang dry recommended.",
  },
];
