"use client";
import Image from "next/image";
import { urlFor } from "@/src/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState } from "react";
import P_Animation from "@/src/_components/gsap/P_Animation";

gsap.registerPlugin(ScrollTrigger);

type StackItem = {
  title: string;
  icon: SanityImageSource;
};

type StackListProps = {
  techStackItems: StackItem[];
};

export default function TechStackList({ techStackItems }: StackListProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [showTitle, setShowTitle] = useState<string | null>(null);
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
            toggleActions: "play none none none",
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
    <>
      <p className="techstack-title glitch">TECH STACK</p>
      <div ref={wrapperRef} style={{ position: "relative" }}>
        <div className="icon-Grid">
          {techStackItems?.map((stackItem: StackItem) => {
            const imageUrl = urlFor(stackItem.icon).url();
            return (
              <div
                key={stackItem.title}
                className="stack-item"
                onMouseOver={() => setShowTitle(stackItem.title)}
                onMouseLeave={() => setShowTitle(null)}
              >
                <Image
                  key={stackItem.title}
                  className="stack-icon"
                  src={imageUrl}
                  width="170"
                  height="64"
                  alt={stackItem.title}
                />

                {showTitle === stackItem.title && (
                  <P_Animation textToAnimate={stackItem.title} color=""/>
                )}
              </div>
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
    </>
  );
}
