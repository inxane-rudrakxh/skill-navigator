import GlassCard from "./GlassCard";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
}

const ProjectCard = ({ title, description }: ProjectCardProps) => (
  <GlassCard className="group flex flex-col justify-between p-6">
    <div>
      <h4 className="font-bold text-lg text-foreground">{title}</h4>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{description}</p>
    </div>
    <div className="mt-4 flex items-center text-sm font-medium text-primary">
      View Details
      <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
    </div>
  </GlassCard>
);

export default ProjectCard;
