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
    <section class="section" id="shop">
        <!-- show google map -->
        <div class="container is-desktop">
            <iframe width="900" height="720" style="border:0" loading="lazy" allowfullscreen
                referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDCrFOxbWvQYnWU-V1_NH6nFxdcWTi2_zY
    &q=Space+Needle,Seattle+WA">
            </iframe>
        </div>
        <!-- show list -->
        <div class="container">
            <table class="table">
                <tr>
                    <th>ชื่อร้าน</th>
                    <th>ที่อยู่ร้าน</th>
                    <th>แบรน</th>
                    <th>แนะนำโดย</th>
                    <th>คะแนน</th>
                </tr>

                <!-- <tr v-for="item in rec_shop">
                    <td>{{item.r_shop_name}}</td>
                    <td>{{item.r_shop_address}}</td>
                    <td>{{item.r_shop_brand}}</td>
                    <td>Recomment by Who</td>
                    <td>{{item.r_shop_score}}</td>
                </tr> -->

            </table>
        </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
        rec_shop: r_shop,
        showNav: false
    };
  },
};
</script>

<style>

</style>