"use client";
import { useMutation } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { MultiAsyncSelect } from "@/components/open/multi-async-select";
import { Button } from "@/components/ui/button";
import { GoFileCode } from "react-icons/go";
import Link from "next/link";
import ComponentContainer from "@/components/yaui/component-container";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { LucideAirplay, LucideAlarmClockCheck } from "lucide-react";

const AsyncSelectExample = () => {
  const [clearSearchOnClose, setClearSearchOnClose] = useState(false);
  const [customizedLabel, setCustomizedLabel] = useState(false);
  const { isPending, data, error, reset, mutate } = useMutation({
    mutationFn: async (searchString: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/city?keyword=${searchString}`
      );
      await new Promise((resolve) => setTimeout(resolve, 200));
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
  }, 100);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Async & Multi-select</h2>
        </div>
        <Button className="cursor-pointer gap-0.5" variant="link">
          <Link
            href="https://github.com/yayapao/shadcn-multi-async-select/blob/main/src/app/_atom/async-select-example.tsx"
            target="_blank"
            rel="noopener noreferrer"
          >
            Code
          </Link>
          <GoFileCode />
        </Button>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        This example demonstrates{" "}
        <b>
          how to use the MultiAsyncSelect component and fetch the options from
          an API
        </b>{" "}
        to select multiple cities from a list of options.
      </p>
      <ComponentContainer>
        <div className="flex items-center gap-x-4 mb-4 w-[480px]">
          <div className="flex items-center space-x-2">
            <Switch
              id="clear-search-on-close"
              onCheckedChange={setClearSearchOnClose}
            />
            <Tooltip>
              <TooltipTrigger>
                <Label htmlFor="clear-search-on-close">
                  Clear search on close
                </Label>
              </TooltipTrigger>
              <TooltipContent className="bg-primary text-primary-foreground">
                <div className="space-y-2">
                  <h5 className="text-sm font-semibold">How it works:</h5>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>
                      Type something in the search input and close the popover
                    </li>
                    <li>
                      Reopen the popover - the search value should be preserved
                    </li>
                    <li>
                      Toggle the &ldquo;Clear search on close&rdquo; checkbox to
                      change this behavior
                    </li>
                    <li>
                      Use the external buttons to control the popover and search
                      value
                    </li>
                  </ul>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="customized-label"
              onCheckedChange={setCustomizedLabel}
            />
            <Label htmlFor="customized-label">Customized label</Label>
          </div>
        </div>
        <MultiAsyncSelect
          loading={isPending}
          error={error}
          options={data?.data || []}
          onValueChange={(value) => console.log(value)}
          onSearch={handleSearch}
          className="w-[480px]"
          searchPlaceholder="search city..."
          placeholder="Select cities..."
          maxCount={3}
          async
          clearSearchOnClose={clearSearchOnClose}
          labelFunc={
            customizedLabel
              ? (option, isSelected, index) => (
                  <div
                    className={cn(
                      "flex items-center gap-x-1",
                      isSelected && "text-blue-500"
                    )}
                  >
                    {index % 2 ? (
                      <LucideAirplay className="scale-75" />
                    ) : (
                      <LucideAlarmClockCheck className="scale-75" />
                    )}
                    <span>{option.label}</span>
                    <span className="text-xs text-gray-500">
                      ({option.value})
                    </span>
                  </div>
                )
              : undefined
          }
        />
      </ComponentContainer>
    </div>
  );
};

export default AsyncSelectExample;
