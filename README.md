# ひとり暮らしネコ研究所（Astroアフィリエイトブログ）

「ひとり暮らし × 猫 × 見守りテック」に特化した、SEO最適化済みのAstro製ブログです。
**サーバー代0円**（Cloudflare Pages）で公開でき、記事はMarkdown（MDX）で書くだけ。Claudeとの半自動運用を前提に設計しています。

---

## 1. これは何ができるサイトか

- 📝 記事は `src/content/blog/` に **MDXファイルを置くだけ**で自動でページ化・一覧化・サイトマップ登録
- 🔍 SEO標準装備：メタタグ / OGP / canonical / **sitemap.xml** / **RSS** / **構造化データ(JSON-LD)** / パンくず
- 📱 スマホ最適化＆**読みやすい日本語タイポgrafi**（行間・文字幅チューニング済み・ダークモード対応）
- 🧩 アフィリ用パーツ内蔵：**商品ボックス**（星評価・価格・PR表記つき）/ **メリデメ表** / **吹き出し**
- 🗂 トピッククラスター構造（5カテゴリ）で専門性を積み上げてSEOで戦える設計

---

## 2. 必要なもの（すべて無料で始められる）

| 用途 | サービス | 費用 |
|---|---|---|
| コード管理 | GitHub アカウント | 無料 |
| 公開ホスティング | Cloudflare Pages | 無料 |
| ドメイン | 最初は `xxx.pages.dev`（無料サブドメイン）でOK | 0円 |
| （任意）独自ドメイン | お名前.com / Cloudflare Registrar など | 年 約1,000〜1,500円 |

---

## 3. ローカルで動かす

```bash
npm install      # 初回だけ（依存インストール）
npm run dev      # http://localhost:4321 で確認しながら執筆
npm run build    # 本番用に書き出し（dist/ が生成される）
npm run preview  # ビルド結果を確認
```

Node.js 18以上が必要です（推奨: 20 / 22）。

---

## 4. 記事の書き方（一番大事）

1. `src/content/blog/_template.mdx` をコピーして、新しいファイル名で保存
   （例：`neko-natsu-atsusa.mdx` → URLは `/blog/neko-natsu-atsusa/` になる）
2. 冒頭の frontmatter（`title` `description` `category` など）を埋める
3. 本文を書く。`draft: true` の間は公開されない → 仕上がったら `draft: false`
4. 保存すると `npm run dev` の画面に即反映

**カテゴリ(category)は5つから選ぶ**：
`rusuban`（留守番・お世話）/ `mimamori`（見守りテック）/ `hiyou`（費用・保険）/ `heya`（部屋づくり・掃除）/ `hajimete`（お迎え前・初心者）

**使えるパーツ**（MDX内でそのまま書ける）：
- 商品紹介：`<AffiliateBox name="..." price="..." rating={4.5} href="..." label="Amazonで見る">コメント</AffiliateBox>`
- メリデメ：`<ProsCons pros={["..."]} cons={["..."]} />`
- 吹き出し：`<Callout type="tip|warn|note" title="...">本文</Callout>`

---

## 5. 公開する（Cloudflare Pages・無料）

1. このフォルダを **GitHubリポジトリ**にpush
2. Cloudflare にログイン → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. リポジトリを選び、ビルド設定を以下にする：
   - **Framework preset**: `Astro`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Deploy を押すと数十秒で `https://<プロジェクト名>.pages.dev` が発行される
5. 以降は **GitHubにpushするたびに自動で再デプロイ**（＝Claudeが記事を追加→pushで自動公開）

> 公開URLが決まったら、`astro.config.mjs` の `site:` と `src/lib/site.ts` の `url:` を
> その本番URLに書き換えてください（sitemap・OGP・canonicalが正しくなります）。

---

## 6. 公開前チェックリスト

- [ ] `astro.config.mjs` と `src/lib/site.ts` の URL を本番URLに変更
- [ ] `src/lib/site.ts` の運営者情報（author / authorBio）を実態に合わせる
- [ ] `/about`（運営者情報）と `/privacy`（プライバシーポリシー）に連絡先を記載
- [ ] Google Search Console にサイト登録 → `sitemap-index.xml` を送信
- [ ] （任意）アクセス解析（Google Analytics 等）を `BaseLayout.astro` の `<head>` に追加
- [ ] アフィリリンクの `href` を実際のリンクに差し替え（`example.com` はダミー）

---

## 7. Claudeとの半自動運用の流れ（推奨）

1. **Claude**：キーワードマップから記事を選び、`_template.mdx` に沿ってMDXを執筆
2. **あなた**：実体験・独自写真・最終チェックを加える（← Googleに評価される差別化ポイント）
3. **push**：GitHubに上げるとCloudflareが自動公開
4. **リライト**：Search Consoleのデータを見て、伸びる記事にClaudeが加筆 → `updatedDate` 更新

> 一次情報（実際に使った/飼っている体験）を必ず足すこと。AIの下書きだけの量産はGoogleに評価されません。

---

## ディレクトリ構成

```
src/
  content/blog/       ← 記事(MDX)。ここに置くだけでページ化
    _template.mdx     ← 新規記事のテンプレ
  components/         ← AffiliateBox / Callout / ProsCons
  layouts/            ← BaseLayout(SEO) / PostLayout(記事)
  pages/              ← トップ・一覧・カテゴリ・about・privacy・rss
  lib/site.ts         ← サイト設定（タイトル/URL/カテゴリ）
  styles/global.css   ← 読みやすさ調整済みのCSS
public/               ← favicon / robots.txt / 画像置き場
```
