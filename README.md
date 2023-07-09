# Nuxtjs3 Master

## Directories with Roles

1. components: コンポーネントを配置する為に使用する
2. pages: ファイルベースルーティングを実現する為に使用する
3. layouts: 共通レイアウトを実現する為に使用する

### about pages directory

- ファイル名とパスが対応する形でルーティングを実現する
- 例えば、about.vue ファイルを作成すれば、localhost:3000/about にて、内容が確認できる。※app.vue に pages ディレクトリの内容を表示する設定をしている時のみ →`<NuxtPage />`

### about layouts directory

- 全てページに必ず表示したい共通の内容（ナビゲーションバー）などを管理するには、このフォルダの中に記載をする。名前は default.vue である必要がある。※app.vue に layouts ディレクトリの内容を表示する設定をしている時のみ →`<NuxtLayout><NuxtPage /></NuxtLayout>`
- ↓ の記述によって特定のファイルのみ共通のレイアウトを適応しない設定ができる

- `<script setup>
  definePageMeta({
    layout: false,
  });
</script>
`

- カスタムレイアウトを適応したい場合は、custom.vue などを作成し、以下のように適応したい vue ファイルに記述する。

- `<script setup>
  definePageMeta({
    layout: 'custom',
  });
</script>
`
