import { useRef, useState } from "react";
import { Pencil, Plus, Upload, ImageOff, X } from "lucide-react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";
import { categories as initialCategories, Category } from "@/data/categories";
import { toast } from "sonner";

const emptyForm = { name: "", description: "", image: "" };

const AdminCategorias = () => {
  const [list, setList] = useState<Category[]>(initialCategories);

  const [editing, setEditing] = useState<Category | null>(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const editFileRef = useRef<HTMLInputElement>(null);

  const [createOpen, setCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState(emptyForm);
  const createFileRef = useRef<HTMLInputElement>(null);

  const readImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (img: string) => void,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Selecione um arquivo de imagem válido.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("A imagem deve ter no máximo 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setter(reader.result as string);
    reader.readAsDataURL(file);
  };

  const openEdit = (category: Category) => {
    setEditing(category);
    setEditForm({
      name: category.name,
      description: category.description,
      image: category.image,
    });
  };

  const handleSave = () => {
    if (!editing) return;
    if (!editForm.name.trim()) {
      toast.error("Informe o nome da categoria.");
      return;
    }
    setList((prev) =>
      prev.map((c) =>
        c.id === editing.id
          ? {
              ...c,
              name: editForm.name.trim(),
              description: editForm.description.trim(),
              image: editForm.image,
            }
          : c,
      ),
    );
    toast.success(`"${editForm.name.trim()}" atualizada com sucesso.`);
    setEditing(null);
  };

  const openCreate = () => {
    setCreateForm(emptyForm);
    setCreateOpen(true);
  };

  const handleCreate = () => {
    if (!createForm.name.trim()) {
      toast.error("Informe o nome da categoria.");
      return;
    }
    if (!createForm.image) {
      toast.error("Adicione uma foto da categoria.");
      return;
    }
    const newCategory: Category = {
      id: `new-${Date.now()}`,
      name: createForm.name.trim(),
      description: createForm.description.trim(),
      image: createForm.image,
      hashtags: [],
    };
    setList((prev) => [newCategory, ...prev]);
    toast.success(`"${newCategory.name}" cadastrada com sucesso.`);
    setCreateOpen(false);
    setCreateForm(emptyForm);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Categorias</h2>
        <Button onClick={openCreate} className="gap-2">
          <Plus size={16} />
          Nova Categoria
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead className="w-16 text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((category, index) => (
              <motion.tr
                key={category.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-b transition-colors hover:bg-muted/50"
              >
                <TableCell className="font-medium text-foreground">
                  <div className="flex items-center gap-3">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-10 w-10 rounded-md border border-border object-cover"
                    />
                    <span>{category.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="line-clamp-2 text-sm text-muted-foreground">
                    {category.description}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <button
                    onClick={() => openEdit(category)}
                    className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                  >
                    <Pencil size={16} />
                  </button>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit dialog */}
      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-border bg-card text-card-foreground sm:max-w-[820px]">
          <DialogHeader className="border-b border-border pb-4">
            <DialogTitle className="text-xl">Editar Categoria</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Altere os dados e a foto da categoria.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-2 md:grid-cols-[240px_1fr]">
            <div className="flex flex-col gap-3">
              <Label className="text-sm font-medium">Foto da categoria</Label>
              <div className="relative aspect-square w-full overflow-hidden rounded-lg border-2 border-dashed border-border bg-background">
                {editForm.image ? (
                  <>
                    <img
                      src={editForm.image}
                      alt="Pré-visualização"
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setEditForm((f) => ({ ...f, image: "" }));
                        if (editFileRef.current) editFileRef.current.value = "";
                      }}
                      className="absolute right-2 top-2 rounded-full bg-background/90 p-1.5 text-foreground shadow-md backdrop-blur transition-colors hover:bg-background"
                      aria-label="Remover imagem"
                    >
                      <X size={14} />
                    </button>
                  </>
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
                    <ImageOff size={32} />
                    <span className="text-xs">Sem imagem</span>
                  </div>
                )}
              </div>
              <input
                ref={editFileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  readImage(e, (img) => setEditForm((f) => ({ ...f, image: img })))
                }
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => editFileRef.current?.click()}
              >
                <Upload size={14} />
                {editForm.image ? "Trocar foto" : "Enviar foto"}
              </Button>
              <p className="text-xs text-muted-foreground">PNG ou JPG, até 5MB.</p>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="cat-edit-name" className="text-sm font-medium">Nome</Label>
                <Input
                  id="cat-edit-name"
                  value={editForm.name}
                  onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                  className="bg-background"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cat-edit-desc" className="text-sm font-medium">Descrição</Label>
                <Textarea
                  id="cat-edit-desc"
                  rows={6}
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, description: e.target.value }))
                  }
                  className="min-h-[160px] resize-y bg-background"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="border-t border-border pt-4">
            <Button variant="outline" onClick={() => setEditing(null)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-border bg-card text-card-foreground sm:max-w-[820px]">
          <DialogHeader className="border-b border-border pb-4">
            <DialogTitle className="text-xl">Nova Categoria</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Preencha os dados e visualize a foto antes de confirmar.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-2 md:grid-cols-[240px_1fr]">
            <div className="flex flex-col gap-3">
              <Label className="text-sm font-medium">Foto da categoria</Label>
              <div className="relative aspect-square w-full overflow-hidden rounded-lg border-2 border-dashed border-border bg-background">
                {createForm.image ? (
                  <>
                    <img
                      src={createForm.image}
                      alt="Pré-visualização"
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setCreateForm((f) => ({ ...f, image: "" }));
                        if (createFileRef.current) createFileRef.current.value = "";
                      }}
                      className="absolute right-2 top-2 rounded-full bg-background/90 p-1.5 text-foreground shadow-md backdrop-blur transition-colors hover:bg-background"
                      aria-label="Remover imagem"
                    >
                      <X size={14} />
                    </button>
                  </>
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
                    <ImageOff size={32} />
                    <span className="text-xs">Sem imagem</span>
                  </div>
                )}
              </div>
              <input
                ref={createFileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  readImage(e, (img) => setCreateForm((f) => ({ ...f, image: img })))
                }
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => createFileRef.current?.click()}
              >
                <Upload size={14} />
                {createForm.image ? "Trocar foto" : "Enviar foto"}
              </Button>
              <p className="text-xs text-muted-foreground">PNG ou JPG, até 5MB.</p>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="cat-new-name" className="text-sm font-medium">Nome</Label>
                <Input
                  id="cat-new-name"
                  value={createForm.name}
                  onChange={(e) => setCreateForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Ex: Decoração"
                  className="bg-background"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cat-new-desc" className="text-sm font-medium">Descrição</Label>
                <Textarea
                  id="cat-new-desc"
                  rows={6}
                  value={createForm.description}
                  onChange={(e) =>
                    setCreateForm((f) => ({ ...f, description: e.target.value }))
                  }
                  placeholder="Descreva o tipo de produtos que pertencem a esta categoria..."
                  className="min-h-[160px] resize-y bg-background"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="border-t border-border pt-4">
            <Button variant="outline" onClick={() => setCreateOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreate}>Confirmar Cadastro</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCategorias;
