import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Contact = () => (
  <div>
    <section className="bg-muted py-16">
      <div className="container-pad">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">Get in Touch</h1>
        <p className="text-muted-foreground max-w-2xl">We'd love to hear from you. Reach out for a free consultation.</p>
      </div>
    </section>

    <section className="container-pad py-12 grid lg:grid-cols-3 gap-6">
      {[
        { icon: Phone, title: "Call Us", value: "+91 12345 67890", href: "tel:+911234567890" },
        { icon: Mail, title: "Email Us", value: "info@buildcraft.com", href: "mailto:info@buildcraft.com" },
        { icon: MapPin, title: "Visit Us", value: "Pune, Maharashtra, India" },
      ].map(c => (
        <a key={c.title} href={c.href || "#"} className="bg-card border border-border rounded-2xl p-6 shadow-soft hover:shadow-card transition-shadow block">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary mb-4"><c.icon className="h-5 w-5" /></div>
          <h3 className="font-display text-lg font-bold mb-1">{c.title}</h3>
          <p className="text-muted-foreground text-sm">{c.value}</p>
        </a>
      ))}
    </section>

    <section className="container-pad pb-16">
      <div className="rounded-2xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground p-10 md:p-14 text-center">
        <MessageCircle className="h-10 w-10 mx-auto mb-4" />
        <h2 className="font-display text-3xl font-bold mb-2">Ready to start your project?</h2>
        <p className="text-primary-foreground/80 mb-6">Fill out our quote form and we'll get back to you within 24 hours.</p>
        <Button asChild size="lg" variant="secondary"><Link to="/quote">Request a Quote</Link></Button>
      </div>
    </section>
  </div>
);

export default Contact;
