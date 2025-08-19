import { type ClassValue, clsx } from 'clsx';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function strLimit(text: string = '', limit: number = 50, end: string = '...'): string {
  if (text.length <= limit) return text;
  return text.slice(0, limit - end.length) + end;
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

export const hasRole = (roles: string[], allowed: string[]) => roles.some((role) => allowed.includes(role));

export function groupBy<T, K extends keyof T>(array: T[], key: K): Record<string, T[]> {
  return array.reduce(
    (acc, item) => {
      const groupKey = String(item[key]);
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(item);
      return acc;
    },
    {} as Record<string, T[]>,
  );
}

export function maskName(input: string): string {
  return input
    .split(' ')
    .map((word) => {
      if (word.length <= 2) return word; // kalo cuma 1-2 huruf, gak usah masking

      const first = word[0];
      const last = word[word.length - 1];
      const middle = '•'.repeat(word.length - 2);

      return `${first}${middle}${last}`;
    })
    .join(' ');
}

export function dateDFY(date: string | Date) {
  return dayjs(date).format('DD MMMM YYYY');
}

export function dateDFYHis(date: string | Date) {
  return dayjs(date).format('DD MMMM YYYY HH:mm:ss');
}

export function formatRupiah(angka: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(angka);
}

export function capitalizeWords(str: string): string {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
