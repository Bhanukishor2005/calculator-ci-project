import { Link } from "react-router-dom";
import { packages } from "@/data/packages";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

const Compare = () => {
  const rows = packages[0].includes;
  return (
    <div className="container-pad py-10">
      <h1 className="font-display text-4xl font-bold mb-2">Compare Packages</h1>
      <p className="text-muted-foreground mb-8">Compare our packages and choose the one that fits your needs and budget.</p>

      <div className="overflow-x-auto rounded-2xl border border-border shadow-soft">
        <table className="w-full text-sm bg-card">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-4 font-semibold">Feature / Package</th>
              {packages.map(p => (
                <th key={p.slug} className="p-4 font-semibold whitespace-nowrap">{p.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.label} className={i % 2 ? "bg-muted/30" : ""}>
                <td className="p-4 font-medium">{r.label}</td>
                {(["essential","smart","premium","luxury","elite"] as const).map(k => (
                  <td key={k} className="p-4 text-center">
                    {r[k] ? <Check className="inline h-4 w-4 text-primary" /> : <X className="inline h-4 w-4 text-muted-foreground/40" />}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="bg-secondary/5">
              <td className="p-4 font-semibold">Price (Starting)</td>
              {packages.map(p => (
                <td key={p.slug} className="p-4 text-center font-semibold text-primary">{p.startingPrice}*</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-center mt-8">
        <Button asChild size="lg"><Link to="/quote">Request a Quote</Link></Button>
      </div>
    </div>
  );
};

export default Compare;
