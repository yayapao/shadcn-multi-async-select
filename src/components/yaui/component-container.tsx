import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function ComponentContainer({ children, className }: Props) {
  return (
    <div
      className={cn(
        "h-[260px] flex items-center justify-center border border-zinc-200 rounded-md dark:border-zinc-800",
        className
      )}
    >
      {children}
    </div>
  );
}
