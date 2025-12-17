import { ReactNode } from "react";

export interface SocialLink {
  id: string;
  title: string;
  url: string;
  icon: ReactNode;
  isPrimary?: boolean;
}

export interface IconLink {
  id: string;
  label: string;
  url: string;
  icon: ReactNode;
}
