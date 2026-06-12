"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Home, Eye, MessageSquare, Zap, BarChart2, Clock, Mail, ChevronUp } from "lucide-react";
import { useI18n } from "@/app/providers/I18nProvider";
import enMessages from "@/messages/en.json";
import cnMessages from "@/messages/cn.json";

const iconMap = {
  hero: Home,
  preview: Eye,
  "ai-dialog": MessageSquare,
  features: Zap,
  chart: BarChart2,
  time: Clock,
  footer: Mail,
};

interface Section {
  id: string;
  labelKey: string;
}

interface FloatingNavProps {
  sections: Section[];
}

export default function FloatingNav({ sections }: FloatingNavProps) {
  const { locale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const navRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;

          if (scrollPos >= elementTop) {
            setActiveSection(section.id);
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveSection("hero");
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={navRef}
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50"
    >
      <div
        className={`
          flex flex-col items-center gap-2 p-2
          bg-background/90 backdrop-blur-md
          rounded-lg shadow-md border border-border/50
          transition-all duration-300
          ${isOpen ? "w-40" : "w-10"}
        `}
      >
        <button
          onClick={scrollToTop}
          className="p-1.5 rounded-md bg-muted hover:bg-muted/80 transition-colors group relative"
          title={t("FloatingNav.backToTop")}
        >
          <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" />
          {isOpen && (
            <span className="absolute left-full ml-2 px-2 py-0.5 bg-popover text-popover-foreground text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm border border-border">
              {t("FloatingNav.backToTop")}
            </span>
          )}
        </button>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 rounded-md bg-muted hover:bg-muted/80 transition-colors group relative"
          title={isOpen ? t("FloatingNav.collapse") : t("FloatingNav.expand")}
        >
          {isOpen ? (
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
          ) : (
            <ChevronLeft className="w-3.5 h-3.5 text-muted-foreground" />
          )}
          {!isOpen && (
            <span className="absolute left-full ml-2 px-2 py-0.5 bg-popover text-popover-foreground text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm border border-border">
              {t("FloatingNav.expand")}
            </span>
          )}
        </button>
        <nav className="flex flex-col gap-1.5 w-full">
          {sections.map((section) => {
            const Icon = iconMap[section.id as keyof typeof iconMap] || Home;
            return (
              <button
                key={section.id}
                onClick={() => handleClick(section.id)}
                className={`
                  flex items-center
                  p-1.5 rounded-md
                  transition-all duration-200
                  ${isOpen ? "justify-start gap-2" : "justify-center"}
                  ${activeSection === section.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  }
                `}
                title={t(section.labelKey)}
              >
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                {isOpen && (
                  <span className="text-[11px] font-medium whitespace-nowrap">
                    {t(section.labelKey)}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}