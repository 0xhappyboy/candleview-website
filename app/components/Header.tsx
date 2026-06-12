'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X as CloseIcon, Github, MessageCircle, Send, Package } from 'lucide-react';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { siteConfig } from '../config';
import XIcon from '../icons/XIcon';
import { useI18n } from '@/app/providers/I18nProvider';

import enMessages from '@/messages/en.json';
import cnMessages from '@/messages/cn.json';
import DiscordIcon from '../icons/DiscordIcon';

export default function Header() {
  const { locale } = useI18n();
  const t = (key: string): string => {
    const currentMessages = locale === 'cn' ? cnMessages : enMessages;
    const keys = key.split('.') as (keyof typeof currentMessages)[];
    let result: unknown = currentMessages;
    for (const k of keys) {
      if (typeof result === 'object' && result !== null && k in result) {
        result = (result as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    return typeof result === 'string' ? result : key;
  };
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const iconComponents = {
    Github,
    XIcon,
    MessageCircle,
    Send,
    Package,
    DiscordIcon
  };
  const navItems = siteConfig.navigation.items.map(item => ({
    href: item.href,
    label: t(`Header.${item.key}`),
  }));
  const siteName = t('SiteName.name');

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className={siteConfig.container.className}>
        <div className="flex h-12 items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5">
            <div className="h-6 w-6 rounded overflow-hidden flex items-center justify-center">
              <img
                src={siteConfig.logo.imageUrl}
                alt={siteName}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm font-bold tracking-tight text-foreground">
              {siteName}
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-4 ml-auto mr-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                target="_blank"
                className={`text-[11px] font-medium transition-colors ${pathname === item.href
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1">
              <LanguageSwitcher />
              <ThemeToggle />
              <div className="w-px h-4 bg-border mx-1" />
              <div className="hidden sm:flex items-center gap-1">
                {siteConfig.socialLinks.map((social) => {
                  const IconComponent = iconComponents[social.component];
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-md hover:bg-muted transition-colors"
                      aria-label={social.label}
                    >
                      <div className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground transition-colors">
                        <IconComponent className="w-full h-full" />
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-1.5 rounded-md hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <CloseIcon className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden border-t border-border mt-2 pt-2">
            <div className="py-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-1.5 text-[11px] font-medium rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-muted"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-3 py-2 border-t border-border mt-1">
                <div className="flex justify-center gap-2">
                  {siteConfig.socialLinks.map((social) => {
                    const IconComponent = iconComponents[social.component];
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-md hover:bg-muted transition-colors"
                        aria-label={social.label}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground transition-colors">
                          <IconComponent className="w-full h-full" />
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}