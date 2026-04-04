"use client";
import Image from "next/image";
import { urlFor } from "../../../sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type techStackItem = {
  title: string;
  icon: SanityImageSource;
};

type TechStackListProps = {
  techStackItems: techStackItem[];
};

export default function TechStackList({ techStackItems }: TechStackListProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current || !overlayRef.current) return;

    const ctx = gsap.context(() => {
      const icons = gsap.utils.toArray<HTMLElement>(".stack-icon");

      // Ikoner animeras in underifrån
      gsap.fromTo(
        icons,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Gradient-overlay tonas bort vid scroll
      gsap.fromTo(
        overlayRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 90%",
            end: "bottom 80%",
            scrub: true,
          },
        },
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} style={{ position: "relative" }}>
      <div className="icon-Grid">
        {techStackItems?.map((stackItem: techStackItem) => {
          const imageUrl = urlFor(stackItem.icon).url();
          return (
            <Image
              key={stackItem.title}
              className="stack-icon"
              src={imageUrl}
              width="170"
              height="64"
              alt={stackItem.title}
            />
          );
        })}
      </div>

      {/* Gradient-overlay som försvinner vid scroll */}
      <div
        ref={overlayRef}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "60%",
          background: "linear-gradient(to bottom, transparent, black)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
