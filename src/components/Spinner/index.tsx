import { motion } from "framer-motion"

export default function Spinner() {
  return (
    <motion.svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      style={{ margin: "auto", display: "block" }}
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 1.5,
        ease: "linear",
      }}
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        stroke="#3498db"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="90 150"
        strokeDashoffset="0"
      />
    </motion.svg>
  )
}
