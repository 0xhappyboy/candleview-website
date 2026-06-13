export const siteConfig = {
  name: '{siteName}',
  email: 'superhappyboy1995@gmail.com',
  metadata: {
    title: {
      en: '🕯️CandleView | A programmable time-series data visualization and charting engine designed specifically for the financial industry.',
      cn: '🕯️CandleView | 专为金融行业设计的可编程时间序列数据可视化和图表引擎.'
    },
    description: {
      en: 'A programmable, high-performance visualization engine for financial time-series data. Build custom indicators, analyze massive datasets, and create dynamic dashboards with our built-in DSL.',
      cn: '一个专为金融时间序列数据打造的可编程、高性能可视化引擎。使用内置DSL构建自定义指标、分析海量数据集、创建动态看板。'
    },
    keywords: {
      en: 'programmable charts, time-series database, financial visualization, custom indicators, DSL, candlestick chart, WebGL, quantitative analysis',
      cn: '可编程图表, 时间序列数据库, 金融可视化, 自定义指标, DSL, K线图, WebGL, 量化分析'
    }
  },
  logo: {
    iconSize: 'h-7 w-7',
    textSize: 'text-lg',
    gradient: 'from-primary to-chart-2',
    imageUrl: 'https://raw.githubusercontent.com/0xhappyboy/candleview/main/assets/logo/logo_100x100.jpeg',
  },
  header: {
    height: 'h-14',
    className: 'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
  },
  preview: {
    title: {
      main: {
        en: 'Professional Chart Preview',
        cn: '专业图表预览'
      },
      highlight: {
        en: 'Professional',
        cn: '专业'
      },
      className: 'text-3xl sm:text-4xl font-bold text-center mb-6 tracking-tight'
    },
    subtitle: {
      text: {
        en: 'Experience professional-grade financial chart visualization for time series data analysis',
        cn: '体验专业级的金融时间序列数据可视化图表'
      },
      className: 'text-lg text-muted-foreground max-w-2xl text-center mb-6 leading-relaxed'
    },
    container: {
      className: 'flex flex-col items-center justify-center py-5 px-5 mt-10'
    },
    previewArea: {
      className: 'w-full max-w-[80%] h-[600px] rounded-xl border-2 bg-card/50 backdrop-blur-sm overflow-hidden'
    }
  },
  hero: {
    announcement: {
      showDot: true,
      dotColor: 'bg-green-500',
      className: 'inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 backdrop-blur-sm'
    },
    title: {
      main: {
        en: 'Build Programmable Time-Series Visualizations',
        cn: '构建可编程的时间序列可视化应用'
      },
      highlight: {
        en: 'Programmable',
        cn: '可编程'
      },
      className: 'text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight'
    },
    description: {
      text: {
        en: 'The only engine that combines high-performance charting with a powerful, built-in DSL. Script custom indicators, automate analysis, and bring your financial data to life.',
        cn: '唯一一个将高性能图表与强大内置DSL相结合的引擎。编写脚本自定义指标、自动化分析，让您的金融数据栩栩如生。'
      },
      className: 'text-xl text-muted-foreground max-w-3xl mx-auto mb-6 leading-relaxed'
    },
    buttons: {
      primary: {
        label: {
          en: 'Quick Start',
          cn: '快速开始'
        },
        className: 'group relative px-8 py-3 rounded-lg overflow-hidden bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold transition-all duration-300 hover:from-primary/90 hover:to-primary/70'
      },
      market: {
        label: {
          en: 'Market',
          cn: '市场'
        },
        className: 'group relative px-8 py-3 rounded-lg overflow-hidden bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold transition-all duration-300 hover:from-emerald-500 hover:to-emerald-400 shadow-lg hover:shadow-emerald-500/20'
      },
      script: {
        label: {
          en: 'DSL Script',
          cn: 'DSL脚本'
        },
        className: 'group relative px-8 py-3 rounded-lg overflow-hidden bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold transition-all duration-300 hover:from-purple-500 hover:to-purple-400 shadow-lg hover:shadow-purple-500/20'
      },
      secondary: {
        label: {
          en: 'GitHub Star',
          cn: 'GitHub 星标'
        },
        href: 'https://github.com/0xhappyboy/candleview',
        showStars: true,
        className: 'group relative px-8 py-3 rounded-lg overflow-hidden text-primary-foreground font-semibold transition-all duration-300 flex items-center gap-2.5'
      }
    },
    metrics: [
      {
        value: '百万级数据点',
        label: {
          en: 'Millions of Data Points',
          cn: '百万级数据点'
        }
      },
      {
        value: '毫秒级响应',
        label: {
          en: 'Millisecond Response',
          cn: '毫秒级响应'
        }
      },
      {
        value: '多时间框架',
        label: {
          en: 'Multi-Timeframe',
          cn: '多时间框架'
        }
      },
      {
        value: '技术指标',
        label: {
          en: 'Technical Indicators',
          cn: '技术指标'
        }
      }
    ],
    container: {
      className: 'mx-auto max-w-4xl text-center'
    },
    canvas: {
      className: 'w-full h-full absolute inset-0'
    },
    gradientOverlay: {
      className: 'absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background dark:from-background/70 dark:via-background/40 dark:to-background'
    }
  },
  navigation: {
    items: [
      { href: 'https://candleview-docs.vercel.app/', key: 'docs' },
      { href: '/sponsor', key: 'sponsor' },
      { href: '/commercial-license', key: 'license' },
      { href: '/contactus', key: 'customize' },
    ],
    desktop: {
      gap: 'gap-5',
      className: 'text-sm font-medium transition-colors hover:text-primary',
      activeClass: 'text-primary',
      inactiveClass: 'text-foreground/70',
    },
    mobile: {
      activeClass: 'bg-primary/10 text-primary',
      inactiveClass: 'hover:bg-accent',
    },
  },
  footer: {
    brand: {
      name: '{siteName}',
      logo: {
        className: 'h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-chart-2',
        imageUrl: 'https://raw.githubusercontent.com/0xhappyboy/candleview/main/assets/logo/logo_50x50.jpeg',
      },
      description: {
        en: 'The programmable engine for financial time-series data visualization and analysis.',
        cn: '专为金融时间序列数据可视化与分析打造的可编程引擎。'
      }
    },
    navSections: [
      {
        titleKey: 'Footer.resources',
        links: [
          { href: 'https://candleview-docs.vercel.app/', labelKey: 'Footer.documentation' },
          { href: '/blog', labelKey: 'Footer.blog' },
          { href: '/contactus', labelKey: 'Footer.support' },
          { href: 'https://github.com/0xhappyboy/candleview/discussions', labelKey: 'Footer.community' },
        ],
      },
      {
        titleKey: 'Footer.legal',
        links: [
          { href: '/privacy', labelKey: 'Footer.privacy' },
          { href: '/terms', labelKey: 'Footer.terms' },
          { href: 'mailto:superhappyboy1995@gmail.com', labelKey: 'Footer.security' },
          { href: '/cookies', labelKey: 'Footer.cookies' },
        ],
      },
    ],
    footerSocialLinks: [
      {
        icon: 'Github',
        href: 'https://github.com/0xhappyboy/candleview',
        label: 'GitHub',
        className: 'rounded-lg border p-2 hover:bg-accent transition-colors',
      },
      {
        icon: 'Twitter',
        href: 'https://x.com/candleview',
        label: 'Twitter',
        className: 'rounded-lg border p-2 hover:bg-accent transition-colors',
      },
      {
        icon: 'Discord',
        href: 'https://discord.gg/AvmKpqsX',
        label: 'Discord',
        className: 'rounded-lg border p-2 hover:bg-accent transition-colors',
      },
      {
        icon: 'Mail',
        href: 'mailto:superhappyboy1995@gmail.com',
        label: 'Email',
        className: 'rounded-lg border p-2 hover:bg-accent transition-colors',
      },
    ],
    status: {
      dot: {
        className: 'h-2 w-2 rounded-full bg-green-500 animate-pulse',
      },
      label: {
        en: 'Systems operational',
        cn: '系统运行正常'
      }
    },
    version: 'v1.1.3',
    container: {
      className: 'container mx-auto px-4 py-12 sm:px-6 lg:px-8',
    },
    bottomBar: {
      className: 'mt-12 border-t pt-8',
      copyrightText: {
        en: '© {year} {siteName}. All rights reserved.',
        cn: '© {year} {siteName}. 保留所有权利.'
      }
    },
  },
  socialLinks: [
    {
      icon: 'Github',
      href: 'https://github.com/0xhappyboy/candleview',
      label: 'GitHub',
      component: 'Github' as const,
      sizeAdjustment: 'scale-110',
    },
    {
      icon: 'X',
      href: 'https://x.com/candleview',
      label: 'X',
      component: 'XIcon' as const,
      sizeAdjustment: '',
    },
    {
      icon: 'Discord',
      href: 'https://discord.gg/AvmKpqsX',
      label: 'Discord',
      component: 'DiscordIcon' as const,
      sizeAdjustment: '',
    },
    {
      icon: 'MessageCircle',
      href: 'https://weixin.qq.com',
      label: '微信',
      component: 'MessageCircle' as const,
      sizeAdjustment: '',
    },
    {
      icon: 'Send',
      href: 'https://telegram.org',
      label: '电报',
      component: 'Send' as const,
      sizeAdjustment: '',
    },
    {
      icon: 'Package',
      href: 'https://www.npmjs.com/package/candleview',
      label: 'npm',
      component: 'Package' as const,
      sizeAdjustment: 'scale-110',
    },
  ],
  controls: {
    desktop: {
      buttonSize: 'h-4 w-4',
      buttonPadding: 'p-1',
      buttonClass: 'rounded-md transition-colors flex items-center justify-center',
      iconClass: 'text-foreground/60 hover:text-foreground transition-colors',
      gap: 'gap-2.5',
    },
    mobile: {
      buttonSize: 'h-4 w-4',
      buttonPadding: 'p-1',
      buttonClass: 'rounded-md transition-colors flex items-center justify-center',
      iconClass: 'text-foreground/60 hover:text-foreground transition-colors',
    },
  },
  separator: {
    className: 'h-4 w-px bg-border mx-1.5',
  },
  container: {
    className: 'container mx-auto px-4 sm:px-6 lg:px-8',
  },
} as const;