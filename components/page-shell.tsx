'use client';
import { usePathname } from 'next/navigation';
export function PageShell() {
  const path = usePathname();
  return <section className='card'><h1 className='text-2xl font-semibold capitalize'>{path.replaceAll('/', ' ') || 'home'}</h1><p className='mt-2 text-sm text-slate-600'>MVP page scaffold with secure API integration ready.</p></section>;
}
