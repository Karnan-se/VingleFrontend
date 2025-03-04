'use client'

import { motion } from 'framer-motion'
import { Button } from '@nextui-org/react'
import { FileVideo, FileText } from 'lucide-react'

export function ContentTypeSelector({ onSelect }) {
  return (
    <motion.div 
      className="flex gap-4 mt-2 rounded-md"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      
      <motion.button
        whileHover={{ scale: 1.1, boxShadow: "0px 4px 10px rgba(255, 0, 0, 0.2)" }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-4 py-2 border rounded-md shadow-md hover:shadow-red-100"
        onClick={() => onSelect('video')}
      >
        <FileVideo size={16} />
        Video Lesson
      </motion.button>

 
      <motion.button
        whileHover={{ scale: 1.1, boxShadow: "0px 4px 10px rgba(255, 255, 0, 0.2)" }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-4 py-2 border rounded-md shadow-md hover:shadow-yellow-100"
        onClick={() => onSelect('pdf')}
      >
        <FileText size={16} />
        PDF Resource
      </motion.button>
    </motion.div>
  )
}
