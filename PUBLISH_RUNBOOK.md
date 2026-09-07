# 公開手順書（PUBLISH RUNBOOK）
### 朝、この順にやれば「実質0円」でサイトが公開されます

所要時間の目安：15〜25分。GitHubとCloudflareのアカウント（無料）が必要です。
※ このフォルダはすでに `git` 初期化＆初回コミット済みです。あとはGitHubに上げてCloudflareにつなぐだけ。

---

## ステップ1：GitHubにリポジトリを作る（5分）

1. https://github.com にログイン（アカウントがなければ無料作成）
2. 右上「＋」→ **New repository**
3. Repository name（例：`neko-tech-blog`）を入力 → **Private**でもPublicでもOK
4. **「Add a README」等は何もチェックせず**、そのまま **Create repository**
5. 次の画面に出る **リポジトリURL**（`https://github.com/あなた/neko-tech-blog.git`）を控える

---

## ステップ2：このコードをGitHubへpushする（5分）

### 方法A：ターミナルで（推奨・確実）
このフォルダで以下を実行（`あなた`の部分は自分のリポジトリURLに置換）：

```bash
git remote add origin https://github.com/あなた/neko-tech-blog.git
git branch -M main
git push -u origin main
```

※ 初回pushで認証を求められたら、GitHubのユーザー名＋**パーソナルアクセストークン**（またはブラウザ認証）を使います。
　トークンは GitHub → Settings → Developer settings → Personal access tokens で発行（repo権限）。

### 方法B：GitHub CLIを使う場合
```bash
gh auth login      # ブラウザで認証
gh repo create neko-tech-blog --private --source=. --push
```

### 方法C：コマンドが苦手なら（GitHub Desktop）
GitHub Desktopアプリで「Add existing repository」→ このフォルダを選択 → Publish。

> 困ったら私が画面を見ながら一緒にやります。ここが唯一、認証が必要で私だけでは進められない部分です。

---

## ステップ3：Cloudflare Pagesにつなぐ（5〜10分）

1. https://dash.cloudflare.com にログイン（無料アカウント作成可）
2. 左メニュー **Workers & Pages** → **Create** → **Pages** タブ → **Connect to Git**
3. GitHubを連携し、`neko-tech-blog` リポジトリを選択
4. ビルド設定を以下にする：
   - **Framework preset**：`Astro`
   - **Build command**：`npm run build`
   - **Build output directory**：`dist`
5. **Save and Deploy** を押す → 30秒〜数分で公開URL（`https://neko-tech-blog.pages.dev` のような形）が発行される 🎉

---

## ステップ4：公開URLをコードに反映（重要・5分）

発行された本番URLを、2か所に設定します（sitemap・OGP・canonicalが正しくなる）。

1. `astro.config.mjs` の `site:` を本番URLに変更
2. `src/lib/site.ts` の `url:` を同じ本番URLに変更
3. `public/robots.txt` の Sitemap 行のURLも本番URLに変更

変更したら保存して：
```bash
git add -A
git commit -m "本番URLを設定"
git push
```
→ Cloudflareが自動で再デプロイします（以降、pushするたび自動公開）。

---

## ステップ5：公開後のSEO初期設定（後日でOK）

- **Google Search Console**（無料）にサイトを登録し、`sitemap-index.xml` を送信
- （任意）Google Analytics を `src/layouts/BaseLayout.astro` の `<head>` に追加
- **ASP登録**（→ `asp_guide.md` 参照）→ 記事の `example.com` リンクを本物に差し替え

---

## 独自ドメインを使いたくなったら（任意・年1,000円ほど）

- Cloudflare Registrar や お名前.com でドメインを取得
- Cloudflare Pages のプロジェクト → **Custom domains** → ドメインを追加して案内どおりDNS設定
- 取得後、ステップ4と同じ要領で `site:` `url:` をそのドメインに変更

---

## つまずいたら

- **pushで認証エラー** → パーソナルアクセストークンを使う（方法A注記）／方法C（GitHub Desktop）に切替
- **Cloudflareのビルド失敗** → Build command が `npm run build`、出力先が `dist` になっているか確認
- それでも詰まったら、エラー文をそのまま私に貼ってください。一緒に直します。
