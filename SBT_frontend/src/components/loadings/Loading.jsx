import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { motion } from 'framer-motion'
export default function Loading({ isLight = (false) }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
      className={`${isLight ? 'text-white' : ''}`}
    >
      <AiOutlineLoading3Quarters />
    </motion.div>
  )
}