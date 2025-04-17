"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AsyncSelectExample from "./_atom/async-select-example";
import SelectFormExample from "./_atom/select-form-example";
import SyncSelectExample from "./_atom/sync-select-example";

export interface Option {
  label: string;
  value: string; // should be unique, and not empty
}

type Props = {
  options: Option[];
};

export default function MultiAsyncSelectClient({ options }: Props) {
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
            <h5 className="text-sm font-medium mb-4">
              Async data-loading multi-select, support search & debounce, built
              with shadcn/ui{" "}
              <a
                href="https://ui.shadcn.com/docs/components/popover"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Popover
              </a>
              ,{" "}
              <a
                href="https://ui.shadcn.com/docs/components/command"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Command
              </a>
              , and more.
            </h5>
            <AsyncSelectExample />
          </div>
        </TabsContent>
        <TabsContent value="sync">
          <div>
            <h5 className="text-sm font-medium mb-4">
              Sync multi-select is also supported.
            </h5>
            <SyncSelectExample options={options} />
          </div>
        </TabsContent>
        <TabsContent value="form">
          <div>
            <h5 className="text-sm font-medium mb-2">Form and async select</h5>
            <SelectFormExample />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
