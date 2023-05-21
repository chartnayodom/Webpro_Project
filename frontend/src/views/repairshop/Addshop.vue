<template>
  <div id="app">
    <section class="section">
      <div class="container p-5" style="text-align: left">
        <h1 class="title">อยากแนะนำร้านหรอ</h1>
        <h5 class="subtitle">เพียงแต่กรอกฟอร์มร้านที่แนะนำด้านล่าง</h5>
        <!-- <form> -->
        <div class="field">
          <label class="label" for="">ชื่อร้าน</label>
          <input
            class="input"
            type="text"
            placeholder="ชื่อร้าน"
            v-model="$v.r_shop_name.$model"
            :class="{ 'is-danger': $v.r_shop_name.$error }"
          />
          <template v-if="$v.r_shop_name.$error">
            <p class="help is-danger" v-if="!$v.r_shop_name.required">
              This field is required
            </p>
            <p class="help is-danger" v-if="!$v.r_shop_name.minLength">
              Must be at least 5 character
            </p>
            <p class="help is-danger" v-if="!$v.r_shop_name.maxLength">
              Must not be at more 100 character
            </p>
          </template>
        </div>
        <div class="field">
          <label class="label" for="">ตำแหน่งร้าน</label>
          <input
            class="input"
            type="text"
            placeholder="พิมพ์ตำแหน่งร้าน หรืออธิบายเพิ่มเติม"
            v-model="$v.r_shop_address.$model"
            :class="{ 'is-danger': $v.r_shop_address.$error }"
          />
          <template v-if="$v.r_shop_address.$error">
            <p class="help is-danger" v-if="!$v.r_shop_address.required">
              This field is required
            </p>
            <p class="help is-danger" v-if="!$v.r_shop_address.minLength">
              Must be at least 10 character
            </p>
            <p class="help is-danger" v-if="!$v.r_shop_address.maxLength">
              Must not be at more 300 character
            </p>
          </template>
        </div>
        <!-- <div class="field">
                <label class="label" for="">แบรนด์ที่รองรับการบริการ</label>
                <input class="input" type="text" v-model="supportBrand" placeholder="พิมพ์แบรนด์ที่เขารับทำ">
            </div> -->
        <!-- <div class="field">
          <label class="label" for="">คะแนนความพอใจ</label>
          <input
            class="input"
            type="number"
            min="1"
            max="10"
            v-model="r_shop_like"
            placeholder="1-10"
          />
        </div> -->
        <label class="label" for="">
          <input
            type="checkbox"
            name=""
            id=""
            v-model="agreement"
          />โปรดยืนยันก่อนว่าได้อ่าน<a href="#">ข้อตกลงในการใช้งาน</a
          >และยอมรับให้ผู้ดูแลได้ตรวจสอบก่อนจะก่อนนำเสนอภายในเว็บไซด์
        </label>
        <button class="button is-danger" @click="addRecShop()">นำเสนอ</button>
        <!-- </form> -->
      </div>
    </section>
  </div>
</template>

<script>
import axios from '@/plugins/axios'
import { required, minLength, maxLength } from "vuelidate/lib/validators";
export default {
  props: ["user"],
  name: "App",
  data() {
    return {
      r_shop_name: "",
      r_shop_address: "",
      // supportBrand: "",
      r_shop_like: "",
      agreement: false,
    };
  },
  methods: {
    addRecShop() {
      this.$v.$touch();
      let formData = new FormData();
      formData.append("shop_name", this.r_shop_name);
      formData.append("shop_addr", this.r_shop_address);
      // formData.append("brand", this.supportBrand);
      formData.append("r_shop_by", user.user_id);
      axios
        .post("/repairshop/add", formData)
        .then((res) => this.$router.push({ name: "Shoprecomment" }))
        .catch((e) => console.log(e.response.data));
    },
  },
  validations: {
    r_shop_name: {
      required: required,
      minLength: minLength(5),
      maxLength: maxLength(100),
    },
    r_shop_address: {
      required: required,
      minLength: minLength(10),
      maxLength: maxLength(300),
    },
  },
};
</script>

<style>
</style>