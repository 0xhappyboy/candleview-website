'use client';

import { Zap, Database, Cpu, ChartBar, Smartphone, Code } from 'lucide-react';
import { useI18n } from '@/app/providers/I18nProvider';

import enMessages from '@/messages/en.json';
import cnMessages from '@/messages/cn.json';

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  titleKey: string;
  descriptionKey: string;
}

export default function Features() {
  const { locale } = useI18n();
  const t = (key: string): string => {
    const currentMessages = locale === 'cn' ? cnMessages : enMessages;
    const keys = key.split('.');
    let value: unknown = currentMessages.Features;
    for (const k of keys) {
      if (typeof value === 'object' && value !== null && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    return typeof value === 'string' ? value : key;
  };

  const features: Feature[] = [
    { icon: Zap, titleKey: 'plugAndPlay', descriptionKey: 'plugAndPlayDesc' },
    { icon: Database, titleKey: 'dataDriven', descriptionKey: 'dataDrivenDesc' },
    { icon: Cpu, titleKey: 'lowMemory', descriptionKey: 'lowMemoryDesc' },
    { icon: ChartBar, titleKey: 'professionalCharts', descriptionKey: 'professionalChartsDesc' },
    { icon: Smartphone, titleKey: 'multiPlatform', descriptionKey: 'multiPlatformDesc' },
    { icon: Code, titleKey: 'highExtensibility', descriptionKey: 'highExtensibilityDesc' },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
            {t('title')}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-5 sm:mt-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative rounded-lg border border-border bg-muted/30 p-5 transition-all hover:border-muted-foreground/30 hover:-translate-y-0.5"
            >
              <div className="mb-3 inline-flex items-center justify-center rounded-md bg-primary/10 p-2">
                <feature.icon className="h-4 w-4 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">
                {t(feature.titleKey)}
              </h3>
              <p className="mt-1.5 text-[11px] text-muted-foreground leading-relaxed">
                {t(feature.descriptionKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}