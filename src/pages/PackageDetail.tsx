import { Link, useParams, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronRight, Check } from "lucide-react";
import { getPackage, packages } from "@/data/packages";

const sections = [
  "3D Design & Visualisation",
  "Modular Kitchen",
  "Wardrobes in All Bedrooms",
  "False Ceiling",
  "Premium Flooring",
  "Branded Fittings",
  "10 Year Warranty",
];

const PackageDetail = () => {
  const { slug } = useParams();
  const pkg = getPackage(slug || "");
  if (!pkg) return <Navigate to="/packages" />;

  return (
    <div className="container-pad py-10">
      <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Home</Link><ChevronRight className="h-3 w-3" />
        <Link to="/packages" className="hover:text-foreground">Packages</Link><ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{pkg.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10 mb-10">
        <div>
          <h1 className="font-display text-4xl font-bold mb-2">{pkg.name}</h1>
          <div className="text-2xl text-primary font-semibold mb-6">{pkg.startingPrice}* Onwards</div>
          <p className="text-muted-foreground mb-6">{pkg.tagline}. Premium designs with elegant finishes, expert project management, and complete handover support.</p>
          <ul className="space-y-2 mb-6">
            {pkg.features.map(f => (
              <li key={f} className="flex items-center gap-2 text-sm">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-primary/10 text-primary"><Check className="h-3 w-3" /></span>
                {f}
              </li>
            ))}
          </ul>
          <Button size="lg" asChild><Link to={`/quote?package=${pkg.slug}`}>Request a Quote</Link></Button>
        </div>
        <img src={pkg.image} alt={pkg.name} className="rounded-2xl shadow-card object-cover w-full aspect-[4/3]" />
      </div>

      <h2 className="font-display text-2xl font-bold mb-4">What's Included</h2>
      <Accordion type="single" collapsible className="bg-card border border-border rounded-2xl px-6">
        {sections.map((s, i) => (
          <AccordionItem key={s} value={`item-${i}`}>
            <AccordionTrigger className="font-semibold">{s}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Get a complete 3D preview of your home before execution. Our experts work closely with you to refine every detail — materials, finishes, lighting and layout.
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-10">
        <h3 className="font-display text-xl font-bold mb-4">Other Packages</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {packages.filter(p => p.slug !== pkg.slug).map(p => (
            <Link key={p.slug} to={`/packages/${p.slug}`} className="block group">
              <div className="aspect-[4/3] rounded-xl overflow-hidden mb-2">
                <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="font-semibold text-sm">{p.name}</div>
              <div className="text-xs text-primary">{p.startingPrice}*</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackageDetail;
