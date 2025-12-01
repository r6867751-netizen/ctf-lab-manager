import { useState } from "react";
import { Search, Plus, MoreHorizontal, Trash2, Edit, Eye, EyeOff } from "lucide-react";
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

interface Challenge {
  id: string;
  title: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
  solves: number;
  status: "active" | "hidden";
}

const mockChallenges: Challenge[] = [
  { id: "1", title: "SQL Injection 101", category: "Web", difficulty: "easy", points: 100, solves: 234, status: "active" },
  { id: "2", title: "Buffer Overflow Basics", category: "Pwn", difficulty: "medium", points: 250, solves: 89, status: "active" },
  { id: "3", title: "RSA Fundamentals", category: "Crypto", difficulty: "easy", points: 150, solves: 198, status: "active" },
  { id: "4", title: "Reverse Crackme v2", category: "Reversing", difficulty: "medium", points: 300, solves: 56, status: "active" },
  { id: "5", title: "XSS Advanced", category: "Web", difficulty: "hard", points: 500, solves: 23, status: "hidden" },
];

const ChallengesManagement = () => {
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const { toast } = useToast();

  const filteredChallenges = challenges.filter(
    (c) => c.title.toLowerCase().includes(search.toLowerCase()) ||
           c.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setChallenges(challenges.filter((c) => c.id !== id));
    toast({ title: "Challenge deleted" });
  };

  const handleToggleStatus = (id: string) => {
    setChallenges(challenges.map((c) =>
      c.id === id ? { ...c, status: c.status === "active" ? "hidden" : "active" } : c
    ));
    toast({ title: "Challenge status updated" });
  };

  const getDifficultyBadge = (difficulty: string) => {
    const variants: Record<string, string> = {
      easy: "bg-primary/20 text-primary border-primary/30",
      medium: "bg-secondary/20 text-secondary border-secondary/30",
      hard: "bg-destructive/20 text-destructive border-destructive/30",
    };
    return variants[difficulty];
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Challenges</h1>
          <p className="text-muted-foreground">Manage CTF challenges and categories</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="glow-green">
              <Plus className="mr-2 h-4 w-4" /> Add Challenge
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border/50 max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-display">Add New Challenge</DialogTitle>
            </DialogHeader>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsAddOpen(false); toast({ title: "Challenge created" }); }}>
              <div>
                <Label>Title</Label>
                <Input placeholder="Challenge title" className="bg-background/50" />
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
                      <SelectItem value="crypto">Crypto</SelectItem>
                      <SelectItem value="pwn">Pwn</SelectItem>
                      <SelectItem value="reversing">Reversing</SelectItem>
                      <SelectItem value="forensics">Forensics</SelectItem>
                      <SelectItem value="misc">Misc</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Difficulty</Label>
                  <Select defaultValue="easy">
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Points</Label>
                <Input type="number" placeholder="100" className="bg-background/50" />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea placeholder="Challenge description..." className="bg-background/50 min-h-[100px]" />
              </div>
              <div>
                <Label>Flag</Label>
                <Input placeholder="flag{...}" className="bg-background/50 font-mono" />
              </div>
              <Button type="submit" className="w-full glow-green">Create Challenge</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search challenges..."
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
                <TableHead>Points</TableHead>
                <TableHead>Solves</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredChallenges.map((challenge) => (
                <TableRow key={challenge.id} className="border-border/30">
                  <TableCell className="font-medium">{challenge.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-accent/10 border-accent/30">
                      {challenge.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getDifficultyBadge(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-primary">{challenge.points}</TableCell>
                  <TableCell className="text-muted-foreground">{challenge.solves}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={challenge.status === "active" ? "bg-primary/20 text-primary border-primary/30" : "bg-muted/20 text-muted-foreground border-muted/30"}>
                      {challenge.status}
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
                        <DropdownMenuItem onClick={() => handleToggleStatus(challenge.id)}>
                          {challenge.status === "active" ? (
                            <><EyeOff className="mr-2 h-4 w-4" /> Hide</>
                          ) : (
                            <><Eye className="mr-2 h-4 w-4" /> Show</>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(challenge.id)} className="text-destructive">
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

export default ChallengesManagement;
