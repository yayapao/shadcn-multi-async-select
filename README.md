<h1 align="center">
    multi-async-select    
</h1>

multi-async-select is a component that allows you to select multiple items from a list. It is a wrapper around the [shadcn/ui](https://ui.shadcn.com/) Popover and Command components.

**It uses the latest version of Next.js and shadcn/ui.**

## Features

- Multiple select
- Async data fetching

## Props

| Property  | Type                           | Default Value     | Description                                                                                                             |
|----------------|--------------------------------|-------------------|-------------------------------------------------------------------------------------------------------------------------|
| options        | Option[]                       |                   | An array of objects to be displayed in the Select.Option.                                                               |
| async          | boolean                        | false             | Whether the select is async. If true, the getting options should be async.                                               |
| loading        | boolean                        | false             | Whether is fetching options. If true, the loading indicator will be shown. Works only when async is true.               |
| error          | Error \| null                  | null              | The error object. If true, the error message will be shown. Works only when async is true.                               |
| defaultValue   | string[]                       |                   | The default selected values when the component mounts.                                                                  |
| placeholder    | string                         | "Select options"  | Placeholder text to be displayed when no values are selected.                                                           |
| searchPlaceholder | string                         | "Search..."       | Placeholder text to be displayed when the search input is empty.                                                       |
| maxCount       | number                         | 3                 | Maximum number of items to display. Extra selected items will be summarized.                                            |
| modalPopover   | boolean                        | false             | The modality of the popover. When set to true, interaction with outside elements will be disabled.                       |
| className      | string                         |                   | Additional class names to apply custom styles to the multi-select component.                                            |
| clearText      | string                         | "Clear"           | Text to be displayed when the clear button is clicked.                                                                  |
| closeText      | string                         | "Close"           | Text to be displayed when the close button is clicked.                                                                  |
| onValueChange  | (value: string[]) => void      |                   | Callback function triggered when the selected values change. Receives an array of the new selected values.              |
| onSearch       | (value: string) => void        |                   | Callback function triggered when the search input changes. Receives the search input value.                             |

## Tech Stack

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

- TypeScript^5
- tailwindcss^4.1.3
- react/react-dom^19.0.0
- Next.js^15.2.4


## Contributed

Welcome contributions from the community! Please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file for more information.

**Requirements**

- Node.js version 20 or newer. [volta](https://volta.sh/) is recommanded.

After `npm run dev`, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/components/multi-async-select.tsx`.







