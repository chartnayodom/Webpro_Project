<template>
  <div id="app" style="text-align: center;">
    <section class="section" id="shop">
      <!-- show google map -->
      <iframe
        width="900"
        height="720"
        style="border: 0"
        loading="lazy"
        allowfullscreen
        referrerpolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDCrFOxbWvQYnWU-V1_NH6nFxdcWTi2_zY
    &q=Space+Needle,Seattle+WA"
      >
      </iframe>
      <div class="container p-5 is-desktop">
        <div id="card" class="column is-one-third">
          <!-- v-for="shop in rec_shop" :key="shop.r_shop_id" -->
          <div class="card">
            <!-- <div class="card-header">
                <div class="card-image">
                  <figure class="image is-900x600">
                    <img
                      src="https://wallpapers.com/images/featured/1080p-3qmj7oaige168170.jpg"
                      alt="รูปประกอบหัวข้อ"
                    />
                    <img style="height: 120px"
                    :src="imagePath(blog.file_path)"
                    alt="Placeholder image"/>
                  </figure>
                </div>
              </div> -->
            <div class="card-content" @click="getShopPos(shop.r_shop_address)">
              <div class="media-content">
                <p class="title is-4">name<!--{{shop.r_shop_name}}--></p>
                <p class="subtitle is-6">
                  <!--{{shop.r_shop_address}}-->address
                </p>
                <p class="subtitle is-6">
                  <!--{{shop.r_shop_by}} {{shop.r_shop_like}}-->by like
                </p>
              </div>
            </div>
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
      rec_shop: [],
    };
  },
  methods: {
    //function กดหาสถานที่
    getShopPos(place) {
      document.getElementById("maps").src =
        "https://www.google.com/maps/embed/v1/place?key=AIzaSyDCrFOxbWvQYnWU-V1_NH6nFxdcWTi2_zY&q=" +
        place;
    },
  },
};
</script>

<style>
</style>