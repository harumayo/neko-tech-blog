# ローカル移行手順（ターミナルで作業する用）

このzip = 「neco to.」サイトの**Astroソース一式**（記事・コンポーネント・設定）。
ローカルにあった `neko-site-deploy_8`（ビルド済みHTMLだけ）とは別物で、**こっちが編集する本体**です。

## 手順（ターミナルで順に実行）

```bash
# 1. cattech フォルダの中でこのzipを展開（フォルダ名は好きに）
unzip neko-tech-blog-source.zip -d neko-tech-blog
cd neko-tech-blog

# 2. 依存関係を入れる（node_modules を復元。数分かかる）
npm install

# 3. 開発サーバーで確認（http://localhost:4321）
npm run dev

# 4. 本番ビルド → 公開用の静的HTMLが dist/ に出る
npm run build
```

## 公開（Netlify）

```bash
# dist の中身を zip 化
cd dist && zip -r ../neko-site-deploy.zip . && cd ..
```
→ できた `neko-site-deploy.zip` を **Netlify の対象サイト → Deploys タブ** にドラッグ。
（URLは https://ubiquitous-kangaroo-7c7c73.netlify.app のまま更新される）

## 前提

- Node.js が必要（18以上推奨）。入ってなければ https://nodejs.org からLTS版を。
- 確認：`node -v` と `npm -v` がバージョンを返せばOK。

## これで何ができる？

- 記事の中身 = `src/content/blog/*.mdx` を直接編集
- 商品カード/比較表 = `src/components/ProductList.astro` `CompareTable.astro` などを使う
- 以降、ターミナルのClaude Codeに「引き継ぎ書」を読ませれば、そのまま商品追加作業を続けられます。

## 一緒に渡したファイル

- `引き継ぎ書_neco-to.md` … プロジェクト全体の引き継ぎ（これも cattech に置いておくと便利）
- `product_research_list.md` … もしもで集める商品リスト
```
```
