import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";

/**
 * Sanitizes a string to prevent XSS attacks.
 *
 * @param text The string to be sanitized.
 * @returns The sanitized string.
 */
export default function sanitizeText(text: string) {
  const window = new JSDOM("").window;
  const purify = DOMPurify(window);
  const clean = purify.sanitize(text);
  return clean;
}
