import { FloatingDots } from '../components/FloatingDots';
import { InteractiveName } from '../components/InteractiveName';

export const Home = () => {
  const name = "Megumi Hiramoto";
  
  return (
    <main className="h-dvh flex flex-col items-center justify-center relative px-6 overflow-hidden lg:pt-[80px] lg:pb-[120px]">
      <div className="absolute inset-0 lg:bottom-32 pointer-events-none overflow-hidden">
        <FloatingDots count={100} area="hero" />
      </div>
      <InteractiveName text={name} />
    </main>
  );
};
