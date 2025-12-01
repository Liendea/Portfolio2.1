"use client";

import { motion } from "framer-motion";

const text = "Let's build something great together!";

export default function AnimatedText(): React.JSX.Element {
  return (
    <motion.p
      className="animated-text"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: { staggerChildren: 0.04 },
        },
      }}
      style={{ display: "flex" }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, x: -10 },
            visible: { opacity: 1, x: 0 },
          }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.p>
  );
}
