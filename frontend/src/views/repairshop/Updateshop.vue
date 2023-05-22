<template>
  <div id="app">
        <section class="section">
      <div class="container p-5" style="text-align: left">
        <h2 class="title p-2">Edit Shop</h2>
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
        <button class="button is-danger" @click="editShop()">ยืนยัน</button>
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
      rec_shop:[],
      r_shop_name: "",
      r_shop_address: "",
    };
  },
    created() {
    axios
      .get(`/repairshop/${this.$route.params.id}`)
      .then((response) => {
        this.rec_shop = response.data;
        this.r_shop_name = this.rec_shop[0].r_shop_name;
        this.r_shop_address = this.rec_shop[0].r_shop_address;
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    editShop() {
      this.$v.$touch();
      let formData = new FormData();
      formData.append("shop_name", this.r_shop_name);
      formData.append("shop_addr", this.r_shop_address);
      axios
        .put("/repairshop/update/"+ this.$route.params.id, {
          shop_name: this.r_shop_name,
          shop_addr: this.r_shop_address
        })
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