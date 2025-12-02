import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, signUp, user, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setIsLogin(searchParams.get("mode") !== "signup");
  }, [searchParams]);

  useEffect(() => {
    if (user && !loading) {
      navigate("/ctf");
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: "Login failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Logged in successfully!",
            description: "Welcome back to Zencrypt",
          });
          navigate("/ctf");
        }
      } else {
        if (!name.trim()) {
          toast({
            title: "Name required",
            description: "Please enter your display name",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        const { error } = await signUp(email, password, name);
        if (error) {
          toast({
            title: "Signup failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Account created!",
            description: "Welcome to Zencrypt",
          });
          navigate("/ctf");
        }
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Something went wrong",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in p-4">
        <div className="text-center mb-8">
          <Link to="/" className="flex items-center justify-center space-x-2 mb-4">
            <Code2 className="h-10 w-10 text-primary" />
            <span className="text-2xl font-display font-bold text-gradient">Zencrypt</span>
          </Link>
          <h1 className="text-3xl font-display font-bold mb-2">
            {isLogin ? "Welcome Back" : "Join Zencrypt"}
          </h1>
          <p className="text-muted-foreground">
            {isLogin ? "Login to access challenges and labs" : "Start your security journey today"}
          </p>
        </div>

        <div className="glass-card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2">Display Name</label>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  className="bg-background/50"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                placeholder="your@email.com"
                required
                className="bg-background/50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                required
                className="bg-background/50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
              />
            </div>

            <Button type="submit" className="w-full glow-green" disabled={isLoading}>
              {isLoading ? "Loading..." : isLogin ? "Login" : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </span>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-primary hover:underline font-medium"
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
