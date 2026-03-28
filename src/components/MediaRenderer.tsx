import { motion } from 'motion/react';

interface MediaRendererProps {
  src: string;
  alt: string;
  className?: string;
  whileHover?: any;
  transition?: any;
  loading?: 'lazy' | 'eager';
}

export const MediaRenderer = ({ src, alt, className = "object-cover w-full h-full", whileHover, transition, loading = 'lazy' }: MediaRendererProps) => {
  const isVideo = src.toLowerCase().match(/\.(mp4|webm|ogg)$/) || src.includes('video');

  if (isVideo) {
    return (
      <motion.video
        src={src}
        className={className}
        autoPlay
        loop
        muted
        playsInline
        whileHover={whileHover}
        transition={transition}
      />
    );
  }

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      whileHover={whileHover}
      transition={transition}
      referrerPolicy="no-referrer"
      loading={loading}
    />
  );
};
