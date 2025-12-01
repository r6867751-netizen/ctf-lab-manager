import { Users, Flag, FlaskConical, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { title: "Total Users", value: "1,234", icon: Users, change: "+12%" },
  { title: "Active Challenges", value: "48", icon: Flag, change: "+3" },
  { title: "Labs Available", value: "24", icon: FlaskConical, change: "+2" },
  { title: "Submissions Today", value: "156", icon: Trophy, change: "+24%" },
];

const recentActivity = [
  { user: "alex_hacker", action: "Solved", target: "SQL Injection 101", time: "2 min ago" },
  { user: "cyber_ninja", action: "Started", target: "Buffer Overflow Lab", time: "5 min ago" },
  { user: "sec_master", action: "Completed", target: "XSS Advanced", time: "12 min ago" },
  { user: "root_access", action: "Joined", target: "Zencrypt", time: "15 min ago" },
];

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-display font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your Zencrypt platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-primary">{stat.change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-display">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-center justify-between border-b border-border/30 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-mono text-sm">
                    {activity.user.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      <span className="text-primary">{activity.user}</span>
                      {" "}{activity.action}{" "}
                      <span className="text-foreground">{activity.target}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
