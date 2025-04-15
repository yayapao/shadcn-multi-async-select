"use client";

import { MultiAsyncSelect } from "@/components/open-source/multi-async-select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMutation } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

interface Option {
  label: string;
  value: string; // should be unique, and not empty
}

type Props = {
  options: Option[];
};

export default function MultiAsyncSelectClient({ options }: Props) {
  const { isPending, data, error, reset, mutate } = useMutation({
    mutationFn: async (searchString: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/city?keyword=${searchString}`
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return res.json();
    },
  });

  const handleSearch = useDebouncedCallback((value: string) => {
    if (!value) {
      // clear data
      reset();
    } else {
      mutate(value);
    }
  }, 500);

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <Tabs defaultValue="async" className="w-[540px]">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="async">Async</TabsTrigger>
          <TabsTrigger value="sync">Sync</TabsTrigger>
          <TabsTrigger value="form">Form</TabsTrigger>
        </TabsList>
        <TabsContent value="async">
          <div>
            <h5 className="text-sm font-medium mb-2">
              Async data-loading multi-select, support search & debounce, built
              with shadcn/ui popover, command, and more.
            </h5>
            <MultiAsyncSelect
              loading={isPending}
              error={error}
              options={data?.data || []}
              onValueChange={(value) => console.log(value)}
              className="w-[540px]"
              onSearch={handleSearch}
              async
            />
          </div>
        </TabsContent>
        <TabsContent value="sync">
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
        </TabsContent>
        <TabsContent value="form">
          <div>
            <h5 className="text-sm font-medium mb-2">Form</h5>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
