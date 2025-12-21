"use client";

import Image from "next/image";
import { useState } from "react";

export function WineImage({ src, type }: { src: string, type?: string }) {
  const [useContain, setUseContain] = useState(false);
  console.log("TYPE: ", type)

  return (
    <Image
      src={src}
      alt=""
      width={400}
      height={400}
      onLoadingComplete={(img) => {
        const ratio = img.naturalWidth / img.naturalHeight;

        // tweak threshold if needed
        if (ratio > 1.3 || ratio < 0.75) {
          setUseContain(true);
        }
      }}
      className={`${type === "special-bundle" ? "rounded-2xl" : "h-[100px] w-full"} transition-all duration-300 ${
        type !== "special-bundle" && useContain ? "object-contain" : "object-cover"
      }`}
    />
  );
}
