'use client';
import ComponentContainer from '@/components/yaui/component-container';
import ExampleContainer from '@/components/yaui/example';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SelectContentPro } from '@/components/open/select-content-pro';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
  options: { label: string; value: string }[];
}

const CreateItemExample = ({ options }: Props) => {
  const [optionsList, setOptionsList] = useState(options);

  const handleCreate = (inputValue: string, clearSearch: () => void) => {
    toast.success(`Creating new item: ${inputValue}`);
    const newOption = {
      label: inputValue,
      value: inputValue,
    };
    setOptionsList((prev) => [...prev, newOption]);
    clearSearch();
  };
  return (
    <ExampleContainer
      title="Create A New Item"
      link="https://github.com/yayapao/shadcn-multi-async-select/blob/main/src/app/select-content-pro/_example/create-item.tsx"
      desc={
        <>
          This example demonstrates how to use{' '}
          <b className="text-primary">custom content</b> to create new items in
          the select component. You can create when no results found, or just
          create directly.
        </>
      }
    >
      <ComponentContainer>
        <Select>
          <SelectTrigger className="w-[480px]">
            <SelectValue placeholder="Select or create items..." />
          </SelectTrigger>
          <SelectContentPro
            options={optionsList}
            onCreate={handleCreate}
            className="max-h-[400px]"
          />
        </Select>
      </ComponentContainer>
    </ExampleContainer>
  );
};

export default CreateItemExample;
