import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function errorMessage(err: { [key: string]: string }) {
  return Object.entries(err)
    .map(([, v]) => v)
    .join('\n');
}

export function generateSlug(name: string, semester: string): string {
  const slugBase = `${name.replace(/\//g, '')}-${semester}`;
  return slugBase.toLowerCase().replace(/\s+/g, '-');
}

export function generatePassword(): string {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const digits = '0123456789';

  const randomChars = (charset: string, length: number): string => {
    return Array.from({ length }, () => charset.charAt(Math.floor(Math.random() * charset.length))).join('');
  };

  const part1 = randomChars(letters, 4); // \w{4}
  const part2 = randomChars(digits, 4); // \d{4}

  return part1 + part2;
}
