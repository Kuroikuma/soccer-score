import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatName(fullName: string): string {
  const [firstName, lastName] = fullName.split(' ');
  
  if (!firstName || !lastName) {
    throw new Error('El nombre debe contener al menos un nombre y un apellido.');
  }

  const initial = firstName[0].toUpperCase(); // Toma la primera letra del nombre
  const formattedLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase(); // Capitaliza el apellido

  return `${initial}. ${formattedLastName}`;
}
