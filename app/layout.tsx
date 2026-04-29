import './globals.css';
import Link from 'next/link';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b bg-white">
          <nav className="mx-auto flex max-w-6xl gap-4 p-4 text-sm">
            <Link href="/">SaaSolutions Compliance OS</Link>
            <Link href="/dashboard">Dashboard</Link><Link href="/company">Company</Link>
            <Link href="/ropa">ROPA</Link><Link href="/vendors">Vendors</Link>
            <Link href="/incidents">Incidents</Link><Link href="/risk">Risk</Link><Link href="/billing">Billing</Link>
          </nav>
        </header>
        <main className="mx-auto max-w-6xl p-4">{children}</main>
      </body>
    </html>
  );
}
