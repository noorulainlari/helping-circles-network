
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";

interface AdminLoginFormProps {
  onSuccess?: () => void;
}

const AdminLoginForm = ({ onSuccess }: AdminLoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signIn(email, password);
    
    if (!error) {
      onSuccess?.();
    } else {
      toast({
        title: "Admin Login Failed",
        description: "Please check your credentials and ensure you have admin access.",
        variant: "destructive"
      });
    }
    
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <Shield className="mx-auto h-12 w-12 text-blue-600 mb-2" />
        <p className="text-sm text-gray-600">
          Admin access required. Please use your administrator credentials.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="admin-email">Admin Email</Label>
          <Input
            id="admin-email"
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="admin-password">Admin Password</Label>
          <Input
            id="admin-password"
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              <Shield className="mr-2 h-4 w-4" />
              Admin Sign In
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default AdminLoginForm;
