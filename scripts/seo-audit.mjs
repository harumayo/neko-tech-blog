#!/usr/bin/env node
/**
 * SEO/AIO 監査スクリプト
 * 新しい記事を書いたとき・公開前に `node scripts/seo-audit.mjs` を実行すると、
 * 「今日手作業で見つけたような漏れ」を自動で検出します。
 *
 * チェック項目:
 *  - cover画像が設定されているか（OGP・記事一覧のサムネに使われる）
 *  - <Faq> があるか（FAQPage構造化データ。AIO引用率3.2倍という調査あり）
 *  - 商品導線（ProductList/AffiliateBox）に Amazon・楽天の両方があるか
 *  - description の文字数が検索結果で切れない範囲か（70〜120文字目安）
 *  - keywords が設定されているか
 *  - astro.config.mjs の site と src/lib/site.ts の SITE.url が一致しているか
 *    （今回このズレが原因でcanonical/OGPが死んだURLを指す事故が起きたため）
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const blogDir = path.join(root, 'src/content/blog');

let hasIssue = false;
const warn = (file, msg) => { console.log(`  ⚠️  ${file}: ${msg}`); hasIssue = true; };
const ok = (msg) => console.log(`✅ ${msg}`);

// --- 0. site.ts と astro.config.mjs のURL一致チェック ---
const astroConfig = fs.readFileSync(path.join(root, 'astro.config.mjs'), 'utf-8');
const siteTs = fs.readFileSync(path.join(root, 'src/lib/site.ts'), 'utf-8');
const astroSiteMatch = astroConfig.match(/site:\s*['"]([^'"]+)['"]/);
const siteTsUrlMatch = siteTs.match(/url:\s*['"]([^'"]+)['"]/);
console.log('\n--- 0. サイトURL整合性チェック ---');
if (astroSiteMatch && siteTsUrlMatch) {
  if (astroSiteMatch[1] === siteTsUrlMatch[1]) {
    ok(`astro.config.mjs と site.ts のURLが一致しています (${astroSiteMatch[1]})`);
  } else {
    warn('site.ts', `astro.config.mjsのsite(${astroSiteMatch[1]})とsite.tsのSITE.url(${siteTsUrlMatch[1]})が不一致です。canonical/OGP/sitemapが食い違います。`);
  }
} else {
  warn('config', 'site URLの取得に失敗しました（正規表現を見直してください）');
}

// robots.txtがsite.tsと同じドメインを指しているか
const robotsTxt = fs.readFileSync(path.join(root, 'public/robots.txt'), 'utf-8');
const robotsSitemapMatch = robotsTxt.match(/Sitemap:\s*(\S+)/);
if (robotsSitemapMatch && siteTsUrlMatch) {
  if (robotsSitemapMatch[1].startsWith(siteTsUrlMatch[1])) {
    ok('robots.txt のSitemap行が現在のドメインと一致しています');
  } else {
    warn('robots.txt', `Sitemap行(${robotsSitemapMatch[1]})が現在のドメイン(${siteTsUrlMatch[1]})と不一致です。ドメイン移行時に忘れがちなので要確認。`);
  }
}

// --- 記事ごとのチェック ---
console.log('\n--- 記事ごとのチェック ---');
const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.mdx') && f !== '_template.mdx');

for (const file of files) {
  const content = fs.readFileSync(path.join(blogDir, file), 'utf-8');
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  const frontmatter = frontmatterMatch ? frontmatterMatch[1] : '';

  // cover
  if (!/^cover:/m.test(frontmatter)) {
    warn(file, 'cover画像が未設定です（OGP・記事一覧サムネが空になります）');
  }

  // description length
  const descMatch = frontmatter.match(/^description:\s*(.+)$/m);
  if (descMatch) {
    const len = descMatch[1].replace(/^["']|["']$/g, '').length;
    if (len < 50 || len > 130) {
      warn(file, `description が${len}文字です（目安70〜120文字。短すぎ/長すぎると検索結果で不自然に切れます）`);
    }
  } else {
    warn(file, 'description が未設定です');
  }

  // keywords
  if (!/^keywords:/m.test(frontmatter)) {
    warn(file, 'keywords が未設定です');
  }

  // FAQ schema
  if (!/<Faq/.test(content)) {
    warn(file, '<Faq> が使われていません（FAQPage構造化データが付与されず、AI引用で不利になります）');
  }

  // 商品導線: ProductList または AffiliateBox がある記事は、Amazon/楽天の両方があるか
  const hasProductComponent = /<ProductList|<AffiliateBox/.test(content);
  if (hasProductComponent) {
    const hasAmazon = /amazon:|amazonHref=/.test(content);
    const hasRakuten = /rakuten:|rakutenHref=/.test(content);
    if (!hasAmazon && !hasRakuten) {
      warn(file, '商品紹介コンポーネントはあるのに、Amazon/楽天どちらのリンクも見つかりません');
    } else if (!hasAmazon) {
      warn(file, 'Amazonリンクがありません（楽天のみ）');
    } else if (!hasRakuten) {
      warn(file, '楽天リンクがありません（Amazonのみ）');
    }
  }
}

console.log('\n--- 結果 ---');
if (hasIssue) {
  console.log('⚠️  上記の項目を確認・修正してください。');
  process.exitCode = 1;
} else {
  console.log('✅ 全項目クリアです。');
}
