"use client";

import Image from "next/image";
import { useState } from "react";

export function WineImage({ src, type }: { src?: string; type?: string }) {
  const [useContain, setUseContain] = useState(false);

  // valid only if starts with http(s) or /
  const isValid =
    typeof src === "string" &&
    (src.startsWith("/") ||
      src.startsWith("http://") ||
      src.startsWith("https://") ||
      src.startsWith("data:"));

  const safeSrc = isValid ? src : "/placeholder.png"; // <-- add a default image

  return (
    <Image
      src={safeSrc}
      alt=""
      width={400}
      height={400}
      onLoadingComplete={(img) => {
        const ratio = img.naturalWidth / img.naturalHeight;
        if (ratio > 1.3 || ratio < 0.75) setUseContain(true);
      }}
      className={`${
        type === "special-bundle" ? "rounded-2xl" : "h-[100px] w-full"
      } transition-all duration-300 object-contain`}
    />
  );
}
