<template>
  <div id="app">
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
                <tr v-for="shop in rec_shop" :key="shop.id">
                    <td>{{shop.r_shop_name}}</td>
                    <td>{{shop.r_shop_address}}</td>
                    <td>{{shop.supprotBrand}}</td>
                    <td>Recomment by {{shop.user_sign}}</td>
                    <td>{{shop.r_shop_like}}</td>
                </tr>
            </table>
        </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "App",
  data() {
    return {
      rec_shop:[]
    };
  },
  mounted(){
    this.getShop()
  },
  methods:{
    getShop(){
      axios
        .get("http://localhost:3000/repairshop")
        .then((response)=>{
          console.log(response)
          this.rec_shop = response.data
        })
        .catch((err)=>{
          console.log(err)
        })
    }
  }
};
</script>

<style>

</style>