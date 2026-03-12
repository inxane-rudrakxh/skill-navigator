import GlassCard from "./GlassCard";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <GlassCard className="p-8 text-center">
      <div className="mx-auto w-14 h-14 mb-6 flex items-center justify-center glass-card rounded-xl bg-primary/10 border-primary/20">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-foreground">{title}</h3>
      <p className="mt-3 text-muted-foreground leading-relaxed">{description}</p>
    </GlassCard>
  );
};

export default FeatureCard;
