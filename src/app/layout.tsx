import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import './globals.css';
import Header from '@/components/internal/header';
import Sider from '@/components/internal/sider';
import QueryProvider from '@/components/provider/query';

export const metadata: Metadata = {
  title: 'multi async select with shadcn/ui',
  description:
    'An async data-loading multi-select component built with React & Next.js & shadcn/ui.一款基于 shadcn/ui 支持异步多选的下拉框组件',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="light"
      style={{ colorScheme: 'light' }}
      suppressHydrationWarning
    >
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <Sider />
          <main className="pt-4 px-6 mr-64 md:ml-64 transition-all">
            <QueryProvider>{children}</QueryProvider>
          </main>
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
