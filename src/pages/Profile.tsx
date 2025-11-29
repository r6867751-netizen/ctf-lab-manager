import { Trophy, Target, Clock, Award, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Profile = () => {
  const user = {
    name: "CyberHacker",
    email: "hacker@cyberlabs.com",
    rank: 156,
    points: 2450,
    solvedChallenges: 28,
    completedLabs: 5,
    joinDate: "January 2024",
    streak: 7,
  };

  const recentActivity = [
    { type: "challenge", title: "SQL Injection Basics", points: 100, date: "2 hours ago" },
    { type: "lab", title: "Web Security Fundamentals", points: 200, date: "1 day ago" },
    { type: "challenge", title: "XSS Advanced", points: 250, date: "2 days ago" },
    { type: "challenge", title: "Crypto 101", points: 150, date: "3 days ago" },
  ];

  const badges = [
    { name: "First Blood", description: "First to solve a challenge", earned: true },
    { name: "Web Master", description: "Complete all web challenges", earned: true },
    { name: "Crypto Expert", description: "Complete all crypto challenges", earned: false },
    { name: "Streak King", description: "30 day streak", earned: false },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAuthenticated />

      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Profile Header */}
          <div className="glass-card p-8 mb-8 animate-fade-in">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-primary font-mono font-bold text-3xl">
                {user.name.substring(0, 2).toUpperCase()}
              </div>
              <div className="text-center md:text-left flex-grow">
                <h1 className="text-3xl font-display font-bold mb-1">{user.name}</h1>
                <p className="text-muted-foreground mb-4">{user.email}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                  <span className="text-muted-foreground">Joined {user.joinDate}</span>
                  <span className="text-primary font-semibold">🔥 {user.streak} day streak</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gradient mb-1">#{user.rank}</div>
                <div className="text-sm text-muted-foreground">Global Rank</div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Stats */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="glass-card p-4 text-center">
                  <Trophy className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{user.points}</div>
                  <div className="text-xs text-muted-foreground">Total Points</div>
                </div>
                <div className="glass-card p-4 text-center">
                  <Target className="h-6 w-6 text-secondary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{user.solvedChallenges}</div>
                  <div className="text-xs text-muted-foreground">Challenges</div>
                </div>
                <div className="glass-card p-4 text-center">
                  <Clock className="h-6 w-6 text-accent mx-auto mb-2" />
                  <div className="text-2xl font-bold">{user.completedLabs}</div>
                  <div className="text-xs text-muted-foreground">Labs Done</div>
                </div>
                <div className="glass-card p-4 text-center">
                  <TrendingUp className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">Top 5%</div>
                  <div className="text-xs text-muted-foreground">Percentile</div>
                </div>
              </div>

              {/* Progress */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-display font-semibold mb-4">Skill Progress</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Web Exploitation</span>
                      <span className="text-primary">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Cryptography</span>
                      <span className="text-primary">60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Reverse Engineering</span>
                      <span className="text-primary">40%</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Binary Exploitation</span>
                      <span className="text-primary">25%</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-display font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                      <div>
                        <div className="font-medium">{activity.title}</div>
                        <div className="text-xs text-muted-foreground">{activity.date}</div>
                      </div>
                      <span className="text-primary font-mono">+{activity.points} pts</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Badges */}
            <div>
              <div className="glass-card p-6">
                <h3 className="text-lg font-display font-semibold mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Badges
                </h3>
                <div className="space-y-4">
                  {badges.map((badge, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        badge.earned
                          ? "border-primary/30 bg-primary/5"
                          : "border-border/50 bg-muted/20 opacity-50"
                      }`}
                    >
                      <div className="font-medium mb-1">{badge.name}</div>
                      <div className="text-xs text-muted-foreground">{badge.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
