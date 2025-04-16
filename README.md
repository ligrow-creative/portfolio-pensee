# portfolio-pensee

**美容室 Pensée（パンセ）様の公式サイト フロントエンド開発コードです。**  
本リポジトリはポートフォリオ目的で **閲覧専用** に公開しています。  
**無断での使用・転載・複製・商用利用はご遠慮ください。**

## 🔗 サイトURL

https://pensee-hairdesign.com

## 📦 使用技術・構成

### フレームワーク・ビルド環境

- [11ty (Eleventy)](https://www.11ty.dev/)  
- [EJS](https://ejs.co/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [SCSS (Sass)](https://sass-lang.com/)  
- [Vite](https://ja.vite.dev/)  

### 開発環境

- Node.js: `v20.9.0`
- パッケージマネージャ: `npm`


## 🗂 ディレクトリ構成

```bash
portfolio-pensee/
├── husky/       
├── certs/                
├── src/
│   ├── icons/            
│   ├── images/           
│   ├── scripts/  
│       ├── @types/
│       ├── abstracts/
│       ├── constants/
│       ├── foundation/
│       ├── globals/
│       ├── helper/
│       ├── modules/
│       └── index.ts/
│   ├── site/             
│       ├── data/
│       ├── includes/
│       └── pages/
│   ├── styles/           
│       ├── foundation/
│       ├── layout/
│       ├── object/
│       ├── setting/
│       ├── tool/
│       └── style.scss
│   ├── svg/             
│   ├── entry.ts          
│   └── vite-env.d.ts     
├── static/         
│       └── root/
│           └── images/
├── .editorconfig 
├── .env.example
├── .eslintignore
├── .eslintrc.cjs     
├── .gitignore
├── .node-version
├── .npmrc
├── .prettierignore
├── .prettierrc
├── .stylelintrc.cjs
├── eleventy.config.cjs  
├── env.d.ts              
├── lint-staged.config.mjs
├── package-lock.json
├── package.json
├── project.config.js
├── README.md
├── tsconfig.json         
└── vite.config.mjs      
```

## 🛠 開発環境のセットアップ

### 1.ローカル環境用の証明書発行（初回のみ）

```bash
# 証明書ディレクトリへ移動
cd certs

# mkcertをインストール（未インストール時のみ）
brew install mkcert 

# ルートCAをインストール（初回のみ必要、作成済ならスキップされます）
mkcert -install 

# localhost 用の証明書を生成
mkcert -cert-file ./localhost.crt.pem -key-file ./localhost.key.pem localhost
```

### 2.node modules のインストール

プロジェクトルートにて、
下記コマンドを実行して、必要なパッケージ群をインストールしてください。

```npm
npm i
```

### 3.フロントエンドビルド環境の起動

```npm
npm run dev
```

## 📌 コマンドについて

```bash
| Command                | Action                                  |
| :--------------------- | :---------------------------------------|
| `npm run dev`          | start local dev server                  |
| `npm run build`        | production build for delivery           |
```
