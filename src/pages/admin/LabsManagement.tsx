import { useState } from "react";
import { Search, Plus, MoreHorizontal, Trash2, Edit, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Lab {
  id: string;
  title: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: string;
  activeUsers: number;
  status: "running" | "stopped";
}

const mockLabs: Lab[] = [
  { id: "1", title: "Web Application Security", category: "Web", difficulty: "beginner", duration: "2 hours", activeUsers: 45, status: "running" },
  { id: "2", title: "Network Penetration Testing", category: "Network", difficulty: "intermediate", duration: "4 hours", activeUsers: 23, status: "running" },
  { id: "3", title: "Malware Analysis Lab", category: "Forensics", difficulty: "advanced", duration: "3 hours", activeUsers: 12, status: "running" },
  { id: "4", title: "Linux Privilege Escalation", category: "Pwn", difficulty: "intermediate", duration: "2 hours", activeUsers: 0, status: "stopped" },
  { id: "5", title: "Cloud Security Fundamentals", category: "Cloud", difficulty: "beginner", duration: "1.5 hours", activeUsers: 34, status: "running" },
];

const LabsManagement = () => {
  const [labs, setLabs] = useState<Lab[]>(mockLabs);
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const { toast } = useToast();

  const filteredLabs = labs.filter(
    (lab) => lab.title.toLowerCase().includes(search.toLowerCase()) ||
             lab.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setLabs(labs.filter((l) => l.id !== id));
    toast({ title: "Lab deleted" });
  };

  const handleToggleStatus = (id: string) => {
    setLabs(labs.map((l) =>
      l.id === id ? { ...l, status: l.status === "running" ? "stopped" : "running", activeUsers: l.status === "running" ? 0 : l.activeUsers } : l
    ));
    toast({ title: "Lab status updated" });
  };

  const getDifficultyBadge = (difficulty: string) => {
    const variants: Record<string, string> = {
      beginner: "bg-primary/20 text-primary border-primary/30",
      intermediate: "bg-secondary/20 text-secondary border-secondary/30",
      advanced: "bg-destructive/20 text-destructive border-destructive/30",
    };
    return variants[difficulty];
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Labs</h1>
          <p className="text-muted-foreground">Manage interactive lab environments</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="glow-green">
              <Plus className="mr-2 h-4 w-4" /> Add Lab
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border/50 max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-display">Add New Lab</DialogTitle>
            </DialogHeader>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsAddOpen(false); toast({ title: "Lab created" }); }}>
              <div>
                <Label>Title</Label>
                <Input placeholder="Lab title" className="bg-background/50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <Select defaultValue="web">
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web">Web</SelectItem>
                      <SelectItem value="network">Network</SelectItem>
                      <SelectItem value="forensics">Forensics</SelectItem>
                      <SelectItem value="pwn">Pwn</SelectItem>
                      <SelectItem value="cloud">Cloud</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Difficulty</Label>
                  <Select defaultValue="beginner">
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Duration</Label>
                <Input placeholder="e.g., 2 hours" className="bg-background/50" />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea placeholder="Lab description and learning objectives..." className="bg-background/50 min-h-[100px]" />
              </div>
              <div>
                <Label>Docker Image URL</Label>
                <Input placeholder="docker.io/cyberlabs/..." className="bg-background/50 font-mono" />
              </div>
              <Button type="submit" className="w-full glow-green">Create Lab</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search labs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-background/50 max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Active Users</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLabs.map((lab) => (
                <TableRow key={lab.id} className="border-border/30">
                  <TableCell className="font-medium">{lab.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-accent/10 border-accent/30">
                      {lab.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getDifficultyBadge(lab.difficulty)}>
                      {lab.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{lab.duration}</TableCell>
                  <TableCell className="font-mono text-primary">{lab.activeUsers}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={lab.status === "running" ? "bg-primary/20 text-primary border-primary/30" : "bg-muted/20 text-muted-foreground border-muted/30"}>
                      {lab.status}
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
                        <DropdownMenuItem onClick={() => handleToggleStatus(lab.id)}>
                          {lab.status === "running" ? (
                            <><Pause className="mr-2 h-4 w-4" /> Stop</>
                          ) : (
                            <><Play className="mr-2 h-4 w-4" /> Start</>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(lab.id)} className="text-destructive">
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

export default LabsManagement;
