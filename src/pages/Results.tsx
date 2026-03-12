import Dashboard from "@/components/Dashboard";
import type { ResultsData } from "@/components/Dashboard";
import { Navigate } from "react-router-dom";

interface ResultsProps {
  data: ResultsData | null;
}

const Results = ({ data }: ResultsProps) => {
  if (!data) return <Navigate to="/analyzer" />;

  return (
    <div className="container mx-auto max-w-4xl px-6 py-32 md:py-40">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter gradient-text">
          Your Analysis is Complete
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Here is your personalized path to becoming a top candidate.
        </p>
      </div>
      <Dashboard data={data} />
    </div>
  );
};

export default Results;
