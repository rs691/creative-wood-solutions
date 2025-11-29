import { Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';
import { Logo } from './icons';

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="flex items-center space-x-2">
            <Logo className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold font-headline">Creative Wood Solutions</span>
          </Link>
          <p className="max-w-md mx-auto mt-4 text-muted-foreground">
            Crafting timeless pieces from sustainable sources.
          </p>
          <div className="flex justify-center mt-6 space-x-4">
            <a href="#" title="Twitter" className="text-muted-foreground hover:text-primary"><Twitter /></a>
            <a href="#" title="Instagram" className="text-muted-foreground hover:text-primary"><Instagram /></a>
            <a href="#" title="Facebook" className="text-muted-foreground hover:text-primary"><Facebook /></a>
          </div>
        </div>
        <hr className="my-6 border-border" />
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Creative Wood Solutions. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
