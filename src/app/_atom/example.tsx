import AsyncSelectExample from "../_example/async-select";

export default function Example() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h5 className="text-sm font-medium mb-4">
          Async data-loading multi-select, support search & debounce, built with
          shadcn/ui{" "}
          <a
            href="https://ui.shadcn.com/docs/components/popover"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Popover
          </a>
          ,{" "}
          <a
            href="https://ui.shadcn.com/docs/components/command"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Command
          </a>
          , and more.
        </h5>
      </div>
      <AsyncSelectExample />
    </div>
  );
}
