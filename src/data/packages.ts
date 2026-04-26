import essential from "@/assets/pkg-essential.jpg";
import smart from "@/assets/pkg-smart.jpg";
import premium from "@/assets/pkg-premium.jpg";
import luxury from "@/assets/pkg-luxury.jpg";
import elite from "@/assets/pkg-elite.jpg";

export type Package = {
  slug: string;
  name: string;
  tagline: string;
  startingPrice: string;
  image: string;
  features: string[];
  includes: { label: string; essential: boolean; smart: boolean; premium: boolean; luxury: boolean; elite: boolean }[];
};

export const packages: Package[] = [
  {
    slug: "essential-lite",
    name: "Essential Lite",
    tagline: "Basic interior for a comfortable start",
    startingPrice: "₹4.5L",
    image: essential,
    features: ["Modular Kitchen", "1 Wardrobe", "False Ceiling", "Basic Lighting", "5 Year Warranty"],
    includes: [],
  },
  {
    slug: "smart-comfort",
    name: "Smart Comfort",
    tagline: "Stylish & smart interiors for modern homes",
    startingPrice: "₹6.5L",
    image: smart,
    features: ["Modular Kitchen", "2 Wardrobes", "TV Unit", "False Ceiling", "Premium Lighting", "7 Year Warranty"],
    includes: [],
  },
  {
    slug: "premium-living",
    name: "Premium Living",
    tagline: "Premium designs with elegant finishes",
    startingPrice: "₹9.5L",
    image: premium,
    features: ["3D Design & Visualisation", "Modular Kitchen", "Wardrobes in All Bedrooms", "False Ceiling", "Premium Flooring", "Branded Fittings", "10 Year Warranty"],
    includes: [],
  },
  {
    slug: "luxury-plus",
    name: "Luxury Plus",
    tagline: "Luxury interiors with customised touches",
    startingPrice: "₹13.5L",
    image: luxury,
    features: ["Custom 3D Design", "Italian Modular Kitchen", "Walk-in Wardrobes", "Designer False Ceiling", "Imported Flooring", "Smart Lighting", "10 Year Warranty"],
    includes: [],
  },
  {
    slug: "elite-spaces",
    name: "Elite Spaces",
    tagline: "Exclusivity, elegance & timeless designs",
    startingPrice: "₹18.5L",
    image: elite,
    features: ["Bespoke Architectural Design", "Top-Tier Italian Kitchen", "Premium Walk-in Wardrobes", "Imported Marble & Veneer", "Home Automation", "Concierge Project Manager", "Lifetime Warranty"],
    includes: [],
  },
];

const featureMatrix = [
  { label: "Design Consultation", v: [true, true, true, true, true] },
  { label: "Space Planning", v: [true, true, true, true, true] },
  { label: "Modular Kitchen", v: [true, true, true, true, true] },
  { label: "Wardrobes", v: [true, true, true, true, true] },
  { label: "False Ceiling", v: [true, true, true, true, true] },
  { label: "Lighting", v: [true, true, true, true, true] },
  { label: "Premium Materials", v: [false, false, true, true, true] },
  { label: "3D Visualisation", v: [false, false, true, true, true] },
  { label: "Project Management", v: [false, true, true, true, true] },
  { label: "Warranty", v: [true, true, true, true, true] },
];

packages.forEach((p, idx) => {
  p.includes = featureMatrix.map(f => ({
    label: f.label,
    essential: idx === 0 ? f.v[0] : f.v[0],
    smart: f.v[1], premium: f.v[2], luxury: f.v[3], elite: f.v[4],
  }));
});

export const getPackage = (slug: string) => packages.find(p => p.slug === slug);
