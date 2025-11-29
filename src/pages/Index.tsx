import { Link } from "react-router-dom";
import { Zap, Shield, Target, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-glow opacity-50" />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
          </div>

          <div className="container mx-auto relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <div className="inline-block mb-4 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 animate-scale-in" style={{ animationDelay: "0.2s" }}>
                <span className="text-sm font-mono text-primary">// Master Cybersecurity</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
                Learn Hacking Through
                <span className="block text-gradient mt-2">Real CTF Challenges</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Master penetration testing, exploit development, and security analysis through hands-on challenges and interactive labs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/auth?mode=signup">
                  <Button size="lg" className="glow-green text-lg px-8 group">
                    Start Learning Free
                    <Zap className="ml-2 h-5 w-5 group-hover:animate-pulse" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="text-lg px-8 border-primary/30 hover:bg-primary/10 text-primary">
                    Explore Platform
                  </Button>
                </Link>
              </div>

              <div className="mt-12 p-6 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm animate-fade-in" style={{ animationDelay: "0.8s" }}>
                <div className="font-mono text-sm text-left overflow-x-auto">
                  <div className="text-muted-foreground mb-2">$ cat flag.txt</div>
                  <div className="text-primary">flag{"{welcome_to_cyberlabs_start_your_journey}"}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-card/20">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Why <span className="text-gradient">CyberLabs?</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to become a cybersecurity professional
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="glass-card-hover p-6 h-full group">
                <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">Real-World Scenarios</h3>
                <p className="text-muted-foreground">
                  Practice on challenges that mirror actual security vulnerabilities found in production systems.
                </p>
              </div>

              <div className="glass-card-hover p-6 h-full group">
                <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">Guided Learning</h3>
                <p className="text-muted-foreground">
                  Step-by-step labs designed to build your skills from beginner to advanced levels.
                </p>
              </div>

              <div className="glass-card-hover p-6 h-full group">
                <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">Competitive CTFs</h3>
                <p className="text-muted-foreground">
                  Test your skills against others in capture-the-flag challenges with global leaderboards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-cyber opacity-10" />
          <div className="container mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Ready to Start Your <span className="text-gradient">Security Journey?</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of learners mastering cybersecurity through hands-on practice.
              </p>
              <Link to="/auth?mode=signup">
                <Button size="lg" className="glow-green text-lg px-12">
                  Get Started For Free
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
