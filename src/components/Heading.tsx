import { cn } from "../lib/utils";

interface HeadingProps {
  title: string;
  size?: string;
}

export default function Heading({ title, size }: HeadingProps) {
  return (
    <h2
      className={cn(
        "font-bold text-primary",
        size ? size : "text-3xl sm:text-4xl md:text-5xl "
      )}
    >
      {title}
    </h2>
  );
}
