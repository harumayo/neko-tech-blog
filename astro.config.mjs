import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// ▼ 本番の独自ドメインが決まったらここを書き換える
//   sitemap / canonical / OGP のURL生成に使われます。
export default defineConfig({
  site: 'https://neko-tech-blog.lingmuye715.workers.dev',
  integrations: [mdx(), sitemap()],
  build: {
    // 記事URLを /blog/xxxx/ の形（末尾スラッシュ）で統一 → SEOで重複を防ぐ
    format: 'directory',
  },
});
