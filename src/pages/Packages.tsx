import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { packages } from "@/data/packages";

const Packages = () => (
  <div>
    <section className="bg-muted py-16">
      <div className="container-pad flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">Interior Packages</h1>
          <p className="text-muted-foreground max-w-2xl">Pick the package that fits your home, lifestyle and budget — fully transparent pricing.</p>
        </div>
        <Button asChild variant="outline"><Link to="/compare">Compare All <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
      </div>
    </section>

    <section className="container-pad py-12">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map(p => (
          <div key={p.slug} className="bg-card border border-border rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-shadow group">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6">
              <h3 className="font-display text-xl font-bold mb-1">{p.name}</h3>
              <div className="text-primary font-semibold mb-3">{p.startingPrice}* Onwards</div>
              <p className="text-sm text-muted-foreground mb-4">{p.tagline}</p>
              <ul className="space-y-1.5 mb-5 text-sm">
                {p.features.slice(0,4).map(f => (
                  <li key={f} className="flex gap-2"><span className="text-primary">✓</span> {f}</li>
                ))}
              </ul>
              <Button asChild variant="outline" className="w-full"><Link to={`/packages/${p.slug}`}>View Details</Link></Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default Packages;
