'use client';

import { Github, Linkedin, Mail } from 'lucide-react';
import XIcon from '../icons/XIcon';
import Link from 'next/link';
import { useI18n } from '@/app/providers/I18nProvider';
import { siteConfig } from '../config';

const iconMap = {
  Github: Github,
  Twitter: XIcon,
  Linkedin: Linkedin,
  Mail: Mail,
  Discord: DiscordIcon
} as const;

import enMessages from '@/messages/en.json';
import cnMessages from '@/messages/cn.json';
import { useVersion } from '../hooks/UseVersion';
import DiscordIcon from '../icons/DiscordIcon';

export default function Footer() {
  const versionInfo = useVersion();
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
  const siteName = t('SiteName.name');
  const { brand, navSections, footerSocialLinks, status, bottomBar } = siteConfig.footer;
  const year = new Date().getFullYear();
  const copyrightText = bottomBar.copyrightText[locale === 'cn' ? 'cn' : 'en']
    .replace('{year}', year.toString())
    .replace('{siteName}', siteName);
  return (
    <footer className="border-t border-border bg-background">
      <div className={siteConfig.footer.container.className}>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className={brand.logo.className}>
                <img
                  src={brand.logo.imageUrl}
                  alt={siteName}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-base font-bold text-foreground">{siteName}</span>
            </div>
            <p className="text-[11px] text-muted-foreground max-w-md leading-relaxed">
              {brand.description[locale === 'cn' ? 'cn' : 'en']}
            </p>
            <div className="mt-4 flex gap-3">
              {footerSocialLinks.map((social, index) => {
                const IconComponent = iconMap[social.icon as keyof typeof iconMap];
                return (
                  <a
                    key={index}
                    href={social.href}
                    className={social.className}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconComponent className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {navSections.map((section, index) => (
              <div key={index}>
                <h3 className="font-medium text-xs text-foreground mb-3">
                  {t(section.titleKey)}
                </h3>
                <ul className="space-y-1.5">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {t(link.labelKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className={bottomBar.className}>
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <div className="text-center sm:text-left">
              <p className="text-[10px] text-muted-foreground">
                {copyrightText}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className={status.dot.className} />
                <span className="text-[10px] text-muted-foreground">
                  {status.label[locale === 'cn' ? 'cn' : 'en']}
                </span>
              </div>
              <div className="text-[10px] text-muted-foreground">
                {versionInfo.loading ? (
                  <span className="inline-flex items-center">
                    <span className="inline-block w-10 h-3 bg-muted rounded animate-pulse" />
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    {versionInfo.latest}
                    {versionInfo.error && (
                      <span className="text-[9px] text-muted-foreground/50 ml-0.5">(offline)</span>
                    )}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}