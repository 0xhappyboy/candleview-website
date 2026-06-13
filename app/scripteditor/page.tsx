"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { CandleView, TimeframeEnum } from "@candleview/core";
import { siteConfig } from "../config";
import { TEST_CANDLEVIEW_DATA8 } from "../mock/mock_data_1";
import { useI18n } from "../providers/I18nProvider";

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

const getDefaultScript = (locale: string): string => {
  const isZh = locale === "cn";

  const comments = {
    title: isZh
      ? "示例脚本 - 自定义主图和副图指标"
      : "Example Script - Custom Main & Sub Indicators",
    main1: isZh
      ? "自定义主图指标：计算 OHLC 均值通道"
      : "Custom main indicator: OHLC mean channel",
    main2: isZh
      ? "另一个主图指标：价格波动率（最高价-最低价）"
      : "Another main indicator: Price volatility (High - Low)",
    main3: isZh
      ? "批量添加主图指标 - 多条线一起添加"
      : "Batch add main indicators - multiple lines",
    sub1: isZh
      ? "自定义副图指标：自定义 RSI 风格指标"
      : "Custom sub indicator: RSI style",
    sub2: isZh
      ? "自定义副图指标：成交量柱状图"
      : "Custom sub indicator: Volume histogram",
    sub3: isZh ? "批量添加副图指标" : "Batch add sub indicators",
    log1: isZh ? "所有自定义指标已添加完成" : "All custom indicators added",
    log2: isZh
      ? "主图指标: OHLC均值, 波动率, 上下轨"
      : "Main indicators: OHLC Mean, Volatility, Upper/Lower Bands",
    log3: isZh
      ? "副图指标: Custom RSI, Volume, 动量, 振幅%"
      : "Sub indicators: Custom RSI, Volume, Momentum, Range %",
    returnMsg: isZh ? "自定义指标测试完成" : "Custom indicators test completed",
  };

  return `// ${comments.title}
// ============================================

// 1. ${comments.main1}
// ============================================
plotMain({
    id: 'ohlc_mean',
    calculator: (idx, open, high, low, close, volume) => {
        return (high + low + close) / 3;
    },
    options: {
        name: '${isZh ? "OHLC均值" : "OHLC Mean"}',
        color: '#FF6B6B',
        width: 2,
        style: 'solid'
    }
});

// 2. ${comments.main2}
plotMain({
    id: 'volatility',
    calculator: (idx, open, high, low, close, volume) => {
        return high - low;
    },
    options: {
        name: '${isZh ? "波动率" : "Volatility"}',
        color: '#4ECDC4',
        width: 1,
        style: 'dashed'
    }
});

// 3. ${comments.main3}
plotMain([
    {
        id: 'upper_band',
        calculator: (idx, open, high, low, close, volume) => {
            return close * 1.05;
        },
        options: { name: '${isZh ? "上轨" : "Upper Band"}', color: '#45B7D1', width: 1, style: 'dotted' }
    },
    {
        id: 'lower_band',
        calculator: (idx, open, high, low, close, volume) => {
            return close * 0.95;
        },
        options: { name: '${isZh ? "下轨" : "Lower Band"}', color: '#F39C12', width: 1, style: 'dotted' }
    }
]);

// 4. ${comments.sub1}
plotSub({
    id: 'custom_rsi',
    calculator: (idx, open, high, low, close, volume) => {
        return 50 + Math.sin(idx * 0.1) * 30;
    },
    options: {
        name: 'Custom RSI',
        color: '#FF6B6B',
        width: 2,
        type: 'line'
    }
});

// 5. ${comments.sub2}
plotSub({
    id: 'custom_volume',
    calculator: (idx, open, high, low, close, volume) => {
        return volume / 1000;
    },
    options: {
        name: 'Volume/1000',
        color: '#4ECDC4',
        type: 'histogram'
    }
});

// 6. ${comments.sub3}
plotSub([
    {
        id: 'momentum',
        calculator: (idx, open, high, low, close, volume) => {
            return close - open;
        },
        options: { name: '${isZh ? "动量" : "Momentum"}', color: '#FF9800', type: 'line', width: 1 }
    },
    {
        id: 'range_percent',
        calculator: (idx, open, high, low, close, volume) => {
            return ((high - low) / close) * 100;
        },
        options: { name: '${isZh ? "振幅%" : "Range%"}', color: '#9C27B0', type: 'area' }
    }
]);

console.log("${comments.log1}");
console.log("${comments.log2}");
console.log("${comments.log3}");

return {
    message: "${comments.returnMsg}",
    mainCount: 5,
    subCount: 5
};`;
};

const getExampleScripts = (locale: string) => {
  const isZh = locale === "cn";

  return [
    {
      name: isZh ? "自定义指标完整示例" : "Custom Indicators Full Example",
      script: getDefaultScript(locale),
    },
    {
      name: isZh ? "简单主图线" : "Simple Main Line",
      script: `// ${isZh ? "简单主图线" : "Simple Main Line"}
plotMain({
    id: 'simple_line',
    calculator: (idx, open, high, low, close, volume) => close,
    options: { name: '${isZh ? "收盘价" : "Close Price"}', color: '#FF6B6B', width: 2 }
});

console.log("${isZh ? "主图线已添加" : "Main line added"}");
return { message: "done" };`,
    },
    {
      name: isZh ? "简单副图线" : "Simple Sub Line",
      script: `// ${isZh ? "简单副图线" : "Simple Sub Line"}
plotSub({
    id: 'simple_sub',
    calculator: (idx, open, high, low, close, volume) => close,
    options: { name: '${isZh ? "收盘价副图" : "Close Price Sub"}', color: '#4ECDC4', type: 'line' }
});

console.log("${isZh ? "副图线已添加" : "Sub line added"}");
return { message: "done" };`,
    },
    {
      name: isZh ? "清除所有自定义指标" : "Clear All Custom Indicators",
      script: `// ${isZh ? "清除所有自定义指标" : "Clear All Custom Indicators"}
clearAllMain();
clearAllSub();
console.log("${isZh ? "所有自定义指标已清除" : "All custom indicators cleared"}");
return { message: "cleared" };`,
    },
    {
      name: isZh ? "📊 数据获取测试" : "📊 Data Access Test",
      script: `// ${isZh ? "测试所有数据获取函数" : "Test all data access functions"}
${isZh ? "// 获取最新数据" : "// Get latest data"}
const latestClose = getClose();
const latestOpen = getOpen();
const latestHigh = getHigh();
const latestLow = getLow();
const latestVolume = getVolume();
const latestTime = getTime();
const barCount = getBarCount();

console.log("========== ${isZh ? "最新数据" : "Latest Data"} ==========");
console.log("${isZh ? "收盘价" : "Close"}: " + latestClose);
console.log("${isZh ? "开盘价" : "Open"}: " + latestOpen);
console.log("${isZh ? "最高价" : "High"}: " + latestHigh);
console.log("${isZh ? "最低价" : "Low"}: " + latestLow);
console.log("${isZh ? "成交量" : "Volume"}: " + latestVolume);
console.log("${isZh ? "时间戳" : "Time"}: " + latestTime);
console.log("${isZh ? "K线总数" : "Bar Count"}: " + barCount);

${isZh ? "// 获取历史数据" : "// Get historical data"}
if (barCount > 5) {
    console.log("\\n========== ${isZh ? "历史数据" : "Historical Data"} ==========");
    for (let i = 0; i < 5; i++) {
        console.log("${isZh ? "偏移" : "Offset"} " + i + ": ${isZh ? "收盘价" : "Close"}=" + getCloseAt(i) + 
            ", ${isZh ? "成交量" : "Volume"}=" + getVolumeAt(i));
    }
}

return {
    message: "${isZh ? "数据获取测试完成" : "Data access test completed"}",
    latestClose: latestClose,
    latestHigh: latestHigh,
    latestLow: latestLow,
    barCount: barCount
};`,
    },
    {
      name: isZh ? "📈 技术指标测试" : "📈 Technical Indicators Test",
      script: `// ${isZh ? "测试内置技术指标" : "Test built-in technical indicators"}
const barCount = getBarCount();

if (barCount < 20) {
    console.log("${isZh ? "数据不足，需要至少20根K线" : "Insufficient data, need at least 20 bars"}");
    return { error: "${isZh ? "数据不足" : "Insufficient data"}" };
}

${isZh ? "// 收集收盘价数据" : "// Collect close price data"}
let closes = [];
for (let i = 0; i < 20; i++) {
    closes.push(getCloseAt(i));
}

${isZh ? "// 计算各种技术指标" : "// Calculate various technical indicators"}
const sma5 = SMA(closes, 5);
const sma10 = SMA(closes, 10);
const sma20 = SMA(closes, 20);
const ema12 = EMA(closes, 12);
const ema26 = EMA(closes, 26);
const rsi14 = RSI(closes, 14);

${isZh ? "// 收集最高价和最低价" : "// Collect high and low prices"}
let highs = [];
let lows = [];
for (let i = 0; i < 20; i++) {
    highs.push(getHighAt(i));
    lows.push(getLowAt(i));
}

const atr14 = ATR(highs, lows, closes, 14);
const cci20 = CCI(highs, lows, closes, 20);

console.log("========== ${isZh ? "技术指标计算结果" : "Technical Indicators Result"} ==========");
console.log("SMA5: " + sma5.toFixed(4));
console.log("SMA10: " + sma10.toFixed(4));
console.log("SMA20: " + sma20.toFixed(4));
console.log("EMA12: " + ema12.toFixed(4));
console.log("EMA26: " + ema26.toFixed(4));
console.log("RSI14: " + rsi14.toFixed(2));
console.log("ATR14: " + atr14.toFixed(4));
console.log("CCI20: " + cci20.toFixed(2));

if (barCount > 50) {
    ${isZh ? "// 计算更长周期的均线" : "// Calculate longer period moving average"}
    let longCloses = [];
    for (let i = 0; i < 50; i++) {
        longCloses.push(getCloseAt(i));
    }
    const sma50 = SMA(longCloses, 50);
    console.log("SMA50: " + sma50.toFixed(4));
}

return {
    message: "${isZh ? "技术指标测试完成" : "Technical indicators test completed"}",
    sma5: sma5,
    sma20: sma20,
    rsi14: rsi14,
    atr14: atr14
};`,
    },
    {
      name: isZh ? "🕯️ K线形态检测" : "🕯️ Candlestick Pattern Detection",
      script: `// ${isZh ? "检测常见K线形态" : "Detect common candlestick patterns"}
const barCount = getBarCount();

if (barCount < 3) {
    console.log("${isZh ? "数据不足，需要至少3根K线" : "Insufficient data, need at least 3 bars"}");
    return { error: "${isZh ? "数据不足" : "Insufficient data"}" };
}

${isZh ? "// 获取最近3根K线数据" : "// Get last 3 bars data"}
const close0 = getCloseAt(0);
const open0 = getOpenAt(0);
const high0 = getHighAt(0);
const low0 = getLowAt(0);

const close1 = getCloseAt(1);
const open1 = getOpenAt(1);

const body0 = Math.abs(close0 - open0);
const body1 = Math.abs(close1 - open1);
const range0 = high0 - low0;

const isBullish0 = close0 > open0;
const isBearish0 = close0 < open0;

console.log("========== ${isZh ? "最近K线分析" : "Latest Bar Analysis"} ==========");
console.log("${isZh ? "第0根(最新)" : "Bar 0 (Latest)"}: ${isZh ? "阳线" : "Bullish"}=" + isBullish0 + 
    ", ${isZh ? "实体" : "Body"}=" + body0.toFixed(4) + 
    ", ${isZh ? "振幅" : "Range"}=" + range0.toFixed(4));

${isZh ? "// 形态检测" : "// Pattern detection"}
if (isBullish0 && body0 > body1 * 1.5) {
    console.log("🔴 ${isZh ? "大阳线" : "Long Bullish Candle"}");
}

if (isBearish0 && body0 > body1 * 1.5) {
    console.log("🟢 ${isZh ? "大阴线" : "Long Bearish Candle"}");
}

${isZh ? "// 十字星检测" : "// Doji detection"}
if (body0 < range0 * 0.1) {
    console.log("⭐ ${isZh ? "十字星" : "Doji"}");
}

${isZh ? "// 吞没形态检测" : "// Engulfing pattern detection"}
if (isBullish0 && isBearish1 && close0 > open1 && open0 < close1) {
    console.log("📈 ${isZh ? "看涨吞没" : "Bullish Engulfing"}");
}

if (isBearish0 && isBullish1 && close0 < open1 && open0 > close1) {
    console.log("📉 ${isZh ? "看跌吞没" : "Bearish Engulfing"}");
}

${isZh ? "// 锤子线检测" : "// Hammer detection"}
const lowerShadow0 = Math.min(open0, close0) - low0;
const upperShadow0 = high0 - Math.max(open0, close0);
if (lowerShadow0 > body0 * 2 && upperShadow0 < body0 * 0.5) {
    console.log("🔨 ${isZh ? "锤子线" : "Hammer"}");
}

return {
    message: "${isZh ? "K线形态检测完成" : "Candlestick pattern detection completed"}",
    isBullish: isBullish0,
    bodySize: body0,
    range: range0
};`,
    },
    {
      name: isZh ? "🏷️ 条件标记示例" : "🏷️ Conditional Markers Example",
      script: `// ${isZh ? "根据条件在K线上添加标记" : "Add markers based on conditions"}
const barCount = getBarCount();

if (barCount < 10) {
    console.log("${isZh ? "数据不足" : "Insufficient data"}");
    return { error: "${isZh ? "数据不足" : "Insufficient data"}" };
}

${isZh ? "// 清除之前的标记" : "// Clear previous markers"}
clearAllMarks();

${isZh ? "// 收集数据" : "// Collect data"}
let closes = [];
let volumes = [];
for (let i = 0; i < 10; i++) {
    closes.push(getCloseAt(i));
    volumes.push(getVolumeAt(i));
}

const currentClose = closes[0];
const prevClose = closes[1];
const avgVolume = volumes.slice(0, 5).reduce((a, b) => a + b, 0) / 5;
const currentVolume = volumes[0];
const currentTime = getTime();

${isZh ? "// 价格突破标记" : "// Price breakout marker"}
if (currentClose > Math.max(...closes.slice(1))) {
    addArrowUp(currentTime, "${isZh ? "新高" : "New High"}", "#4ECDC4");
    console.log("📈 ${isZh ? "价格突破新高" : "Price breaks new high"}");
}

${isZh ? "// 放量标记" : "// Volume spike marker"}
if (currentVolume > avgVolume * 1.5) {
    addTextMark(currentTime, "${isZh ? "放量" : "High Volume"}", 
        currentClose > prevClose ? "up" : "down",
        { textColor: "#FF9800", fontSize: 10 });
    console.log("📊 ${isZh ? "成交量放大" : "Volume spike"}");
}

${isZh ? "// 涨跌标记" : "// Up/Down markers"}
if (currentClose > prevClose * 1.02) {
    addArrowUp(currentTime, "${isZh ? "大涨" : "Rally"}", "#FF6B6B");
    console.log("🚀 ${isZh ? "价格大涨" : "Price rally"} >2%");
} else if (currentClose < prevClose * 0.98) {
    addArrowDown(currentTime, "${isZh ? "大跌" : "Plunge"}", "#FF6B6B");
    console.log("💥 ${isZh ? "价格大跌" : "Price plunge"} >2%");
}

${isZh ? "// 连续涨跌检测" : "// Consecutive up/down detection"}
let upCount = 0;
let downCount = 0;
for (let i = 0; i < 5; i++) {
    if (i + 1 < closes.length) {
        if (closes[i] > closes[i + 1]) upCount++;
        else if (closes[i] < closes[i + 1]) downCount++;
    }
}

if (upCount >= 3) {
    addTextMark(currentTime, "${isZh ? "连续上涨" : "Consecutive Up"}", "up",
        { textColor: "#4ECDC4", fontSize: 10, isCircular: true });
    console.log("📈 " + upCount + (${isZh ? "日上涨" : " consecutive up days"}));
} else if (downCount >= 3) {
    addTextMark(currentTime, "${isZh ? "连续下跌" : "Consecutive Down"}", "down",
        { textColor: "#FF6B6B", fontSize: 10, isCircular: true });
    console.log("📉 " + downCount + (${isZh ? "日下跌" : " consecutive down days"}));
}

console.log("${isZh ? "标记添加完成" : "Markers added"}");
return {
    message: "${isZh ? "条件标记测试完成" : "Conditional markers test completed"}",
    currentClose: currentClose,
    avgVolume: avgVolume,
    upCount: upCount,
    downCount: downCount
};`,
    },
  ];
};

export default function ScriptCompiler() {
  const { locale } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const candleViewRef = useRef<CandleView | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const engineRef = useRef<any>(null);
  const [isDark, setIsDark] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isEngineReady, setIsEngineReady] = useState(false);
  const [script, setScript] = useState(getDefaultScript(locale));
  const [executionResult, setExecutionResult] = useState<{
    success: boolean;
    message?: string;
  } | null>(null);
  const [isEngineRunning, setIsEngineRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [leftWidth, setLeftWidth] = useState(60);
  const [isLeftResizing, setIsLeftResizing] = useState(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);
  const [editorTopHeight, setEditorTopHeight] = useState(60);
  const [isEditorResizing, setIsEditorResizing] = useState(false);
  const startEditorYRef = useRef(0);
  const startEditorHeightRef = useRef(0);
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

  // 拦截 console.log 来捕获脚本输出
  useEffect(() => {
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.log = (...args: any[]) => {
      originalLog(...args);
      const message = args
        .map((arg) => {
          if (typeof arg === "object") {
            try {
              return JSON.stringify(arg);
            } catch {
              return String(arg);
            }
          }
          return String(arg);
        })
        .join(" ");
      setLogs((prev) => [...prev, `[LOG] ${message}`]);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.warn = (...args: any[]) => {
      originalWarn(...args);
      const message = args.map((arg) => String(arg)).join(" ");
      setLogs((prev) => [...prev, `[WARN] ${message}`]);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.error = (...args: any[]) => {
      originalError(...args);
      const message = args.map((arg) => String(arg)).join(" ");
      setLogs((prev) => [...prev, `[ERROR] ${message}`]);
    };

    return () => {
      console.log = originalLog;
      console.warn = originalWarn;
      console.error = originalError;
    };
  }, []);

  // Initialize CandleView
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

    import("@candleview/cvs-engine")
      .then((module) => {
        const { CVSEngine } = module;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const engine = new CVSEngine(candleView as any, {
          autoExecuteOnNewCandle: false,
          enableLogging: true,
        });
        engineRef.current = engine;
        setIsEngineReady(true);
        console.log("[ScriptCompiler] CVSEngine loaded successfully");
      })
      .catch((err) => {
        console.warn("[ScriptCompiler] CVSEngine not available:", err.message);
        setIsEngineReady(false);
      });

    return () => {
      if (engineRef.current) {
        engineRef.current.stop();
        engineRef.current = null;
      }
      if (candleViewRef.current) {
        candleViewRef.current.destroy();
        candleViewRef.current = null;
      }
      setIsInitialized(false);
      setIsEngineReady(false);
    };
  }, []);

  // Handle theme changes
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
    if (isInitialized) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setScript(getDefaultScript(locale));
    }
  }, [locale, isInitialized]);

  // Handle locale changes for CandleView
  useEffect(() => {
    if (candleViewRef.current && isInitialized) {
      candleViewRef.current.setLocale(locale === "cn" ? "zh-cn" : "en");
    }
  }, [locale, isInitialized]);

  // Handle data refresh
  useEffect(() => {
    if (candleViewRef.current && isInitialized) {
      candleViewRef.current.setData(TEST_CANDLEVIEW_DATA8);
    }
  }, [isInitialized]);

  // Execute script
  const handleExecute = () => {
    if (!engineRef.current) {
      setExecutionResult({
        success: false,
        message: "CVSEngine not available",
      });
      return;
    }

    setLogs([]);

    try {
      engineRef.current.loadScript(script);
      const result = engineRef.current.execute();
      if (result.success) {
        setExecutionResult({
          success: true,
          message: `Executed in ${result.duration?.toFixed(2)}ms`,
        });
      } else {
        setExecutionResult({
          success: false,
          message: result.error || "Execution failed",
        });
      }
    } catch (error) {
      setExecutionResult({
        success: false,
        message: error instanceof Error ? error.message : String(error),
      });
    }
  };

  // Start auto-execute on new candle
  const handleStart = () => {
    if (!engineRef.current) return;
    setLogs([]);
    engineRef.current.start();
    setIsEngineRunning(true);
    setExecutionResult({
      success: true,
      message: "Engine started, will execute on each new candle",
    });
  };

  // Stop auto-execute
  const handleStop = () => {
    if (!engineRef.current) return;
    engineRef.current.stop();
    setIsEngineRunning(false);
    setExecutionResult({ success: true, message: "Engine stopped" });
  };

  // Clear all custom indicators
  const handleClear = () => {
    if (!engineRef.current) return;
    engineRef.current.clearAllCustomIndicators();
    setExecutionResult({
      success: true,
      message: "All custom indicators cleared",
    });
  };

  // Reset to default script (current language)
  const handleReset = () => {
    setScript(getDefaultScript(locale));
    setLogs([]);
    setExecutionResult({ success: true, message: "Reset to default script" });
  };

  // Clear logs
  const handleClearLogs = () => {
    setLogs([]);
  };

  // Load example script
  const handleLoadExample = (exampleScript: string) => {
    setScript(exampleScript);
    setLogs([]);
    setExecutionResult({ success: true, message: "Example script loaded" });
  };

  const startLeftResizing = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      startXRef.current = e.clientX;
      startWidthRef.current = leftWidth;
      setIsLeftResizing(true);
    },
    [leftWidth],
  );

  const handleLeftMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isLeftResizing) return;
      const windowWidth = window.innerWidth;
      const deltaX = e.clientX - startXRef.current;
      const deltaPercent = (deltaX / windowWidth) * 100;
      let newWidth = startWidthRef.current + deltaPercent;
      newWidth = Math.max(30, newWidth);
      newWidth = Math.min(80, newWidth);
      setLeftWidth(newWidth);
    },
    [isLeftResizing],
  );

  const stopLeftResizing = useCallback(() => {
    setIsLeftResizing(false);
  }, []);

  const startEditorResizing = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      startEditorYRef.current = e.clientY;
      startEditorHeightRef.current = editorTopHeight;
      setIsEditorResizing(true);
    },
    [editorTopHeight],
  );

  const handleEditorMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isEditorResizing) return;
      const rightPanel = document.getElementById("right-panel");
      if (!rightPanel) return;
      const panelHeight = rightPanel.clientHeight;
      const deltaY = e.clientY - startEditorYRef.current;
      const deltaPercent = (deltaY / panelHeight) * 100;
      let newHeight = startEditorHeightRef.current + deltaPercent;
      newHeight = Math.max(30, newHeight);
      newHeight = Math.min(80, newHeight);
      setEditorTopHeight(newHeight);
    },
    [isEditorResizing],
  );

  const stopEditorResizing = useCallback(() => {
    setIsEditorResizing(false);
  }, []);

  useEffect(() => {
    if (isLeftResizing) {
      document.addEventListener("mousemove", handleLeftMouseMove);
      document.addEventListener("mouseup", stopLeftResizing);
    } else {
      document.removeEventListener("mousemove", handleLeftMouseMove);
      document.removeEventListener("mouseup", stopLeftResizing);
    }
    return () => {
      document.removeEventListener("mousemove", handleLeftMouseMove);
      document.removeEventListener("mouseup", stopLeftResizing);
    };
  }, [isLeftResizing, handleLeftMouseMove, stopLeftResizing]);

  useEffect(() => {
    if (isEditorResizing) {
      document.addEventListener("mousemove", handleEditorMouseMove);
      document.addEventListener("mouseup", stopEditorResizing);
    } else {
      document.removeEventListener("mousemove", handleEditorMouseMove);
      document.removeEventListener("mouseup", stopEditorResizing);
    }
    return () => {
      document.removeEventListener("mousemove", handleEditorMouseMove);
      document.removeEventListener("mouseup", stopEditorResizing);
    };
  }, [isEditorResizing, handleEditorMouseMove, stopEditorResizing]);

  const getDividerHandleColor = () => {
    return isDark
      ? "bg-gray-600 group-hover:bg-blue-600"
      : "bg-gray-400 group-hover:bg-blue-500";
  };

  const exampleScripts = getExampleScripts(locale);

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="w-full h-full flex flex-col">
        <div className="flex-1 flex overflow-hidden">
          <div
            className="relative overflow-hidden h-full"
            style={{
              width: `${leftWidth}%`,
              minWidth: "30%",
              maxWidth: "80%",
            }}
          >
            <div ref={containerRef} className="w-full h-full" />
          </div>
          <div
            className={`w-1 h-full cursor-col-resize relative group transition-colors duration-200 ${
              isDark
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onMouseDown={startLeftResizing}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`w-1 h-12 rounded transition-colors duration-200 ${getDividerHandleColor()}`}
              />
            </div>
          </div>
          <div
            id="right-panel"
            className="flex-1 overflow-hidden"
            style={{ width: `${100 - leftWidth}%` }}
          >
            <div className="w-full h-full rounded-none border border-border bg-muted/30 overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/50 flex-shrink-0">
                <span className="text-sm font-medium text-foreground">
                  DSL Script Editor
                  {!isEngineReady && (
                    <span className="ml-2 text-xs text-yellow-500">
                      (Engine loading...)
                    </span>
                  )}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={handleReset}
                    className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleClear}
                    className="px-2 py-1 text-xs rounded-md bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              <div className="px-4 py-2 border-b border-border bg-muted/30 flex-shrink-0">
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs text-muted-foreground mr-1">
                    {locale === "cn" ? "快速示例:" : "Quick Examples:"}
                  </span>
                  {exampleScripts.map((example, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleLoadExample(example.script)}
                      className="px-2 py-0.5 text-xs rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                    >
                      {example.name}
                    </button>
                  ))}
                </div>
              </div>

              <div
                className="flex-1 flex flex-col overflow-hidden"
                style={{ minHeight: "200px" }}
              >
                <div
                  className="overflow-hidden flex flex-col"
                  style={{
                    height: `${editorTopHeight}%`,
                    minHeight: "30%",
                    maxHeight: "80%",
                  }}
                >
                  <div className="flex items-center px-4 py-1 bg-muted/20 border-b border-border">
                    <span className="text-xs font-medium text-foreground">
                      📝 {locale === "cn" ? "脚本编辑区" : "Script Editor"}
                    </span>
                  </div>
                  <textarea
                    value={script}
                    onChange={(e) => setScript(e.target.value)}
                    className="w-full flex-1 p-4 font-mono text-sm bg-background text-foreground resize-none focus:outline-none scrollbar-custom"
                    spellCheck={false}
                    style={{
                      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
                    }}
                  />
                </div>

                <div
                  className={`w-full h-1 cursor-row-resize relative group transition-colors duration-200 ${
                    isDark
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  onMouseDown={startEditorResizing}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className={`h-1 w-12 rounded transition-colors duration-200 ${getDividerHandleColor()}`}
                    />
                  </div>
                </div>

                <div
                  className="overflow-hidden flex flex-col"
                  style={{
                    height: `${100 - editorTopHeight}%`,
                    minHeight: "20%",
                  }}
                >
                  <div className="flex items-center justify-between px-4 py-1 bg-muted/20 border-b border-border">
                    <span className="text-xs font-medium text-foreground">
                      📋 {locale === "cn" ? "输出日志" : "Output Logs"}
                    </span>
                    <button
                      onClick={handleClearLogs}
                      className="px-2 py-0.5 text-xs rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                    >
                      {locale === "cn" ? "清空" : "Clear"}
                    </button>
                  </div>
                  <div className="flex-1 overflow-auto p-3 font-mono text-xs bg-background/50 scrollbar-custom">
                    {logs.length === 0 ? (
                      <span className="text-muted-foreground">
                        {locale === "cn"
                          ? "等待脚本执行..."
                          : "Waiting for script execution..."}
                      </span>
                    ) : (
                      logs.map((log, idx) => (
                        <div
                          key={idx}
                          className="py-0.5 text-foreground/80 border-b border-border/50"
                        >
                          {log}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-muted/50 flex-shrink-0">
                <div className="flex gap-2">
                  <button
                    onClick={handleExecute}
                    disabled={!isEngineReady}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                      isEngineReady
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    Execute
                  </button>
                  <button
                    onClick={handleStart}
                    disabled={!isEngineReady || isEngineRunning}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                      !isEngineReady || isEngineRunning
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    Start
                  </button>
                  <button
                    onClick={handleStop}
                    disabled={!isEngineReady || !isEngineRunning}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                      !isEngineReady || !isEngineRunning
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    }`}
                  >
                    Stop
                  </button>
                </div>
                {executionResult && (
                  <span
                    className={`text-xs ${executionResult.success ? "text-green-600" : "text-red-500"}`}
                  >
                    {executionResult.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLeftResizing && (
        <div className="fixed inset-0 z-50 cursor-col-resize"></div>
      )}
      {isEditorResizing && (
        <div className="fixed inset-0 z-50 cursor-row-resize"></div>
      )}

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

        /* 自定义滚动条 - 跟随主题 */
        .scrollbar-custom {
          scrollbar-width: thin;
          scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
        }

        .scrollbar-custom::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        .scrollbar-custom::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 3px;
        }

        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.5);
          border-radius: 3px;
          transition: background 0.2s ease;
        }

        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.7);
        }

        .scrollbar-custom::-webkit-scrollbar-corner {
          background: transparent;
        }

        /* 深色主题滚动条 */
        .dark .scrollbar-custom {
          scrollbar-color: rgba(75, 85, 99, 0.6) transparent;
        }

        .dark .scrollbar-custom::-webkit-scrollbar-thumb {
          background: rgba(75, 85, 99, 0.6);
        }

        .dark .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: rgba(75, 85, 99, 0.8);
        }

        /* 为所有需要自定义滚动条的元素添加样式 */
        textarea,
        .overflow-auto {
          scrollbar-width: thin;
        }

        textarea::-webkit-scrollbar,
        .overflow-auto::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        textarea::-webkit-scrollbar-track,
        .overflow-auto::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 3px;
        }

        textarea::-webkit-scrollbar-thumb,
        .overflow-auto::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.4);
          border-radius: 3px;
          transition: background 0.2s ease;
        }

        textarea::-webkit-scrollbar-thumb:hover,
        .overflow-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.6);
        }

        .dark textarea::-webkit-scrollbar-thumb,
        .dark .overflow-auto::-webkit-scrollbar-thumb {
          background: rgba(75, 85, 99, 0.5);
        }

        .dark textarea::-webkit-scrollbar-thumb:hover,
        .dark .overflow-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(75, 85, 99, 0.7);
        }

        textarea::-webkit-scrollbar-corner,
        .overflow-auto::-webkit-scrollbar-corner {
          background: transparent;
        }
      `}</style>
    </div>
  );
}
