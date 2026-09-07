import { defineCollection, z } from 'astro:content';

// 記事(Markdown)の"型"を定義。frontmatterに必須項目を強制してSEO抜け漏れを防ぐ
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),                 // 記事タイトル（SEOタイトル）
    description: z.string(),            // メタディスクリプション（検索結果の説明文）
    category: z.enum(['rusuban', 'mimamori', 'hiyou', 'heya', 'hajimete']),
    keywords: z.array(z.string()).default([]), // 主要キーワード（管理用）
    pubDate: z.coerce.date(),          // 公開日
    updatedDate: z.coerce.date().optional(), // 更新日（リライト時に更新）
    draft: z.boolean().default(false), // trueなら本番ビルドで非公開
    cover: z.string().optional(),      // アイキャッチ画像パス（任意）
  }),
});

export const collections = { blog };
