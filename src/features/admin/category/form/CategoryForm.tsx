import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";

import { ImageUploadField } from "@/features/file";
import HashtagsField from "../components/HashtagsField";

export interface CategoryFormState {
  name: string;
  description: string;
  image: string;
  hashtags: string[];
}

interface Props {
  form: CategoryFormState;
  onChange: (field: keyof CategoryFormState, value: string | string[]) => void;
  namePlaceholder?: string;
  descriptionPlaceholder?: string;
}

const CategoryForm = ({
  form,
  onChange,
  namePlaceholder = "Ex: Decoração",
  descriptionPlaceholder = "Descreva o tipo de produtos que pertencem a esta categoria...",
}: Props) => {

  return (
    <div className="grid gap-6 py-2 md:grid-cols-[240px_1fr]">
      <ImageUploadField
        label="Foto da categoria"
        value={form.image}
        onChange={(v) => onChange("image", v)}
      />

      <div className="grid gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="cat-name" className="text-sm font-medium">
            Nome
          </Label>
          <Input
            id="cat-name"
            value={form.name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder={namePlaceholder}
            className="bg-background"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="cat-description" className="text-sm font-medium">
            Descrição
          </Label>
          <Textarea
            id="cat-description"
            rows={6}
            value={form.description}
            onChange={(e) => onChange("description", e.target.value)}
            placeholder={descriptionPlaceholder}
            className="min-h-[200px] resize-y bg-background"
          />
        </div>

        <HashtagsField
          value={form.hashtags}
          onChange={(tags) => onChange("hashtags", tags)}
        />
      </div>
    </div>
  );
};

export default CategoryForm;
