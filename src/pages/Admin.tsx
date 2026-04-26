import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import * as XLSX from "xlsx";
import { Download, LogOut, Users, FileText, Image, ShieldAlert } from "lucide-react";

type Lead = {
  id: string; full_name: string; phone: string; email: string | null;
  society_name: string | null; location: string | null; flat_size: string | null;
  property_type: string | null; package: string | null; budget_range: string | null;
  rooms: string | null; bathrooms: string | null; notes: string | null;
  status: string; created_at: string;
};

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) { navigate("/auth"); return; }
      setUserEmail(sess.session.user.email || "");
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", sess.session.user.id);
      const admin = roles?.some(r => r.role === "admin") || false;
      setIsAdmin(admin);
      if (admin) {
        const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
        setLeads((data as Lead[]) || []);
      }
      setLoading(false);
    })();
  }, [navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const exportExcel = () => {
    const rows = leads.map(l => ({
      Date: new Date(l.created_at).toLocaleString(),
      Name: l.full_name, Phone: l.phone, Email: l.email || "",
      Society: l.society_name || "", Location: l.location || "",
      "Flat Size (Sq.Ft.)": l.flat_size || "", "Property Type": l.property_type || "",
      Package: l.package || "", Budget: l.budget_range || "",
      Bedrooms: l.rooms || "", Bathrooms: l.bathrooms || "",
      Notes: l.notes || "", Status: l.status,
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    ws["!cols"] = Object.keys(rows[0] || { a: "" }).map(() => ({ wch: 18 }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leads");
    XLSX.writeFile(wb, `BuildCraft-Leads-${new Date().toISOString().slice(0,10)}.xlsx`);
    toast({ title: "Exported", description: `${leads.length} leads downloaded.` });
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("leads").update({ status }).eq("id", id);
    if (error) return toast({ title: "Update failed", description: error.message, variant: "destructive" });
    setLeads(ls => ls.map(l => l.id === id ? { ...l, status } : l));
  };

  if (loading) return <div className="container-pad py-20 text-center text-muted-foreground">Loading...</div>;

  if (!isAdmin) {
    return (
      <div className="container-pad py-20 max-w-md text-center">
        <ShieldAlert className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h1 className="font-display text-2xl font-bold mb-2">Admin access required</h1>
        <p className="text-muted-foreground text-sm mb-2">Signed in as <strong>{userEmail}</strong></p>
        <p className="text-muted-foreground text-sm mb-6">
          To grant admin access, run this in Lovable Cloud → SQL editor:<br/>
          <code className="text-xs bg-muted px-2 py-1 rounded mt-2 inline-block">
            INSERT INTO user_roles (user_id, role) SELECT id, 'admin' FROM auth.users WHERE email='{userEmail}';
          </code>
        </p>
        <Button variant="outline" onClick={signOut}><LogOut className="h-4 w-4 mr-2" /> Sign out</Button>
      </div>
    );
  }

  const newCount = leads.filter(l => l.status === "New").length;
  const contactedCount = leads.filter(l => l.status === "Contacted").length;
  const closedCount = leads.filter(l => l.status === "Closed").length;

  return (
    <div className="container-pad py-8">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-sm text-muted-foreground">Welcome back, {userEmail}</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportExcel} disabled={!leads.length}><Download className="h-4 w-4 mr-2" /> Export Excel</Button>
          <Button variant="outline" onClick={signOut}><LogOut className="h-4 w-4 mr-2" /> Sign out</Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Users, label: "Total Leads", value: leads.length, color: "primary" },
          { icon: FileText, label: "New", value: newCount, color: "accent" },
          { icon: FileText, label: "Contacted", value: contactedCount, color: "primary" },
          { icon: Image, label: "Closed", value: closedCount, color: "secondary" },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-2xl p-5 shadow-soft">
            <div className="flex items-center gap-3 mb-2">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><s.icon className="h-4 w-4" /></div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</div>
            </div>
            <div className="font-display text-3xl font-bold">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-soft overflow-hidden">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">Recent Leads</h2>
          <Badge variant="outline">{leads.length} total</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted text-xs uppercase tracking-wider">
              <tr>
                {["Name","Phone","Location","Package","Budget","Date","Status"].map(h => (
                  <th key={h} className="text-left p-3 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 ? (
                <tr><td colSpan={7} className="text-center p-10 text-muted-foreground">No leads yet. Submissions from the quote form will appear here.</td></tr>
              ) : leads.map(l => (
                <tr key={l.id} className="border-t border-border hover:bg-muted/30">
                  <td className="p-3 font-medium">{l.full_name}</td>
                  <td className="p-3">{l.phone}</td>
                  <td className="p-3">{l.location || "—"}</td>
                  <td className="p-3">{l.package || "—"}</td>
                  <td className="p-3">{l.budget_range || "—"}</td>
                  <td className="p-3 text-xs text-muted-foreground">{new Date(l.created_at).toLocaleDateString()}</td>
                  <td className="p-3">
                    <select
                      value={l.status}
                      onChange={e => updateStatus(l.id, e.target.value)}
                      className="bg-background border border-border rounded-md px-2 py-1 text-xs"
                    >
                      {["New","Contacted","Quoted","Closed","Lost"].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
