"use client";

import { RxGithubLogo } from "react-icons/rx";
import { Button } from "../ui/button";

export default function GithubButton() {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() =>
        window.open(
          "https://github.com/yayapao/shadcn-multi-async-select",
          "_blank"
        )
      }
    >
      <RxGithubLogo />
    </Button>
  );
}
