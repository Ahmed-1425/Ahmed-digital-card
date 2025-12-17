import React, { useState, useEffect } from 'react';
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

// New Falling Glowing Particle Component
const FallingStar: React.FC<{ index: number }> = ({ index }) => {
  const [randomX] = useState(Math.random() * 100);
  const [randomDelay] = useState(Math.random() * 10);
  const [randomDuration] = useState(Math.random() * 5 + 5);
  const [randomSize] = useState(Math.random() * 3 + 1);

  return (
    <motion.div
      className="absolute bg-gradient-to-b from-white to-[var(--secondary)] rounded-full blur-[1px]"
      style={{
        left: `${randomX}%`,
        width: randomSize,
        height: randomSize,
        boxShadow: `0 0 ${randomSize * 3}px var(--secondary)`,
      }}
      initial={{ top: -20, opacity: 0 }}
      animate={{ 
        top: '110%', 
        opacity: [0, 1, 1, 0],
        x: [0, (Math.random() - 0.5) * 50]
      }}
      transition={{ 
        duration: randomDuration, 
        repeat: Infinity, 
        delay: randomDelay, 
        ease: "linear" 
      }}
    />
  );
};

const AnimatedBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[var(--bg)]">
    {/* Falling Stars/Particles */}
    {[...Array(30)].map((_, i) => (
      <FallingStar key={i} index={i} />
    ))}

    {/* Dynamic Background Blobs */}
    <motion.div 
      className="blob w-[900px] h-[900px] rounded-full bg-[var(--primary)] absolute top-[-300px] left-[-300px]"
      animate={{ 
        x: [0, 100, -50, 0],
        y: [0, -100, 50, 0],
        scale: [1, 1.1, 0.9, 1],
        backgroundColor: ['#135250', '#1a6c69', '#0e3e3d', '#135250']
      }}
      transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
      style={{ opacity: 0.15, filter: 'blur(150px)' }}
    />
    <motion.div 
      className="blob w-[800px] h-[800px] rounded-full bg-[var(--secondary)] absolute bottom-[-200px] right-[-200px]"
      animate={{ 
        x: [0, -100, 50, 0],
        y: [0, 100, -50, 0],
        scale: [1, 1.15, 0.85, 1],
        backgroundColor: ['#ad8a5f', '#c39f73', '#8f6f4b', '#ad8a5f']
      }}
      transition={{ duration: 50, repeat: Infinity, ease: "easeInOut" }}
      style={{ opacity: 0.1, filter: 'blur(130px)' }}
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
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)'
    }}
  />
);

const ProfileSection = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-0 pb-1 text-center relative z-20">
      <motion.div 
        className="relative mb-3 group"
        whileTap={{ scale: 0.95 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Glowing Rings around Avatar */}
        <motion.div 
          className="absolute -inset-4 rounded-full opacity-60 blur-2xl"
          style={{
            background: 'conic-gradient(from 0deg, var(--primary), var(--secondary), var(--accent), var(--secondary), var(--primary))',
            transform: "translateZ(-5px)"
          }}
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ 
            rotate: { duration: 12, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div 
          className="absolute -inset-1 rounded-full opacity-100 z-0"
          style={{
            background: 'linear-gradient(45deg, var(--secondary), var(--primary))',
            padding: '2px'
          }}
          animate={{ filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)'] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <div className="relative w-28 h-28 rounded-full p-[3px] bg-black z-10 overflow-hidden shadow-[0_0_30px_rgba(173,138,95,0.3)]" style={{ transform: "translateZ(10px)" }}>
           <img 
            src={USER_INFO.avatar} 
            alt={USER_INFO.name} 
            className="w-full h-full object-cover rounded-full select-none pointer-events-none transition-transform duration-1000 group-hover:scale-110"
          />
        </div>
      </motion.div>

      <motion.h1 
        className="text-xl font-bold mb-0.5 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[var(--text)] via-[var(--secondary-light)] to-[var(--text)]"
        animate={{ backgroundPosition: ['0%', '200%'] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: '200% auto', transform: "translateZ(15px)" }}
      >
        {USER_INFO.name}
      </motion.h1>

      <motion.p 
        className="text-[10px] text-[var(--text-light)] max-w-[85%] font-medium leading-tight mb-2 opacity-80"
        style={{ transform: "translateZ(10px)" }}
      >
        {USER_INFO.role}
      </motion.p>

      <motion.div 
        className="inline-flex items-center px-4 py-1 rounded-full border border-[var(--secondary)]/30 bg-[var(--secondary)]/10 backdrop-blur-md relative overflow-hidden z-30 shadow-lg shadow-[var(--secondary)]/10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ transform: "translateZ(12px)" }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--secondary)] mr-2 animate-pulse shadow-[0_0_8px_var(--secondary)]" />
        <span className="text-[8px] font-bold text-[var(--secondary-light)] uppercase tracking-[0.2em]">
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
      className="group relative w-full mb-1.5 p-[1px] rounded-2xl overflow-hidden block transform-gpu z-30 cursor-pointer"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
      style={{ transform: "translateZ(15px)" }} 
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--primary)]"
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'], filter: ['hue-rotate(0deg)', 'hue-rotate(360deg)'] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: '200% auto', opacity: 0.6 }}
      />
      <div className="relative bg-[var(--bg-alt)]/90 backdrop-blur-3xl rounded-2xl p-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-[var(--text)] shadow-lg shadow-[var(--primary-dark)]/50">
            <TrophyIcon className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-[var(--text)] text-[14px] leading-tight">Portfolio</h3>
            <p className="text-[9px] text-[var(--text-light)] opacity-60 font-medium">Showcasing Elite Work</p>
          </div>
        </div>
        <ExternalLinkIcon className="text-[var(--secondary)] w-3.5 h-3.5 opacity-60" />
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
      className="w-full group relative flex items-center p-3 mb-1 rounded-2xl backdrop-blur-xl bg-[var(--bg-alt)]/40 border border-[var(--border)] overflow-hidden transform-gpu z-30 cursor-pointer transition-all duration-500 hover:border-[var(--secondary)]/50"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.05 + (index * 0.05) }}
      whileTap={{ scale: 0.98 }}
      style={{ transform: "translateZ(20px)" }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[var(--primary)] to-[var(--secondary)] opacity-20 group-hover:opacity-100 transition-opacity duration-700" />
      <span className="text-[var(--text-light)] mr-4 relative z-10 group-hover:text-[var(--secondary)] group-hover:scale-110 transition-all duration-500">
        {link.icon}
      </span>
      <span className="font-semibold text-[13px] text-[var(--text)] tracking-wide flex-1 text-left relative z-10 group-hover:translate-x-1 transition-transform duration-500">{link.title}</span>
      <ExternalLinkIcon className="text-[var(--secondary)] opacity-20 w-3.5 h-3.5 z-10 transition-opacity duration-500 group-hover:opacity-80" />
      <ShimmerEffect />
    </motion.a>
  );
};

const UtilityButtons: React.FC<{ onCopy: (text: string, type: string) => void }> = ({ onCopy }) => {
  return (
    <div className="flex justify-center gap-3 mt-2 mb-1 relative z-30" style={{ transform: "translateZ(20px)" }}>
      <motion.button
        className="relative overflow-hidden flex items-center gap-2 px-5 py-2 rounded-xl bg-[var(--bg-alt)]/60 border border-[var(--border)] text-[9px] font-bold text-[var(--text-light)] cursor-pointer shadow-xl transition-all hover:border-[var(--secondary)]/40"
        onClick={() => onCopy(USER_INFO.email, 'Email Copied!')}
        whileTap={{ scale: 0.95 }}
      >
        <MailIcon className="w-3.5 h-3.5" />
        <span>Email</span>
        <CopyIcon className="w-2.5 h-2.5 opacity-20 ml-0.5" />
      </motion.button>

      <motion.button
        className="relative overflow-hidden flex items-center gap-2 px-5 py-2 rounded-xl bg-[var(--bg-alt)]/60 border border-[var(--border)] text-[9px] font-bold text-[var(--text-light)] cursor-pointer shadow-xl transition-all hover:border-[var(--secondary)]/40"
        onClick={() => onCopy(USER_INFO.phone, 'Mobile Copied!')}
        whileTap={{ scale: 0.95 }}
      >
        <PhoneIcon className="w-3.5 h-3.5" />
        <span>Mobile</span>
        <CopyIcon className="w-2.5 h-2.5 opacity-20 ml-0.5" />
      </motion.button>
    </div>
  );
};

const IconRow = () => {
  return (
    <motion.div 
      className="flex justify-center items-center gap-4 mt-2.5 relative z-30"
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
          className="relative p-2.5 rounded-2xl bg-[var(--bg-alt)]/60 border border-[var(--border)] text-[var(--text-light)] cursor-pointer transition-all duration-300 hover:border-[var(--secondary)]/50 hover:text-[var(--secondary)]"
          whileTap={{ scale: 0.8, color: 'var(--secondary)' }}
        >
          <div className="relative z-10 scale-100">{item.icon}</div>
        </motion.a>
      ))}
    </motion.div>
  );
};

export default function App() {
  const [toast, setToast] = useState({ visible: false, message: '' });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [3, -3]); 
  const rotateY = useTransform(x, [-100, 100], [-3, 3]);
  
  const springConfig = { damping: 40, stiffness: 200 };
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
    <div className="h-[100dvh] w-full flex flex-col justify-center items-center p-4 relative overflow-hidden perspective-1000">
      <AnimatedBackground />
      <Toast message={toast.message} isVisible={toast.visible} />

      <motion.div 
        className="w-full max-w-[360px] relative z-10"
        style={{ perspective: 1200 }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {/* Animated Ultra-Smooth Glow Border */}
        <motion.div 
            className="absolute -inset-[3px] rounded-[2rem] blur-2xl opacity-40 z-0"
            animate={{ 
                background: [
                    'linear-gradient(0deg, var(--primary), var(--secondary))',
                    'linear-gradient(120deg, var(--secondary), var(--accent))',
                    'linear-gradient(240deg, var(--accent), var(--primary))',
                    'linear-gradient(360deg, var(--primary), var(--secondary))'
                ],
                filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)']
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        <motion.div 
            className="relative overflow-visible rounded-[1.8rem] bg-[var(--bg-alt)]/35 backdrop-blur-3xl border border-[var(--border)] shadow-2xl px-5 py-5"
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
          {/* Spotlight Effect */}
          <motion.div
            className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 z-50"
            style={{
              background: useTransform(
                [mouseX, mouseY],
                ([mx, my]) => `radial-gradient(450px circle at ${mx}px ${my}px, rgba(173, 138, 95, 0.1), transparent 80%)`
              ),
              opacity: 1
            }}
          />
          
          <ProfileSection />
          
          <div className="mt-2 relative z-20" style={{ transformStyle: "preserve-3d" }}>
            <PortfolioCard />
            <div className="space-y-1">
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