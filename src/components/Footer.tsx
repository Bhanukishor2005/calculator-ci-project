import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter, Phone, Mail, MapPin } from "lucide-react";

export const Footer = () => (
  <footer className="bg-secondary text-secondary-foreground mt-20">
    <div className="container-pad py-14 grid gap-10 md:grid-cols-4">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary to-primary-glow text-primary-foreground font-display font-bold">B</div>
          <div className="font-display text-lg font-bold">BuildCraft</div>
        </div>
        <p className="text-sm text-secondary-foreground/70 mb-4">
          We provide end-to-end interior solutions with quality, creativity and trust.
        </p>
        <div className="flex gap-3">
          {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
            <a key={i} href="#" aria-label="Social link" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-primary transition-colors">
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-4">Quick Links</h4>
        <ul className="space-y-2 text-sm text-secondary-foreground/70">
          {[["Home","/"],["About Us","/about"],["Packages","/packages"],["Why Choose Us","/why-choose-us"],["Gallery","/gallery"],["Testimonials","/testimonials"],["Careers","/careers"],["Contact Us","/contact"]].map(([l,h]) => (
            <li key={h}><Link to={h} className="hover:text-accent transition-colors">{l}</Link></li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold mb-4">Our Services</h4>
        <ul className="space-y-2 text-sm text-secondary-foreground/70">
          <li>Residential Interiors</li>
          <li>Commercial Interiors</li>
          <li>Modular Kitchen</li>
          <li>Wardrobes</li>
          <li>Turnkey Projects</li>
          <li>Renovation</li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold mb-4">Contact Us</h4>
        <ul className="space-y-3 text-sm text-secondary-foreground/70">
          <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5 text-accent" /> +91 12345 67890</li>
          <li className="flex items-start gap-2"><Mail className="h-4 w-4 mt-0.5 text-accent" /> info@buildcraft.com</li>
          <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-accent" /> Pune, Maharashtra, India</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-white/10">
      <div className="container-pad py-5 text-xs text-secondary-foreground/60 flex flex-col sm:flex-row justify-between gap-2">
        <p>© {new Date().getFullYear()} BuildCraft. All Rights Reserved.</p>
        <div className="flex gap-4">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
          <Link to="/admin">Admin</Link>
        </div>
      </div>
    </div>
  </footer>
);
