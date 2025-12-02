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

interface Lab {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  modules: number;
}

const LabsManagement = () => {
  const { isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [labs, setLabs] = useState<Lab[]>([]);
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [duration, setDuration] = useState("");
  const [modules, setModules] = useState("1");

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate("/");
    }
  }, [isAdmin, loading, navigate]);

  useEffect(() => {
    fetchLabs();
  }, []);

  const fetchLabs = async () => {
    const { data, error } = await supabase
      .from('labs')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setLabs(data);
    }
    setIsLoading(false);
  };

  const filteredLabs = labs.filter(
    (lab) => lab.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase.from('labs').insert({
      title,
      description,
      difficulty,
      duration,
      modules: parseInt(modules),
    });

    if (error) {
      toast({ title: "Error creating lab", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Lab created" });
      setIsAddOpen(false);
      resetForm();
      fetchLabs();
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDifficulty("Beginner");
    setDuration("");
    setModules("1");
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('labs').delete().eq('id', id);
    
    if (error) {
      toast({ title: "Error deleting lab", variant: "destructive" });
    } else {
      setLabs(labs.filter((l) => l.id !== id));
      toast({ title: "Lab deleted" });
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    const variants: Record<string, string> = {
      Beginner: "bg-primary/20 text-primary border-primary/30",
      Intermediate: "bg-secondary/20 text-secondary border-secondary/30",
      Advanced: "bg-destructive/20 text-destructive border-destructive/30",
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
            <form className="space-y-4" onSubmit={handleCreate}>
              <div>
                <Label>Title</Label>
                <Input 
                  placeholder="Lab title" 
                  className="bg-background/50"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea 
                  placeholder="Lab description and learning objectives..." 
                  className="bg-background/50 min-h-[100px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Difficulty</Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Duration</Label>
                  <Input 
                    placeholder="e.g., 2 hours" 
                    className="bg-background/50"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <Label>Number of Modules</Label>
                <Input 
                  type="number" 
                  placeholder="1" 
                  className="bg-background/50"
                  value={modules}
                  onChange={(e) => setModules(e.target.value)}
                  min="1"
                  required
                />
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
          {labs.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No labs yet. Add your first lab!</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-border/50">
                  <TableHead>Title</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Modules</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLabs.map((lab) => (
                  <TableRow key={lab.id} className="border-border/30">
                    <TableCell className="font-medium">{lab.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getDifficultyBadge(lab.difficulty)}>
                        {lab.difficulty}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{lab.duration}</TableCell>
                    <TableCell className="font-mono text-primary">{lab.modules}</TableCell>
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LabsManagement;
