"use client";

import { HashLoader } from "react-spinners";

export default function PageSpinner() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full -translate-x-6 -translate-y-6">
      <HashLoader />
      <div className="text-sm mt-4 text-gray-800 dark:text-gray-200">
        页面准备中...
      </div>
    </div>
  );
}
