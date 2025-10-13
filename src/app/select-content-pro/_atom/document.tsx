export default function DocumentPanel() {
  return (
    <div className="p-2 w-[760px] space-y-4 mx-auto">
      <div className="text-sm text-gray-600">
        Override the{' '}
        <a
          className="underline"
          href="https://ui.shadcn.com/docs/components/select"
          target="_blank"
          rel="noopener noreferrer"
        >
          shadcn/ui SelectContent component.
        </a>
        <br />
      </div>
      <div>
        <h5 className="text-sm font-medium mb-4">Why use this component?</h5>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li className="font-bold">
            It is an advanced SelectContent component, support search &
            debounce, auto group, create when no results found.
          </li>
          <li>Next.js 15+ is supported.</li>
          <li>React 19+ is supported.</li>
        </ul>
      </div>
      <div>
        <h5 className="text-sm font-medium my-4">Caution</h5>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>
            Before using, please ensure that you have the necessary dependencies
            installed and configured properly.
          </li>
          <li>
            Change the SelectContent first, then use the SelectContentPro
            component.{' '}
            <a
              href="https://github.com/yayapao/shadcn-multi-async-select/blob/main/src/components/ui/select.tsx#L64"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              how to change?
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
