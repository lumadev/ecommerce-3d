import { type ProductMedia } from "@/data/products";
import { Sparkles, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaCarouselProps {
  media: ProductMedia[];
  activeIndex: number;
  onChange: (i: number) => void;
  productName: string;
  customizable: boolean;
}

const MediaCarousel = ({ media, activeIndex, onChange, productName, customizable }: MediaCarouselProps) => {
  const current = media[activeIndex] ?? media[0];

  const goPrev = () => onChange((activeIndex - 1 + media.length) % media.length);
  const goNext = () => onChange((activeIndex + 1) % media.length);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-card">
        {current.type === "image" ? (
          <img
            key={current.src}
            src={current.src}
            alt={current.alt ?? productName}
            className="h-full w-full object-cover"
          />
        ) : (
          <video
            key={current.src}
            src={current.src}
            poster={current.poster}
            autoPlay
            muted
            loop
            playsInline
            controls
            className="h-full w-full object-cover bg-black"
          />
        )}

        {customizable && (
          <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-primary/90 px-4 py-1.5 text-sm font-semibold text-primary-foreground">
            <Sparkles size={14} />
            Personalizável
          </div>
        )}

        {media.length > 1 && (
          <>
            <button
              onClick={goPrev}
              aria-label="Mídia anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/70 p-2 text-foreground backdrop-blur transition hover:bg-background"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={goNext}
              aria-label="Próxima mídia"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/70 p-2 text-foreground backdrop-blur transition hover:bg-background"
            >
              <ChevronRight size={20} />
            </button>

            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {media.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === activeIndex ? "w-6 bg-primary" : "w-1.5 bg-foreground/40"
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {media.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {media.map((m, i) => (
            <button
              key={i}
              onClick={() => onChange(i)}
              aria-label={`Selecionar mídia ${i + 1}`}
              className={cn(
                "relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all",
                i === activeIndex ? "border-primary shadow-glow" : "border-border hover:border-primary/50"
              )}
            >
              {m.type === "image" ? (
                <img src={m.src} alt="" className="h-full w-full object-cover" />
              ) : (
                <>
                  <img
                    src={m.poster ?? ""}
                    alt=""
                    className="h-full w-full object-cover bg-black"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Play size={20} className="text-white" fill="white" />
                  </span>
                </>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaCarousel;