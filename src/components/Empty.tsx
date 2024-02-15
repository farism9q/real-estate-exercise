interface EmptyProps {
  label: string;
}
export default function Empty({ label }: EmptyProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <p className="text-muted-foreground text-2xl text-center">{label}</p>
    </div>
  );
}
