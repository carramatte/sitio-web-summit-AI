'use client';
import dynamic from 'next/dynamic';
import LightPillar from '@/components/LightPillar';
import GlitchText from '@/components/GlitchText';
import LogoLoop from '@/components/LogoLoop';
import CardSwap, { Card } from '@/components/CardSwap';

const RotatingCube = dynamic(() => import('@/components/RotatingCube'), {
  ssr: false,
  loading: () => <div className="cube-canvas" />,
});

const logos = [
  { src: '/react-logo.svg', alt: 'React', width: 100, height: 100 },
  { src: '/nextjs-logo.svg', alt: 'Next.js', width: 100, height: 100 },
  { src: '/python-logo.svg', alt: 'Python', width: 100, height: 100 },
  { src: '/openai-logo.svg', alt: 'OpenAI', width: 100, height: 100 },
  { src: '/react-logo.svg', alt: 'React', width: 100, height: 100 },
  { src: '/nextjs-logo.svg', alt: 'Next.js', width: 100, height: 100 },
  { src: '/python-logo.svg', alt: 'Python', width: 100, height: 100 },
  { src: '/openai-logo.svg', alt: 'OpenAI', width: 100, height: 100 },
];

export default function Home() {
  return (
    <main>
      {/* ═══════════════════════════════════════════
          SECCIÓN 1 — Hero / Landing
          ═══════════════════════════════════════════ */}
      <section id="inicio" className="section-full flex flex-col items-center justify-between py-24" style={{
        backgroundImage: 'url("/mountain-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        {/* Hero Content - Top */}
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', marginTop: '4rem' }}>
          <GlitchText speed={40} enableShadows={true} enableOnHover={false} className="text-[clamp(2.5rem,8vw,7rem)] font-bold tracking-tight text-white">
            SUMMIT AI
          </GlitchText>

          <p style={{
            color: '#FFFFFF',
            fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
            letterSpacing: '0.1em',
            fontWeight: 500,
            opacity: 0.9
          }}>
            Software · Automatizaciones · Inteligencia Artificial
          </p>
        </div>

        {/* Hero Bottom - CTA Buttons */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'row', gap: '1.5rem', marginBottom: '2rem', width: '100%', maxWidth: '600px', justifyContent: 'center', padding: '0 2rem' }}>
          <a href="#servicios" className="cta-button-tesla primary">
            Conocé lo que hacemos
          </a>
          <a href="#contacto" className="cta-button-tesla secondary">
            Contactar
          </a>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECCIÓN 2 — Tecnologías (Logo Loop)
          ═══════════════════════════════════════════ */}
      <section id="tecnologias" className="section-full flex flex-col items-center justify-center" style={{ background: '#0D1B2A' }}>
        <div className="orange-line-top" />

        <div style={{ textAlign: 'center', width: '100%', maxWidth: '1200px', padding: '0 2rem' }}>
          <p className="section-label">Tecnologías que usamos</p>

          <div style={{ width: '100%', opacity: 0.85, filter: 'grayscale(100%) brightness(2)' }}>
            <LogoLoop
              logos={logos}
              speed={150}
              direction="left"
              pauseOnHover
              logoHeight={50}
              gap={100}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECCIÓN 3 — Servicios (Card Swap)
          ═══════════════════════════════════════════ */}
      <section id="servicios" className="section-full flex flex-col items-center justify-center" style={{ background: 'linear-gradient(180deg, #0D1B2A 0%, #112236 100%)' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <GlitchText speed={0.8} enableShadows={false} enableOnHover={true} className="text-[clamp(2rem,5vw,4rem)] font-black">
            LO QUE HACEMOS
          </GlitchText>
        </div>

        <div style={{ position: 'relative', width: '100%', maxWidth: '600px', height: '450px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CardSwap
            width={340}
            height={380}
            cardDistance={50}
            verticalDistance={55}
            delay={4000}
            pauseOnHover={true}
            skewAmount={4}
            easing="elastic"
          >
            <Card>
              <div className="service-card" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="icon">⚡</div>
                <h3>Automatizaciones</h3>
                <p>Optimizamos tus procesos con flujos automáticos que ahorran tiempo y reducen errores.</p>
              </div>
            </Card>
            <Card>
              <div className="service-card" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="icon">{'</>'}</div>
                <h3>Desarrollo Web</h3>
                <p>Creamos sitios y aplicaciones web modernas, rápidas y escalables a medida.</p>
              </div>
            </Card>
            <Card>
              <div className="service-card" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="icon">🧠</div>
                <h3>Inteligencia Artificial</h3>
                <p>Integramos soluciones de IA que potencian tu negocio con datos y automatización inteligente.</p>
              </div>
            </Card>
          </CardSwap>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECCIÓN 4 — Sobre Nosotros
          ═══════════════════════════════════════════ */}
      <section id="nosotros" className="section-full flex items-center justify-center" style={{ background: '#0D1B2A' }}>
        <div className="about-grid">
          {/* Text Column */}
          <div>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 800,
              color: '#F0F0F0',
              marginBottom: '1.5rem',
              lineHeight: 1.1,
            }}>
              QUIÉNES SOMOS
            </h2>
            <div className="about-text-block">
              <p style={{
                color: '#8A9BB0',
                fontSize: '1.05rem',
                lineHeight: 1.8,
              }}>
                En Summit AI combinamos tecnología de punta con visión estratégica para llevar tu negocio al siguiente nivel. Somos especialistas en desarrollo web, automatizaciones e inteligencia artificial.
              </p>
            </div>
          </div>

          {/* 3D Cube Column */}
          <div>
            <RotatingCube />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECCIÓN 5 — Contacto
          ═══════════════════════════════════════════ */}
      <section id="contacto" className="section-full flex flex-col items-center justify-center" style={{ background: '#112236' }}>
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <GlitchText speed={0.8} enableShadows={false} enableOnHover={true} className="text-[clamp(2rem,5vw,4rem)] font-black">
            HABLEMOS
          </GlitchText>
        </div>

        <p style={{
          color: '#8A9BB0',
          fontSize: '1rem',
          marginBottom: '2.5rem',
          textAlign: 'center',
        }}>
          ¿Tenés un proyecto en mente? Escribinos.
        </p>

        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Nombre" required id="contact-name" />
          <input type="email" placeholder="Email" required id="contact-email" />
          <textarea placeholder="Mensaje" required id="contact-message" />
          <button type="submit" className="submit-button">
            ENVIAR
          </button>
        </form>
      </section>
    </main>
  );
}
