import { LineShadowText } from "@/components/magicui/line-shadow-text";
import MultiAsyncSelectClient from "./client";
import { Button } from "@/components/ui/button";
import { PiCopySimple } from "react-icons/pi";
import Link from "next/link";

export default async function MultiAsyncSelectPage() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/city`);
  const cities = await data.json();
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-4 mt-16 md:mt-24 justify-center items-center">
      <div className="flex items-center justify-between">
        <h1 className="text-balance text-[36px] font-semibold leading-none tracking-tighter">
          Multi Async
          <LineShadowText className="italic pl-2">Select</LineShadowText>
        </h1>
      </div>
      <div className="flex flex-col gap-4 justify-between">
        <Button variant="link" size="sm">
          <Link
            className="flex flex-row items-center"
            href="https://github.com/yayapao/shadcn-multi-async-select/blob/main/src/components/open-source/multi-async-select.tsx"
            target="_blank"
            rel="noopener noreferrer"
          >
            Copy component
            <PiCopySimple />
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
      <div className="w-full">
        <MultiAsyncSelectClient options={cities.data} />
      </div>
    </div>
  );
}
