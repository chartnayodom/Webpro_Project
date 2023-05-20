<template>
  <div id="app">
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
          <router-link to="/problem" class="navbar-item" v-if="true"><!--Isadmin-->
            <strong>ปัญหา</strong>
          </router-link>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">อื่นๆ</a>
            <div class="navbar-dropdown">
              <router-link to="/blog/addblog" class="navbar-item">เขียนบทความ</router-link>
              <router-link to="/addshop" class="navbar-item">แนะนำร้าน</router-link>
              <router-link to="/checkdistance" class="navbar-item">เช็คระยะรถเบื้องต้น</router-link>
              <router-link to="/predict/predict" class="navbar-item">แจ้งปัญหารถเบื้องต้น</router-link>
            </div>
          </div>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">Profile</a>
            <div class="navbar-dropdown">
              <router-link to="/login" class="navbar-item">Login</router-link>
              <router-link to="/signup" class="navbar-item">Signup</router-link>
              <a class="navbar-item">Profile</a>
              <a class="navbar-item" v-if="false" @click='logout'>Log out</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
      <router-view :key="$route.fullPath" @auth-change="onAuthChange" :user="user" />
  </div>
</template>

<script>
//import axios from "@/plugins/axios";
export default {
  data() {
    return {
      user: null,
      showNav: false,
    };
  },
   mounted() {
    this.onAuthChange();
  },
  methods: {
    onAuthChange() {
      const token = localStorage.getItem("token");
      if (token) {
        this.getUser();
      }
    },
    getUser() {
      //const token = localStorage.getItem("token");
      axios.get("/user/me").then((res) => {
        this.user = res.data;
      });
    },
    logout(){
      localStorage.clear();
      location.reload();
      
    }
  },
};
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
} */
</style>
