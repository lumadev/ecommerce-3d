const HeroDots = ({ total, activeIndex, onSelect }) => {
  return (
    <div className="mt-4 flex justify-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className={`h-2 rounded-full transition-all duration-300 ${
            i === activeIndex
              ? "w-8 bg-primary shadow-glow"
              : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
          }`}
        />
      ))}
    </div>
  );
};

export default HeroDots;