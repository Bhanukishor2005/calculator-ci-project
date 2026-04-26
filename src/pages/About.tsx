import { Award, Eye, Heart, Target, Users } from "lucide-react";
import hero from "@/assets/hero-living.jpg";

const About = () => (
  <div>
    <section className="bg-muted py-16">
      <div className="container-pad">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">About BuildCraft</h1>
        <p className="text-muted-foreground max-w-2xl">A decade of crafting beautiful, functional homes for families across India.</p>
      </div>
    </section>

    <section className="container-pad py-16 grid md:grid-cols-2 gap-10 items-center">
      <img src={hero} alt="Our work" className="rounded-2xl shadow-card aspect-[4/3] object-cover" loading="lazy" />
      <div>
        <h2 className="font-display text-3xl font-bold mb-4">Designing homes, building stories.</h2>
        <p className="text-muted-foreground mb-4">
          BuildCraft was founded with a simple belief: every family deserves a beautifully designed home tailored to their lifestyle. From modular kitchens to full turnkey interiors, we deliver craftsmanship without compromise.
        </p>
        <p className="text-muted-foreground">
          With over 500+ delivered projects, we combine modern design sensibilities with proven engineering to bring your vision to life — on time, on budget, and beyond expectation.
        </p>
      </div>
    </section>

    <section className="container-pad pb-16 grid md:grid-cols-3 gap-6">
      {[
        { icon: Target, title: "Our Mission", text: "Make premium interior design accessible, transparent, and stress-free." },
        { icon: Eye, title: "Our Vision", text: "Become India's most trusted name in interior design and home transformation." },
        { icon: Heart, title: "Our Values", text: "Quality, transparency, customer-first, and design that lasts a lifetime." },
      ].map(c => (
        <div key={c.title} className="bg-card border border-border rounded-2xl p-6 shadow-soft">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary mb-4"><c.icon className="h-5 w-5" /></div>
          <h3 className="font-display text-xl font-bold mb-2">{c.title}</h3>
          <p className="text-sm text-muted-foreground">{c.text}</p>
        </div>
      ))}
    </section>

    <section className="container-pad pb-20">
      <div className="bg-secondary text-secondary-foreground rounded-2xl p-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {[["10+","Years"],["500+","Projects"],["50+","Designers"],["100%","Satisfaction"]].map(([v,l])=>(
          <div key={l}>
            <div className="font-display text-3xl md:text-4xl font-bold">{v}</div>
            <div className="text-sm text-secondary-foreground/70">{l}</div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default About;
