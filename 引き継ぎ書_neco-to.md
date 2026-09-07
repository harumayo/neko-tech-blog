# 引き継ぎ書 — アフィリエイトサイト「neco to.」

> **使い方**：新しいチャットを開いたら、この1枚をまるごと貼ってください。それだけで作業を続けられます。
> 最終更新：2026-08-23

---

## 0. ひとことで言うと

「ひとり暮らし × 猫 × 見守りテック」ニッチのアフィリエイトブログを、Astro で作って Netlify に無料公開済み。
今は **各記事に「一番欲しくなる」購買心理フローの商品比較（最低3つ）を入れていく作業中**。

- 公開URL：**https://ubiquitous-kangaroo-7c7c73.netlify.app**
- 作っている人：よう / Suzuki You（初心者。Claudeにできるだけ自動で進めてほしい）
- 収益化：もしもアフィリエイト登録済み。**楽天=提携中（リンク使える）／Amazon=審査待ち（未承認）**

---

## 1. 誰が何をするか（役割分担）

Claudeが**ほぼ全部**やる。ようさんがやるのは次の3つだけ：

1. **もしも「商品リンク」のHTMLを貼る**（← 商品画像と実リンクはここからしか取れない。最重要）
2. **Amazon承認後**、Amazonリンクを渡す
3. できあがった **zip を Netlify にドラッグ**して公開（下の手順参照）

---

## 2. ⚠️ 今すぐの続き（最優先タスク）

**前チャットで貼ってもらった「もしもHTML（4カテゴリ・計15商品分）」は、チャットの圧縮で消えてしまった。**
商品名は残っているが、肝心の**アフィリエイトリンクと画像URLが失われた**ので、**もう一度貼ってもらう必要がある。**

再送してほしいHTML（もしも「商品リンク」のHTMLブロックだけ、カテゴリごとに）：

| カテゴリ | 入れる記事 | 商品（★本命／○上位／◇入門） |
|---|---|---|
| ① 脱走防止3選 | `neko-dassou-boushi.mdx` | ★扉付き突っ張りゲート**本体** ／ ○木製ペットゲート ／ ◇網戸ロック＋窓ストッパー |
| ② 寂しい対策おもちゃ 3〜5 | `neko-hitorigurashi-sabishii.mdx` | ★電動猫じゃらし ／ ○知育トイ・パズルフィーダー ／ ◇またたびけりぐるみ |
| ③ 自動給水器 3〜4 | `neko-rusuban-goods.mdx` の「## 1. 自動給水器」 | ★PETKIT循環式 ／ ○GEXピュアクリスタル ／ ◇アイリスオーヤマ |
| ④ スマートリモコン3選 | `neko-rusuban-natsu-atsusa.mdx` | ★SwitchBotハブ2（温湿度計内蔵）／ ○Nature Remo 3 ／ ◇Nature Remo mini |

> メモ：前回の脱走防止①は「のぼれんニャン**拡張フレーム**（本体別売）」だった。オプション品なので、本命には**扉付き突っ張りゲートの"本体"**を選ぶこと。

---

## 3. もしもHTMLの読み取りルール（Claude用・重要）

もしもの「商品リンク」HTMLから、次の2つを取り出して使う：

- **アフィリエイトリンク**：`<a href="//af.moshimo.com/af/c/click?...">` の中身。`&amp;` を `&` に戻して**そのまま**使う。
  - 形式は固定：`https://af.moshimo.com/af/c/click?a_id=5769634&p_id=54&pc_id=54&pl_id=616&url=<楽天商品URL>&m=<モバイルURL>`
  - `a_id=5769634` がようさんのID。`p_id=54 / pc_id=54 / pl_id=616` は楽天固定。
- **商品画像**：HTML内の `//thumbnail.image.rakuten.co.jp/@0_mall/<店>/cabinet/.../xxx.jpg?_ex=128x128`
  - → 先頭に `https:` を付け、サイズを変える：**カード用 `?_ex=400x400`／比較表用 `?_ex=200x200`**
  - 400x400 は実機で表示確認済み。

> ⚠️ **リンク・画像URLを絶対にでっち上げない。** 画像のcabinetパスは商品ごとに違い推測不可。前に「全部画像が表示されない」問題が起きたのは、画像なしのプレースホルダを置いたから。**必ずもしもHTMLから取る。**
> （なぜ自前で取れない？→ コンテナから楽天へアクセスすると bot判定で404。だからHTMLをようさんに貼ってもらう方式。）

---

## 4. 各商品セクションの作り方（購買心理フロー）

1商品カテゴリごとに、記事内へこの順で組む（松竹梅＝おとり効果、本命を真ん中に）：

1. **フック文**（悩みに共感する1〜2文）
2. **選び方 3つの軸** → `<PointsGrid items={[...]} />`
3. **ひと目で比較** → `<CompareTable products={[...]} specs={[...]} />`（◎○△、金の星、画像ヘッダ）
4. **タイプ別おすすめ 3〜5選** → `<ProductList products={[...]} />`（順位・実体験評価・長所短所・楽天CTA）
5. **迷ったらこれ** → `<Callout type="tip" title="迷ったらこれ">…</Callout>`（本命を1つ名指し）

- 長所・短所は**実際のレビュー傾向**をWeb検索して正直に書く（★だけ褒めない。短所も必ず入れる＝信頼＝CV向上）。
- `ProductList` は Amazon任意。今は楽天が緑ボタン、Amazon承認後に「Amazon＋楽天」の二択に戻す。

参考：完成済みの手本は `neko-camera-ranking.mdx`（カメラ3選）と `neko-rusuban-goods.mdx` の「## 2. 自動給餌器」（4選）。**このコピペ改変が一番早い。**

---

## 5. 技術セットアップ

- **場所**：作業はクラウド上の `/home/claude/neko-tech-blog/`
- **フレームワーク**：Astro 5.x（静的サイト）＋ MDX コンテンツコレクション
- **記事**：`src/content/blog/*.mdx`（frontmatter に `title/description/category/keywords/pubDate/cover/draft`）
- **主要コンポーネント**（`src/components/`）：
  - `ProductList.astro` … 購入カード（`{rank,name,sub,score,pros[],cons[],price,amazon?,rakuten?,img}`）
  - `CompareTable.astro` … 比較表（`{products:[{name,img,href,rating}], specs:[{label,cells[]}]}`）
  - `PointsGrid.astro` … 選び方3軸（icon名：quality/app/setup/voice/motion/gohan 等）
  - `Callout.astro`（type=note/tip/warn）／`ProsCons.astro`／`FeatureImage.astro`／`Faq.astro`／`BuyFlow.astro`（スマホ下部固定CTA＋3問診断モーダル）
- **設定**：`src/lib/site.ts`（サイト名 `neco to.`、URL、IMG定数など）
- **デザイン**：`src/styles/global.css`（セージグリーン #53735f／白ベース／セリフのロゴ／h2に「01｜」番号／タグ=ミントの#ピル／金の星）

---

## 6. ビルド＆公開の手順

```bash
cd /home/claude/neko-tech-blog
npm run build          # dist/ が生成される
cd dist && zip -r ../../neko-site-deploy.zip . && cd ..
```

→ Claudeが `neko-site-deploy.zip` を渡す → **ようさんが Netlify の対象サイトの「Deploys」タブに zip をドラッグ**（同じURLのまま更新される）。

> GitHub は使わない（push が組織制限でブロックされたため Netlify Drop 方式に切替済み）。

---

## 7. 記事一覧と商品の入り具合

| 記事ファイル | 内容 | 商品状況 |
|---|---|---|
| `neko-camera-ranking.mdx` | ペットカメラ3選 | ✅ 完了（実リンク＋画像） |
| `neko-rusuban-goods.mdx` | 留守番グッズ7つ | 「2.自動給餌器」✅完了 ／ 「1.自動給水器」⬜HTML待ち |
| `neko-dassou-boushi.mdx` | 脱走防止 | ⬜HTML待ち（3選） |
| `neko-hitorigurashi-sabishii.mdx` | 寂しい対策 | ⬜HTML待ち（おもちゃ3〜5） |
| `neko-rusuban-natsu-atsusa.mdx` | 夏の暑さ対策 | ⬜HTML待ち（スマートリモコン3選） |
| `neko-hitorigurashi-kaikata-guide.mdx` ほかハブ記事・費用・IoTまとめ | 情報記事 | 商品なしでOK |

---

## 8. 既知の注意点（ハマりどころ）

- コンテナは外部CDNへアクセス不可（curl/画像DL/スクショ全部×）。**画像は直URL参照で、ようさんのブラウザ側で表示される**（コンテナ内では確認できない）。
- WebFetchで楽天商品ページは404（bot判定）。→ 商品情報・画像は**もしもHTML頼み**。
- Amazonリンクは審査通過後。今は楽天のみ＝緑の主ボタン。
- Higgsfield（画像生成）は無料枠クレジット少。既存のAI写真はCloudFront URLで参照済み。

---

## 9. このあとの全体ロードマップ

1. ⬜ 4カテゴリのもしもHTMLを受け取り → 各記事に商品セクション実装 → zip納品（**今ここ**）
2. ⬜ Amazon承認 → 全商品に Amazonリンク追加（二択CTA化）
3. ⬜ 記事追加・内部リンク強化でSEO育成
4. ⬜ アクセス計測（Search Console / アナリティクス）の導入検討

---

### 新チャットでの最初のひとこと例
> 「引き継ぎ書を貼りました。まず①脱走防止3選のもしもHTMLを貼るので、商品セクションを作ってzipにして。」
