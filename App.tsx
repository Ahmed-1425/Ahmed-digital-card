import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { USER_INFO, SOCIAL_LINKS, BOTTOM_ICONS } from './constants';
import { ExternalLinkIcon, TrophyIcon, CopyIcon, CheckIcon, MailIcon, PhoneIcon } from './components/Icons';
import { SocialLink } from './types';

// --- Components ---

const Toast: React.FC<{ message: string, isVisible: boolean }> = ({ message, isVisible }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        className="fixed bottom-16 left-0 right-0 z-[100] flex justify-center pointer-events-none"
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <div className="bg-[var(--primary-dark)] border border-[var(--border)] text-[var(--text)] px-4 py-2 rounded-2xl shadow-2xl flex items-center gap-2 backdrop-blur-xl">
          <div className="bg-[var(--secondary)] rounded-full p-1">
            <CheckIcon className="w-3 h-3 text-[var(--primary-dark)]" />
          </div>
          <span className="text-sm font-semibold tracking-wide">{message}</span>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const FallingParticle: React.FC<{ delay: number }> = ({ delay }) => (
  <motion.div
    className="absolute w-[1px] h-[50px] bg-gradient-to-b from-transparent via-[var(--secondary)] to-transparent"
    initial={{ top: -100, left: `${Math.random() * 100}%`, opacity: 0 }}
    animate={{ 
      top: '110%', 
      opacity: [0, 0.2, 0] 
    }}
    transition={{ 
      duration: Math.random() * 8 + 8, 
      repeat: Infinity, 
      delay, 
      ease: "linear" 
    }}
  />
);

const AnimatedBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[var(--bg)]">
    {[...Array(10)].map((_, i) => (
      <FallingParticle key={i} delay={i * 1.5} />
    ))}

    {/* Ultra-Slow Moving Blobs for 'Smooth' liquid feel */}
    <motion.div 
      className="blob w-[800px] h-[800px] rounded-full bg-[var(--primary)] absolute top-[-300px] left-[-300px]"
      animate={{ 
        x: [0, 80, -40, 0],
        y: [0, -90, 50, 0],
        scale: [1, 1.05, 0.95, 1],
      }}
      transition={{ duration: 70, repeat: Infinity, ease: "easeInOut" }}
      style={{ opacity: 0.12, filter: 'blur(140px)' }}
    />
    <motion.div 
      className="blob w-[700px] h-[700px] rounded-full bg-[var(--secondary)] absolute bottom-[-200px] right-[-200px]"
      animate={{ 
        x: [0, -80, 40, 0],
        y: [0, 90, -50, 0],
        scale: [1, 1.1, 0.9, 1],
      }}
      transition={{ duration: 85, repeat: Infinity, ease: "easeInOut" }}
      style={{ opacity: 0.08, filter: 'blur(120px)' }}
    />
  </div>
);

const ShimmerEffect = () => (
  <motion.div
    className="absolute inset-0 -skew-x-12 z-10 pointer-events-none"
    initial={{ x: '-150%', opacity: 0 }}
    animate={{ x: '150%', opacity: [0, 0.2, 0] }}
    transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
    style={{
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)'
    }}
  />
);

const ProfileSection = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-0 pb-0 text-center relative z-20">
      <motion.div 
        className="relative mb-1.5 group"
        whileTap={{ scale: 0.95 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div 
          className="absolute -inset-2 rounded-full opacity-40 blur-2xl"
          style={{
            background: 'conic-gradient(from 0deg, var(--primary), var(--secondary), var(--accent), var(--secondary), var(--primary))',
            transform: "translateZ(-2px)"
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <div className="relative w-16 h-16 rounded-full p-[1.5px] bg-gradient-to-br from-[var(--border)] to-transparent z-10 overflow-hidden shadow-2xl" style={{ transform: "translateZ(5px)" }}>
           <img 
            src={USER_INFO.avatar} 
            alt={USER_INFO.name} 
            className="w-full h-full object-cover rounded-full select-none pointer-events-none"
          />
        </div>
      </motion.div>

      <motion.h1 
        className="text-lg font-bold mb-0 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[var(--text)] via-[var(--secondary-light)] to-[var(--text)]"
        animate={{ backgroundPosition: ['0%', '200%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: '200% auto', transform: "translateZ(10px)" }}
      >
        {USER_INFO.name}
      </motion.h1>

      <motion.p 
        className="text-[9px] text-[var(--text-light)] max-w-[90%] font-medium leading-tight mb-1 opacity-70"
        style={{ transform: "translateZ(8px)" }}
      >
        {USER_INFO.role}
      </motion.p>

      <motion.div 
        className="inline-flex items-center px-2 py-0.5 rounded-full border border-[var(--secondary)]/20 bg-[var(--secondary)]/5 backdrop-blur-md relative overflow-hidden z-30"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ transform: "translateZ(12px)" }}
      >
        <span className="w-1 h-1 rounded-full bg-[var(--secondary)] mr-1.5 animate-pulse" />
        <span className="text-[7.5px] font-bold text-[var(--secondary-light)] uppercase tracking-[0.15em]">
          Let's Connect
        </span>
      </motion.div>
    </div>
  );
};

const PortfolioCard = () => {
  return (
    <motion.a
      href={USER_INFO.portfolioUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative w-full mb-1 p-[1px] rounded-xl overflow-hidden block transform-gpu z-30 cursor-pointer"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
      style={{ transform: "translateZ(15px)" }} 
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--primary)]"
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: '200% auto', opacity: 0.5 }}
      />
      <div className="relative bg-[var(--bg-alt)]/90 backdrop-blur-2xl rounded-xl p-2 flex items-center justify-between z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-[var(--text)] shadow-md">
            <TrophyIcon className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-[var(--text)] text-[13px] leading-tight">Portfolio</h3>
            <p className="text-[8px] text-[var(--text-light)] opacity-50 font-medium">Showcasing my work</p>
          </div>
        </div>
        <ExternalLinkIcon className="text-[var(--secondary)] w-2.5 h-2.5 opacity-40" />
      </div>
      <ShimmerEffect />
    </motion.a>
  );
};

const LinkButton: React.FC<{ link: SocialLink; index: number }> = ({ link, index }) => {
  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full group relative flex items-center p-2 mb-0.5 rounded-xl backdrop-blur-xl bg-[var(--bg-alt)]/40 border border-[var(--border)] overflow-hidden transform-gpu z-30 cursor-pointer"
      initial={{ opacity: 0, x: -5 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.05 + (index * 0.03) }}
      whileTap={{ scale: 0.98 }}
      style={{ transform: "translateZ(20px)" }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--primary)] to-[var(--secondary)] opacity-10 group-hover:opacity-100 transition-opacity duration-1000" />
      <span className="text-[var(--text-light)] mr-3 relative z-10 group-hover:text-[var(--secondary)] transition-colors duration-1000">
        {link.icon}
      </span>
      <span className="font-semibold text-[11.5px] text-[var(--text)] tracking-wide flex-1 text-left relative z-10">{link.title}</span>
      <ExternalLinkIcon className="text-[var(--secondary)] opacity-15 w-2.5 h-2.5 z-10" />
      <ShimmerEffect />
    </motion.a>
  );
};

const UtilityButtons: React.FC<{ onCopy: (text: string, type: string) => void }> = ({ onCopy }) => {
  return (
    <div className="flex justify-center gap-2.5 mt-1 mb-0.5 relative z-30" style={{ transform: "translateZ(20px)" }}>
      <motion.button
        className="relative overflow-hidden flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[var(--bg-alt)]/60 border border-[var(--border)] text-[8.5px] font-bold text-[var(--text-light)] cursor-pointer"
        onClick={() => onCopy(USER_INFO.email, 'Email Copied!')}
        whileTap={{ scale: 0.95 }}
      >
        <MailIcon className="w-2.5 h-2.5" />
        <span>Email</span>
        <CopyIcon className="w-2 h-2 opacity-15 ml-0.5" />
      </motion.button>

      <motion.button
        className="relative overflow-hidden flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[var(--bg-alt)]/60 border border-[var(--border)] text-[8.5px] font-bold text-[var(--text-light)] cursor-pointer"
        onClick={() => onCopy(USER_INFO.phone, 'Mobile Copied!')}
        whileTap={{ scale: 0.95 }}
      >
        <PhoneIcon className="w-2.5 h-2.5" />
        <span>Mobile</span>
        <CopyIcon className="w-2 h-2 opacity-15 ml-0.5" />
      </motion.button>
    </div>
  );
};

const IconRow = () => {
  return (
    <motion.div 
      className="flex justify-center items-center gap-3 mt-1.5 relative z-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ transform: "translateZ(25px)" }}
    >
      {BOTTOM_ICONS.map((item) => (
        <motion.a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative p-1.5 rounded-lg bg-[var(--bg-alt)]/60 border border-[var(--border)] text-[var(--text-light)] cursor-pointer"
          whileTap={{ scale: 0.8, color: 'var(--secondary)' }}
        >
          <div className="relative z-10 scale-[0.85]">{item.icon}</div>
        </motion.a>
      ))}
    </motion.div>
  );
};

export default function App() {
  const [toast, setToast] = useState({ visible: false, message: '' });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [1.5, -1.5]); 
  const rotateY = useTransform(x, [-100, 100], [-1.5, 1.5]);
  
  const springConfig = { damping: 60, stiffness: 120 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    x.set(touch.clientX - (rect.left + rect.width / 2));
    y.set(touch.clientY - (rect.top + rect.height / 2));
    mouseX.set(touch.clientX - rect.left);
    mouseY.set(touch.clientY - rect.top);
  }

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleCopy = (text: string, message: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setToast({ visible: true, message });
      setTimeout(() => setToast({ visible: false, message: '' }), 2500);
    });
  };

  return (
    <div className="h-[100dvh] w-full flex flex-col justify-center items-center p-3 relative overflow-hidden perspective-1000">
      <AnimatedBackground />
      <Toast message={toast.message} isVisible={toast.visible} />

      <motion.div 
        className="w-full max-w-[340px] relative z-10"
        style={{ perspective: 1200 }}
        initial={{ opacity: 0, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {/* Ultra-Smooth Slow Gradient Border */}
        <motion.div 
            className="absolute -inset-[2px] rounded-[1.6rem] blur-xl opacity-25 z-0"
            animate={{ 
                background: [
                    'linear-gradient(0deg, var(--primary), var(--secondary))',
                    'linear-gradient(120deg, var(--secondary), var(--accent))',
                    'linear-gradient(240deg, var(--accent), var(--primary))',
                    'linear-gradient(360deg, var(--primary), var(--secondary))'
                ]
            }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />

        <motion.div 
            className="relative overflow-visible rounded-[1.5rem] bg-[var(--bg-alt)]/40 backdrop-blur-3xl border border-[var(--border)] shadow-2xl px-4 py-3"
            style={{
                rotateX: springRotateX,
                rotateY: springRotateY,
                transformStyle: "preserve-3d"
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseLeave}
        >
          {/* Faint Spotlight Effect */}
          <motion.div
            className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 z-50"
            style={{
              background: useTransform(
                [mouseX, mouseY],
                ([mx, my]) => `radial-gradient(400px circle at ${mx}px ${my}px, rgba(173, 138, 95, 0.05), transparent 80%)`
              ),
              opacity: 1
            }}
          />
          
          <ProfileSection />
          
          <div className="mt-1 relative z-20" style={{ transformStyle: "preserve-3d" }}>
            <PortfolioCard />
            <div className="space-y-0.5">
              {SOCIAL_LINKS.map((link, idx) => (
                <LinkButton key={link.id} link={link} index={idx} />
              ))}
            </div>
          </div>

          <UtilityButtons onCopy={handleCopy} />
          <IconRow />
        </motion.div>
      </motion.div>
    </div>
  );
}