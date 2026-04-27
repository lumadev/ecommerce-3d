import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";

import { CategoryFormProps } from "@/features/admin/category/types/category-form.types";
import HashtagsField from "../components/HashtagsField";
import CategoryImageUploadField from "./CategoryImageUploadField";

const CategoryForm = ({
  form,
  onChange,
  namePlaceholder = "Ex: Decoração",
  descriptionPlaceholder = "Descreva o tipo de produtos que pertencem a esta categoria...",
}: CategoryFormProps) => {

  return (
    <div className="grid gap-6 py-2 md:grid-cols-[340px_1fr] lg:grid-cols-[380px_1fr]">
      <CategoryImageUploadField
        label="Foto da categoria"
        value={form.url}
        picturePublicId={form.picturePublicId}
        name={form.name}
        description={form.description}
        hashtags={form.hashtags}
        onChange={(v) => onChange("url", v)}
        onUploadComplete={(data) => onChange("picturePublicId", data.picturePublicId)}
        onRemove={() => onChange("picturePublicId", "")}
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
