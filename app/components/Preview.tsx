"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "../config";
import { useI18n } from "../providers/I18nProvider";
import { TEST_CANDLEVIEW_DATA8 } from "../mock/mock_data_1";
import { CandleView, TimeframeEnum } from "@candleview/core";

interface LocalizableContent {
  en: string;
  cn: string;
  [key: string]: string;
}

type LocalizableConfig = string | LocalizableContent;

const getLocalizedContent = (
  config: LocalizableConfig,
  locale: string,
): string => {
  if (typeof config === "object") {
    const obj = config as Record<string, string>;
    if (obj[locale]) {
      return obj[locale];
    }
    if (obj["en"]) {
      return obj["en"];
    }
  }
  return config as string;
};

const renderHighlightedTitle = (title: string, highlight: string) => {
  if (!title.includes(highlight)) {
    return <span className="text-foreground">{title}</span>;
  }
  const parts = title.split(highlight);
  return (
    <span className="text-foreground">
      {parts[0]}
      <span className="relative">
        <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
          {highlight}
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 blur-xl opacity-50" />
      </span>
      {parts[1]}
    </span>
  );
};

export default function Preview() {
  const { locale } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const candleViewRef = useRef<CandleView | null>(null);
  const [isDark, setIsDark] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const preview = siteConfig.preview;
  const localizedTitleMain = getLocalizedContent(preview.title.main, locale);
  const localizedTitleHighlight = getLocalizedContent(
    preview.title.highlight,
    locale,
  );
  const localizedSubtitleText = getLocalizedContent(
    preview.subtitle.text,
    locale,
  );

  useEffect(() => {
    if (!containerRef.current || candleViewRef.current) return;
    const isDarkTheme = document.documentElement.classList.contains("dark");
    const currentTheme = isDarkTheme ? "dark" : "light";
    const candleView = new CandleView({
      parent: containerRef.current,
      title: "Test",
      data: TEST_CANDLEVIEW_DATA8,
      theme: currentTheme,
      locale: locale === "cn" ? "zh-cn" : "en",
      technologyPanel: true,
      drawingPanel: true,
      timeframe: TimeframeEnum.ONE_SECOND,
    });
    candleViewRef.current = candleView;
    setIsInitialized(true);
    return () => {
      if (candleViewRef.current) {
        candleViewRef.current.destroy();
        candleViewRef.current = null;
      }
      setIsInitialized(false);
    };
  }, []);
  useEffect(() => {
    const checkTheme = () => {
      const isDarkTheme = document.documentElement.classList.contains("dark");
      setIsDark(isDarkTheme);
      if (candleViewRef.current) {
        candleViewRef.current.setTheme(isDarkTheme ? "dark" : "light");
      }
    };
    checkTheme();
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          checkTheme();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    if (candleViewRef.current && isInitialized) {
      candleViewRef.current.setLocale(locale === "cn" ? "zh-cn" : "en");
    }
  }, [locale, isInitialized]);
  useEffect(() => {
    if (candleViewRef.current && isInitialized) {
      candleViewRef.current.setData(TEST_CANDLEVIEW_DATA8);
    }
  }, [isInitialized]);
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
            {renderHighlightedTitle(
              localizedTitleMain,
              localizedTitleHighlight,
            )}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {localizedSubtitleText}
          </p>
        </div>
        <div className="mt-8 rounded-lg border border-border bg-muted/30 p-1">
          <div
            ref={containerRef}
            className="w-full"
            style={{ height: "600px" }}
          />
        </div>
      </div>
      <style jsx global>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          animation: gradient 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
