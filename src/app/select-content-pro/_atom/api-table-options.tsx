import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';

interface ApiDocRow {
  name: string;
  type: string;
  default: string;
  description: string;
  required?: boolean;
}

export const propsData: ApiDocRow[] = [
  {
    name: 'options',
    type: 'Option[]',
    default: '-',
    description: 'An array of objects to be displayed in the Select.',
    required: true,
  },
  {
    name: 'portal',
    type: 'boolean',
    default: 'true',
    description:
      'Whether to use portal to render the content, mounting it to the body.',
  },
  {
    name: 'disableSearch',
    type: 'boolean',
    default: 'false',
    description: 'Whether to disable the search functionality.',
  },
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    description:
      'Additional class names to apply custom styles to the component.',
  },
  {
    name: 'groudKey',
    type: 'string',
    default: 'undefined',
    description:
      'Key to use for grouping options. If provided, options will be displayed in groups.',
  },
  {
    name: 'groupLabel',
    type: '(item: EnhancedOption) => string | React.ReactNode',
    default: 'undefined',
    description: 'Custom function to render group labels.',
  },
  {
    name: 'labelFunc',
    type: '(item: EnhancedOption) => string | React.ReactNode',
    default: 'undefined',
    description: 'Custom function to render option labels.',
  },
  {
    name: 'hiddenFunc',
    type: '(item: EnhancedOption, value: string) => boolean',
    default: 'undefined',
    description:
      'Custom function to determine if an option should be hidden based on search value.',
  },
  {
    name: 'onSearch',
    type: '(value: string) => void',
    default: 'undefined',
    description: 'Callback function triggered when the search input changes.',
  },
  {
    name: 'onCreate',
    type: '(name: string, clearSearch: () => void) => Promise<void> | void',
    default: 'undefined',
    description:
      'Callback function to create a new item. If provided, a create button will be shown.',
  },
  {
    name: 'createButtonText',
    type: 'string',
    default: 'Create',
    description: 'Text to display on the create button.',
  },
  {
    name: 'createPromptText',
    type: 'string',
    default: 'No results found, would you like to create a new item?',
    description: 'Text to display as prompt when creating a new item.',
  },
  {
    name: 'createHintText',
    type: 'string',
    default:
      'You can modify the name and click create, or press Enter to create quickly',
    description: 'Hint text displayed in the create item form.',
  },
  {
    name: 'noResultsText',
    type: 'string',
    default: 'No result found',
    description: 'Text to display when no results match the search.',
  },
  {
    name: 'autoFocusCreateInput',
    type: 'boolean',
    default: 'false',
    description: 'Whether to automatically focus the input in the create form.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    default: 'undefined',
    description: 'Custom content to render inside the select content.',
  },
];

export const columns: ColumnDef<ApiDocRow & { className?: string }>[] = [
  {
    header: 'Name',
    accessorKey: 'name',
    cell: ({ row }) => (
      <div
        className={cn(
          'w-fit font-mono text-xs text-blue-500 bg-blue-500/10',
          row.original.required && 'text-red-500 bg-red-500/10'
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
    header: 'Type',
    accessorKey: 'type',
    cell: ({ row }) => (
      <div className="max-w-[120px] w-fit whitespace-break-spaces break-words font-mono text-xs text-zinc-500 bg-zinc-500/10">
        {row.original.type}
      </div>
    ),
  },
  {
    header: 'Default',
    accessorKey: 'default',
    cell: ({ row }) => (
      <div className="max-w-[140px] whitespace-pre-wrap">
        {row.original.default}
      </div>
    ),
  },
  {
    header: 'Description',
    accessorKey: 'description',
    cell: ({ row }) => (
      <div className="max-w-[320px] whitespace-pre-wrap">
        {row.original.description}
      </div>
    ),
  },
];

export const optionInterfaceData: ApiDocRow[] = [
  {
    name: 'label',
    type: 'string',
    default: '-',
    description: 'The display text for the option.',
    required: true,
  },
  {
    name: 'value',
    type: 'string | number',
    default: '-',
    description: 'The unique identifier for the option.',
    required: true,
  },
];

export const enhancedOptionInterfaceData: ApiDocRow[] = [
  {
    name: 'label',
    type: 'string',
    default: '-',
    description: 'The display text for the option.',
    required: true,
  },
  {
    name: 'value',
    type: 'string | number',
    default: '-',
    description: 'The unique identifier for the option.',
    required: true,
  },
  {
    name: 'hidden',
    type: 'boolean',
    default: 'undefined',
    description: 'Whether the option should be hidden in the dropdown.',
  },
  {
    name: 'children',
    type: 'EnhancedOption[]',
    default: 'undefined',
    description: 'Child options for grouped options.',
  },
];

export const selectSearchPropsData: ApiDocRow[] = [
  {
    name: 'value',
    type: 'string',
    default: "''",
    description: 'The current search input value.',
  },
  {
    name: 'onChange',
    type: '(value: string) => void',
    default: 'undefined',
    description: 'Callback function triggered when the search input changes.',
  },
  {
    name: 'onClear',
    type: '() => void',
    default: 'undefined',
    description:
      'Callback function triggered when the clear button is clicked.',
  },
  {
    name: 'showCreateButton',
    type: 'boolean',
    default: 'false',
    description: 'Whether to show the create button.',
  },
  {
    name: 'onToggleCreate',
    type: '() => void',
    default: 'undefined',
    description:
      'Callback function triggered when the create button is clicked.',
  },
  {
    name: 'isCreateFormVisible',
    type: 'boolean',
    default: 'false',
    description: 'Whether the create form is visible.',
  },
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    description: 'Additional class names to apply custom styles.',
  },
];

export const createItemFormPropsData: ApiDocRow[] = [
  {
    name: 'searchValue',
    type: 'string',
    default: '-',
    description: 'The current search input value to pre-fill the create form.',
    required: true,
  },
  {
    name: 'onCreate',
    type: '(name: string) => Promise<void>',
    default: '-',
    description: 'Callback function to create a new item.',
    required: true,
  },
  {
    name: 'createButtonText',
    type: 'string',
    default: 'Create',
    description: 'Text to display on the create button.',
  },
  {
    name: 'createPromptText',
    type: 'string',
    default: 'No results found, would you like to create a new item?',
    description: 'Text to display as prompt when creating a new item.',
  },
  {
    name: 'createHintText',
    type: 'string',
    default:
      'You can modify the name and click create, or press Enter to create quickly',
    description: 'Hint text displayed in the create item form.',
  },
  {
    name: 'autoFocus',
    type: 'boolean',
    default: 'false',
    description: 'Whether to automatically focus the input in the create form.',
  },
];
