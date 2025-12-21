import { Label } from "../ui/label";

interface DetailCardT {
  name: string;
  drinking_window: string;
  annual_production: number;
  cretic_score: string;
  reviewed_by: string;
}

export default function DetailsTableCard({
  name,
  drinking_window,
  annual_production,
  cretic_score,
  reviewed_by,
}: DetailCardT) {


  return (
    <div>
      <Label variant="h1" className="text-primary-brown">{name}</Label>
      <div className="mt-4 flex flex-col gap-4">
        <div className="border-b pb-4 border-primary-brown/30 flex">
          <div className="w-1/2 flex flex-col">
            <Label variant="p" className="text-white/50">
              Drinking Window
            </Label>
            <Label variant="h2" className="text-primary-brown">
              {drinking_window === "NA" ? "--" : drinking_window}
            </Label>
          </div>
          <div className="w-1/2 flex flex-col">
            <Label variant="p" className="text-white/50">
              Annual Production
            </Label>
            <Label variant="h2" className="text-primary-brown">
              {annual_production.toLocaleString()}
            </Label>
          </div>
        </div>
        <div className="flex">
          <div className="w-1/2 flex flex-col">
            <Label variant="p" className="text-white/50">
              Critic Score
            </Label>
            <Label variant="h2" className="text-primary-brown">
              {cretic_score === "NA" ? "--" : cretic_score}
            </Label>
          </div>
          <div className="w-1/2 flex flex-col">
            <Label variant="p" className="text-white/50">
              Reviewed By
            </Label>
            <Label variant="h2" className="text-primary-brown">
              {reviewed_by === "NA" ? "--" : reviewed_by}
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}
