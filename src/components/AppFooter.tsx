const AppFooter = () => {
  return (
    <footer className="py-8 mt-24 border-t border-border">
      <div className="container mx-auto max-w-7xl px-6 text-center text-muted-foreground text-sm">
        <p>
          &copy; {new Date().getFullYear()} SkillGap AI — AI-Powered Skill Gap
          Analyzer. A Hackathon Project.
        </p>
      </div>
    </footer>
  );
};

export default AppFooter;
