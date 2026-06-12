'use client';

import {
    Clock, Globe, Calendar, Zap,
    TrendingUp, TrendingDown, Activity,
    Sun, Moon, Watch, CalendarDays
} from 'lucide-react';
import { useI18n } from '@/app/providers/I18nProvider';

import enMessages from '@/messages/en.json';
import cnMessages from '@/messages/cn.json';

interface TimeFrameCategory {
    categoryKey: string;
    timeFrames: string[];
}

interface TimeZone {
    name: string;
    timeZone: string;
    regionKey: string;
}

export default function TimeShowcase() {
    const { locale } = useI18n();
    const t = (key: string): string => {
        const currentMessages = locale === 'cn' ? cnMessages : enMessages;
        const keys = key.split('.');
        let value: unknown = currentMessages;
        for (const k of keys) {
            if (typeof value === 'object' && value !== null && k in value) {
                value = (value as Record<string, unknown>)[k];
            } else {
                return key;
            }
        }
        return typeof value === 'string' ? value : key;
    };

    const timeFrameCategories: TimeFrameCategory[] = [
        {
            categoryKey: 'TimeShowcase.secondLevel',
            timeFrames: [
                'TimeShowcase.timeFrames.1s',
                'TimeShowcase.timeFrames.5s',
                'TimeShowcase.timeFrames.15s',
                'TimeShowcase.timeFrames.30s'
            ]
        },
        {
            categoryKey: 'TimeShowcase.minuteLevel',
            timeFrames: [
                'TimeShowcase.timeFrames.1m',
                'TimeShowcase.timeFrames.3m',
                'TimeShowcase.timeFrames.5m',
                'TimeShowcase.timeFrames.15m',
                'TimeShowcase.timeFrames.30m',
                'TimeShowcase.timeFrames.45m'
            ]
        },
        {
            categoryKey: 'TimeShowcase.hourLevel',
            timeFrames: [
                'TimeShowcase.timeFrames.1h',
                'TimeShowcase.timeFrames.2h',
                'TimeShowcase.timeFrames.3h',
                'TimeShowcase.timeFrames.4h',
                'TimeShowcase.timeFrames.6h',
                'TimeShowcase.timeFrames.8h',
                'TimeShowcase.timeFrames.12h'
            ]
        },
        {
            categoryKey: 'TimeShowcase.dailyLevel',
            timeFrames: [
                'TimeShowcase.timeFrames.1d',
                'TimeShowcase.timeFrames.3d'
            ]
        },
        {
            categoryKey: 'TimeShowcase.weeklyLevel',
            timeFrames: [
                'TimeShowcase.timeFrames.1w',
                'TimeShowcase.timeFrames.2w'
            ]
        },
        {
            categoryKey: 'TimeShowcase.monthlyLevel',
            timeFrames: [
                'TimeShowcase.timeFrames.1M',
                'TimeShowcase.timeFrames.3M',
                'TimeShowcase.timeFrames.6M'
            ]
        }
    ];

    const timeZones: TimeZone[] = [
        { name: 'UTC', timeZone: 'UTC', regionKey: 'TimeShowcase.regions.global' },
        { name: 'New York', timeZone: 'America/New_York', regionKey: 'TimeShowcase.regions.americas' },
        { name: 'Chicago', timeZone: 'America/Chicago', regionKey: 'TimeShowcase.regions.americas' },
        { name: 'Denver', timeZone: 'America/Denver', regionKey: 'TimeShowcase.regions.americas' },
        { name: 'Los Angeles', timeZone: 'America/Los_Angeles', regionKey: 'TimeShowcase.regions.americas' },
        { name: 'Toronto', timeZone: 'America/Toronto', regionKey: 'TimeShowcase.regions.americas' },
        { name: 'London', timeZone: 'Europe/London', regionKey: 'TimeShowcase.regions.europe' },
        { name: 'Paris', timeZone: 'Europe/Paris', regionKey: 'TimeShowcase.regions.europe' },
        { name: 'Frankfurt', timeZone: 'Europe/Berlin', regionKey: 'TimeShowcase.regions.europe' },
        { name: 'Zurich', timeZone: 'Europe/Zurich', regionKey: 'TimeShowcase.regions.europe' },
        { name: 'Moscow', timeZone: 'Europe/Moscow', regionKey: 'TimeShowcase.regions.europe' },
        { name: 'Dubai', timeZone: 'Asia/Dubai', regionKey: 'TimeShowcase.regions.middleEast' },
        { name: 'Karachi', timeZone: 'Asia/Karachi', regionKey: 'TimeShowcase.regions.middleEast' },
        { name: 'Kolkata', timeZone: 'Asia/Kolkata', regionKey: 'TimeShowcase.regions.asia' },
        { name: 'Shanghai', timeZone: 'Asia/Shanghai', regionKey: 'TimeShowcase.regions.asia' },
        { name: 'Hong Kong', timeZone: 'Asia/Hong_Kong', regionKey: 'TimeShowcase.regions.asia' },
        { name: 'Singapore', timeZone: 'Asia/Singapore', regionKey: 'TimeShowcase.regions.asia' },
        { name: 'Tokyo', timeZone: 'Asia/Tokyo', regionKey: 'TimeShowcase.regions.asia' },
        { name: 'Seoul', timeZone: 'Asia/Seoul', regionKey: 'TimeShowcase.regions.asia' },
        { name: 'Sydney', timeZone: 'Australia/Sydney', regionKey: 'TimeShowcase.regions.pacific' },
        { name: 'Auckland', timeZone: 'Pacific/Auckland', regionKey: 'TimeShowcase.regions.pacific' }
    ];

    const features = [
        {
            titleKey: 'TimeShowcase.globalCoverage',
            descKey: 'TimeShowcase.globalCoverageDesc',
            color: 'text-blue-600 dark:text-blue-400',
            icon: Globe
        },
        {
            titleKey: 'TimeShowcase.multiTimeframe',
            descKey: 'TimeShowcase.multiTimeframeDesc',
            color: 'text-green-600 dark:text-green-400',
            icon: CalendarDays
        },
        {
            titleKey: 'TimeShowcase.realTimeSync',
            descKey: 'TimeShowcase.realTimeSyncDesc',
            color: 'text-purple-600 dark:text-purple-400',
            icon: Zap
        }
    ];

    const scrollbarStyles = `
    .custom-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: #cbd5e0 #f7fafc;
    }
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #f7fafc;
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #cbd5e0;
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #a0aec0;
    }
    .dark .custom-scrollbar {
      scrollbar-color: #4a5568 #1a202c;
    }
    .dark .custom-scrollbar::-webkit-scrollbar-track {
      background: #1a202c;
    }
    .dark .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #4a5568;
    }
    .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #2d3748;
    }
  `;

    return (
        <>
            <style jsx global>{scrollbarStyles}</style>
            <section className="py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
                            {t('TimeShowcase.title')}
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            {t('TimeShowcase.subtitle')}
                        </p>
                    </div>
                    <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-muted/30 border border-border rounded-lg p-5">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-blue-500 to-cyan-500 p-1.5">
                                    <Clock className="h-4 w-4 text-white" />
                                </div>
                                <h3 className="text-sm font-semibold text-foreground">
                                    {t('TimeShowcase.supportedTimeframes')}
                                </h3>
                            </div>
                            <div className="space-y-4 max-h-[360px] overflow-y-auto custom-scrollbar pr-2">
                                {timeFrameCategories.map((category, categoryIndex) => (
                                    <div key={categoryIndex} className="space-y-2">
                                        <div className="flex items-center gap-1.5">
                                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                                            <h4 className="font-medium text-xs text-foreground">
                                                {t(category.categoryKey)}
                                            </h4>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {category.timeFrames.map((timeFrameKey, timeFrameIndex) => (
                                                <span
                                                    key={timeFrameIndex}
                                                    className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-muted text-muted-foreground border border-border"
                                                >
                                                    {t(timeFrameKey)}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 pt-3 border-t border-border">
                                <p className="text-[10px] text-muted-foreground">
                                    {t('TimeShowcase.timeframeFeatures')}
                                </p>
                            </div>
                        </div>

                        <div className="bg-muted/30 border border-border rounded-lg p-5">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-orange-500 to-amber-500 p-1.5">
                                    <Globe className="h-4 w-4 text-white" />
                                </div>
                                <h3 className="text-sm font-semibold text-foreground">
                                    {t('TimeShowcase.supportedTimezones')}
                                </h3>
                            </div>
                            <div className="space-y-4 max-h-[360px] overflow-y-auto custom-scrollbar pr-2">
                                {(() => {
                                    const regions = timeZones.reduce((acc, tz) => {
                                        const region = t(tz.regionKey);
                                        if (!acc[region]) acc[region] = [];
                                        acc[region].push(tz);
                                        return acc;
                                    }, {} as Record<string, TimeZone[]>);
                                    return Object.entries(regions).map(([region, zoneList], regionIndex) => (
                                        <div key={regionIndex} className="space-y-2">
                                            <div className="flex items-center gap-1.5">
                                                <div className="h-1.5 w-1.5 rounded-full bg-orange-500"></div>
                                                <h4 className="font-medium text-xs text-foreground">
                                                    {region}
                                                </h4>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                                                {zoneList.map((timeZone, tzIndex) => (
                                                    <div
                                                        key={tzIndex}
                                                        className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 px-2 py-1.5 rounded-md bg-muted/50 border border-border min-w-0"
                                                    >
                                                        <div className="flex items-center gap-1.5 min-w-0">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-orange-300 flex-shrink-0"></div>
                                                            <span className="font-medium text-[11px] text-foreground truncate">
                                                                {timeZone.name}
                                                            </span>
                                                        </div>
                                                        <span className="text-[10px] text-muted-foreground truncate sm:ml-auto">
                                                            {timeZone.timeZone}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ));
                                })()}
                            </div>
                            <div className="mt-4 pt-3 border-t border-border">
                                <p className="text-[10px] text-muted-foreground">
                                    {t('TimeShowcase.timezoneFeatures')}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-muted/30 border border-border rounded-lg p-4"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="inline-flex items-center justify-center rounded-md p-1.5 bg-muted">
                                        <feature.icon className={`h-4 w-4 ${feature.color}`} />
                                    </div>
                                    <div className={`${feature.color} font-medium text-xs`}>
                                        {t(feature.titleKey)}
                                    </div>
                                </div>
                                <p className="text-[11px] text-muted-foreground leading-relaxed">
                                    {t(feature.descKey)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}