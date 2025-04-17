import { MultiAsyncSelect } from "@/components/open-source/multi-async-select";

interface Props {
  options: {
    label: string;
    value: string;
  }[];
}

const SyncSelectExample = ({ options }: Props) => {
  return (
    <MultiAsyncSelect
      options={options}
      onValueChange={(value) => console.log(value)}
      className="w-[540px]"
    />
  );
};

export default SyncSelectExample;
