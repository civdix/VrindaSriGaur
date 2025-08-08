import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import Hero from "@/components/hero"
import AboutSection from "@/components/about-section"
import ExperienceTimeline from "@/components/experience-timeline"
import SkillsShowcase from "@/components/skills-showcase"
import ProjectsSection from "@/components/projects-section"
import PoetryCorner from "@/components/poetry/poetry-corner"
import AwardsSection from "@/components/awards-section"
import ContactSection from "@/components/contact-section"

export default function Page() {
  return (
    <main className="min-h-dvh w-full bg-background text-foreground">
      <SiteHeader />
      <section id="hero" className="relative">
        <Hero />
      </section>

      <section id="about" className="relative overflow-hidden py-24">
        <AboutSection />
      </section>

      <section id="experience" className="relative py-24">
        <ExperienceTimeline />
      </section>

      <section id="skills" className="relative py-24">
        <SkillsShowcase />
      </section>

      <section id="projects" className="relative py-24">
        <ProjectsSection />
      </section>

      <section id="poetry" className="relative py-24">
        <Suspense fallback={<div className="text-center text-muted-foreground">Loading poetry...</div>}>
          <PoetryCorner />
        </Suspense>
      </section>

      <section id="awards" className="relative py-24">
        <AwardsSection />
      </section>

      <section id="contact" className="relative py-24">
        <ContactSection />
      </section>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        {'© '}{new Date().getFullYear()} {'Vrinda Sri Gaur · Where Technology Meets Poetry'}
      </footer>
    </main>
  )
}
