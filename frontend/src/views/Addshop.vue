<template>
  <div id="app">
      <!-- navbar -->
    <nav class="navbar is-danger">
      <div class="nav-brand">
        <router-link  to="/" class="navbar-item" >Blog</router-link>
        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          v-on:click="showNav = !showNav"
          v-bind:class="{ 'is-active': showNav }"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        class="navbar-menu"
        v-bind:class="{ 'is-active': showNav }"
      >
        <div class="navbar-start"></div>
        <div class="navbar-end">
          <router-link to="/" class="navbar-item">
            <strong>บทความ</strong>
          </router-link>
          <router-link to="/Shoprecomment" class="navbar-item">
            <strong>ร้านแนะนำ</strong>
          </router-link>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">อื่นๆ</a>
            <div class="navbar-dropdown">
              <router-link to="/addblog" class="navbar-item">เขียนบทความ</router-link>
              <router-link to="/addshop" class="navbar-item">แนะนำร้าน</router-link>
              <router-link to="" class="navbar-item">เช็คระยะรถเบื้องต้น</router-link>
              <router-link to="" class="navbar-item">แจ้งปัญหารถเบื้องต้น</router-link>
            </div>
          </div>
          <div class="navbar-item">
            <router-link to="/login" class="button is-danger">Login</router-link>
            <router-link to="/signup" class="button is-danger">Signup</router-link>
          </div>
        </div>
      </div>
    </nav>
     <section class="section">
        <div class="container">
          <h1 class="title">อยากแนะนำร้านหรอ</h1>
        <h5 class="subtitle">เพียงแต่กรอกฟอร์มร้านที่แนะนำด้านล่าง</h5>
            <!-- <form> -->
            <div class="field">
                <label class="label" for="">ชื่อร้าน</label>
                <input class="input" type="text" v-model="shopName" placeholder="ชื่อร้าน">
            </div>
            <div class="field">
                <label class="label" for="">ตำแหน่งร้าน</label>
                <input class="input" type="text" v-model="shopAddress"
                    placeholder="พิมพ์ตำแหน่งร้าน หรืออธิบายเพิ่มเติม">
            </div>
            <div class="field">
                <label class="label" for="">แบรนด์ที่รองรับการบริการ</label>
                <input class="input" type="text" v-model="supportBrand" placeholder="พิมพ์แบรนด์ที่เขารับทำ">
            </div>
            <label class="label" for="">
                <input type="checkbox" name="" id="" v-model="agreement">โปรดยืนยันก่อนว่าได้อ่าน<a
                    href="#">ข้อตกลงในการใช้งาน</a>และยอมรับให้ผู้ดูแลได้ตรวจสอบก่อนจะก่อนนำเสนอภายในเว็บไซด์
            </label>
            <button class="button is-primary" @click="addRecShop()">นำเสนอ</button>
            <!-- </form> -->
        </div>
    </section>
  </div>
</template>

<script>
export default {
name: "App",
  data() {
    return {
      newarticle: [],
      article_title: "",
      article_image: "",
      article_text: "",
      showNav: false,
      agreement: false,
    };
  },
}
</script>

<style>

</style>