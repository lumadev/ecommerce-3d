export interface CategoryFormState {
  name: string;
  description: string;
  image: string;
  hashtags: string[];
}

export interface CategoryFormProps {
  form: CategoryFormState;
  onChange: (field: keyof CategoryFormState, value: string | string[]) => void;
  namePlaceholder?: string;
  descriptionPlaceholder?: string;
}