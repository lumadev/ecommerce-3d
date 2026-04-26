export interface CategoryFormState {
  name: string;
  description: string;
  url: string;
  picturePublicId: string;
  hashtags: string[];
}

export interface CategoryFormProps {
  form: CategoryFormState;
  onChange: (field: keyof CategoryFormState, value: string | string[]) => void;
  namePlaceholder?: string;
  descriptionPlaceholder?: string;
}