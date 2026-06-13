'use client';

import { useState, useEffect } from 'react';

interface VersionInfo {
  latest: string;
  loading: boolean;
  error: boolean;
}

const fetchNpmVersion = async (): Promise<VersionInfo> => {
  try {
    const cached = localStorage.getItem('candleview_version');
    const cachedTimestamp = localStorage.getItem('candleview_version_timestamp');
    if (cached && cachedTimestamp) {
      const now = Date.now();
      const timestamp = parseInt(cachedTimestamp);
      if (now - timestamp < 5 * 60 * 1000) {
        return JSON.parse(cached);
      }
    }
    const response = await fetch('https://registry.npmjs.org/@candleview/core', {
      cache: 'no-store',
    });
    if (response.ok) {
      const data = await response.json();
      const latestVersion = data['dist-tags']?.latest || data.version;
      const versionInfo: VersionInfo = {
        latest: `v${latestVersion}`,
        loading: false,
        error: false,
      };
      localStorage.setItem('candleview_version', JSON.stringify(versionInfo));
      localStorage.setItem('candleview_version_timestamp', Date.now().toString());
      return versionInfo;
    }
    throw new Error('Failed to fetch version');
  } catch (error) {
    console.error('Failed to fetch npm version:', error);
    return {
      latest: 'v3.0.6',
      loading: false,
      error: true,
    };
  }
};

export const useVersion = () => {
  const [versionInfo, setVersionInfo] = useState<VersionInfo>({
    latest: 'v3.0.6',
    loading: true,
    error: false,
  });

  useEffect(() => {
    const loadVersion = async () => {
      const versionData = await fetchNpmVersion();
      setVersionInfo(versionData);
    };
    loadVersion();
  }, []);

  return versionInfo;
};
