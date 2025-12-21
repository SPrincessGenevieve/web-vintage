import { VintexDetailsT } from "@/lib/types";
import * as Wines from "./vintex"


export const wineVintex: Record<string, VintexDetailsT> =
  Object.fromEntries(
    Array.from({ length: 80 }, (_, i) => {
      const index = i + 1;
      return [index.toString(), (Wines as any)[`Wine${index}`]];
    })
  );
