import { SpecialVolumeT } from "@/lib/types";
import * as WineSpecialVolList from "./special-volumes";

export const wineSpecialVolume: Record<string, SpecialVolumeT> =
  Object.fromEntries(
    Array.from({ length: 8000 }, (_, i) => {
      const index = i + 1;
      return [
        index.toString(),
        (WineSpecialVolList as any)[`WineSpecialVol${index}`],
      ];
    })
  );
