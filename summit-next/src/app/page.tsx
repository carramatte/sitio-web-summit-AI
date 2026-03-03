import HeroScene from '@/components/HeroScene';
import Lanyard from '@/components/Lanyard';
import LightPillar from '@/components/LightPillar';
import LogoLoop from '@/components/LogoLoop';
import GlitchText from '@/components/GlitchText';

export default function Home() {
  const logos = [
    { src: '/lanyard.png', alt: 'Summit AI Partner', width: 100, height: 100 },
    { src: '/lanyard.png', alt: 'Summit AI Tech', width: 100, height: 100 },
    { src: '/lanyard.png', alt: 'Future Tech', width: 100, height: 100 },
    { src: '/lanyard.png', alt: 'Visionary', width: 100, height: 100 },
    { src: '/lanyard.png', alt: 'Autonomous', width: 100, height: 100 },
  ];

  return (
    <main className="min-h-screen bg-[#060010] text-[#F0F0F0] overflow-x-hidden">

      {/* 1. Hero Section con 3D Scene y Lanyard */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0D1B2A]">
        {/* React Three Fiber Scene */}
        <HeroScene />

        {/* Capa de Lanyard Flotante en centro */}
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center mt-20">
          <Lanyard />
        </div>

        {/* Texto Hero Arriba */}
        <div className="absolute z-20 top-24 text-center pointer-events-none">
          <GlitchText speed={0.8} enableShadows className="text-5xl md:text-8xl">
            SUMMIT AI
          </GlitchText>
          <p className="mt-4 text-[#C45E1A] tracking-widest uppercase font-bold text-sm md:text-xl">El Futuro es Autónomo</p>
        </div>

        {/* Gradiente de transición inferior */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0D1B2A] to-transparent z-10 pointer-events-none"></div>
      </section>

      {/* 2. Sección Secundaria con Light Pillar */}
      <section className="relative w-full min-h-screen py-24 px-8 overflow-hidden bg-[#0D1B2A]">
        {/* Background Light Pillar */}
        <div className="absolute inset-0 z-0 opacity-80 mix-blend-screen pointer-events-none">
          <LightPillar
            topColor="#1B2E45"
            bottomColor="#C45E1A"
            intensity={0.8}
            interactive={true}
            pillarWidth={4.5}
            quality="high"
          />
        </div>

        {/* Contenido sobre el Light Pillar */}
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-20 items-center">
          <div className="text-center w-full">
            <GlitchText speed={1.2} enableOnHover enableShadows={false} className="text-3xl md:text-5xl border-b border-[#C45E1A]/30 pb-4 inline-block">
              Nuestros Partners
            </GlitchText>

            <div className="mt-16 w-full opacity-80 filter grayscale hover:grayscale-0 transition-all duration-700">
              <LogoLoop
                logos={logos}
                speed={150}
                direction="left"
                pauseOnHover
                logoHeight={60}
                gap={80}
              />
            </div>
          </div>

          <div className="bg-[#112236]/80 backdrop-blur-xl p-12 rounded-3xl border border-[#1B2E45] shadow-2xl mt-10 text-center max-w-3xl">
            <h2 className="text-[#F0F0F0] text-3xl font-bold mb-6">Transformación Digital</h2>
            <p className="text-gray-300 leading-relaxed text-lg mb-8">
              Desbloqueamos el máximo potencial de la Inteligencia Artificial para escalar operaciones, reducir fricción y liderar la vanguardia tecnológica mundial. Nuestra metodología aplica agentes de última generación integrados a los procesos más profundos de tu empresa.
            </p>
            <button className="bg-[#C45E1A] text-white px-8 py-4 font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-colors rounded-sm shadow-[0_0_20px_rgba(196,94,26,0.5)] hover:shadow-white">
              Agendar Demostración
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
