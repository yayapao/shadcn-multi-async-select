"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

export default function Logo() {
  const { theme } = useTheme();
  return (
    <Image
      src={theme === "dark" ? "/dark-logo.png" : "/light-logo.png"}
      alt="logo"
      width={42}
      height={42}
    />
  );
}
