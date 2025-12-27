/**
 * Removes keys from the object whose values are `undefined`.
 *
 * @param params - The object to clean
 * @returns A new object without `undefined` values
 */
export function cleanParams<T extends Record<string, any>>(
  params?: T
): Partial<T> {
  const cleaned: Partial<T> = {};

  for (const key in params) {
    if (params[key] !== undefined && params[key] !== "") {
      cleaned[key] = params[key];
    }
  }

  return cleaned;
}
