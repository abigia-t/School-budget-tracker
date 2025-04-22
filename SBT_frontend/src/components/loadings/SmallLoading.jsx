import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { motion } from 'framer-motion';

export default function SmallLoading({ isLight = false, size = 40 }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
      className={`flex items-center justify-center ${isLight ? 'text-white' : 'text-gray-700'}`}
    >
      <AiOutlineLoading3Quarters size={size} />
    </motion.div>
  );
}
