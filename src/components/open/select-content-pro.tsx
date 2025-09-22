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
import { PlusCircle } from 'lucide-react';
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

      // 聚焦回搜索框
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
              {isCreateFormVisible ? '取消' : '创建'}
            </Button>
          )}
        </div>
      </div>
    );
  }
);
SelectSearch.displayName = 'SelectSearch';

// 创建新项目的表单组件
const CreateItemForm = ({
  searchValue,
  onCreate,
  createButtonText = '创建',
  createPromptText = '未找到结果，是否创建新项目？',
  createHintText = '您可以修改名称后点击创建，或按回车键快速创建',
  autoFocus = false, // 默认不自动聚焦
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
      console.error('创建失败:', error);
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
          placeholder="输入名称"
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
          <PlusCircle className="h-4 w-4 mr-1" />
          {isCreating ? '创建中...' : createButtonText}
        </Button>
      </div>
      <div className="text-xs text-gray-500 mt-1">{createHintText}</div>
    </div>
  );
};

type Props = {
  options: Option[];
  portal?: boolean; // 是否使用 portal 渲染, 挂载到 body 上
  groudKey?: string; // 存在则展示为 group 分组
  children?: React.ReactNode;
  // 自定义分组标签渲染
  groupLabel?: (item: EnhancedOption) => string | React.ReactNode;
  // 自定义选项标签渲染
  labelFunc?: (item: EnhancedOption) => string | React.ReactNode;
  hiddenFunc?: (item: EnhancedOption, value: string) => boolean;
  onSearch?: (value: string) => void;
  // 创建功能
  onCreate?: (name: string, clearSearch: () => void) => Promise<void>;
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
  groudKey,
  children,
  groupLabel,
  labelFunc,
  hiddenFunc,
  onSearch,
  onCreate,
  createButtonText,
  createPromptText,
  createHintText,
  noResultsText = '没有找到结果',
  autoFocusCreateInput = false, // 默认不自动聚焦
}: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const dataRef = useRef<EnhancedOption[]>(options);
  const [data, setData] = useState<EnhancedOption[]>(options);
  const [hasVisibleItems, setHasVisibleItems] = useState(true);
  const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);

  // 执行搜索操作
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
        // 检查是否有可见项
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
        // 检查是否有可见项
        const hasVisible = temp.some((item) => !item.hidden);
        setHasVisibleItems(hasVisible);
      }
    },
    [groudKey, hiddenFunc]
  );

  // 清除搜索
  const clearSearch = useCallback(() => {
    setSearchValue('');
    // 重置搜索结果，显示所有选项
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

  // 切换创建表单的显示状态
  const toggleCreateForm = useCallback(() => {
    setIsCreateFormVisible((prev) => {
      // 如果要隐藏创建表单，则重置搜索
      if (prev) {
        clearSearch();
      }
      return !prev;
    });
  }, [clearSearch]);

  // 处理搜索，当输入字符数 >= 2 才执行搜索
  const handleSearch = useDebouncedCallback(
    (value: string) => {
      if (value.length >= 2 || value.length === 0) {
        performSearch(value);
      } else if (value.length === 1) {
        // 当只有一个字符时，不执行搜索，但保留搜索值
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
    <>
      <SelectSearch
        onChange={(value: string) => {
          // controlled 模式下，onSearch 会控制搜索
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
      <SelectContent className={portal ? 'select-content-with-portal' : ''}>
        {children ? (
          children
        ) : (
          <>
            {/* 当通过按钮显示创建表单时，隐藏列表项 */}
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

            {/* 当创建表单可见或没有搜索结果时显示创建选项 */}
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
                      isCreateFormVisible ? '创建新项目' : createPromptText
                    }
                    createHintText={createHintText}
                    autoFocus={autoFocusCreateInput}
                  />
                </>
              )}
          </>
        )}
      </SelectContent>
    </>
  );
};

export { SelectContentPro };
