import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trophy, Target, Clock, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const Profile = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    solvedChallenges: 0,
    totalPoints: 0,
    completedLabs: 0,
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    const [challengesRes, labsRes, submissionsRes] = await Promise.all([
      supabase.from('challenges').select('id, points'),
      supabase.from('lab_progress').select('*').eq('user_id', user!.id).eq('completed', true),
      supabase.from('challenge_submissions').select('challenge_id, solved').eq('user_id', user!.id).eq('solved', true)
    ]);

    const solvedChallengeIds = submissionsRes.data?.map(s => s.challenge_id) || [];
    const totalPoints = challengesRes.data
      ?.filter(c => solvedChallengeIds.includes(c.id))
      .reduce((acc, c) => acc + c.points, 0) || 0;

    setStats({
      solvedChallenges: submissionsRes.data?.length || 0,
      totalPoints,
      completedLabs: labsRes.data?.length || 0,
    });
  };

  const badges = [
    { name: "First Blood", description: "First to solve a challenge", earned: stats.solvedChallenges > 0 },
    { name: "Web Master", description: "Complete all web challenges", earned: false },
    { name: "Lab Rat", description: "Complete your first lab", earned: stats.completedLabs > 0 },
    { name: "Points Hunter", description: "Earn 500+ points", earned: stats.totalPoints >= 500 },
  ];

  if (loading) {
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
        <div className="container mx-auto max-w-6xl">
          {/* Profile Header */}
          <div className="glass-card p-8 mb-8 animate-fade-in">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-primary font-mono font-bold text-3xl">
                {profile?.name?.substring(0, 2).toUpperCase() || 'U'}
              </div>
              <div className="text-center md:text-left flex-grow">
                <h1 className="text-3xl font-display font-bold mb-1">{profile?.name || 'User'}</h1>
                <p className="text-muted-foreground mb-4">{profile?.email}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                  <span className="text-muted-foreground">Active Member</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Stats */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="glass-card p-4 text-center">
                  <Trophy className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{stats.totalPoints}</div>
                  <div className="text-xs text-muted-foreground">Total Points</div>
                </div>
                <div className="glass-card p-4 text-center">
                  <Target className="h-6 w-6 text-secondary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{stats.solvedChallenges}</div>
                  <div className="text-xs text-muted-foreground">Challenges</div>
                </div>
                <div className="glass-card p-4 text-center">
                  <Clock className="h-6 w-6 text-accent mx-auto mb-2" />
                  <div className="text-2xl font-bold">{stats.completedLabs}</div>
                  <div className="text-xs text-muted-foreground">Labs Done</div>
                </div>
              </div>

              {/* Progress */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-display font-semibold mb-4">Your Progress</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Challenges Completed</span>
                      <span className="text-primary">{stats.solvedChallenges} solved</span>
                    </div>
                    <Progress value={stats.solvedChallenges > 0 ? Math.min(stats.solvedChallenges * 10, 100) : 0} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Labs Completed</span>
                      <span className="text-primary">{stats.completedLabs} done</span>
                    </div>
                    <Progress value={stats.completedLabs > 0 ? Math.min(stats.completedLabs * 20, 100) : 0} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Points Progress</span>
                      <span className="text-primary">{stats.totalPoints} pts</span>
                    </div>
                    <Progress value={Math.min(stats.totalPoints / 10, 100)} className="h-2" />
                  </div>
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
