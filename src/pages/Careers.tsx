import { Briefcase, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const jobs = [
  { title: "Senior Interior Designer", dept: "Design", location: "Pune", type: "Full-time" },
  { title: "Project Manager", dept: "Operations", location: "Mumbai", type: "Full-time" },
  { title: "3D Visualiser", dept: "Design", location: "Remote", type: "Full-time" },
  { title: "Sales Executive", dept: "Sales", location: "Bangalore", type: "Full-time" },
  { title: "Site Supervisor", dept: "Operations", location: "Pune", type: "Full-time" },
];

const Careers = () => (
  <div>
    <section className="bg-gradient-to-br from-secondary to-secondary/90 text-secondary-foreground py-20">
      <div className="container-pad text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold mb-4">
          <Briefcase className="h-3.5 w-3.5" /> We're Hiring
        </div>
        <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">Build your career, design the future.</h1>
        <p className="text-secondary-foreground/80 max-w-2xl mx-auto">Join a passionate team of designers, engineers and craftsmen redefining Indian homes.</p>
      </div>
    </section>

    <section className="container-pad py-14">
      <h2 className="font-display text-2xl font-bold mb-6">Open Positions</h2>
      <div className="space-y-3">
        {jobs.map(j => (
          <div key={j.title} className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card border border-border rounded-xl p-5 hover:shadow-soft transition-shadow">
            <div>
              <h3 className="font-semibold text-lg">{j.title}</h3>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-1">
                <span>{j.dept}</span>
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {j.location}</span>
                <span>{j.type}</span>
              </div>
            </div>
            <Button asChild variant="outline"><a href="mailto:careers@buildcraft.com">Apply Now</a></Button>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-muted rounded-2xl p-8 text-center">
        <h3 className="font-display text-2xl font-bold mb-2">Don't see your role?</h3>
        <p className="text-muted-foreground mb-4">Send us your CV and we'll reach out when something opens up.</p>
        <Button asChild><a href="mailto:careers@buildcraft.com">careers@buildcraft.com</a></Button>
      </div>
    </section>
  </div>
);

export default Careers;
