import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { Button } from "@/components/ui/button";
import { BiSolidCopyAlt } from "react-icons/bi";
import Link from "next/link";

export default function HomeHeader() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-balance text-[36px] font-semibold leading-none tracking-tighter">
          <LineShadowText className="italic pl-2">
            Multi Async Select
          </LineShadowText>
        </h1>
      </div>
      <div className="flex flex-col gap-4 justify-between">
        <Button variant="link" size="sm">
          <Link
            className="flex flex-row items-center gap-0.5"
            href="https://github.com/yayapao/shadcn-multi-async-select/blob/main/src/components/open-source/multi-async-select.tsx"
            target="_blank"
            rel="noopener noreferrer"
          >
            Copy component
            <BiSolidCopyAlt />
          </Link>
        </Button>
      </div>
      <div className="text-balance text-lg">
        An async data-loading multi-select component built with{" "}
        <a
          href="https://ui.shadcn.com/"
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          shadcn/ui.
        </a>
      </div>
    </div>
  );
}
