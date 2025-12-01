import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({ title: "Settings saved", description: "Your changes have been applied" });
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-3xl font-display font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Configure platform settings and preferences</p>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="font-display">General Settings</CardTitle>
          <CardDescription>Basic platform configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Platform Name</Label>
            <Input defaultValue="Zencrypt" className="bg-background/50" />
          </div>
          <div>
            <Label>Support Email</Label>
            <Input defaultValue="support@zencrypt.com" className="bg-background/50" />
          </div>
          <div>
            <Label>Max Concurrent Lab Sessions</Label>
            <Input type="number" defaultValue="100" className="bg-background/50" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="font-display">Registration</CardTitle>
          <CardDescription>Control user registration settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Allow New Registrations</Label>
              <p className="text-sm text-muted-foreground">Enable or disable new user signups</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Require Email Verification</Label>
              <p className="text-sm text-muted-foreground">Users must verify email before access</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Enable Social Login</Label>
              <p className="text-sm text-muted-foreground">Allow login via GitHub, Google</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="font-display">API Configuration</CardTitle>
          <CardDescription>Django backend API settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>API Base URL</Label>
            <Input defaultValue="https://api.zencrypt.com" className="bg-background/50 font-mono" />
          </div>
          <div>
            <Label>JWT Token Expiry (hours)</Label>
            <Input type="number" defaultValue="24" className="bg-background/50" />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="glow-green">Save Changes</Button>
      </div>
    </div>
  );
};

export default Settings;
