interface HeadingProps {
  title: string;
}

export default function Heading({ title }: HeadingProps) {
  return (
    <h2 className="text-4xl md:text-5xl font-bold text-primary">{title}</h2>
  );
}
