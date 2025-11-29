import { Clock, BookOpen, Play, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const labs = [
  {
    id: 1,
    title: "Introduction to Web Application Security",
    description: "Learn the fundamentals of web application security and common vulnerabilities.",
    duration: "2 hours",
    difficulty: "Beginner",
    modules: 8,
    completed: true,
  },
  {
    id: 2,
    title: "SQL Injection Deep Dive",
    description: "Master SQL injection techniques from basic to advanced exploitation.",
    duration: "3 hours",
    difficulty: "Intermediate",
    modules: 12,
    completed: false,
  },
  {
    id: 3,
    title: "Linux Privilege Escalation",
    description: "Explore various techniques for escalating privileges on Linux systems.",
    duration: "4 hours",
    difficulty: "Advanced",
    modules: 15,
    completed: false,
  },
  {
    id: 4,
    title: "Network Penetration Testing",
    description: "Learn to identify and exploit network vulnerabilities.",
    duration: "5 hours",
    difficulty: "Advanced",
    modules: 18,
    completed: false,
  },
  {
    id: 5,
    title: "Cryptography Fundamentals",
    description: "Understand encryption, hashing, and how to break weak implementations.",
    duration: "2.5 hours",
    difficulty: "Beginner",
    modules: 10,
    completed: true,
  },
  {
    id: 6,
    title: "Active Directory Attacks",
    description: "Explore common attack vectors in Windows Active Directory environments.",
    duration: "6 hours",
    difficulty: "Expert",
    modules: 20,
    completed: false,
  },
];

const Labs = () => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-primary/20 text-primary border-primary/30";
      case "Intermediate":
        return "bg-secondary/20 text-secondary border-secondary/30";
      case "Advanced":
        return "bg-accent/20 text-accent border-accent/30";
      case "Expert":
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
              Guided <span className="text-gradient">Labs</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Step-by-step learning paths to build your cybersecurity skills
            </p>
          </div>

          {/* Labs Grid */}
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
                  {lab.completed && <CheckCircle2 className="h-5 w-5 text-primary" />}
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
                  className={lab.completed ? "" : "glow-green"}
                  variant={lab.completed ? "outline" : "default"}
                >
                  {lab.completed ? (
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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Labs;
