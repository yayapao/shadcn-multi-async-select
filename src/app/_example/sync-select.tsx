"use client";

import { MultiAsyncSelect } from "@/components/open/multi-async-select";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GoFileCode } from "react-icons/go";

interface Props {
  options: {
    label: string;
    value: string;
  }[];
}

const SyncSelectExample = ({ options }: Props) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h5 className="text-sm font-medium">Sync & Multi-select</h5>
        </div>
        <Button className="cursor-pointer gap-0.5" variant="link">
          <Link
            href="https://github.com/yayapao/shadcn-multi-async-select/blob/main/src/app/_atom/sync-select-example.tsx"
            target="_blank"
            rel="noopener noreferrer"
          >
            Code
          </Link>
          <GoFileCode />
        </Button>
      </div>
      <div className="text-xs text-zinc-500 mb-1">
        This means the options are already loaded, and you may only want the
        multi-select.
      </div>
      <div className="h-[260px] flex items-center justify-center border border-zinc-200 rounded-md">
        <div className="w-[480px]">
          <MultiAsyncSelect
            options={options}
            onValueChange={(value) => console.log(value)}
            maxCount={3}
          />
        </div>
      </div>
    </div>
  );
};

export default SyncSelectExample;
