import { useState } from "react";
import { Search, Plus, MoreHorizontal, Shield, User, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: "admin" | "moderator" | "user";
  points: number;
  joinedAt: string;
  status: "active" | "banned";
}

const mockUsers: UserData[] = [
  { id: "1", name: "Alex Thompson", email: "alex@example.com", role: "admin", points: 5420, joinedAt: "2024-01-15", status: "active" },
  { id: "2", name: "Sarah Chen", email: "sarah@example.com", role: "moderator", points: 3200, joinedAt: "2024-02-20", status: "active" },
  { id: "3", name: "Mike Johnson", email: "mike@example.com", role: "user", points: 1580, joinedAt: "2024-03-10", status: "active" },
  { id: "4", name: "Emily Davis", email: "emily@example.com", role: "user", points: 890, joinedAt: "2024-04-05", status: "banned" },
  { id: "5", name: "Chris Wilson", email: "chris@example.com", role: "user", points: 2100, joinedAt: "2024-03-25", status: "active" },
];

const UsersManagement = () => {
  const [users, setUsers] = useState<UserData[]>(mockUsers);
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const { toast } = useToast();

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setUsers(users.filter((u) => u.id !== id));
    toast({ title: "User deleted", description: "User has been removed from the platform" });
  };

  const handleToggleBan = (id: string) => {
    setUsers(users.map((u) => 
      u.id === id ? { ...u, status: u.status === "active" ? "banned" : "active" } : u
    ));
    toast({ title: "User status updated" });
  };

  const getRoleBadge = (role: string) => {
    const variants: Record<string, string> = {
      admin: "bg-destructive/20 text-destructive border-destructive/30",
      moderator: "bg-secondary/20 text-secondary border-secondary/30",
      user: "bg-primary/20 text-primary border-primary/30",
    };
    return variants[role] || variants.user;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Users</h1>
          <p className="text-muted-foreground">Manage platform users and permissions</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="glow-green">
              <Plus className="mr-2 h-4 w-4" /> Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border/50">
            <DialogHeader>
              <DialogTitle className="font-display">Add New User</DialogTitle>
            </DialogHeader>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsAddOpen(false); toast({ title: "User created" }); }}>
              <div>
                <Label>Name</Label>
                <Input placeholder="Full name" className="bg-background/50" />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="email@example.com" className="bg-background/50" />
              </div>
              <div>
                <Label>Role</Label>
                <Select defaultValue="user">
                  <SelectTrigger className="bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="moderator">Moderator</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full glow-green">Create User</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-background/50"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Points</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-border/30">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-mono text-xs">
                        {user.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getRoleBadge(user.role)}>
                      {user.role === "admin" && <Shield className="mr-1 h-3 w-3" />}
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-primary">{user.points}</TableCell>
                  <TableCell className="text-muted-foreground">{user.joinedAt}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={user.status === "active" ? "bg-primary/20 text-primary border-primary/30" : "bg-destructive/20 text-destructive border-destructive/30"}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleBan(user.id)}>
                          <User className="mr-2 h-4 w-4" /> 
                          {user.status === "active" ? "Ban User" : "Unban User"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(user.id)} className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersManagement;
