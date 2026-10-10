const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const isBlank = (value: string) => value.trim().length === 0;

export const isValidEmail = (value: string) => EMAIL_PATTERN.test(value.trim());

export const isValidSlug = (value: string) => SLUG_PATTERN.test(value.trim());

export const exceedsMaxLength = (value: string, max: number) => value.trim().length > max;

export const passwordsMatch = (password: string, confirmation: string) =>
  password === confirmation;
