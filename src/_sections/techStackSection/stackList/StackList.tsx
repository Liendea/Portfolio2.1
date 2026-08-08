"use client";
import Image from "next/image";
import { urlFor } from "@/src/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Marquee from "@/src/_components/marquee/Marquee";

gsap.registerPlugin(ScrollTrigger);

type StackItem = {
  title: string;
  icon: SanityImageSource;
};

type StackListProps = {
  techStackItems: StackItem[];
};

function rotate(items: StackItem[], offset: number): StackItem[] {
  if (items.length === 0) return items;
  const n = offset % items.length;
  return [...items.slice(n), ...items.slice(0, n)];
}

function MarqueeIcon({ item }: { item: StackItem }) {
  const imageUrl = urlFor(item.icon).url();
  return (
    <div className="marquee-item">
      <Image
        className="marquee-icon"
        src={imageUrl}
        width={150}
        height={44}
        alt={item.title}
      />
    </div>
  );
}

export default function TechStackList({ techStackItems }: StackListProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current || !overlayRef.current) return;

    const ctx = gsap.context(() => {
      // Scopead till wrapperRef, så bara grid-ikonerna (.stack-icon) träffas -
      // marquee-ikonerna (.marquee-icon) ligger utanför och rörs inte.
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

  if (!techStackItems || techStackItems.length === 0) {
    return null;
  }

  const rowOffset = Math.max(1, Math.floor(techStackItems.length / 3));

  return (
    <>
      <p className="techstack-title">EXPERIENCE WORKING WITH</p>

      {/* DESKTOP/TABLET: grid (döljs på mobil via SCSS) */}
      <div
        ref={wrapperRef}
        style={{ position: "relative" }}
        className="icon-grid-wrapper"
      >
        <div className="icon-Grid">
          {techStackItems.map((stackItem) => {
            const imageUrl = urlFor(stackItem.icon).url();
            return (
              <div key={stackItem.title} className="stack-item">
                <Image
                  className="stack-icon"
                  src={imageUrl}
                  width={150}
                  height={44}
                  alt={stackItem.title}
                />
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
            background: "linear-gradient(to bottom, transparent, white)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* MOBIL: 3 animerade marquee-rader (döljs på desktop/tablet via SCSS) */}
      <div className="icon-marquees">
        <Marquee direction="left" speed={80}>
          {techStackItems.map((item) => (
            <MarqueeIcon key={item.title} item={item} />
          ))}
        </Marquee>
        <Marquee direction="right" speed={60}>
          {rotate(techStackItems, rowOffset).map((item) => (
            <MarqueeIcon key={item.title} item={item} />
          ))}
        </Marquee>
        <Marquee direction="left" speed={70}>
          {rotate(techStackItems, rowOffset * 2).map((item) => (
            <MarqueeIcon key={item.title} item={item} />
          ))}
        </Marquee>
      </div>
    </>
  );
}
