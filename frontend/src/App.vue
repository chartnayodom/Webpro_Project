<template>
  <div id="app">
    <!-- navbar -->
    <nav class="navbar is-danger">
      <div class="nav-brand">
        <router-link  to="" class="navbar-item" >LOGO</router-link>
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
          <router-link to="" class="navbar-item">
            <strong>บทความ</strong>
          </router-link>
          <router-link to="" class="navbar-item">
            <strong>ร้านแนะนำ</strong>
          </router-link>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">อื่นๆ</a>
            <div class="navbar-dropdown">
              <router-link to="" class="navbar-item">เขียนบทความ</router-link>
              <router-link to="" class="navbar-item">แนะนำร้าน</router-link>
              <router-link to="" class="navbar-item">เช็คระยะรถเบื้องต้น</router-link>
              <router-link to="" class="navbar-item">แจ้งปัญหารถเบื้องต้น</router-link>
            </div>
          </div>
          <div class="navbar-item">
            <router-link to="" class="button is-primary">Login</router-link>
            <router-link to="" class="button is-primary">Signup</router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- content -->
    <section class="section">
      <!-- Highlight -->
      <div class="container p-5">
        <!--<figure class="image is-900x600 ">
                    <img class="is-overlay" src="https://wallpapers.com/images/featured/1080p-3qmj7oaige168170.jpg"
                        alt="Highlight">
                    <a href="#">หัวข้อXD</a>
                </figure>-->
      </div>

      <div class="container p-5">
        <div class="columns is-desktop is-multiline">
          <!-- การ์ดหัวข้อบทความแบบมีรูป -->
          <div id="card" class="column is-one-third">
            <router-link to="`/blog/detail/`">
              <div class="card">
                <div class="card-header">
                  <div class="card-image">
                    <figure class="image is-900x600">
                      <img
                        src="https://wallpapers.com/images/featured/1080p-3qmj7oaige168170.jpg"
                        alt="รูปประกอบหัวข้อ"
                      />
                    </figure>
                  </div>
                </div>
                <div class="card-content">
                  <div class="media-content">
                    <p class="title is-4"> </p>
                    <p class="subtitle is-6"></p>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      article: [],
      newarticle: [],
      showNav: false,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
