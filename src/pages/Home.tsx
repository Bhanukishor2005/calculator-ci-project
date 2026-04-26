import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Clock, Shield, Sparkles, Wrench, Hammer, IndianRupee } from "lucide-react";
import { packages } from "@/data/packages";
import hero from "@/assets/hero-living.jpg";
import bath from "@/assets/gallery-bathroom.jpg";
import office from "@/assets/gallery-office.jpg";

const stats = [
  { icon: Award, value: "10+", label: "Years Experience" },
  { icon: Hammer, value: "500+", label: "Projects Completed" },
  { icon: Sparkles, value: "100%", label: "Customer Satisfaction" },
  { icon: Wrench, value: "50+", label: "Expert Designers" },
];

const features = [
  { icon: Hammer, title: "End-to-End Solutions", desc: "From design to handover" },
  { icon: Clock, title: "On-Time Delivery", desc: "We value your time" },
  { icon: Shield, title: "Quality Assurance", desc: "Premium quality materials" },
  { icon: Sparkles, title: "Customised Designs", desc: "Tailored to your lifestyle" },
  { icon: IndianRupee, title: "Transparent Pricing", desc: "No hidden costs, ever" },
];

const partners = ["Godrej", "Lodha", "Prestige", "Sobha", "Brigade"];

const Home = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={hero} alt="" className="h-full w-full object-cover" width={1600} height={1024} />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/20" />
        </div>
        <div className="container-pad py-20 md:py-32 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6 animate-fade-in">
            <Sparkles className="h-3.5 w-3.5" /> Building Your Dreams
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] mb-6 animate-fade-up">
            Modern Spaces. <br />
            <span className="text-gradient-primary">Better Living.</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Turnkey interior solutions tailored to your style, budget and lifestyle. Built by India's most trusted designers.
          </p>
          <div className="flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <Button size="lg" asChild>
              <Link to="/packages">Explore Packages <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/quote">Request a Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container-pad -mt-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border">
          {stats.map(s => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display text-2xl font-bold">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section className="container-pad py-20">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Our Popular Packages</h2>
            <p className="text-muted-foreground max-w-xl">Choose from our expertly crafted interior packages designed to suit every need and budget.</p>
          </div>
          <Button variant="ghost" asChild><Link to="/compare">Compare Packages <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {packages.map(p => (
            <Link key={p.slug} to={`/packages/${p.slug}`} className="group block">
              <div className="relative overflow-hidden rounded-xl mb-3 aspect-[4/3]">
                <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="font-display font-semibold mb-1">{p.name}</h3>
              <p className="text-sm text-primary font-semibold mb-1">{p.startingPrice}*</p>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{p.tagline}</p>
              <span className="text-xs font-semibold text-primary inline-flex items-center gap-1">View Details <ArrowRight className="h-3 w-3" /></span>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container-pad pb-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-muted rounded-2xl p-6 md:p-8">
          {features.map(f => (
            <div key={f.title} className="flex items-start gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-card text-primary shrink-0">
                <f.icon className="h-4 w-4" />
              </div>
              <div>
                <div className="font-semibold text-sm mb-1">{f.title}</div>
                <div className="text-xs text-muted-foreground">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery preview */}
      <section className="container-pad pb-20">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-8">Photo & Video Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[hero, bath, office, hero, bath].slice(0,5).map((img, i) => (
            <div key={i} className={`relative overflow-hidden rounded-xl group ${i === 0 ? 'col-span-2 row-span-2 aspect-square md:aspect-auto' : 'aspect-square'}`}>
              <img src={img} alt="Gallery" loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Button variant="outline" asChild><Link to="/gallery">View Full Gallery <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
        </div>
      </section>

      {/* Partners */}
      <section className="bg-muted">
        <div className="container-pad py-12 text-center">
          <p className="text-sm font-semibold text-muted-foreground mb-6">Trusted by Leading Partners</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14">
            {partners.map(p => (
              <div key={p} className="font-display text-xl md:text-2xl font-bold text-foreground/40 hover:text-foreground transition-colors">
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-pad py-16">
        <div className="rounded-2xl bg-gradient-to-br from-secondary to-secondary/90 text-secondary-foreground p-10 md:p-14 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Start Your Dream Project Today!</h2>
          <p className="text-secondary-foreground/70 mb-6">Let's create a space you'll love to live in.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg"><Link to="/quote">Request a Quote</Link></Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white/30 text-secondary-foreground hover:bg-white/10 hover:text-secondary-foreground">
              <Link to="/contact">Talk to Expert</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
