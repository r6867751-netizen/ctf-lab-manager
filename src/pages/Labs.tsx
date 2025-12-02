import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, BookOpen, Play, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface Lab {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  modules: number;
}

interface LabProgress {
  lab_id: string;
  completed: boolean;
}

const Labs = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [labs, setLabs] = useState<Lab[]>([]);
  const [progress, setProgress] = useState<LabProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    const [labsRes, progressRes] = await Promise.all([
      supabase.from('labs').select('*').order('created_at', { ascending: false }),
      supabase.from('lab_progress').select('lab_id, completed').eq('user_id', user!.id)
    ]);

    if (labsRes.data) setLabs(labsRes.data);
    if (progressRes.data) setProgress(progressRes.data);
    setIsLoading(false);
  };

  const isCompleted = (labId: string) => {
    return progress.some(p => p.lab_id === labId && p.completed);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-primary/20 text-primary border-primary/30";
      case "Intermediate":
        return "bg-secondary/20 text-secondary border-secondary/30";
      case "Advanced":
        return "bg-accent/20 text-accent border-accent/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Guided <span className="text-gradient">Labs</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Step-by-step learning paths to build your cybersecurity skills
            </p>
          </div>

          {/* Labs Grid */}
          {labs.length === 0 ? (
            <div className="text-center py-12 glass-card">
              <p className="text-muted-foreground">No labs available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {labs.map((lab, index) => (
                <div
                  key={lab.id}
                  className="glass-card-hover p-6 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getDifficultyColor(lab.difficulty)}`}>
                      {lab.difficulty}
                    </span>
                    {isCompleted(lab.id) && <CheckCircle2 className="h-5 w-5 text-primary" />}
                  </div>

                  <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-primary transition-colors">
                    {lab.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {lab.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {lab.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {lab.modules} modules
                    </div>
                  </div>

                  <Button
                    className={isCompleted(lab.id) ? "" : "glow-green"}
                    variant={isCompleted(lab.id) ? "outline" : "default"}
                  >
                    {isCompleted(lab.id) ? (
                      "Review Lab"
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Start Lab
                      </>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Labs;
