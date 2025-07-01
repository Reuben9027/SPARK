<template>
  <div class="portfolio-container">
    <!-- Hero Section -->
    <section ref="heroSection" class="hero-section">
      <div class="hero-background">
        <div class="hero-bg-gradient"></div>
        <div class="hero-bg-pattern"></div>
      </div>

      <div class="hero-content">
        <div class="hero-text">
          <div class="hero-badge">
            <span class="badge-icon">?š€</span>
            <span class="badge-text">AI-Powered Project Management</span>
          </div>

          <h1 ref="heroTitle" class="hero-title">
            <span class="gradient-text">Build Smarter,</span>
            <br />
            <span class="hero-title-secondary">Launch Faster.</span>
          </h1>

          <p ref="heroSubtitle" class="hero-subtitle">
            Transform your ideas into reality with AI-driven project management.
            Validate concepts, plan MVPs, and ship products faster than ever
            before.
          </p>

          <div ref="heroCta" class="hero-cta">
            <v-btn
              size="x-large"
              color="primary"
              variant="elevated"
              class="cta-button"
              @click="handleGoogleLogin()"
              prepend-icon="mdi-rocket-launch"
            >
              Start Your Project
            </v-btn>

            <div class="hero-stats">
              <div class="stat">
                <span class="stat-number">500+</span>
                <span class="stat-label">Projects Launched</span>
              </div>
              <div class="stat">
                <span class="stat-number">10x</span>
                <span class="stat-label">Faster Development</span>
              </div>
              <div class="stat">
                <span class="stat-number">98%</span>
                <span class="stat-label">Success Rate</span>
              </div>
            </div>
          </div>
        </div>

        <div ref="heroVisual" class="hero-visual">
          <div class="hero-card">
            <div class="card-header">
              <div class="card-avatar">
                <v-icon color="primary" size="24">mdi-account</v-icon>
              </div>
              <div class="card-info">
                <div class="card-title">Project Dashboard</div>
                <div class="card-subtitle">Real-time progress tracking</div>
              </div>
              <div class="card-status">
                <div class="status-dot"></div>
                <span>Live</span>
              </div>
            </div>

            <div class="card-content">
              <div class="progress-item">
                <div class="progress-label">
                  <span>Market Research</span>
                  <span class="progress-percentage">85%</span>
                </div>
                <v-progress-linear
                  model-value="85"
                  color="success"
                  height="8"
                  rounded
                ></v-progress-linear>
              </div>

              <div class="progress-item">
                <div class="progress-label">
                  <span>MVP Development</span>
                  <span class="progress-percentage">60%</span>
                </div>
                <v-progress-linear
                  model-value="60"
                  color="primary"
                  height="8"
                  rounded
                ></v-progress-linear>
              </div>

              <div class="progress-item">
                <div class="progress-label">
                  <span>User Testing</span>
                  <span class="progress-percentage">40%</span>
                </div>
                <v-progress-linear
                  model-value="40"
                  color="warning"
                  height="8"
                  rounded
                ></v-progress-linear>
              </div>
            </div>

            <div class="card-footer">
              <v-chip
                color="success"
                size="small"
                prepend-icon="mdi-check-circle"
              >
                On Track
              </v-chip>
              <div class="card-metrics">
                <div class="metric">
                  <span class="metric-value">12</span>
                  <span class="metric-label">Tasks</span>
                </div>
                <div class="metric">
                  <span class="metric-value">3</span>
                  <span class="metric-label">Days Left</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section ref="featuresSection" class="about-section" id="features">
      <div class="section-content">
        <h2 ref="aboutTitle" class="section-title">Why Choose Us</h2>
        <div class="about-grid">
          <div ref="aboutText" class="about-text">
            <p>
              Say goodbye to analysis paralysis. Our AI helps you validate your
              ideas instantly, plan an actionable MVP, and stay focused on what
              matters most.
            </p>
            <p>
              Whether you're a solo dev or a startup founder, our intelligent
              platform provides step-by-step guidance, automates tasks, and
              helps you ship with confidence.
            </p>
          </div>
          <div ref="aboutStats" class="about-stats">
            <div class="stat-item">
              <div class="stat-number">10x</div>
              <div class="stat-label">Faster Development</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">+30</div>
              <div class="stat-label">Startup Blueprints</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">100%</div>
              <div class="stat-label">Founder-Focused</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Product Capabilities Section -->
    <section ref="skillsSection" class="skills-section">
      <div class="section-content">
        <h2 ref="skillsTitle" class="section-title">What You Can Do</h2>
        <div ref="skillsGrid" class="skills-grid">
          <div class="skill-category">
            <h3>Idea Validation</h3>
            <div class="skill-items">
              <span class="skill-item">Market Fit Check</span>
              <span class="skill-item">Competitor Snapshot</span>
              <span class="skill-item">Feasibility Insights</span>
            </div>
          </div>
          <div class="skill-category">
            <h3>MVP Planning</h3>
            <div class="skill-items">
              <span class="skill-item">Feature Prioritization</span>
              <span class="skill-item">Tech Stack Suggestion</span>
              <span class="skill-item">Scalable Architecture</span>
            </div>
          </div>
          <div class="skill-category">
            <h3>Launch & Iterate</h3>
            <div class="skill-items">
              <span class="skill-item">AI-Powered Roadmap</span>
              <span class="skill-item">Progress Tracking</span>
              <span class="skill-item">Team Collaboration</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section ref="projectsSection" class="projects-section">
      <div class="section-content">
        <h2 ref="projectsTitle" class="section-title">Success Stories</h2>
        <div ref="projectsGrid" class="projects-grid">
          <div class="project-card">
            <div class="project-content">
              <h3>From Idea to Revenue in 3 Weeks</h3>
              <p>
                "The AI Project Manager gave me clarity and speed. I shipped my
                MVP and landed paying users â€? solo."
              </p>
              <div class="project-tech">
                <span>Founder</span>
                <span>Solo Dev</span>
                <span>Bootstrapper</span>
              </div>
            </div>
          </div>
          <div class="project-card">
            <div class="project-content">
              <h3>Validated in 24 Hours</h3>
              <p>
                "It helped me validate and pivot before writing a single line of
                code. Game changer."
              </p>
              <div class="project-tech">
                <span>Market Test</span>
                <span>No-Code</span>
                <span>Lean Startup</span>
              </div>
            </div>
          </div>
          <div class="project-card">
            <div class="project-content">
              <h3>AI-Powered Clarity</h3>
              <p>
                "As a solo founder juggling everything, this platform was like
                having a co-founder on demand."
              </p>
              <div class="project-tech">
                <span>AI Roadmap</span>
                <span>Product Management</span>
                <span>Execution</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action / Contact -->
    <section ref="contactSection" class="contact-section">
      <div class="section-content">
        <h2 ref="contactTitle" class="section-title">Join the Movement</h2>
        <div ref="contactContent" class="contact-content">
          <p class="contact-text">
            Stop wasting time and start building the right things. Let AI guide
            you from idea to launch.
          </p>
          <div class="contact-actions">
            <v-btn
              size="large"
              color="primary"
              variant="elevated"
              class="contact-button"
              href="#"
            >
              Try It Free
            </v-btn>
            <div class="social-links">
              <a href="#" class="social-link">GitHub</a>
              <a href="#" class="social-link">LinkedIn</a>
              <a href="#" class="social-link">Twitter</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import {signInWithPopup } from 'firebase/auth'

const { $auth, $provider} = useNuxtApp();

const router = useRouter();

// Template refs
const heroSection = ref<HTMLElement>();
const heroTitle = ref<HTMLElement>();
const heroSubtitle = ref<HTMLElement>();
const heroCta = ref<HTMLElement>();
const heroVisual = ref<HTMLElement>();

const aboutSection = ref<HTMLElement>();
const aboutTitle = ref<HTMLElement>();
const aboutText = ref<HTMLElement>();
const aboutStats = ref<HTMLElement>();

const skillsSection = ref<HTMLElement>();
const skillsTitle = ref<HTMLElement>();
const skillsGrid = ref<HTMLElement>();

const projectsSection = ref<HTMLElement>();
const projectsTitle = ref<HTMLElement>();
const projectsGrid = ref<HTMLElement>();

const contactSection = ref<HTMLElement>();
const contactTitle = ref<HTMLElement>();
const contactContent = ref<HTMLElement>();

// Scroll to section function
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const error: Ref<string | null> = ref(null)

const handleGoogleLogin = async (): Promise<void> => {
  const auth = $auth
  const provider = $provider
  try {
    await signInWithPopup(auth, provider)
    navigateTo('/welcome')
  } catch (err: unknown) {
    error.value = 'Google sign-in failed.'
    console.error(err)
  }
}

</script>

<style scoped>
.portfolio-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  color: #ffffff;
  overflow-x: hidden;
}

/* Hero Section */
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem;
  position: relative;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.hero-bg-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(10, 10, 10, 0.8) 0%,
    rgba(26, 26, 26, 0.8) 100%
  );
}

.hero-bg-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1;
}

.hero-content {
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-text {
  max-width: 600px;
}

.hero-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.badge-icon {
  font-size: 1.5rem;
  color: #667eea;
}

.badge-text {
  font-size: 1rem;
  color: #a0a0a0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.hero-title {
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-title-secondary {
  color: #ffffff;
  font-weight: 600;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #a0a0a0;
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 500px;
}

.hero-cta {
  margin-top: 2rem;
}

.cta-button {
  font-size: 1.2rem;
  padding: 1.25rem 2.5rem;
  border-radius: 50px;
  text-transform: none;
  font-weight: 600;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 250px;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
}

.hero-stats {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.stat {
  text-align: center;
  flex: 1;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #a0a0a0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.hero-visual {
  position: relative;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  backdrop-filter: blur(10px);
  max-width: 400px;
  width: 100%;
}

.hero-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.card-header {
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.card-info {
  margin-left: 1rem;
  flex-grow: 1;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.card-subtitle {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

.card-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.9);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #4caf50;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

.card-content {
  padding: 2rem;
  background: rgba(255, 255, 255, 0.02);
}

.progress-item {
  margin-bottom: 1.5rem;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #a0a0a0;
  margin-bottom: 0.5rem;
}

.progress-percentage {
  font-weight: 600;
  color: #667eea;
}

.progress-item .v-progress-linear {
  height: 8px;
  border-radius: 4px;
}

.card-footer {
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-metrics {
  display: flex;
  gap: 1.5rem;
}

.metric {
  text-align: center;
}

.metric-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
}

.metric-label {
  font-size: 0.8rem;
  color: #a0a0a0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.floating-circle,
.floating-square,
.floating-triangle,
.floating-dots,
.floating-pulse {
  position: absolute;
  opacity: 0.1;
  animation: float 6s ease-in-out infinite;
}

.floating-circle {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  top: 20%;
  right: 10%;
  animation-delay: 0s;
}

.floating-square {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 12px;
  top: 60%;
  right: 20%;
  animation-delay: 1s;
}

.floating-triangle {
  width: 0;
  height: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-bottom: 52px solid #4facfe;
  top: 30%;
  left: 10%;
  animation-delay: 2s;
}

.floating-dots {
  width: 100px;
  height: 100px;
  background: radial-gradient(
    circle,
    rgba(102, 126, 234, 0.3) 0%,
    transparent 70%
  );
  top: 70%;
  left: 20%;
  animation-delay: 3s;
}

.floating-pulse {
  width: 120px;
  height: 120px;
  background: radial-gradient(
    circle,
    rgba(118, 75, 162, 0.2) 0%,
    transparent 70%
  );
  border-radius: 50%;
  top: 10%;
  left: 60%;
  animation: pulse-float 4s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

@keyframes pulse-float {
  0%,
  100% {
    transform: scale(1) translateY(0px);
    opacity: 0.1;
  }
  50% {
    transform: scale(1.2) translateY(-15px);
    opacity: 0.3;
  }
}

.hero-decorations {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.decoration-line {
  position: absolute;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(102, 126, 234, 0.3),
    transparent
  );
  height: 1px;
  animation: slide 8s linear infinite;
}

.line-1 {
  top: 30%;
  left: -100%;
  width: 200%;
  animation-delay: 0s;
}

.line-2 {
  top: 70%;
  left: -100%;
  width: 200%;
  animation-delay: 4s;
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(102, 126, 234, 0.1) 0%,
    transparent 70%
  );
  animation: rotate 20s linear infinite;
}

.circle-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  right: -50px;
  animation-delay: 0s;
}

.circle-2 {
  width: 150px;
  height: 150px;
  bottom: 20%;
  left: -30px;
  animation-delay: 10s;
}

@keyframes slide {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Section Styles */
.section-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem;
}

.section-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  text-align: center;
  margin-bottom: 4rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* About Section */
.about-section {
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.about-text p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #d0d0d0;
  margin-bottom: 1.5rem;
}

.about-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.stat-item {
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #a0a0a0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Skills Section */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.skill-category {
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.skill-category h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #667eea;
}

.skill-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.skill-item {
  background: rgba(102, 126, 234, 0.2);
  color: #667eea;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  border: 1px solid rgba(102, 126, 234, 0.3);
}

/* Projects Section */
.projects-section {
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.project-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.project-image {
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.project-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 70%
  );
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.project-content {
  padding: 2rem;
}

.project-content h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #ffffff;
}

.project-content p {
  color: #a0a0a0;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.project-tech span {
  background: rgba(102, 126, 234, 0.2);
  color: #667eea;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  border: 1px solid rgba(102, 126, 234, 0.3);
}

/* Contact Section */
.contact-section {
  text-align: center;
}

.contact-text {
  font-size: 1.2rem;
  color: #d0d0d0;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.contact-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.contact-button {
  font-size: 1.1rem;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-transform: none;
  font-weight: 500;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
}

.social-links {
  display: flex;
  gap: 2rem;
}

.social-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.social-link:hover {
  color: #764ba2;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 3rem;
  }

  .hero-text {
    max-width: 100%;
  }

  .hero-stats {
    flex-direction: column;
    gap: 1rem;
  }

  .stat {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .stat-number {
    font-size: 1.5rem;
    margin-bottom: 0;
  }

  .about-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .about-stats {
    grid-template-columns: 1fr;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .social-links {
    flex-direction: column;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .section-content {
    padding: 4rem 1rem;
  }

  .hero-section {
    padding: 1rem;
  }

  .hero-visual {
    height: 250px;
  }
}
</style>
