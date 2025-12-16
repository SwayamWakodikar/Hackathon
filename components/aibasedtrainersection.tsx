const Card = ({ title, subtitle, iconClass }: { title: string, subtitle: string, iconClass: string }) => (
    <div className="bg-card rounded-xl shadow-2xl overflow-hidden border border-border transition-transform duration-300 hover:shadow-primary/30 hover:-translate-y-1">
        <div className={`h-48 flex items-center justify-center p-6 ${iconClass}`}>
            <span className="text-6xl text-card-foreground/50 font-bold">VISUAL</span>
        </div>
        <div className="p-6">
            <h3 className="text-xl font-bold text-card-foreground mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
            <div className="mt-4 text-xs font-semibold text-primary">
            </div>
        </div>
    </div>
);

const AIBasedTrainerSection: React.FC = () => {
    return (
        <section id="AI Trainer" className="py-20">
            <div className="container mx-auto px-4 max-w-7xl">
                <h2 className="text-6xl font-extrabold text-foreground mb-4 text-center">
                     AI-based Trainer
                </h2>
                <p className="text-lg text-muted-foreground mb-12 text-center">
                    Unlock high-paying roles with our specialized training paths.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card 
                        title="AI Interview Coach" 
                        subtitle="Practice hyper-realistic mock interviews with AI feedback." 
                        iconClass="bg-secondary/10"
                    
                    />
                    <Card 
                        title="Mock Tests" 
                        subtitle="Mock coing Round tests." 
                        iconClass="bg-secondary/10"
                    />
                </div>
            </div>
        </section>
    );
};

export default AIBasedTrainerSection;
