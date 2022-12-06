import { StaticImageData } from 'next/image';
import { ReactNode } from 'react';

export interface HomeLayoutProps {
  children: ReactNode;
}

export interface HomeListProps {
  children: ReactNode;
  title: string;
}

export interface HomeListItemProps {
  // children: ReactNode;
  title: string;
  image: StaticImageData | string;
  alt: string;
  link: string;
}
