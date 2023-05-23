import type { AddonOptionsBabel } from '@storybook/addon-coverage';
import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

const coverageConfig: AddonOptionsBabel = {
  istanbul: {
    // include: ['**/stories/**'],
    exclude: ['**/firebase/**'],
    excludeNodeModules: true,
  },
};

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-coverage',
      options: coverageConfig,
    },
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],

  /* Alias */
  webpackFinal: async (baseConfig) => {
    if (!baseConfig.resolve) return baseConfig;

    baseConfig.resolve.alias = {
      ...baseConfig.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
      public: path.resolve(__dirname, '../public'),
    };

    /* SVGRの設定 */
    if (!baseConfig.module?.rules) return baseConfig;
    const fileLoaderRule = baseConfig.module.rules.find((rule) =>
      (rule as { test: RegExp }).test?.test?.('.svg'),
    ) as { exclude: RegExp };

    baseConfig.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return baseConfig;
  },
};
export default config;
