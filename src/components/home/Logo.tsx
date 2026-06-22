"use client";

import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface PixelBotProps {
  size?: number;
  isTyping?: boolean;
  onClick?: () => void;
}

export function PixelBot({ size = 40, isTyping = false, onClick }: PixelBotProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const eyeX = useMotionValue(0);
  const eyeY = useMotionValue(0);
  const pupilX = useTransform(eyeX, [-100, 100], [-2, 2]);
  const pupilY = useTransform(eyeY, [-100, 100], [-1, 1]);

  // Track mouse for eye movement
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const el = document.getElementById("pixel-bot");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      eyeX.set((e.clientX - cx) / 5);
      eyeY.set((e.clientY - cy) / 5);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [eyeX, eyeY]);

  const pixel = size / 10; // 10x10 grid

  // Pixel art grid: 1 = filled, 0 = empty
  const bodyGrid = [
    [0,0,0,1,1,1,1,0,0,0],
    [0,0,1,1,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,1,1,0],
    [1,1,0,1,1,1,1,0,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,1,1,1,1,1,1,0,1],
    [1,0,0,1,1,1,1,0,0,1],
    [0,1,0,0,0,0,0,0,1,0],
    [0,0,1,1,0,0,1,1,0,0],
  ];

  return (
    <motion.div
      id="pixel-bot"
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.3}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      whileDrag={{ scale: 1.2, rotate: [0, -5, 5, 0] }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className="relative cursor-grab active:cursor-grabbing"
      style={{ width: size, height: size }}
      animate={{
        y: isTyping ? [0, -3, 0, -2, 0] : [0, -2, 0],
        rotate: isDragging ? [0, -3, 3, 0] : 0,
      }}
      transition={{
        y: { duration: isTyping ? 0.4 : 2, repeat: Infinity },
        rotate: { duration: 0.3 },
      }}
    >
      {/* Pixel body */}
      <div className="relative" style={{ width: size, height: size }}>
        {bodyGrid.map((row, y) =>
          row.map((cell, x) => {
            if (!cell) return null;
            return (
              <motion.div
                key={`${x}-${y}`}
                className="absolute bg-foreground"
                style={{
                  width: pixel,
                  height: pixel,
                  left: x * pixel,
                  top: y * pixel,
                }}
                animate={{
                  scale: isHovered ? [1, 1.1, 1] : 1,
                  backgroundColor: isHovered ? "#b3abab" : undefined,
                }}
                transition={{ duration: 0.2, delay: (x + y) * 0.02 }}
              />
            );
          })
        )}

        {/* Eyes (separate for animation) */}
        <div className="absolute" style={{ left: 2 * pixel, top: 3 * pixel }}>
          {/* Left eye white */}
          <div
            className="absolute bg-paper"
            style={{ width: 2 * pixel, height: 2 * pixel }}
          />
          {/* Left pupil - follows mouse */}
          <motion.div
            className="absolute bg-foreground"
            style={{
              width: pixel,
              height: pixel,
              x: pupilX,
              y: pupilY,
              left: pixel * 0.5,
              top: pixel * 0.5,
            }}
            animate={{
              scaleY: [1, 0.1, 1],
            }}
            transition={{ duration: 3, repeat: Infinity, times: [0, 0.05, 0.1] }}
          />
        </div>

        <div className="absolute" style={{ left: 6 * pixel, top: 3 * pixel }}>
          {/* Right eye white */}
          <div
            className="absolute bg-paper"
            style={{ width: 2 * pixel, height: 2 * pixel }}
          />
          {/* Right pupil - follows mouse */}
          <motion.div
            className="absolute bg-foreground"
            style={{
              width: pixel,
              height: pixel,
              x: pupilX,
              y: pupilY,
              left: pixel * 0.5,
              top: pixel * 0.5,
            }}
            animate={{
              scaleY: [1, 0.1, 1],
            }}
            transition={{ duration: 3, repeat: Infinity, times: [0, 0.05, 0.1], delay: 0.1 }}
          />
        </div>

        {/* Mouth */}
        <motion.div
          className="absolute bg-paper"
          style={{
            left: 3 * pixel,
            top: 6 * pixel,
            width: 4 * pixel,
            height: isTyping ? pixel : pixel * 0.5,
          }}
          animate={{
            width: isTyping ? [4 * pixel, 2 * pixel, 3 * pixel, 4 * pixel] : 4 * pixel,
            height: isTyping ? [pixel, 2 * pixel, pixel] : pixel * 0.5,
            x: isTyping ? [0, pixel, 0] : 0,
          }}
          transition={{ duration: 0.3, repeat: Infinity }}
        />
      </div>

      {/* Pixel particles when typing */}
      <AnimatePresence>
        {isTyping && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`p-${i}`}
                className="absolute bg-emerald-400"
                style={{
                  width: pixel * 0.5,
                  height: pixel * 0.5,
                  left: "50%",
                  top: 0,
                }}
                initial={{ opacity: 1, y: 0, x: 0 }}
                animate={{
                  y: [-10 - i * 8],
                  x: [(i - 1) * 8],
                  opacity: [1, 0],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Hover tooltip */}
      <AnimatePresence>
        {isHovered && !isDragging && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.8 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-foreground px-2 py-1 text-[10px] font-mono text-paper"
          >
            Ask me anything!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}