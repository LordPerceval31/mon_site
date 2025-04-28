// Cette fonction utilitaire combine les classes CSS conditionnellement
// Elle est inspirée de la fonction clsx/classnames

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}