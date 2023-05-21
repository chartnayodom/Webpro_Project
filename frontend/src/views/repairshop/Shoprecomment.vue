<template>
  <div id="app" style="text-align: center">
    <section class="section" id="shop">
      <!-- show google map -->
      <iframe
        width="720"
        height="480"
        style="border: 0"
        loading="lazy"
        allowfullscreen
        referrerpolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDCrFOxbWvQYnWU-V1_NH6nFxdcWTi2_zY
    &q=Space+Needle,Seattle+WA"
      >
      </iframe>
      <div class="container p-5">
        <div class="columns is-desktop is-multiline">
          <div
            id="card"
            class="column is-one-third"
            v-for="shop in rec_shop"
            :key="shop.r_shop_id"
          >
            <!-- v-for="shop in rec_shop" :key="shop.r_shop_id" -->
            <div class="card">
              <!-- <div class="card-header">
                      <img style="height: 120px"
                      :src="imagePath(blog.file_path)"
                      alt="Placeholder image"/>
                    </figure>
                  </div>
                </div> -->
              <div
                class="card-content"
                @click="getShopPos(shop.r_shop_address)"
              >
                <div class="media-content">
                  <p class="title is-4">{{ shop.r_shop_name }}</p>
                  <p class="subtitle is-6">
                    {{ shop.r_shop_address }}
                  </p>
                  <p class="subtitle is-6">recomment by {{ shop.r_shop_by }}</p>
                </div>
              </div>
              <div class="card-footer">
                <a class="card-footer-item" @click="addlike(shop.r_shop_id)"
                  >like({{ shop.r_shop_like }})</a
                >
                <a
                  v-if="true"
                  class="card-footer-item"
                  @click="
                    $router.push({
                      name: 'Updateshop',
                      params: { id: shop.r_shop_id },
                    })
                  "
                  ><!--isShopRecommenter(shop)-->
                  <span class="icon-text">
                    <span>Edit</span>
                  </span>
                </a>
                <a v-if="true" class="card-footer-item" @click="deleteshop(shop)"
                  ><!--isShopRecommenter(shop)-->
                  <span>Delete</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from '@/plugins/axios'
export default {
  name: "App",
  props: ["user"],
  data() {
    return {
      rec_shop: [],
    };
  },
  mounted() {
    this.getshop();
  },
  methods: {
    getshop() {
      axios
        .get("/repairshop", {
        })
        .then((response) => {
          this.rec_shop = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //function กดหาสถานที่
    getShopPos(place) {
      document.getElementById("maps").src =
        "https://www.google.com/maps/embed/v1/place?key=AIzaSyDCrFOxbWvQYnWU-V1_NH6nFxdcWTi2_zY&q=" +
        place;
    },
    addlike(r_shop_id) {
      axios
        .get(`/repairshop/addlike/${r_shop_id}`)
        .then((response) => {
          let selectedShop = this.rec_shop.filter((e) => e.r_shop_id === r_shop_id)[0];
          selectedShop.r_shop_like = response.data.r_shop_like;
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    deleteshop(shop) {
      const result = confirm(
        `Are you sure you want to delete \'${shop.r_shop_name}\'`
      );
      if (result) {
        axios
          .delete(`/repairshop/delete/${shop.r_shop_id}`)
          .then((response) => {
            this.$router.push("/repairshop");
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
      }
    },
    isShopRecommenter(shop) {
      if (!this.user) return false;
      return (
        shop.r_shop_by === this.user.user_id //|| this.user.role == "admin"
      );
    },
  },
};
</script>

<style>
</style>