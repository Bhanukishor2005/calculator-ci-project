import { useState } from "react";
import hero from "@/assets/hero-living.jpg";
import bath from "@/assets/gallery-bathroom.jpg";
import office from "@/assets/gallery-office.jpg";
import e1 from "@/assets/pkg-essential.jpg";
import e2 from "@/assets/pkg-smart.jpg";
import e3 from "@/assets/pkg-premium.jpg";
import e4 from "@/assets/pkg-luxury.jpg";
import e5 from "@/assets/pkg-elite.jpg";

type Item = { src: string; cat: string; title: string };

const items: Item[] = [
  { src: hero, cat: "Living Room", title: "Modern Open Living" },
  { src: e2, cat: "Living Room", title: "Smart Comfort Lounge" },
  { src: e1, cat: "Bedroom", title: "Wardrobe Wall" },
  { src: e4, cat: "Bedroom", title: "Luxury Master Suite" },
  { src: e3, cat: "Kitchen", title: "Marble Island Kitchen" },
  { src: e5, cat: "Living Room", title: "Elite Hall" },
  { src: bath, cat: "Bathroom", title: "Marble Bath" },
  { src: office, cat: "Commercial", title: "Workspace" },
  { src: hero, cat: "Living Room", title: "Sunlit Lounge" },
  { src: e3, cat: "Kitchen", title: "Modular Kitchen" },
  { src: bath, cat: "Bathroom", title: "Spa Bath" },
  { src: office, cat: "Commercial", title: "Studio" },
];

const cats = ["All", "Living Room", "Bedroom", "Kitchen", "Bathroom", "Commercial"];

const Gallery = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? items : items.filter(i => i.cat === active);
  return (
    <div className="container-pad py-10">
      <h1 className="font-display text-4xl font-bold mb-2">Photo & Video Gallery</h1>
      <p className="text-muted-foreground mb-6">Explore our completed projects across categories.</p>

      <div className="flex flex-wrap gap-2 mb-8">
        {cats.map(c => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              active === c ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-border"
            }`}
          >
            {c} <span className="opacity-60 ml-1">{c === "All" ? items.length : items.filter(i => i.cat === c).length}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((item, i) => (
          <div key={i} className="group overflow-hidden rounded-xl bg-card shadow-soft">
            <div className="aspect-square overflow-hidden">
              <img src={item.src} alt={item.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-3">
              <div className="text-xs text-primary font-semibold mb-0.5">{item.cat}</div>
              <div className="font-medium text-sm">{item.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
