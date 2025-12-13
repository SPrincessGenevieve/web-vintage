import Image from "next/image";
import React from "react";

export default function SingleHeader() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Image
        width={400}
        height={400}
        alt="logo"
        className="w-25"
        src={"/logo.png"}
      ></Image>
    </div>
  );
}
