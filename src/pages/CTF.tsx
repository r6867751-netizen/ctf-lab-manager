import { Trophy, Target, Lock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const challenges = [
  {
    id: 1,
    title: "Web Exploitation: SQL Injection",
    category: "Web",
    difficulty: "Easy",
    points: 100,
    solves: 234,
    solved: false,
  },
  {
    id: 2,
    title: "Reverse Engineering: Crackme v2",
    category: "Reversing",
    difficulty: "Medium",
    points: 250,
    solves: 156,
    solved: false,
  },
  {
    id: 3,
    title: "Cryptography: RSA Basics",
    category: "Crypto",
    difficulty: "Easy",
    points: 150,
    solves: 198,
    solved: true,
  },
  {
    id: 4,
    title: "Binary Exploitation: Buffer Overflow",
    category: "Pwn",
    difficulty: "Hard",
    points: 400,
    solves: 89,
    solved: false,
  },
  {
    id: 5,
    title: "Forensics: Memory Analysis",
    category: "Forensics",
    difficulty: "Medium",
    points: 200,
    solves: 145,
    solved: true,
  },
  {
    id: 6,
    title: "OSINT: Find the Flag",
    category: "OSINT",
    difficulty: "Easy",
    points: 100,
    solves: 312,
    solved: false,
  },
];

const CTF = () => {
  const solvedCount = challenges.filter((c) => c.solved).length;
  const totalPoints = challenges.filter((c) => c.solved).reduce((acc, c) => acc + c.points, 0);
  const remainingCount = challenges.filter((c) => !c.solved).length;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-primary/20 text-primary border-primary/30";
      case "Medium":
        return "bg-secondary/20 text-secondary border-secondary/30";
      case "Hard":
        return "bg-destructive/20 text-destructive border-destructive/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAuthenticated />

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
                  {challenge.solved && <CheckCircle2 className="h-5 w-5 text-primary" />}
                </div>
                <h3 className="text-lg font-display font-semibold mb-2 group-hover:text-primary transition-colors">
                  {challenge.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span>{challenge.category}</span>
                  <span className="font-mono text-primary">{challenge.points} pts</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{challenge.solves} solves</span>
                  <Button
                    size="sm"
                    variant={challenge.solved ? "outline" : "default"}
                    className={challenge.solved ? "" : "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"}
                  >
                    {challenge.solved ? "View Solution" : "Solve"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CTF;
