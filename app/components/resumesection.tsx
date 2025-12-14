const Card = ({ title, subtitle, iconClass,img  }: { title: string, subtitle: string, iconClass: string,img:string }) => (
    <div className="bg-card rounded-xl shadow-2xl overflow-hidden border border-border transition-transform duration-300 hover:shadow-primary/30 hover:-translate-y-1">
        <div className={`h-48 flex items-center justify-center p-6 ${iconClass}`}>
            <img width={148} height={148} src={img} alt="" />
        </div>
        <div className="p-6">
            <h3 className="text-xl font-bold text-card-foreground mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
            <div className="mt-4 text-xs font-semibold text-primary">
            </div>
        </div>
    </div>
);

interface FeatureBlockProps {
  title: string;
  buttons: { label: string; action: string; style: 'primary' | 'secondary' }[];
  icon: string;
}


const FeatureBlock: React.FC<FeatureBlockProps> = ({ title, buttons, icon }) => {
    // Determine the grid columns: 3 for resume, 2 for trainer
    const cols = buttons.length === 3 ? 3 : 2;
    
    return (
        <div className="bg-card p-8 rounded-xl shadow-2xl border border-border">
          <div className="flex items-center mb-8">
            <span className="text-4xl mr-3">{icon}</span>
            <h2 className="text-3xl font-bold text-card-foreground">
              {title}
            </h2>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-${cols} gap-4`}> 
            {buttons.map((button, index) => (
              <a
                key={index}
                href={button.action}
                className={`flex flex-col items-center justify-center w-full min-h-[100px] p-4 rounded-lg font-medium text-center text-sm transition duration-200 
                  ${button.style === 'primary' 
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg' 
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-secondary/50'
                  }`}
              >
                <span>{button.label}</span>
              </a>
            ))}
          </div>
        </div>
      );
};

const ResumeEnhancerSection: React.FC = () => {
return (
        <section id="accelerators" className="py-20 bg-muted/50">
            <div className="container mx-auto px-4 max-w-7xl">
                <h2 className="text-4xl font-extrabold text-foreground mb-4 text-center">
                     Resume Enhancer
                </h2>
                <p className="text-lg text-muted-foreground mb-12 text-center">
                    Unlock high-paying roles with our specialized training paths.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card 
                        title="Resume Optimizer" 
                        subtitle="Detailed, ATS-beating resume analysis and revision tools." 
                        iconClass="bg-primary/10"
                        img="https://img.icons8.com/glassmorphism/96/edit-file.png"/>
                    <Card 
                        title="Check for ATS" 
                        subtitle="Verify Resume with ATS ratings." 
                        iconClass="bg-secondary/10"
                        img="https://img.icons8.com/glassmorphism/96/edit-file.png"
                    />
                    <Card 
                        title="Resume Creator" 
                        subtitle="Make a in-general Resume with high ATS rankings." 
                        iconClass="bg-accent/10"
                        img="https://img.icons8.com/glassmorphism/96/edit-file.png"
                    />
                </div>
            </div>
        </section>
    );
};

export default ResumeEnhancerSection;   
