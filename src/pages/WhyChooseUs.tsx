import { Award, Clock, Heart, Shield, Sparkles, Users } from "lucide-react";

const items = [
  { icon: Users, title: "Experienced Team", text: "Skilled designers & professionals." },
  { icon: Shield, title: "Quality Materials", text: "We use only the best quality." },
  { icon: Clock, title: "Timely Delivery", text: "On-time project completion." },
  { icon: Sparkles, title: "Transparent Pricing", text: "No hidden charges." },
  { icon: Heart, title: "Customer Satisfaction", text: "Our client's happiness is our priority." },
  { icon: Award, title: "Award-Winning Design", text: "Multiple industry recognitions." },
];

const WhyChooseUs = () => (
  <div>
    <section className="bg-muted py-16">
      <div className="container-pad">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">Why Choose BuildCraft</h1>
        <p className="text-muted-foreground max-w-2xl">Six reasons why families trust us to design their dream home.</p>
      </div>
    </section>

    <section className="container-pad py-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(i => (
        <div key={i.title} className="bg-card border border-border rounded-2xl p-6 shadow-soft hover:shadow-card transition-shadow">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary mb-4">
            <i.icon className="h-5 w-5" />
          </div>
          <h3 className="font-display text-xl font-bold mb-2">{i.title}</h3>
          <p className="text-sm text-muted-foreground">{i.text}</p>
        </div>
      ))}
    </section>
  </div>
);

export default WhyChooseUs;
