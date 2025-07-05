export default function DocumentPanel() {
  return (
    <div className="p-2 w-[760px] space-y-4 mx-auto">
      <div className="text-sm text-gray-600">
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
      </div>
      <div>
        <h5 className="text-sm font-medium mb-4">Why use this component?</h5>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>
            It is a multi-select component that supports async data-loading,
            search, and debounce.
          </li>
          <li>Next.js 15+ is supported.</li>
          <li>React 19+ is supported.</li>
        </ul>
      </div>
      <div>
        <h5 className="text-sm font-medium my-4">
          Why `portal` prop is required?
        </h5>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>
            Shadcn/ui PopoverContent is using <code>portal</code> prop to
            render, it will render error on Dialog\Modal\Tooltip components.
          </li>
          <li>
            `portal` will catch focus out of the component, so the search input
            will lost focus.
          </li>
          <li>
            If you catch this error, you can use the fix below to render the
            popover content without portal. [PopoverContent without
            portal](https://ui.shadcn.com/docs/components/popover#popovercontent)
          </li>
        </ul>
      </div>
    </div>
  );
}
