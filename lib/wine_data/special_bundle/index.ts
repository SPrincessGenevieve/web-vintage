import { SpecialBundleT } from "@/lib/types";
import * as WineSpecialBundleList from "./special-bundle";

export const wineSpecialBundle: Record<string, SpecialBundleT> =
  Object.fromEntries(
    Array.from({ length: 8000 }, (_, i) => {
      const index = i + 1;
      return [
        index.toString(),
        (WineSpecialBundleList as any)[`WineBundle${index}`],
      ];
    })
  );
