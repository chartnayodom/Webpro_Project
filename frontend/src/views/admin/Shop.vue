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
                <!--isShopRecommenter(shop)-->
                <a v-if="true" class="card-footer-item" @click="approveshop(shop)"
                  ><!--isShopRecommenter(shop)-->
                  <span>Approve</span>
                </a>
                <a v-if="true" class="card-footer-item" @click="disapproveshop(shop)"
                  ><!--isShopRecommenter(shop)-->
                  <span>Disapprove</span>
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
        .get("/admin/shop", {
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
    approveshop(shop) {
        axios
          .get(`/admin/approveShop/${shop.r_shop_id}`)
          .then((response) => {
            this.$router.push("/repairshop");
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
    },
    disapproveshop(shop) {
        axios
          .get(`/admin/disapproveShop/${shop.r_shop_id}`)
          .then((response) => {
            this.$router.push("/repairshop");
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
    },
  },
};
</script>

<style>
</style>