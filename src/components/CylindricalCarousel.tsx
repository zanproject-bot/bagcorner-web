import { useState, useRef, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CarouselCard {
  id: string;
  name: string;
  color: string;
  tag: string;
  tagColor: string;
  image: string;
}

interface CylindricalCarouselProps {
  items: CarouselCard[];
  className?: string;
}

const SPEED_OPTIONS = [
  { label: "0.5×", value: 60 },
  { label: "1×", value: 30 },
  { label: "2×", value: 15 },
  { label: "4×", value: 8 },
];

export function CylindricalCarousel({ items, className = "" }: CylindricalCarouselProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentAngle, setCurrentAngle] = useState(0);
  const [speed, setSpeed] = useState(30);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(1);

  const carouselRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const dragAngleRef = useRef(0);
  const animationRef = useRef<number>();
  const lastTimeRef = useRef(0);

  const itemCount = items.length;
  const cellAngle = 360 / itemCount;

  // Update position counter
  const updatePosition = useCallback(
    (angle: number) => {
      let normalized = ((-angle % 360) + 360) % 360;
      let index = Math.round(normalized / cellAngle) % itemCount;
      setPosition(index + 1);
    },
    [cellAngle, itemCount]
  );

  // Animation loop
  useEffect(() => {
    if (!isPlaying) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const animate = (time: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = time;
      }

      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      setCurrentAngle((prev) => {
        const newAngle = prev - (360 / speed) * delta;
        updatePosition(newAngle);
        return newAngle;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = 0;
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, speed, updatePosition]);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  // Navigation
  const goToPrev = useCallback(() => {
    setIsPlaying(false);
    setCurrentAngle((prev) => {
      const newAngle = prev + cellAngle;
      updatePosition(newAngle);
      return newAngle;
    });
  }, [cellAngle, updatePosition]);

  const goToNext = useCallback(() => {
    setIsPlaying(false);
    setCurrentAngle((prev) => {
      const newAngle = prev - cellAngle;
      updatePosition(newAngle);
      return newAngle;
    });
  }, [cellAngle, updatePosition]);

  // Mouse drag handlers
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isPlaying) setIsPlaying(false);
      setIsDragging(true);
      startXRef.current = e.clientX;
      dragAngleRef.current = currentAngle;
      e.preventDefault();
    },
    [currentAngle, isPlaying]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - startXRef.current;
      const newAngle = dragAngleRef.current + dx * 0.3;
      setCurrentAngle(newAngle);
      updatePosition(newAngle);
    },
    [isDragging, updatePosition]
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      // Snap to nearest cell
      setCurrentAngle((prev) => {
        const snapped = Math.round(prev / cellAngle) * cellAngle;
        updatePosition(snapped);
        return snapped;
      });
    }
  }, [isDragging, cellAngle, updatePosition]);

  // Touch handlers
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (isPlaying) setIsPlaying(false);
      setIsDragging(true);
      startXRef.current = e.touches[0].clientX;
      dragAngleRef.current = currentAngle;
    },
    [currentAngle, isPlaying]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;
      const dx = e.touches[0].clientX - startXRef.current;
      const newAngle = dragAngleRef.current + dx * 0.3;
      setCurrentAngle(newAngle);
      updatePosition(newAngle);
    },
    [isDragging, updatePosition]
  );

  const handleTouchEnd = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      setCurrentAngle((prev) => {
        const snapped = Math.round(prev / cellAngle) * cellAngle;
        updatePosition(snapped);
        return snapped;
      });
    }
  }, [isDragging, cellAngle, updatePosition]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrev();
      } else if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrev, goToNext, togglePlay]);

  return (
    <div className={`relative ${className}`}>
      {/* Carousel Area */}
      <div className="relative w-full flex items-center justify-center mb-4">
        {/* Glow rings — 50% smaller */}
        <div className="absolute w-[250px] h-[250px] md:w-[300px] md:h-[300px] rounded-full border border-primary/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-[glowPulse_4s_ease-in-out_infinite]" />
        <div className="absolute w-[300px] h-[300px] md:w-[350px] md:h-[350px] rounded-full border border-primary/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-[glowPulse_4s_ease-in-out_infinite_1s]" />

        {/* Left Nav */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-1 md:left-2 lg:left-4 z-20 w-9 h-9 rounded-full border-border/50 bg-background/30 backdrop-blur-xl hover:bg-primary/20 hover:border-primary/40 hover:scale-110 transition-all duration-300"
          onClick={goToPrev}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {/* Scene — 50% smaller */}
        <div
          className="relative w-full max-w-[160px] h-[210px] md:max-w-[190px] md:h-[250px] lg:max-w-[210px] lg:h-[280px]"
          style={{ perspective: "800px", perspectiveOrigin: "50% 50%" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            ref={carouselRef}
            className={`absolute inset-0 ${isPlaying ? "" : ""}`}
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateY(${currentAngle}deg)`,
              transition: isDragging ? "none" : "transform 0.1s ease-out",
            }}
          >
            {items.map((item, index) => (
              <div
                key={item.id}
                className="absolute inset-0"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${index * cellAngle}deg) translateZ(min(190px, 14vw))`,
                }}
              >
                <div
                  className="relative w-full h-full rounded-xl overflow-hidden cursor-pointer transition-all duration-400 hover:scale-[1.08] hover:rotate-x-[5deg] hover:rotate-y-[-5deg]"
                  style={{
                    boxShadow:
                      "0 12px 24px -8px oklch(0 0 0 / 0.5), 0 0 0 1px oklch(1 0 0 / 0.05), inset 0 1px 0 oklch(1 0 0 / 0.1)",
                    animation: `cardFloat 4s ease-in-out infinite`,
                    animationDelay: `${-index * 0.5}s`,
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    draggable={false}
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-[1]" />
                  {/* Shine effect */}
                  <div className="absolute inset-0 z-[2] bg-gradient-to-br from-white/15 via-transparent to-white/5 pointer-events-none transition-opacity duration-300 hover:from-white/25 hover:to-white/10" />
                  {/* Number badge */}
                  <div className="absolute top-2 right-2 z-[3] w-6 h-6 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 flex items-center justify-center text-[10px] font-bold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 z-[3]" style={{ transform: "translateZ(15px)" }}>
                    <span
                      className={`inline-block px-1.5 py-0.5 rounded-full text-[8px] font-semibold tracking-wider uppercase mb-1 backdrop-blur-sm border ${item.tagColor}`}
                    >
                      {item.tag}
                    </span>
                    <h3 className="font-display text-sm md:text-base font-bold text-white leading-tight mb-0.5">
                      {item.name}
                    </h3>
                    <p className="text-[10px] text-white/60 font-light">{item.color}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Nav */}
        <Button
          variant="outline"
          size="icon"
          className="absolute right-1 md:right-2 lg:right-4 z-20 w-9 h-9 rounded-full border-border/50 bg-background/30 backdrop-blur-xl hover:bg-primary/20 hover:border-primary/40 hover:scale-110 transition-all duration-300"
          onClick={goToNext}
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Floor reflection — 50% smaller */}
      <div className="w-full max-w-[300px] h-10 mx-auto -mt-4 bg-gradient-to-t from-primary/8 to-transparent blur-lg relative z-0" />

      {/* Controls — more compact */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-3">
        {/* Play/Pause */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="w-9 h-9 rounded-full border-border/50 bg-background/30 backdrop-blur-xl hover:bg-primary/20 hover:border-primary/40 transition-all duration-300"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause rotation" : "Play rotation"}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5" />
            ) : (
              <Play className="w-3.5 h-3.5 ml-0.5" />
            )}
          </Button>
          <span className="text-muted-foreground text-[10px] font-medium">
            {isPlaying ? "Auto" : "Paused"}
          </span>
        </div>

        {/* Speed Controls */}
        <div className="flex items-center gap-1.5">
          <span className="text-muted-foreground/60 text-[10px] font-medium uppercase tracking-wider">
            Speed
          </span>
          {SPEED_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSpeed(opt.value)}
              className={`px-2 py-1 rounded-full text-[10px] font-medium transition-all duration-200 ${
                speed === opt.value
                  ? "bg-primary/20 border border-primary/40 text-foreground"
                  : "border border-border/50 bg-background/30 text-muted-foreground hover:border-border hover:text-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Position Counter */}
        <div className="flex items-center gap-1.5">
          <span className="text-muted-foreground/60 text-[10px] font-medium uppercase tracking-wider">
            Pos
          </span>
          <span className="text-foreground/70 text-xs font-semibold tabular-nums">
            {position} / {itemCount}
          </span>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="mt-4 flex flex-col items-center gap-1">
        <span className="text-muted-foreground/20 text-[8px] tracking-widest uppercase">
          Drag
        </span>
        <ChevronLeft className="w-3 h-3 text-muted-foreground/10 rotate-[-90deg]" />
      </div>
    </div>
  );
}
