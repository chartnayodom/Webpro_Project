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
    <section class="section" id="article">
        <!-- card แสดงบทความ -->
        <div class="container is-two-third" >
            <router-link to="/" class="button is-primary">Back to All article</router-link>
            <h1 class="title is-size-1">{{article.article_title}}</h1>
            <h6 class="subtitle is-size-5">By WHo?</h6>
            <figure class="image is-900x600">
                <img src="https://wallpapers.com/images/featured/hd-a5u9zq0a0ymy2dug.jpg" alt="รุปปกบทความ">
            </figure>
        </div>
        <div class="container mt-6">
            
            <p class="is-size-5">{{article.article_text}}</p>
        </div>

    </section>
    </div>
</template>
<script>
export default {
    data(){
        return{
            article:[]
        }
    }
}
</script>