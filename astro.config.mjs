import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// ▼ 本番の独自ドメイン/サブドメインが決まったらここを書き換える（例: https://neko-tech.pages.dev）
//   sitemap / canonical / OGP のURL生成に使われます。
export default defineConfig({
  site: 'https://ubiquitous-kangaroo-7c7c73.netlify.app',
  integrations: [mdx(), sitemap()],
  build: {
    // 記事URLを /blog/xxxx/ の形（末尾スラッシュ）で統一 → SEOで重複を防ぐ
    format: 'directory',
  },
});
