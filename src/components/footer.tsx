import { siteConfig, navLinks, socialLinks } from "@/lib/site-data";
import { MartBridgeLogo } from "@/components/icons/martbridge-logo";
import {
  FacebookIcon,
  InstagramIcon,
  WhatsAppIcon,
} from "@/components/icons/social-icons";
import { cn } from "@/lib/utils";

const socialIconMap: Record<string, typeof FacebookIcon> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  whatsapp: WhatsAppIcon,
};

export function Footer() {
  return (
    <footer className="bg-[#0A1628] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Logo and tagline */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <MartBridgeLogo size={40} />
            <p className="text-sm text-white/70 text-center md:text-left">{siteConfig.tagline}</p>
          </div>

          {/* Navigation links */}
          <nav aria-label="Footer navigation" className="flex justify-center md:justify-start">
            <ul className="flex flex-col gap-2 items-center md:items-start">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={cn(
                      "text-sm text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F47920] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1628] rounded-sm"
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social icons */}
          <div className="flex items-start gap-4 md:justify-start justify-center">
            {socialLinks.map((link) => {
              const Icon = socialIconMap[link.platform];
              if (!Icon) return null;
              return (
                <a
                  key={link.platform}
                  href={link.href}
                  aria-label={link.ariaLabel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white transition-colors hover:text-[#F47920] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F47920] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1628] rounded-sm"
                >
                  <Icon size={24} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-white/10 pt-8">
          <p className="text-center text-sm text-white/50">
            © {new Date().getFullYear()} MartBridge
          </p>
        </div>
      </div>
    </footer>
  );
}
