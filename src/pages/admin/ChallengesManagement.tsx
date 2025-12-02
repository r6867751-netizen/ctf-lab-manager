import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, MoreHorizontal, Trash2, Edit } from "lucide-react";
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
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface Challenge {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  points: number;
  description: string | null;
  flag: string;
}

const ChallengesManagement = () => {
  const { isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Form state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Web");
  const [difficulty, setDifficulty] = useState("Easy");
  const [points, setPoints] = useState("100");
  const [description, setDescription] = useState("");
  const [flag, setFlag] = useState("");

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate("/");
    }
  }, [isAdmin, loading, navigate]);

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    const { data, error } = await supabase
      .from('challenges')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setChallenges(data);
    }
    setIsLoading(false);
  };

  const filteredChallenges = challenges.filter(
    (c) => c.title.toLowerCase().includes(search.toLowerCase()) ||
           c.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase.from('challenges').insert({
      title,
      category,
      difficulty,
      points: parseInt(points),
      description,
      flag,
    });

    if (error) {
      toast({ title: "Error creating challenge", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Challenge created" });
      setIsAddOpen(false);
      resetForm();
      fetchChallenges();
    }
  };

  const resetForm = () => {
    setTitle("");
    setCategory("Web");
    setDifficulty("Easy");
    setPoints("100");
    setDescription("");
    setFlag("");
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('challenges').delete().eq('id', id);
    
    if (error) {
      toast({ title: "Error deleting challenge", variant: "destructive" });
    } else {
      setChallenges(challenges.filter((c) => c.id !== id));
      toast({ title: "Challenge deleted" });
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    const variants: Record<string, string> = {
      Easy: "bg-primary/20 text-primary border-primary/30",
      Medium: "bg-secondary/20 text-secondary border-secondary/30",
      Hard: "bg-destructive/20 text-destructive border-destructive/30",
      Expert: "bg-accent/20 text-accent border-accent/30",
    };
    return variants[difficulty] || "bg-muted text-muted-foreground";
  };

  if (loading || isLoading) {
    return <div className="text-center py-8 text-primary">Loading...</div>;
  }

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
            <form className="space-y-4" onSubmit={handleCreate}>
              <div>
                <Label>Title</Label>
                <Input 
                  placeholder="Challenge title" 
                  className="bg-background/50"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Web">Web</SelectItem>
                      <SelectItem value="Crypto">Crypto</SelectItem>
                      <SelectItem value="Pwn">Pwn</SelectItem>
                      <SelectItem value="Reversing">Reversing</SelectItem>
                      <SelectItem value="Forensics">Forensics</SelectItem>
                      <SelectItem value="OSINT">OSINT</SelectItem>
                      <SelectItem value="Misc">Misc</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Difficulty</Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                      <SelectItem value="Expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Points</Label>
                <Input 
                  type="number" 
                  placeholder="100" 
                  className="bg-background/50"
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea 
                  placeholder="Challenge description..." 
                  className="bg-background/50 min-h-[100px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <Label>Flag</Label>
                <Input 
                  placeholder="flag{...}" 
                  className="bg-background/50 font-mono"
                  value={flag}
                  onChange={(e) => setFlag(e.target.value)}
                  required
                />
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
          {challenges.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No challenges yet. Add your first challenge!</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-border/50">
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Points</TableHead>
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChallengesManagement;
