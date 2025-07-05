"use client";

import { MultiAsyncSelect } from "@/components/open/multi-async-select";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GoFileCode } from "react-icons/go";
import ComponentContainer from "@/components/yaui/component-container";

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
          <h2 className="text-xl font-bold">Sync Usage</h2>
        </div>
        <Button className="cursor-pointer gap-0.5" variant="link">
          <Link
            href="https://github.com/yayapao/shadcn-multi-async-select/blob/main/src/app/_example/sync-select.tsx"
            target="_blank"
            rel="noopener noreferrer"
          >
            Code
          </Link>
          <GoFileCode />
        </Button>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        This example demonstrates how to use <b>the fetched options</b> to
        select multiple cities from a list of options.
      </p>
      <ComponentContainer>
        <MultiAsyncSelect
          options={options}
          onValueChange={(value) => console.log(value)}
          maxCount={3}
          className="w-[480px]"
          placeholder="Select cities"
        />
      </ComponentContainer>
    </div>
  );
};

export default SyncSelectExample;
