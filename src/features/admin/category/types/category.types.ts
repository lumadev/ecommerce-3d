export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  hashtags: string[];
}

export interface CreateCategoryData {
  name: string;
  description: string;
  image: string;
  hashtags?: string[];
}

export interface UpdateCategoryData {
  name?: string;
  description?: string;
  image?: string;
  hashtags?: string[];
}