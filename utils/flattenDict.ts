// Shared flatten utility — used both server-side (SSG) and client-side.
export type FlatMessages = Record<string, string>;

export function flatten(obj: Record<string, unknown>, prefix = ""): FlatMessages {
  const result: FlatMessages = {};
  for (const key in obj) {
    const path = prefix ? `${prefix}.${key}` : key;
    const val = obj[key];
    if (val !== null && typeof val === "object" && !Array.isArray(val)) {
      Object.assign(result, flatten(val as Record<string, unknown>, path));
    } else {
      result[path] = String(val);
    }
  }
  return result;
}
