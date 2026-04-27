export interface UploadResult {
  url: string;
  picturePublicId: string;
}

export interface UseImageUploadOptions {
  picturePublicId?: string;
  onUpload: (result: UploadResult) => void;
  onRemove: () => void;
}
