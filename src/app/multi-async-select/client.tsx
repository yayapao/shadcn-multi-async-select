"use client";

import { MultiAsyncSelect } from "@/components/open-source/multi-async-select";

interface Option {
  label: string;
  value: string; // should be unique, and not empty
}

type Props = {
  options: Option[];
};

export default function MultiAsyncSelectClient({ options }: Props) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <h5 className="text-sm font-medium mb-2">
          Also support multiple select only
        </h5>
        <MultiAsyncSelect
          options={options}
          onValueChange={(value) => console.log(value)}
          className="w-[540px]"
        />
      </div>
    </div>
  );
}
