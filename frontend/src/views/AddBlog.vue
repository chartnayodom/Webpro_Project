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
        <h1 class="title">ระบบเขียนบทความ</h1>
        <!-- <form class="form" action=""> -->
        <div class="field">
          <label class="label" for="">หัวข้อ</label>
          <input
            class="input"
            type="text"
            placeholder="พิมพ์ชื่อหัวบทความ"
            v-model="article_title"
          />
        </div>
        <div class="field">
          <label class="label" for="">รูปประกอบหัวข้อ</label>
          <input type="file" src="#" alt="" z />
        </div>
        <div class="field">
          <label class="label" for="">เนื้อหา</label>
          <textarea
            class="textarea"
            name=""
            id=""
            cols="30"
            rows="15"
            placeholder="พิมพ์เนื้อหาได้ที่นี้"
            v-model="article_text"
          ></textarea>
        </div>
        <div class="field-is-grouped">
          <label class="label" for="">
            <input
              type="checkbox"
              name=""
              id=""
              v-model="agreement"
            />โปรดยืนยันก่อนว่าได้อ่าน<a href="#">ข้อตกลงในการใช้งาน</a
            >และยอมรับให้ผู้ดูแลได้ตรวจสอบก่อนจะก่อนนำเสนอภายในเว็บไซด์
          </label>
          <button class="button is-primary" @click="addarticle()">
            ยืนยัน
          </button>
        </div>
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
};
</script>

<style>
</style>