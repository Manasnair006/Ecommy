import { useEffect, useRef, useState } from "react";

interface ProductCarouselProps {
    children: React.ReactNode;
}

export default function ProductCarousel({
    children,
}: ProductCarouselProps) {

    const containerRef = useRef<HTMLDivElement>(null);

    const [isHovered, setIsHovered] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Keep the prev/next buttons in sync with the real scroll state.
    // Runs on mount and whenever the container's size changes
    // (e.g. after remote product images load and cards reflow).
    useEffect(() => {
        const container = containerRef.current;

        if (!container) return;

        updateScrollButtons();

        const observer = new ResizeObserver(updateScrollButtons);
        observer.observe(container);

        window.addEventListener("resize", updateScrollButtons);

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", updateScrollButtons);
        };
    }, []);

    const updateScrollButtons = () => {
        const container = containerRef.current;

        if (!container) return;

        setCanScrollLeft(container.scrollLeft > 0);

        setCanScrollRight(
            container.scrollLeft + container.clientWidth <
            container.scrollWidth - 1
        );
    };

    const scroll = (direction: "left" | "right") => {
        const container = containerRef.current;

        if (!container) return;

        const amount = container.clientWidth * 0.8;

        container.scrollBy({
            left: direction === "left" ? -amount : amount,
            behavior: "smooth",
        });
    };

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >

            {/* Left button */}
            {isHovered && canScrollLeft && (
                <button
                    onClick={() => scroll("left")}
                    className="
                        absolute left-2 top-1/2 z-10
                        -translate-y-1/2
                        w-10 h-10
                        rounded-full
                        bg-white shadow-md
                        flex items-center justify-center
                        hover:bg-gray-100
                    "
                    aria-label="Previous products"
                >
                    {"<"}
                </button>
            )}

            {/* Products */}
            <div
                ref={containerRef}
                onScroll={updateScrollButtons}
                className="
                    flex gap-4
                    overflow-x-auto
                    scroll-smooth
                    scrollbar-hide
                "
            >
                {children}
            </div>

            {/* Right button */}
            {isHovered && canScrollRight && (
                <button
                    onClick={() => scroll("right")}
                    className="
                        absolute right-2 top-1/2 z-10
                        -translate-y-1/2
                        w-10 h-10
                        rounded-full
                        bg-white shadow-md
                        flex items-center justify-center
                        hover:bg-gray-100
                    "
                    aria-label="Next products"
                >
                    {">"}
                </button>
            )}

        </div>
    );
}