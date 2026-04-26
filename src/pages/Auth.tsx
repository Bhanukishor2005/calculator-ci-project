import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/admin");
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email, password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      setLoading(false);
      if (error) return toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
      toast({ title: "Account created", description: "Ask an admin to grant you access, or grant yourself the admin role from the database." });
      setMode("signin");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) return toast({ title: "Sign in failed", description: error.message, variant: "destructive" });
      navigate("/admin");
    }
  };

  return (
    <div className="container-pad py-16 max-w-md">
      <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Back to site</Link>
      <h1 className="font-display text-3xl font-bold mt-4 mb-2">Admin {mode === "signin" ? "Sign In" : "Sign Up"}</h1>
      <p className="text-sm text-muted-foreground mb-6">Manage leads, gallery and content.</p>
      <form onSubmit={submit} className="bg-card border border-border rounded-2xl p-6 shadow-soft space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Please wait..." : mode === "signin" ? "Sign In" : "Create Account"}
        </Button>
        <button type="button" onClick={() => setMode(m => m === "signin" ? "signup" : "signin")} className="text-sm text-muted-foreground hover:text-foreground w-full text-center">
          {mode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
