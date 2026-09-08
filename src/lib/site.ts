// サイト全体の設定を一元管理（ここを変えると全ページに反映）
export const SITE = {
  title: 'neco to.',
  // 検索結果やSNSでの説明文
  description:
    'ひとり暮らしで猫を飼う人のための、留守番・見守りテック・費用ガイド。ペットカメラや自動給餌器、スマート家電を実際のユーザーレビューをもとに比較しています。',
  // 本番URL（astro.config.mjs の site と揃える）
  url: 'https://neko-tech-blog.lingmuye715.workers.dev',
  lang: 'ja',
  locale: 'ja_JP',
  author: 'ゆい',
  // 運営者情報（体験談として書くが、商品の優劣は実使用の断定ではなく丹念なリサーチに基づくと明記する）
  authorBio:
    '都内近郊の1Kでむぎ（2歳・キジトラ）と2人暮らし、平日はフルタイムで会社員をしています。「今日も元気にしてるかな」と気になって仕方なかった留守番の不安を、グッズやテックでひとつずつ減らしてきた記録としてこのサイトを書いています。紹介する商品の評価は、価格やスペックの比較に加えて実際のユーザーレビューや専門家の情報を丹念に読み比べたうえでの結論で、良い点も気になる点も正直に書くことを大切にしています。',
  // トップの見出しに使うキャッチ
  tagline: 'ひとり暮らし × 猫 × テックで、留守番の不安をゼロに。',
  // ロゴ下に出す短いタグライン
  headerTagline: 'ひとり暮らしと、猫と、テック。',
  // トップのヒーロー見出し（改行込み）
  heroTitle: '一人暮らしでも、\n猫との暮らしを\nちゃんと\n続けていくために。',
  heroLead: '留守番・将来・お金の不安を、テックでやさしくサポート。',
};

// 体験談パートで使う一貫したペルソナ設定（記事を書くときはここに合わせる）
export const PERSONA = {
  name: 'ゆい',
  catName: 'むぎ',
  catInfo: '2歳・キジトラ・女の子（保護猫カフェ経由でお迎え）',
  area: '都内近郊・1K',
  job: '会社員（フルタイム・オフィスは電車で片道40分ほど）',
  yearsTogether: '2年目',
};

// Google Analytics 4 計測ID
export const GA_MEASUREMENT_ID = 'G-XGSDF0M9WH';

// 生成画像（AIで作成した写真）。ローカルの軽量化済みWebPを参照（元はCloudFront上の4〜6MB級PNGで、
// LCP（表示速度）を著しく悪化させていたため public/covers/legacy/ に圧縮版を置いて差し替え済み）。
export const IMG = {
  hero: '/covers/legacy/hf_20260823_134615_632646d0-42c9-4e87-9994-099ead9967cd.webp',
  author: '/covers/legacy/hf_20260823_134720_2ff48f1a-de17-4612-b382-304fb271870d.webp',
  camera: '/covers/legacy/hf_20260823_134615_557a7092-a61f-4d3f-b131-29c13dfa43dd.webp',
};

// カテゴリ（トピッククラスター）定義
export const CATEGORIES = [
  { slug: 'rusuban', name: '留守番・お世話', emoji: '🏠', desc: '何日まで留守番できる？準備とグッズ' },
  { slug: 'mimamori', name: '見守りテック', emoji: '📷', desc: 'ペットカメラ・IoT・自動化の実機比較' },
  { slug: 'hiyou', name: '費用・保険', emoji: '💰', desc: '月いくら？ペット保険の考え方' },
  { slug: 'heya', name: '部屋づくり・掃除', emoji: '🧹', desc: '脱走防止・レイアウト・掃除グッズ' },
  { slug: 'hajimete', name: 'お迎え前・初心者', emoji: '🐾', desc: 'はじめて猫を迎える人の基礎知識' },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];
