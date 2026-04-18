const HeroThumbnails = ({ products, activeIndex, onSelect }) => {
  return (
    <div className="mt-4 grid grid-cols-4 gap-2">
      {products.map((p, i) => (
        <button
          key={p.id}
          onClick={() => onSelect(i)}
          className={`overflow-hidden rounded-lg border-2 transition-all duration-300 aspect-square ${
            i === activeIndex
              ? "border-primary shadow-glow scale-105"
              : "border-transparent opacity-50 hover:opacity-80"
          }`}
        >
          <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
        </button>
      ))}
    </div>
  );
};

export default HeroThumbnails;