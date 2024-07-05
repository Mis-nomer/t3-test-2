import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function serialize(obj: Record<string, unknown>, prefix = ""): string {
  const pairs = [];

  for (const [key, value] of Object.entries(obj)) {
    if (value === null || typeof value === "undefined") continue;

    const encodedKey = encodeURIComponent(prefix ? `${prefix}[${key}]` : key);

    if (typeof value === "object" && !Array.isArray(value)) {
      pairs.push(...serialize(value as Record<string, unknown>, encodedKey));
    } else if (Array.isArray(value)) {
      value.forEach((item) =>
        pairs.push(`${encodedKey}[]=${encodeURIComponent(String(item))}`),
      );
    } else {
      pairs.push(`${encodedKey}=${encodeURIComponent(String(value))}`);
    }
  }

  return pairs.join("&");
}
