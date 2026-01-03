import { WineRareResultsT } from "@/lib/types";
import * as WineRareList from "./rare";

export const wineRareData: Record<string, WineRareResultsT> =
  Object.fromEntries(
    Array.from({ length: 8000 }, (_, i) => {
      const index = i + 1;
      return [index.toString(), (WineRareList as any)[`WineRare${index}`]];
    })
  );
