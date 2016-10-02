<template>
  <section>
    <div class="container">
      <div class="heading">
        <h2 class="title is-3">Codes</h1>
        <h2 class="subtitle is-5">
          摩斯電碼
        </h2>
      </div>
      <p class="control">
        本節會列出解碼器所支援的摩斯訊號字元
      </p>
      <section>
        <h3 class="title is-4">Dit</h3>
        <h3 class="subtitle is-6">短音</h3>
        <div class="columns is-gapless is-multiline is-mobile">
          <div class="code" @click="Play('.')">
            <p class="heading">dot / 半形句點</p>
            <p class="title">.</p>
          </div>
          <div class="code" @click="Play('.')">
            <p class="heading">半形間隔號</p>
            <p class="title">·</p>
          </div>
          <div class="code" @click="Play('.')">
            <p class="heading">全形間隔號</p>
            <p class="title">・</p>
          </div>
          <div class="code" @click="Play('.')">
            <p class="heading">西式句點</p>
            <p class="title">．</p>
          </div>
          <div class="code" @click="Play('.')">
            <p class="heading">中式句點</p>
            <p class="title">。</p>
          </div>
        </div>
      </section>
      <section>
        <h3 class="title is-4">Dah</h3>
        <h3 class="subtitle is-6">長音</h3>
        <p class="control">
          長音的長度為短音的三倍。
        </p>
        <div class="columns is-gapless is-multiline is-mobile">
          <div class="code" @click="Play('-')">
            <p class="heading">dash / 減號</p>
            <p class="title">-</p>
          </div>
          <div class="code" @click="Play('-')">
            <p class="heading">underscore / 底線</p>
            <p class="title">_</p>
          </div>
          <div class="code" @click="Play('-')">
            <p class="heading">全形底線</p>
            <p class="title">＿</p>
          </div>
          <div class="code" @click="Play('-')">
            <p class="heading">連字號</p>
            <p class="title">－</p>
          </div>
        </div>
      </section>
      <section>
        <h3 class="title is-4">Space</h3>
        <h3 class="subtitle is-6">間隔</h3>
        <p class="control">
          間格主要分為三種，第一種是長短音之間的間隔，長度與短音相同；第二種是字元之間的間隔 (space)，長度是短音的三倍；第三就是單詞之間的間隔 (slash)，長度為短音的七倍。
        </p>
        <div class="columns is-gapless is-multiline is-mobile">
          <div class="code" @click="Play(' ')">
            <p class="heading">space / 空格</p>
            <p class="title">&nbsp;</p>
          </div>
          <div class="code" @click="Play('/')">
            <p class="heading">slash / 斜線</p>
            <p class="title">/</p>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
  export default {
    props: ['Play']
  }
</script>

<style>
</style>
