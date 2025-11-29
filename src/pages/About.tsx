import { Shield, Target, Users, Rocket } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Security First",
      description: "We prioritize secure learning environments where you can practice safely without real-world consequences.",
    },
    {
      icon: Target,
      title: "Practical Skills",
      description: "Every challenge is designed to teach real-world skills used by professional security researchers.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built by security enthusiasts, for security enthusiasts. Learning is better together.",
    },
    {
      icon: Rocket,
      title: "Continuous Innovation",
      description: "We constantly update our content to reflect the latest vulnerabilities and techniques.",
    },
  ];

  const team = [
    { initials: "AT", name: "Alex Thompson", role: "Founder & CEO" },
    { initials: "SC", name: "Sarah Chen", role: "Head of Security" },
    { initials: "MJ", name: "Marcus Johnson", role: "Lead Developer" },
    { initials: "ER", name: "Emily Rodriguez", role: "Content Director" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero */}
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-4xl text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              About <span className="text-gradient">CyberLabs</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We're on a mission to democratize cybersecurity education through hands-on, practical learning experiences that prepare you for real-world security challenges.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 px-4 bg-card/20">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-center">Our Mission</h2>
            <div className="glass-card p-8">
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                In today's digital landscape, cybersecurity skills are more critical than ever. Yet traditional education often falls short in providing the practical, hands-on experience needed to excel in this field.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                CyberLabs bridges this gap by offering an immersive learning platform where students, hobbyists, and professionals can develop real security skills through challenging CTF competitions and guided lab exercises.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe that anyone with curiosity and determination can master cybersecurity. Our platform removes barriers to entry while providing depth for advanced learners.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Our Values</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="glass-card-hover p-6"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 px-4 bg-card/20">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Meet the Team</h2>
              <p className="text-muted-foreground">Passionate security professionals building the future of cyber education</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <div
                  key={member.name}
                  className="glass-card-hover p-6 text-center"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary font-mono font-bold text-xl mx-auto mb-4">
                    {member.initials}
                  </div>
                  <h3 className="font-display font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
