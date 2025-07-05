import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

interface ApiDocRow {
  name: string;
  type: string;
  default: string;
  description: string;
  required?: boolean;
}

export const propsData: ApiDocRow[] = [
  {
    name: "options",
    type: "Option[]",
    default: "-",
    description: "An array of objects to be displayed in the Select.Option.",
    required: true,
  },
  {
    name: "async",
    type: "boolean",
    default: "false",
    description:
      "Whether the select is async. If true, the getting options should be async.",
  },
  {
    name: "loading",
    type: "boolean",
    default: "false",
    description:
      "Whether is fetching options. If true, the loading indicator will be shown. Works only when async is true.",
  },
  {
    name: "error",
    type: "Error | null",
    default: "null",
    description:
      "The error object. If true, the error message will be shown. Works only when async is true.",
  },
  {
    name: "defaultValue",
    type: "string[]",
    default: "[]",
    description: "The default selected values when the component mounts.",
  },
  {
    name: "value",
    type: "string[]",
    default: "undefined",
    description: "The selected values (controlled component).",
  },
  {
    name: "placeholder",
    type: "string",
    default: "Select...",
    description:
      "Placeholder text to be displayed when no values are selected.",
  },
  {
    name: "searchPlaceholder",
    type: "string",
    default: "Search...",
    description:
      "Placeholder text to be displayed when the search input is empty.",
  },
  {
    name: "maxCount",
    type: "number",
    default: "3",
    description:
      "Maximum number of items to display. Extra selected items will be summarized.",
  },
  {
    name: "modalPopover",
    type: "boolean",
    default: "false",
    description:
      "The modality of the popover. When set to true, interaction with outside elements will be disabled and only popover content will be visible to screen readers.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    description:
      "Additional class names to apply custom styles to the multi-select component.",
  },
  {
    name: "clearText",
    type: "string",
    default: "Clear",
    description: "Text to be displayed when the clear button is clicked.",
  },
  {
    name: "closeText",
    type: "string",
    default: "Close",
    description: "Text to be displayed when the close button is clicked.",
  },
  {
    name: "hideSelectAll",
    type: "boolean",
    default: "false",
    description: "Whether to hide the select all option.",
  },
  {
    name: "clearSearchOnClose",
    type: "boolean",
    default: "false",
    description: "Whether to clear search input when popover closes.",
  },
  {
    name: "searchValue",
    type: "string",
    default: "undefined",
    description:
      "Controlled search value. If provided, the component will use this value instead of internal state.",
  },
  {
    name: "popoverOptions",
    type: "PopoverContentProps & { portal?: boolean }",
    default: "null",
    description:
      "Additional options for the popover content. portal: Whether to use portal to render the popover content.",
  },
  {
    name: "labelFunc",
    type: "(option: Option, isSelected: boolean, index: number) => React.ReactNode",
    default: "null",
    description: "Custom label function to render custom option labels.",
  },
  {
    name: "onValueChange",
    type: "(value: string[]) => void",
    default: "-",
    description:
      "Callback function triggered when the selected values change. Receives an array of the new selected values.",
    required: true,
  },
  {
    name: "onSearch",
    type: "(value: string) => void",
    default: "undefined",
    description:
      "Callback function triggered when the search input changes. Receives the search input value.",
  },
];

export const columns: ColumnDef<ApiDocRow & { className?: string }>[] = [
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => (
      <div
        className={cn(
          "w-fit font-mono text-xs text-blue-500 bg-blue-500/10",
          row.original.required && "text-red-500 bg-red-500/10"
        )}
      >
        {row.original.name}
        {row.original.required && (
          <span className="text-xs text-red-500">*</span>
        )}
      </div>
    ),
  },
  {
    header: "Type",
    accessorKey: "type",
    cell: ({ row }) => (
      <div className="max-w-[120px] w-fit whitespace-break-spaces break-words font-mono text-xs text-zinc-500 bg-zinc-500/10">
        {row.original.type}
      </div>
    ),
  },
  {
    header: "Default",
    accessorKey: "default",
  },
  {
    header: "Description",
    accessorKey: "description",
    cell: ({ row }) => (
      <div className="max-w-[360px] whitespace-pre-wrap">
        {row.original.description}
      </div>
    ),
  },
];

export const refMethodsData: ApiDocRow[] = [
  {
    name: "setIsPopoverOpen",
    type: "(open: boolean) => void",
    default: "-",
    description: "Programmatically control the popover open/close state.",
  },
  {
    name: "setSearchValue",
    type: "(value: string) => void",
    default: "-",
    description: "Programmatically set the search input value.",
  },
];

export const optionInterfaceData: ApiDocRow[] = [
  {
    name: "label",
    type: "string",
    default: "-",
    description: "The display text for the option.",
    required: true,
  },
  {
    name: "value",
    type: "string",
    default: "-",
    description:
      "The unique identifier for the option. Should be unique and not empty.",
    required: true,
  },
];
