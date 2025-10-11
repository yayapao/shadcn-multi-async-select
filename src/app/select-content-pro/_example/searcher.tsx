'use client';
import ComponentContainer from '@/components/yaui/component-container';
import ExampleContainer from '@/components/yaui/example';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SelectContentPro } from '@/components/open/select-content-pro';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface Props {
  options: { label: string; value: string }[];
}

const SearcherExample = ({ options }: Props) => {
  const [disableSearch, setDisableSearch] = useState(false);
  return (
    <ExampleContainer
      title="Searcher"
      link="https://github.com/yayapao/shadcn-multi-async-select/blob/main/src/app/select-content-pro/_example/create-item.tsx"
      desc={
        <>
          This example demonstrates how to use{' '}
          <b className="text-primary">custom content</b> to create new items in
          the select component.
        </>
      }
    >
      <ComponentContainer>
        <div className="flex items-center gap-x-4 mb-4 w-[480px]">
          <div className="flex items-center space-x-2">
            <Switch onCheckedChange={setDisableSearch} />
            <Label htmlFor="customized-label">DisableSearcher</Label>
          </div>
        </div>
        <Select>
          <SelectTrigger className="w-[480px]">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContentPro options={options} disableSearch={disableSearch} />
        </Select>
      </ComponentContainer>
    </ExampleContainer>
  );
};

export default SearcherExample;
