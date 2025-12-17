import React from 'react';
import { SocialLink, IconLink } from './types';
import { 
  LinkedInIcon, 
  XIcon, 
  WhatsAppIcon, 
  MailIcon,
  GitHubIcon
} from './components/Icons';

export const USER_INFO = {
  name: "Ahmed K. Alrasheed",
  role: "Full-Stack Developer • AI Engineer • iOS Developer • Computer Science",
  avatar: "https://i.postimg.cc/JDrXRRcC/PHOTO-2025-11-11-15-35-44.jpg", 
  portfolioUrl: "https://ahmedk-portfolio.netlify.app/",
  email: "ahmedrasheed121m@gmail.com",
  phone: "+966509688559",
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'linkedin',
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ahmed-k-alrasheed-446b8829b/',
    icon: React.createElement(LinkedInIcon, { className: "w-5 h-5" })
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp Chat',
    url: 'https://wa.me/966509688559',
    icon: React.createElement(WhatsAppIcon, { className: "w-5 h-5" })
  },
  {
    id: 'github',
    title: 'GitHub',
    url: 'https://github.com/Ahmed-1425',
    icon: React.createElement(GitHubIcon, { className: "w-5 h-5" })
  },
  {
    id: 'email-main',
    title: 'Email',
    url: `mailto:${USER_INFO.email}`,
    icon: React.createElement(MailIcon, { className: "w-5 h-5" })
  },
  {
    id: 'x',
    title: 'X',
    url: 'https://x.com/i2wfk9?s=21',
    icon: React.createElement(XIcon, { className: "w-5 h-5" })
  }
];

export const BOTTOM_ICONS: IconLink[] = [
  {
    id: 'email',
    label: 'Email',
    url: `mailto:${USER_INFO.email}`,
    icon: React.createElement(MailIcon, { className: "w-5 h-5" })
  },
  {
    id: 'linkedin-icon',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ahmed-k-alrasheed-446b8829b/',
    icon: React.createElement(LinkedInIcon, { className: "w-5 h-5" })
  },
  {
    id: 'github-icon',
    label: 'GitHub',
    url: 'https://github.com/Ahmed-1425',
    icon: React.createElement(GitHubIcon, { className: "w-5 h-5" })
  },
  {
    id: 'whatsapp-icon',
    label: 'WhatsApp',
    url: 'https://wa.me/966509688559',
    icon: React.createElement(WhatsAppIcon, { className: "w-5 h-5" })
  },
  {
    id: 'x-icon',
    label: 'X',
    url: 'https://x.com/i2wfk9?s=21',
    icon: React.createElement(XIcon, { className: "w-5 h-5" })
  }
];