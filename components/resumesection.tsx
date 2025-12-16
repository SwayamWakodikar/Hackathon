import { ArrowRight, Sparkles, FileText, Zap, Shield } from 'lucide-react'
const Card = ({
  title,
  subtitle,
  iconClass,
  img,
}: {
  title: string;
  subtitle: string;
  iconClass: string;
  img: string;
}) => (
  <div className="bg-card h-80 rounded-xl shadow-2xl overflow-hidden border border-border transition-transform duration-300 hover:shadow-primary/30 hover:-translate-y-1">
    <div className={`h-48 flex items-center justify-center p-6 ${iconClass}`}>
      <img width={148} height={148} src={img} alt="" />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-card-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
      <div className="mt-4 text-xs font-semibold text-primary"></div>
    </div>
  </div>
);

interface FeatureBlockProps {
  title: string;
  buttons: { label: string; action: string; style: "primary" | "secondary" }[];
  icon: string;
}

const FeatureBlock: React.FC<FeatureBlockProps> = ({
  title,
  buttons,
  icon,
}) => {
  // Determine the grid columns: 3 for resume, 2 for trainer
  const cols = buttons.length === 3 ? 3 : 2;

  return (
    <div className="bg-card p-8 rounded-xl shadow-2xl border border-border">
      <div className="flex items-center mb-8">
        <span className="text-4xl mr-3">{icon}</span>
        <h2 className="text-3xl font-bold text-card-foreground">{title}</h2>
      </div>
      <div className={`grid grid-cols-1 md:grid-cols-${cols} gap-4`}>
        {buttons.map((button, index) => (
          <a
            key={index}
            href={button.action}
            className={`flex flex-col items-center justify-center w-full min-h-25 p-4 rounded-lg font-medium text-center text-sm transition duration-200 
                  ${
                    button.style === "primary"
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-secondary/50"
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
    <section id="ResumeBuilder" className="py-20 ">
      <div className="container mx-auto px-4 max-w-7xl mt-20">
        <h2 className="text-6xl font-extrabold text-foreground mb-4 text-center">
          Resume Enhancer
        </h2>
        <p className="text-lg text-muted-foreground mb-12 text-center">
          Unlock high-paying roles with our specialized training paths.
        </p>

        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-70">
          <a href="/resume/home">
            <Card
              title="Resume Optimizer"
              subtitle="Detailed, ATS-beating resume analysis and revision tools."
              iconClass="bg-secondary/10"
              img="https://img.icons8.com/glassmorphism/96/edit-file.png"
            />
          </a>
          <a href="/resume/home">
            <Card
              title="Check for ATS"
              subtitle="Verify Resume with ATS ratings."
              iconClass="bg-secondary/10"
              img="https://img.icons8.com/glassmorphism/96/edit-file.png"
            />
          </a>

          <a href="/resume/home">
            <Card
              title="Resume Creator"
              subtitle="Make a in-general Resume with high ATS rankings."
              iconClass="bg-secondary/10"
              img="https://img.icons8.com/glassmorphism/96/edit-file.png"
            />
          </a>
        </div> */}
        <section id="features" className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
        {/* <div className="flex justify-center">
          <button
            className="cursor-pointer"
            onClick={(e) => handleSmoothScroll(e, "AI Trainer")}
          >
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/ios/50/FFFFFF/circled-down-2.png"
              alt="circled-down-2"
            />
          </button>
        </div>
        <span className="flex justify-center text-gray-300 mt-3">
          More features ahead...
        </span> */}
      </div>
    </section>
  );
};

export default ResumeEnhancerSection;

const handleSmoothScroll = (
  e: React.MouseEvent<HTMLButtonElement>,
  id: string
): void => {
  e.preventDefault();

  const anchor = document.getElementById(id);
  anchor?.scrollIntoView({ behavior: "smooth" });
};

const features = [
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: 'AI-Powered Generation',
      description: 'Get professionally crafted resumes using advanced AI algorithms'
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: 'Multiple Templates',
      description: 'Choose from various professional resume templates'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Fast & Efficient',
      description: 'Generate a complete resume in under 2 minutes'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Privacy Focused',
      description: 'Your data is never stored or shared with third parties'
    }
  ]