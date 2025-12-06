import { Shield, Smartphone, Globe, Server, Database, Lock, Code, Bug, FileSearch } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Globe,
    title: "Website Penetration Testing",
    description: "Comprehensive security assessment of your web applications to identify vulnerabilities before attackers do.",
    features: ["OWASP Top 10 Testing", "SQL Injection & XSS", "Authentication Bypass", "API Security Testing"],
  },
  {
    icon: Smartphone,
    title: "Android Penetration Testing",
    description: "In-depth security analysis of Android applications including reverse engineering and runtime analysis.",
    features: ["APK Reverse Engineering", "Runtime Manipulation", "Data Storage Analysis", "Network Traffic Analysis"],
  },
  {
    icon: Server,
    title: "Network Penetration Testing",
    description: "Evaluate your network infrastructure security through comprehensive internal and external testing.",
    features: ["External Network Testing", "Internal Network Testing", "Firewall Assessment", "Vulnerability Scanning"],
  },
  {
    icon: Database,
    title: "Database Security Assessment",
    description: "Thorough evaluation of database configurations, access controls, and data protection mechanisms.",
    features: ["Access Control Review", "Encryption Analysis", "SQL Injection Testing", "Privilege Escalation"],
  },
  {
    icon: Lock,
    title: "API Security Testing",
    description: "Identify and remediate vulnerabilities in your REST and GraphQL APIs before they're exploited.",
    features: ["Authentication Testing", "Authorization Flaws", "Rate Limiting Bypass", "Data Exposure Testing"],
  },
  {
    icon: Code,
    title: "Source Code Review",
    description: "Manual and automated review of your source code to identify security flaws and vulnerabilities.",
    features: ["Static Analysis", "Manual Code Review", "Dependency Scanning", "Security Best Practices"],
  },
  {
    icon: Bug,
    title: "Bug Bounty Program Management",
    description: "Set up and manage your bug bounty program to leverage the security community.",
    features: ["Program Setup", "Triage Support", "Vulnerability Validation", "Reward Management"],
  },
  {
    icon: FileSearch,
    title: "Security Audit & Compliance",
    description: "Comprehensive security audits to ensure compliance with industry standards and regulations.",
    features: ["ISO 27001 Compliance", "GDPR Assessment", "PCI DSS Review", "SOC 2 Preparation"],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
              <Shield className="w-4 h-4 mr-2" />
              Professional Security Services
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Protect Your Digital Assets with{" "}
              <span className="text-gradient">Expert Security</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Our team of certified security professionals provides comprehensive penetration testing 
              and security assessment services to protect your organization from cyber threats.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="glow-green">
                  Get a Quote
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Our <span className="text-gradient">Services</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer a wide range of security services tailored to meet your organization's specific needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="group bg-card/50 border-border/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.1)]"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-display">{service.title}</CardTitle>
                  <CardDescription className="text-muted-foreground text-sm">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-foreground/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4">
          <div className="relative rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm p-8 md:p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                Ready to Secure Your Infrastructure?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Contact us today for a free consultation and learn how we can help protect your organization.
              </p>
              <Link to="/contact">
                <Button size="lg" className="glow-green">
                  Contact Us Today
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
