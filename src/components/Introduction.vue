<template>
<section id="introduction" class="section is-medium">
  <div class="container">
    <div class="heading">
      <h2 class="title is-2">Introduction</h2>
      <h2 class="subtitle is-4">
        關於摩斯電碼
      </h2>
    </div>
    <div class="content is-medium">
      <section>
        <p>
          每個摩斯電碼，無論是文字字元 (字母、數字) 或是符號都會以相異的<b>長、短音</b>序列去呈現。在時間長度上，通常以短音的時間作為標準，長音的時間會是短音時間的三倍，每個長短音之間都會以一個和短音相同時間間隔的停頓去區隔，每個字元、符號之間則是以三倍短音時間的停頓區隔，而每個單詞（word）則是以七倍短音時間的停頓區隔。
        </p>
        <p>
          而為了提高通訊的速度，在設計字元的摩斯電碼序列時，會去參考該字元在英文裡出現的頻率做考量，若是越常出現的字元，序列就會越短。就像是英文裡最通用的字元 <code>E</code>，就只使用一個短音做表示。另外為了緊急通訊的便利，也會將一些方便發送且辨識的訊號賦予特殊意義，像是在國際上作為求救訊號的 <code>SOS</code> 就是一個知名的例子，該訊號會以「三短、三長、三短」簡單且易辨別的電碼序列發送。另一方面，為了縮短需要發送的電碼長度，也會透過將常用的語句進行縮寫，像是以 <code>RX</code> 代表 <code>Receive</code>、<code>SN</code> 作為 <code>Soon</code>、<code>SRI</code> 作為 <code>Sorry</code> 等等。
        </p>
        <p>
          摩斯電碼在歷史發展上歷經數次變革，主要有三種版本，第一個是由 Morce 提出的最初版本 American Morse，第二個是由 Gerke 修改過後用在德國鐵路上的 Continental 版本，第三種是以國際電信聯盟 (ITU) 所制定的 International 版本。本站的電碼是使用 ITU 制定的標準。
        </p>
      </section>
      <section>
        <h3 class="title is-3">書寫</h3>
        <p>
          在慣例上，會使用點號 (dot) <code>.</code> 代表短音 (dit)、破折號 (dash) <code>-</code> 代表長音 (dah)、空白 (space) <code>&nbsp;</code> 代表區隔字母、符號的短停頓、斜線 (slash) <code>/</code> 代表單詞間的長停頓。如下方表格以 <code>Morse Code</code> 作為範例，依序將每個字母和空白轉成摩斯電碼，即可得到 <code>-- --- .-. ... . / -.-. --- -.. .</code> 的密文；同樣的，也可以將密文反解析為原文。
        </p>
        <table class="table is-bordered has-text-centered">
          <thead>
            <tr>
              <th colspan="10">Morse Code</th>
            </tr>
          </thead>
          <tbody style="font-family: monospace">
          <tr>
            <td>M</td>
            <td>o</td>
            <td>r</td>
            <td>s</td>
            <td>e</td>
            <td>&nbsp;</td>
            <td>C</td>
            <td>o</td>
            <td>d</td>
            <td>e</td>
          </tr>
          <tr>
            <td>--</td>
            <td>---</td>
            <td>.-.</td>
            <td>...</td>
            <td>.</td>
            <td>/</td>
            <td>-.-.</td>
            <td>---</td>
            <td>-..</td>
            <td>.</td>
          </tr>
          <tr>
            <td colspan="10">
              -- --- .-. ... . / -.-. --- -.. .
            </td>
          </tr>
          </tbody>
        </table>
      </section>
      <section>
        <h3 class="title is-3">參考資料</h3>
        <ul>
          <li>
              本站開發記事 (待編寫)
          </li>
          <li>
            <a href="https://en.wikipedia.org/wiki/Morse_code">
              維基百科 - 摩斯電碼 (英文)
            </a>
          </li>
          <li>
            <a href="https://en.wikipedia.org/wiki/International_Telecommunication_Union">
              維基百科 - 國際電信聯盟 (英文)
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/watch?v=lpCxnp20vhI">
              Youtube - Morse Code Song
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/watch?v=ncOcgarGJHI">
              Youtube - 摩斯電報發送教學 (日語、英文字幕)
            </a>
          </li>
          <li>
            <a href="http://morsecode.scphillips.com/translator.html">
              Morse Code Translator (英文)
            </a>
          </li>
        </ul>
      </section>
    </div>
  </div>
</section>
</template>

<script>
export default {
  data: function () {
    return {
    }
  },
  methods: {

  }
}
</script>

<style>
  table.has-text-centered td, table.has-text-centered th {
    text-align: center;
  }
</style>
