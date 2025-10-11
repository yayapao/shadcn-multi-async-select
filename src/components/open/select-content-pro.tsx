'use client';
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from '@/components/ui/select';
import { MagnifyingGlassIcon, Cross2Icon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDebouncedCallback } from 'use-debounce';
import { cn } from '@/lib/utils';

// Option interface to define the structure of selectable options
interface Option {
  label: string;
  value: string | number;
}

// Enhanced option type with additional properties
interface EnhancedOption extends Option {
  hidden?: boolean;
  children?: EnhancedOption[];
}

// SelectSearch is a search input component with optional clear and create buttons
const SelectSearch = React.forwardRef<
  HTMLInputElement,
  {
    value?: string;
    onChange?: (value: string) => void;
    onClear?: () => void;
    showCreateButton?: boolean;
    onToggleCreate?: () => void;
    isCreateFormVisible?: boolean;
    className?: string;
  }
>(
  (
    {
      className,
      value = '',
      onChange,
      onClear,
      showCreateButton = false,
      onToggleCreate,
      isCreateFormVisible = false,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
      if (inputRef.current) {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      }
    }, []);

    const handleClear = () => {
      if (onClear) {
        onClear();
      } else if (onChange) {
        onChange('');
      }

      // Focus back on the search input
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    return (
      <div
        className={cn('flex items-center border-b px-3', className)}
        {...props}
      >
        <MagnifyingGlassIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <input
          ref={inputRef}
          className="flex h-8 w-full rounded-md bg-transparent py-3 text-[12px] outline-none placeholder:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-zinc-400"
          placeholder="Search..."
          autoComplete="off"
          autoFocus
          type="text"
          value={value}
          onKeyDown={(e) => {
            // Prevent keyboard navigation when typing in search
            if (e.key.length === 1) {
              e.stopPropagation();
            }
          }}
          onChange={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onChange?.(e.target.value);
          }}
        />
        <div className="flex items-center">
          {value && (
            <Cross2Icon
              className="h-4 w-4 shrink-0 opacity-50 cursor-pointer hover:opacity-100 mr-2"
              onClick={handleClear}
            />
          )}
          {showCreateButton && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-1.5 py-0"
              onClick={onToggleCreate}
            >
              {isCreateFormVisible ? 'cancel' : 'create'}
            </Button>
          )}
        </div>
      </div>
    );
  }
);
SelectSearch.displayName = 'SelectSearch';

// CreateItemForm is a form component for creating new items
const CreateItemForm = ({
  searchValue,
  onCreate,
  createButtonText = 'Create',
  createPromptText = 'No results found, would you like to create a new item?',
  createHintText = 'You can modify the name and click create, or press Enter to create quickly',
  autoFocus = false,
}: {
  searchValue: string;
  onCreate: (name: string) => Promise<void>;
  createButtonText?: string;
  createPromptText?: string;
  createHintText?: string;
  autoFocus?: boolean;
}) => {
  const [name, setName] = useState(searchValue);
  const [isCreating, setIsCreating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCreate = async () => {
    if (!name.trim() || isCreating) return;

    try {
      setIsCreating(true);
      await onCreate(name.trim());
      setName('');
    } catch (error) {
      console.error('Create failed:', error);
    } finally {
      setIsCreating(false);
    }
  };

  useEffect(() => {
    setName(searchValue);
    // 不再自动聚焦，让用户手动点击输入框
  }, [searchValue]);

  return (
    <div className="flex flex-col gap-2 p-2 border-t">
      <div className="text-sm font-medium">{createPromptText}</div>
      <div className="flex items-center gap-2">
        <Input
          ref={inputRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          className="flex-1"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleCreate();
            }
          }}
          autoFocus={autoFocus}
        />
        <Button
          size="sm"
          onClick={handleCreate}
          disabled={isCreating || !name.trim()}
        >
          {isCreating ? 'Creating...' : createButtonText}
        </Button>
      </div>
      <div className="text-xs text-gray-500 mt-1">{createHintText}</div>
    </div>
  );
};

type Props = {
  options: Option[];
  portal?: boolean; // 是否使用 portal 渲染, 挂载到 body 上
  disableSearch?: boolean;
  className?: string;
  groudKey?: string; // 存在则展示为 group 分组
  children?: React.ReactNode;
  // 自定义分组标签渲染
  groupLabel?: (item: EnhancedOption) => string | React.ReactNode;
  // 自定义选项标签渲染
  labelFunc?: (item: EnhancedOption) => string | React.ReactNode;
  hiddenFunc?: (item: EnhancedOption, value: string) => boolean;
  onSearch?: (value: string) => void;
  // 创建功能
  onCreate?: (name: string, clearSearch: () => void) => Promise<void> | void;
  createButtonText?: string;
  createPromptText?: string;
  createHintText?: string;
  noResultsText?: string;
  // 是否自动聚焦到创建输入框
  autoFocusCreateInput?: boolean;
};

const SelectContentPro = ({
  options,
  portal = true,
  disableSearch = false,
  className,
  /** group start */
  groudKey,
  groupLabel,
  /** group end */
  labelFunc,
  hiddenFunc,
  onSearch,
  /** create item start */
  onCreate,
  createButtonText,
  createPromptText,
  createHintText,
  noResultsText = 'No result found',
  autoFocusCreateInput = false,
  /** create item end */
  children,
}: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const dataRef = useRef<EnhancedOption[]>(options);
  const [data, setData] = useState<EnhancedOption[]>(options);
  // control whether there are visible items after filtering
  // if not, show the create item form (if onCreate is provided)
  const [hasVisibleItems, setHasVisibleItems] = useState(true);
  // control the visibility of the create item form
  // using for button control
  const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);

  // handle search logic, using hidden property to control visibility
  const performSearch = useCallback(
    (value: string) => {
      if (groudKey) {
        const temp = dataRef.current.map((item: EnhancedOption) => {
          if (item.children) {
            item.children = item.children.map((child: EnhancedOption) => {
              return {
                ...child,
                hidden:
                  typeof hiddenFunc === 'function'
                    ? hiddenFunc(child, value)
                    : !child.label.toLowerCase().includes(value.toLowerCase()),
              };
            });
          }
          item.hidden = item.children
            ? item.children.every((child) => child.hidden)
            : false;
          return item;
        });

        setData(temp);
        const hasVisible = temp.some((item) => !item.hidden);
        setHasVisibleItems(hasVisible);
      } else {
        const temp = dataRef.current.map((item: EnhancedOption) => {
          return {
            ...item,
            hidden:
              typeof hiddenFunc === 'function'
                ? hiddenFunc(item, value)
                : !item.label.toLowerCase().includes(value.toLowerCase()),
          };
        });
        setData(temp);
        const hasVisible = temp.some((item) => !item.hidden);
        setHasVisibleItems(hasVisible);
      }
    },
    [groudKey, hiddenFunc]
  );

  // clear search input and reset data
  const clearSearch = useCallback(() => {
    setSearchValue('');
    // reset search results and show all options
    const temp = dataRef.current.map((item: EnhancedOption) => {
      if (item.children) {
        item.children = item.children.map((child: EnhancedOption) => ({
          ...child,
          hidden: false,
        }));
      }
      return { ...item, hidden: false };
    });
    setData(temp);
    setHasVisibleItems(true);
  }, []);

  // toggle create form visibility
  const toggleCreateForm = useCallback(() => {
    setIsCreateFormVisible((prev) => {
      // if hiding create form, reset search
      if (prev) {
        clearSearch();
      }
      return !prev;
    });
  }, [clearSearch]);

  // handle search logic, only perform search when input length >= 2
  const handleSearch = useDebouncedCallback(
    (value: string) => {
      if (value.length >= 2 || value.length === 0) {
        performSearch(value);
      } else if (value.length === 1) {
        setSearchValue(value);
      }
    },
    250,
    { maxWait: 1000 }
  );

  useEffect(() => {
    if (groudKey) {
      const groupData = options.reduce<Record<string, Option[]>>(
        (acc, item) => {
          const group = item[groudKey as keyof Option];
          const groupKey = String(group);

          if (!acc[groupKey]) {
            acc[groupKey] = [];
          }
          acc[groupKey].push(item);
          return acc;
        },
        {}
      );

      const temp: EnhancedOption[] = Object.keys(groupData).map((key) => {
        return {
          label: key,
          value: key,
          hidden: groupData[key].length === 0,
          children: groupData[key],
        };
      });

      setData(temp);
      dataRef.current = temp;
    } else {
      setData(options as EnhancedOption[]);
      dataRef.current = options as EnhancedOption[];
    }
  }, [options, groudKey]);

  return (
    <SelectContent portal={portal} className={className}>
      {!disableSearch && (
        <SelectSearch
          onChange={(value: string) => {
            // call onSearch if provided
            if (onSearch) {
              onSearch(value);
            } else {
              handleSearch(value);
            }
            setSearchValue(value);
          }}
          value={searchValue}
          onClear={clearSearch}
          showCreateButton={!!onCreate}
          onToggleCreate={toggleCreateForm}
          isCreateFormVisible={isCreateFormVisible}
        />
      )}

      {children ? (
        children
      ) : (
        <>
          {!isCreateFormVisible &&
            data.map((item: EnhancedOption) => {
              if (groudKey && item.children) {
                return (
                  <SelectGroup key={String(item.value)} hidden={item.hidden}>
                    <SelectLabel className="bg-blue-50 text-primary font-bold dark:bg-black">
                      {groupLabel ? groupLabel(item) : item.label}
                    </SelectLabel>
                    {item.children.map((child: EnhancedOption) => (
                      <SelectItem
                        key={String(child.value)}
                        value={String(child.value)}
                        hidden={child.hidden}
                      >
                        {typeof labelFunc === 'function'
                          ? labelFunc(child)
                          : child.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                );
              } else {
                return (
                  <SelectItem
                    key={String(item.value)}
                    value={String(item.value)}
                    hidden={item.hidden}
                  >
                    {typeof labelFunc === 'function'
                      ? labelFunc(item)
                      : item.label}
                  </SelectItem>
                );
              }
            })}

          {onCreate &&
            (isCreateFormVisible || (!hasVisibleItems && searchValue)) && (
              <>
                {!isCreateFormVisible && searchValue && (
                  <div className="p-2 text-center text-sm text-gray-500">
                    {noResultsText}
                    {searchValue ? `"${searchValue}"` : ''}
                  </div>
                )}
                <CreateItemForm
                  searchValue={searchValue}
                  onCreate={async (name) => {
                    await onCreate(name, clearSearch);
                    setIsCreateFormVisible(false); // 创建成功后隐藏创建表单
                  }}
                  createButtonText={createButtonText}
                  createPromptText={
                    isCreateFormVisible
                      ? 'Creating a new item...'
                      : createPromptText
                  }
                  createHintText={createHintText}
                  autoFocus={autoFocusCreateInput}
                />
              </>
            )}
        </>
      )}
    </SelectContent>
  );
};

export { SelectContentPro };
