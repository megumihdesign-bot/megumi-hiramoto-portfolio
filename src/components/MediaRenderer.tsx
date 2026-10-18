import { motion } from 'motion/react';

interface MediaRendererProps {
  src: string;
  alt: string;
  className?: string;
  whileHover?: any;
  transition?: any;
  loading?: 'lazy' | 'eager';
  /** intrinsic pixel size, so the browser reserves space before the file loads */
  width?: number;
  height?: number;
  fetchPriority?: 'high' | 'low' | 'auto';
}

export const MediaRenderer = ({ src, alt, className = "object-cover w-full h-full", whileHover, transition, loading = 'lazy', width, height, fetchPriority }: MediaRendererProps) => {
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
      width={width}
      height={height}
      decoding="async"
      fetchPriority={fetchPriority}
    />
  );
};
