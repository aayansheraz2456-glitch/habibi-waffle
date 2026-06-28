import type { SVGProps } from "react";

export const ArrowUpRight = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...p}>
    <path d="M7 17L17 7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowLeft = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...p}>
    <path d="M19 12H5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChevronDown = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...p}>
    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Star = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77 5.82 21l1.18-6.88-5-4.87 7.1-1.01z" />
  </svg>
);

export const MapPin = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...p}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z" strokeLinejoin="round" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const Phone = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...p}>
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.8 19.8 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.1 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);

export const IceCream = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2a6 6 0 00-5.66 8H17.66A6 6 0 0012 2z" />
    <path d="M7 12l5 10 5-10z" />
  </svg>
);

export const Noodles = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M4 10h16v1a8 8 0 01-16 0v-1z" />
    <path d="M6 8c0-2 1-4 3-4M10 8c0-3 1-5 3-5M14 8c0-2 1-3 3-3" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" />
    <path d="M3 21h18" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
  </svg>
);

export const Pizza = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2L2 7c1.5 7 5 12 10 15 5-3 8.5-8 10-15L12 2z" opacity={0.25} />
    <path d="M12 2L4 6c1.2 5.5 4 9.5 8 12 4-2.5 6.8-6.5 8-12L12 2z" />
    <circle cx="10" cy="8" r="1.1" fill="#0c0710" />
    <circle cx="14" cy="9" r="1.1" fill="#0c0710" />
    <circle cx="12" cy="13" r="1.1" fill="#0c0710" />
  </svg>
);
