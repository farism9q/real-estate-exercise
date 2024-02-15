import { Card, CardHeader } from "./ui/card";

interface GridCardsProps {
  data: string[];
}

export default function GridCards({ data }: GridCardsProps) {
  return (
    <div className="grid px-2 text-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.map((item, idx) => (
        <Card key={item} className="dark:bg-secondary">
          <CardHeader className="font-bold text-primary/80">
            <div
              className="rounded-[24px] flex justify-center items-center 
              mx-auto h-[48px] w-[48px] overflow-hidden
              bg-primary/20"
            >
              <div className="text-3xl p-8">{idx + 1}</div>
            </div>
            <p className="uppercase tracking-wide text-xl">{item}</p>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
