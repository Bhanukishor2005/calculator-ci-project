import { Star } from "lucide-react";

const items = [
  { name: "Rohit Sharma", role: "Pune", quote: "BuildCraft transformed our house into a dream home. Excellent team and quality work, exceeded expectations.", rating: 5 },
  { name: "Reha Patil", role: "Mumbai", quote: "Professional, creative and very cooperative team. Highly recommended!", rating: 5 },
  { name: "Sahil Verma", role: "Bangalore", quote: "On-time delivery and amazing design. Very happy with the final outcome.", rating: 5 },
  { name: "Sneha Iyer", role: "Hyderabad", quote: "Smooth experience from start to finish. Loved the result and overall journey.", rating: 5 },
  { name: "Rahul Verma", role: "Pune", quote: "The 3D visuals were spot on. Final delivery matched perfectly.", rating: 5 },
  { name: "Priya Nair", role: "Mumbai", quote: "Best decision was hiring BuildCraft for our 3BHK interior.", rating: 5 },
];

const Testimonials = () => (
  <div>
    <section className="bg-muted py-16">
      <div className="container-pad">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">What Our Clients Say</h1>
        <p className="text-muted-foreground max-w-2xl">Real stories from real homeowners who trusted BuildCraft.</p>
      </div>
    </section>

    <section className="container-pad py-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((t, i) => (
        <div key={i} className="bg-card border border-border rounded-2xl p-6 shadow-soft">
          <div className="flex gap-0.5 mb-3">
            {Array.from({ length: t.rating }).map((_, k) => (
              <Star key={k} className="h-4 w-4 fill-accent text-accent" />
            ))}
          </div>
          <p className="text-sm text-muted-foreground italic mb-5">"{t.quote}"</p>
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary font-semibold">{t.name[0]}</div>
            <div>
              <div className="font-semibold text-sm">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.role}</div>
            </div>
          </div>
        </div>
      ))}
    </section>
  </div>
);

export default Testimonials;
