<template>
  <div id="app">
     <section class="section">
        <div class="container p-5" style="text-align:left">
          <h1 class="title">อยากแนะนำร้านหรอ</h1>
        <h5 class="subtitle">เพียงแต่กรอกฟอร์มร้านที่แนะนำด้านล่าง</h5>
            <!-- <form> -->
            <div class="field">
                <label class="label" for="">ชื่อร้าน</label>
                <input class="input" type="text" v-model="r_shop_name" placeholder="ชื่อร้าน">
            </div>
            <div class="field">
                <label class="label" for="">ตำแหน่งร้าน</label>
                <input class="input" type="text" v-model="r_shop_address"
                    placeholder="พิมพ์ตำแหน่งร้าน หรืออธิบายเพิ่มเติม">
            </div>
            <!-- <div class="field">
                <label class="label" for="">แบรนด์ที่รองรับการบริการ</label>
                <input class="input" type="text" v-model="supportBrand" placeholder="พิมพ์แบรนด์ที่เขารับทำ">
            </div> -->
            <div class="field">
                <label class="label" for="">คะแนนความพอใจ</label>
                <input class="input" type="number" min="1" max="10" v-model="r_shop_like" placeholder="1-10">
            </div>
            <label class="label" for="">
                <input type="checkbox" name="" id="" v-model="agreement">โปรดยืนยันก่อนว่าได้อ่าน<a
                    href="#">ข้อตกลงในการใช้งาน</a>และยอมรับให้ผู้ดูแลได้ตรวจสอบก่อนจะก่อนนำเสนอภายในเว็บไซด์
            </label>
            <button class="button is-danger" @click="addRecShop()">นำเสนอ</button>
            <!-- </form> -->
        </div>
    </section>
  </div>
</template>

<script>
// import axios from '@/plugins/axios'
export default {
props:["user"],
name: "App",
  data() {
    return {
      r_shop_name: "",
      r_shop_address: "",
      // supportBrand: "",
      r_shop_like:'',
      agreement: false,
    };
  },
  methods:{
    addRecShop(){
      let formData = new FormData();
      formData.append("r_shop_name", this.r_shop_name);
      formData.append("r_shop_address", this.r_shop_address);
      // formData.append("brand", this.supportBrand);
      formData.append("r_shop_by", user.user_id);
      axios
        .post("/repairshop/add", formData)
        .then((res) => this.$router.push({name: 'Shoprecomment'}))
        .catch((e) => console.log(e.response.data));     
    }
  }
}
</script>

<style>

</style>