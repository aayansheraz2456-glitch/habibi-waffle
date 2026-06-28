import { motion } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
};

/**
 * Word-by-word staggered blur-in. Triggers when it scrolls into view.
 */
export default function BlurText({ text, className, delay = 0, once = true }: Props) {
  const words = text.split(" ");
  return (
    <span
      className={className}
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        rowGap: "0.1em",
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          style={{ display: "inline-block", marginRight: "0.28em" }}
          initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
          whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          viewport={{ once, amount: 0.1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: delay + i * 0.1 }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
