import { VintexDetailsT } from "@/lib/types";
import * as Wines from "./vintex";

export const wineVintex: Record<string, VintexDetailsT> =
  Object.fromEntries(
    Array.from({ length: 8000 }, (_, i) => {
      const index = i + 1;
      const wine: VintexDetailsT = (Wines as any)[`Wine${index}`];

      if (!wine) return null;

      // Use the "wine" property from default_vintage as key if available
      const wineKey = wine.results?.[0]?.wine ?? index;

      return [wineKey.toString(), wine];
    }).filter(Boolean) as [string, VintexDetailsT][]
  );
