import AsyncSelectExample from "../_example/async-select";
import SyncSelectExample from "../_example/sync-select";

interface Props {
  options: {
    label: string;
    value: string;
  }[];
}

export default function Example({ options }: Props) {
  return (
    <div className="flex flex-col gap-10 mt-4">
      <AsyncSelectExample />
      <SyncSelectExample options={options} />
    </div>
  );
}
