import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-gray-800 bg-black/50 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Product</h3>
            <ul className="mt-4 space-y-2">
              <FooterLink href="/components">Components</FooterLink>
              <FooterLink href="/templates">Templates</FooterLink>
              <FooterLink href="/pricing">Pricing</FooterLink>
              <FooterLink href="/docs">Documentation</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Resources</h3>
            <ul className="mt-4 space-y-2">
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/showcase">Showcase</FooterLink>
              <FooterLink href="/changelog">Changelog</FooterLink>
              <FooterLink href="/roadmap">Roadmap</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Company</h3>
            <ul className="mt-4 space-y-2">
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
              <FooterLink href="/privacy">Privacy</FooterLink>
              <FooterLink href="/terms">Terms</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Connect</h3>
            <ul className="mt-4 space-y-2">
              <FooterLink href="https://twitter.com">Twitter</FooterLink>
              <FooterLink href="https://github.com">GitHub</FooterLink>
              <FooterLink href="https://discord.com">Discord</FooterLink>
              <FooterLink href="/newsletter">Newsletter</FooterLink>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Enhancer UI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <li>
      <Link href={href} className="text-sm text-gray-400 hover:text-white transition-colors">
        {children}
      </Link>
    </li>
  );
};

export { Footer };
