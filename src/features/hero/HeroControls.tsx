import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroControls = ({ onNext, onPrev }) => {
  return (
    <>
      <button
        onClick={onPrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-background/60 text-foreground backdrop-blur-sm transition-all hover:bg-background/80 hover:shadow-glow"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        onClick={onNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-background/60 text-foreground backdrop-blur-sm transition-all hover:bg-background/80 hover:shadow-glow"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </>
  );
};

export default HeroControls;