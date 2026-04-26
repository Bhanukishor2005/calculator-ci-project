import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { CheckCircle2 } from "lucide-react";
import { packages } from "@/data/packages";

const schema = z.object({
  full_name: z.string().trim().min(2, "Name too short").max(100),
  phone: z.string().trim().min(7, "Invalid phone").max(20),
  email: z.string().trim().email("Invalid email").max(255).optional().or(z.literal("")),
  society_name: z.string().trim().max(150).optional(),
  location: z.string().trim().max(150).optional(),
  flat_size: z.string().trim().max(50).optional(),
  property_type: z.string().trim().max(50).optional(),
  package: z.string().trim().max(80).optional(),
  budget_range: z.string().trim().max(50).optional(),
  rooms: z.string().trim().max(20).optional(),
  bathrooms: z.string().trim().max(20).optional(),
  notes: z.string().trim().max(1000).optional(),
});

const Quote = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    full_name: "", phone: "", email: "",
    society_name: "", location: "", flat_size: "", property_type: "",
    package: params.get("package") || "", budget_range: "",
    rooms: "", bathrooms: "", notes: "",
  });

  const set = (k: keyof typeof form) => (v: string) => setForm(s => ({ ...s, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast({ title: "Check your input", description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setLoading(true);
    const payload = { ...parsed.data, full_name: parsed.data.full_name, phone: parsed.data.phone };
    const { error } = await supabase.from("leads").insert([payload]);
    setLoading(false);
    if (error) {
      toast({ title: "Submission failed", description: error.message, variant: "destructive" });
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container-pad py-20 text-center">
        <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="font-display text-3xl font-bold mb-3">Thank You!</h1>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">Your quote request has been received. Our team will contact you within 24 hours.</p>
        <Button onClick={() => navigate("/")}>Back to Home</Button>
      </div>
    );
  }

  return (
    <div className="container-pad py-10 max-w-3xl">
      <h1 className="font-display text-4xl font-bold mb-2">Request a Quote</h1>
      <p className="text-muted-foreground mb-8">Fill in your details and our team will get back to you.</p>

      <form onSubmit={onSubmit} className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-soft grid sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="full_name">Full Name *</Label>
          <Input id="full_name" required value={form.full_name} onChange={e => set("full_name")(e.target.value)} placeholder="Your name" />
        </div>
        <div>
          <Label htmlFor="phone">Phone *</Label>
          <Input id="phone" required value={form.phone} onChange={e => set("phone")(e.target.value)} placeholder="+91 ..." />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={form.email} onChange={e => set("email")(e.target.value)} placeholder="you@email.com" />
        </div>
        <div>
          <Label htmlFor="society_name">Society Name</Label>
          <Input id="society_name" value={form.society_name} onChange={e => set("society_name")(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input id="location" value={form.location} onChange={e => set("location")(e.target.value)} placeholder="City / Area" />
        </div>
        <div>
          <Label htmlFor="flat_size">Flat Size (Sq.Ft.)</Label>
          <Input id="flat_size" value={form.flat_size} onChange={e => set("flat_size")(e.target.value)} placeholder="e.g. 1200" />
        </div>
        <div>
          <Label>Type of Property</Label>
          <Select value={form.property_type} onValueChange={set("property_type")}>
            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
            <SelectContent>
              {["1BHK","2BHK","3BHK","4BHK","Villa","Commercial"].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Select Package</Label>
          <Select value={form.package} onValueChange={set("package")}>
            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
            <SelectContent>
              {packages.map(p => <SelectItem key={p.slug} value={p.name}>{p.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Budget Range</Label>
          <Select value={form.budget_range} onValueChange={set("budget_range")}>
            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
            <SelectContent>
              {["Under ₹5L","₹5L - ₹10L","₹10L - ₹15L","₹15L - ₹25L","Above ₹25L"].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>No. of Bedrooms</Label>
          <Select value={form.rooms} onValueChange={set("rooms")}>
            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
            <SelectContent>
              {["1","2","3","4","5+"].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>No. of Bathrooms</Label>
          <Select value={form.bathrooms} onValueChange={set("bathrooms")}>
            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
            <SelectContent>
              {["1","2","3","4","5+"].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea id="notes" rows={4} value={form.notes} onChange={e => set("notes")(e.target.value)} placeholder="Tell us about your project..." />
        </div>
        <div className="sm:col-span-2">
          <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto">
            {loading ? "Submitting..." : "Submit Request"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Quote;
