import GlassCard from "./GlassCard";

interface RoadmapCardProps {
  index: number;
  title: string;
  description: string;
}

const RoadmapCard = ({ index, title, description }: RoadmapCardProps) => (
  <GlassCard className="flex items-start gap-6 p-6">
    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-primary/10 border border-primary/20 rounded-lg text-primary font-bold text-lg">
      {index}
    </div>
    <div>
      <h4 className="font-bold text-lg text-foreground">{title}</h4>
      <p className="text-muted-foreground mt-1 leading-relaxed">{description}</p>
    </div>
  </GlassCard>
);

export default RoadmapCard;
