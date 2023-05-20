<template>
  <div class="container is-widescreen">
    <section class="section">
        <div class="container p-5" style="text-align: center;">
            <div class="content">
                <h2 class="title">สวัสดี</h2>
                    <h4 class="subtitle">คุณรู้สึกว่ารถของคุณมีอาการแปลกๆใช่มั้ย</h4>
                    <router-link to="/predict/quetion" class="button is-primary">เริ่มการวิเคราะห์</router-link>
                    <h3>หลังจากเริ่มการวิเคราะห์เราจะมีคำถามให้คุณเลือกตอบจนกว่าจะวิเคราะห์ได้</h3>
                    <h6>(ผลการสิเคราะห์อาจไม่ตรง 100%)</h6>
            </div>
        </div>
    </section>
  </div>
</template>
<script>
export default {
  
}
</script>