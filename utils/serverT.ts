import { getDictionary } from "./getDictionary";
import { flatten } from "./flattenDict";

export const LOCALES = ["en", "cs", "sk", "de", "es", "fr", "pt", "nl", "pl", "it"] as const;

export type TFn = (key: string, params?: Record<string, string | number>) => string;

export async function getServerT(locale: string): Promise<{ t: TFn }> {
  const dict = await getDictionary(locale);
  const msgs = flatten(dict as Record<string, unknown>);
  const t: TFn = (key, params) => {
    let text = msgs[key] ?? key;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        text = text.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
      }
    }
    return text;
  };
  return { t };
}
