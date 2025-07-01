"use client";

import * as React from "react";
import { ChevronDown, X, CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useEffect, useImperativeHandle, useRef } from "react";
import { FadeLoader } from "react-spinners";

export interface Option {
  label: string;
  value: string; // should be unique, and not empty
}

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * An array of objects to be displayed in the Select.Option.
   */
  options: Option[];

  /**
   * Whether the select is async. If true, the getting options should be async.
   * Optional, defaults to false.
   */
  async?: boolean;

  /**
   * Whether is fetching options. If true, the loading indicator will be shown.
   * Optional, defaults to false. Works only when async is true.
   */
  loading?: boolean;

  /**
   * The error object. If true, the error message will be shown.
   * Optional, defaults to null. Works only when async is true.
   */
  error?: Error | null;

  /** The default selected values when the component mounts. */
  defaultValue?: string[];

  value?: string[];

  /**
   * Placeholder text to be displayed when no values are selected.
   * Optional, defaults to "Select options".
   */
  placeholder?: string;

  /**
   * Placeholder text to be displayed when the search input is empty.
   * Optional, defaults to "Search...".
   */
  searchPlaceholder?: string;

  /**
   * Maximum number of items to display. Extra selected items will be summarized.
   * Optional, defaults to 3.
   */
  maxCount?: number;

  /**
   * The modality of the popover. When set to true, interaction with outside elements
   * will be disabled and only popover content will be visible to screen readers.
   * Optional, defaults to false.
   */
  modalPopover?: boolean;

  /**
   * Additional class names to apply custom styles to the multi-select component.
   * Optional, can be used to add custom styles.
   */
  className?: string;

  /**
   * Text to be displayed when the clear button is clicked.
   * Optional, defaults to "Clear".
   */
  clearText?: string;

  /**
   * Text to be displayed when the close button is clicked.
   * Optional, defaults to "Close".
   */
  closeText?: string;

  /**
   * Whether to use portal to render the popover content.
   * Optional, defaults to true.
   */
  portal?: boolean;

  /**
   * Whether to hide the select all option.
   * Optional, defaults to false.
   */
  hideSelectAll?: boolean;

  /**
   * Custom label function.
   * Optional, defaults to null.
   */
  labelFunc?: (
    option: Option,
    isSelected: boolean,
    index: number
  ) => React.ReactNode;

  /**
   * Callback function triggered when the selected values change.
   * Receives an array of the new selected values.
   */
  onValueChange: (value: string[]) => void;

  /**
   * Callback function triggered when the search input changes.
   * Receives the search input value.
   */
  onSearch?: (value: string) => void;
}

interface MultiAsyncSelectRef {
  setIsPopoverOpen: (open: boolean) => void;
}

export const MultiAsyncSelect = React.forwardRef<MultiAsyncSelectRef, Props>(
  (
    {
      options,
      onValueChange,
      onSearch,
      value,
      defaultValue = [],
      placeholder = "Select options",
      searchPlaceholder = "Search...",
      clearText = "Clear",
      closeText = "Close",
      maxCount = 3,
      modalPopover = false,
      loading = false,
      async = false,
      error = null,
      portal = true,
      hideSelectAll = false,
      labelFunc,
    },
    ref
  ) => {
    const [selectedValues, setSelectedValues] =
      React.useState<string[]>(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [reserveOptions, setReserveOptions] = React.useState<
      Record<string, Option>
    >({});
    const optionsRef = useRef<Record<string, Option>>({});
    const isInit = useRef(false);

    const handleInputKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      // 如果按下的是回车键，则保持弹窗打开
      if (event.key === "Enter") {
        setIsPopoverOpen(true);
      } else if (event.key === "Backspace" && !event.currentTarget.value) {
        // 如果按下的是退格键并且输入框为空，则删除最后一个选中的值
        const newSelectedValues = [...selectedValues];
        newSelectedValues.pop();
        setSelectedValues(newSelectedValues);
        onValueChange(newSelectedValues);
      }
    };

    const toggleOption = (option: string) => {
      const isAddon = selectedValues.includes(option);
      const newSelectedValues = isAddon
        ? selectedValues.filter((value) => value !== option)
        : [...selectedValues, option];
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const handleClear = () => {
      setSelectedValues([]);
      onValueChange([]);
    };

    const clearExtraOptions = () => {
      const newSelectedValues = selectedValues.slice(0, maxCount);
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const toggleAll = () => {
      if (selectedValues.length === options.length) {
        handleClear();
      } else {
        const allValues = options.map((option) => option.value);
        setSelectedValues(allValues);
        onValueChange(allValues);
      }
    };

    // 使用 optionsRef 来记录 options 已选项目，同时控制其 size 减少对性能的影响
    useEffect(() => {
      const temp = options.reduce((acc, option) => {
        acc[option.value] = option;
        return acc;
      }, {} as Record<string, Option>);
      if (async) {
        // 初始化时，使用 options 来生成 optionsRef
        if (!isInit.current) {
          optionsRef.current = temp;
          setReserveOptions(temp);
          isInit.current = true;
        } else {
          // 当 options 变化时，仅保留上一次 selectedValues 中存在的选项
          const temp2 = selectedValues.reduce((acc, value) => {
            const option = optionsRef.current[value];
            if (option) {
              acc[option.value] = option;
            }
            return acc;
          }, {} as Record<string, Option>);
          optionsRef.current = {
            ...temp,
            ...temp2,
          };
          setReserveOptions({
            ...temp,
            ...temp2,
          });
        }
      }
    }, [async, options, selectedValues]);

    useEffect(() => {
      if (value) {
        setSelectedValues(value);
      }
    }, [value]);

    useImperativeHandle(ref, () => ({
      setIsPopoverOpen,
    }));

    return (
      <Popover
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
        modal={modalPopover}
      >
        <PopoverTrigger asChild>
          <div className="cursor-pointer flex h-auto min-h-[36px] w-full min-w-[160px] items-center justify-between rounded-md border border-input bg-background px-2 py-0.5 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            {selectedValues.length > 0 ? (
              <div className="flex justify-between items-center w-full">
                <div className="flex flex-wrap items-center gap-1 overflow-x-auto">
                  {selectedValues.slice(0, maxCount).map((value) => {
                    let option: Option | undefined;
                    if (async) {
                      option = reserveOptions[value];
                    } else {
                      option = options.find((option) => option.value === value);
                    }
                    return (
                      <div
                        className="h-[26px] flex items-center gap-1 rounded-md px-2 py-0.5 border border-zinc-200 text-zinc-600 hover:text-primary dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-primary hover:border-zinc-400 dark:hover:border-zinc-600"
                        key={value}
                      >
                        <div className="flex items-center gap-1 truncate text-xs max-w-[100px] ">
                          {option?.label}
                        </div>
                        <X
                          className=" h-3 w-3 p-1 box-content shrink-0 cursor-pointer text-zinc-500 hover:bg-zinc-100 rounded-full dark:hover:bg-zinc-800"
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleOption(value);
                          }}
                        />
                      </div>
                    );
                  })}
                  {selectedValues.length > maxCount && (
                    <Badge variant="outline">
                      <span>{`+ ${selectedValues.length - maxCount}`}</span>
                      <X
                        className="ml-2 h-3 w-3 p-1 box-content shrink-0 cursor-pointer text-zinc-300 dark:text-zinc-500 hover:bg-zinc-100 hover:text-primary rounded-full dark:hover:bg-zinc-800"
                        onClick={(event) => {
                          event.stopPropagation();
                          clearExtraOptions();
                        }}
                      />
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <X
                    className="ml-2 h-4 w-4 p-1 box-content shrink-0 cursor-pointer text-zinc-300 dark:text-zinc-500 hover:bg-zinc-100 hover:text-primary rounded-full dark:hover:bg-zinc-800"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleClear();
                    }}
                  />
                  <Separator
                    orientation="vertical"
                    className="flex min-h-6 h-full mx-2"
                  />
                  <ChevronDown className="h-4 cursor-pointer text-zinc-300 dark:text-zinc-500 hover:text-primary" />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full mx-auto">
                <span className="text-[12px] font-normal text-zinc-500">
                  {placeholder}
                </span>
                <ChevronDown className="h-4 cursor-pointer text-zinc-300 dark:text-zinc-500" />
              </div>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent
          portal={portal}
          className="w-auto p-0"
          align="start"
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
        >
          <Command shouldFilter={!async}>
            <CommandInput
              placeholder={searchPlaceholder}
              onValueChange={(value: string) => {
                if (onSearch) {
                  onSearch(value);
                }
              }}
              onKeyDown={handleInputKeyDown}
            />
            <CommandList>
              {async && error && (
                <div className="p-4 text-destructive text-center">
                  {error.message}
                </div>
              )}
              {async && loading && options.length === 0 && (
                <div className="flex justify-center py-6 items-center h-full">
                  <FadeLoader
                    color="#ffa500"
                    style={{
                      transform: "scale(0.38)",
                      position: "relative",
                      top: "-1px",
                    }}
                  />
                </div>
              )}
              {async ? (
                !loading &&
                !error &&
                options.length === 0 && (
                  <div className="pt-6 pb-4 text-center text-xs">
                    {`No result found.`}
                  </div>
                )
              ) : (
                <CommandEmpty>{`No result found.`}</CommandEmpty>
              )}
              <CommandGroup>
                {/* 异步模式不需要全选 */}
                {!async && !hideSelectAll && (
                  <CommandItem
                    key="all"
                    onSelect={toggleAll}
                    className="cursor-pointer"
                  >
                    <div
                      className={cn(
                        "mr-1 size-4 flex items-center justify-center rounded-[4px] border border-primary shadow-xs transition-shadow outline-none",
                        selectedValues.length === options.length
                          ? "bg-primary text-primary-foreground border-primary"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className="size-3.5 text-white dark:text-black" />
                    </div>
                    <span>Select all</span>
                  </CommandItem>
                )}
                {options.map((option, index) => {
                  const isSelected = selectedValues.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => toggleOption(option.value)}
                      className="cursor-pointer text-xs"
                    >
                      <div
                        className={cn(
                          "mr-1 size-4 flex items-center justify-center rounded-[4px] border border-primary shadow-xs transition-shadow outline-none",
                          isSelected
                            ? "bg-primary text-primary-foreground border-primary"
                            : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <CheckIcon className="size-3.5 text-white dark:text-black" />
                      </div>
                      <>
                        {labelFunc ? (
                          labelFunc(option, isSelected, index)
                        ) : (
                          <span>{option.label}</span>
                        )}
                      </>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <div className="flex items-center justify-between">
                  {selectedValues.length > 0 && (
                    <>
                      <CommandItem
                        onSelect={handleClear}
                        className="flex-1 justify-center cursor-pointer"
                      >
                        {clearText}
                      </CommandItem>
                      <Separator
                        orientation="vertical"
                        className="flex min-h-6 h-full"
                      />
                    </>
                  )}
                  <CommandItem
                    onSelect={() => setIsPopoverOpen(false)}
                    className="flex-1 justify-center cursor-pointer max-w-full"
                  >
                    {closeText}
                  </CommandItem>
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

MultiAsyncSelect.displayName = "MultiAsyncSelect";
