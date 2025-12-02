import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trophy, Target, Lock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface Challenge {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  points: number;
  description: string | null;
}

interface Submission {
  challenge_id: string;
  solved: boolean;
}

const CTF = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
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
    const [challengesRes, submissionsRes] = await Promise.all([
      supabase.from('challenges').select('*').order('created_at', { ascending: false }),
      supabase.from('challenge_submissions').select('challenge_id, solved').eq('user_id', user!.id)
    ]);

    if (challengesRes.data) setChallenges(challengesRes.data);
    if (submissionsRes.data) setSubmissions(submissionsRes.data);
    setIsLoading(false);
  };

  const isSolved = (challengeId: string) => {
    return submissions.some(s => s.challenge_id === challengeId && s.solved);
  };

  const solvedCount = submissions.filter(s => s.solved).length;
  const totalPoints = challenges
    .filter(c => isSolved(c.id))
    .reduce((acc, c) => acc + c.points, 0);
  const remainingCount = challenges.length - solvedCount;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-primary/20 text-primary border-primary/30";
      case "Medium":
        return "bg-secondary/20 text-secondary border-secondary/30";
      case "Hard":
        return "bg-destructive/20 text-destructive border-destructive/30";
      case "Expert":
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
              CTF <span className="text-gradient">Challenges</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Test your skills with capture-the-flag challenges across multiple categories
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="glass-card p-6 text-center">
              <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold text-gradient mb-1">{solvedCount}</div>
              <div className="text-sm text-muted-foreground">Solved Challenges</div>
            </div>
            <div className="glass-card p-6 text-center">
              <Target className="h-8 w-8 text-secondary mx-auto mb-2" />
              <div className="text-3xl font-bold text-gradient mb-1">{totalPoints}</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </div>
            <div className="glass-card p-6 text-center">
              <Lock className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="text-3xl font-bold text-gradient mb-1">{remainingCount}</div>
              <div className="text-sm text-muted-foreground">Remaining</div>
            </div>
          </div>

          {/* Challenges Grid */}
          {challenges.length === 0 ? (
            <div className="text-center py-12 glass-card">
              <p className="text-muted-foreground">No challenges available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.map((challenge, index) => (
                <div
                  key={challenge.id}
                  className="glass-card-hover p-6 h-full group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                    {isSolved(challenge.id) && <CheckCircle2 className="h-5 w-5 text-primary" />}
                  </div>
                  <h3 className="text-lg font-display font-semibold mb-2 group-hover:text-primary transition-colors">
                    {challenge.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>{challenge.category}</span>
                    <span className="font-mono text-primary">{challenge.points} pts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{challenge.category}</span>
                    <Button
                      size="sm"
                      variant={isSolved(challenge.id) ? "outline" : "default"}
                      className={isSolved(challenge.id) ? "" : "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"}
                    >
                      {isSolved(challenge.id) ? "View Solution" : "Solve"}
                    </Button>
                  </div>
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

export default CTF;
