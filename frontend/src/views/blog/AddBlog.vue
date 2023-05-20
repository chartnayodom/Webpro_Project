<template>
  <div id="app">
    <section class="section">
      <div class="container p-5" style="text-align:left">
        <h1 class="title">ระบบเขียนบทความ</h1>
        <!-- <form class="form" action=""> -->
        <div class="field">
          <label class="label" for="">หัวข้อ</label>
          <input
            class="input"
            type="text"
            placeholder="พิมพ์ชื่อหัวบทความ"
            v-model="title"
          />
        </div>
          <div class="file">
            <label class="file-label">
              <input class="file-input" type="file" id="file" ref="file" @change="handleFileUpload()">
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                  Choose an image…
                </span>
              </span>
            </label>
          </div>
        <div class="field">
          <label class="label" for="">เนื้อหา</label>
          <textarea
            class="textarea"
            name=""
            id=""
            cols="30"
            rows="15"
            placeholder="พิมพ์เนื้อหาได้ที่นี้"
            v-model="text"
          ></textarea>
        </div>
        <div class="field-is-grouped">
          <label class="label" for="">
            <input
              type="checkbox"
              name=""
              id=""
              v-model="agreement"
            />โปรดยืนยันก่อนว่าได้อ่าน<a href="#">ข้อตกลงในการใช้งาน</a
            >และยอมรับให้ผู้ดูแลได้ตรวจสอบก่อนจะก่อนนำเสนอภายในเว็บไซด์
          </label>
          <button class="button is-danger" @click="addblog()">ยืนยัน</button>
        </div>
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
      blog: [],
      title: "",
      file: null,
      text: "",
      showNav: false,
      agreement: false,
    };
  },
  methods: {
    handleFileUpload(){
        this.file = this.$refs.file.files[0];
    },
    addblog() {
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("text", this.text);
      formData.append("bannerImage",this.file);
  
      axios
        .post("/blogs", formData)
        .then((res) => this.$router.push({ name: "home" }))
        .catch((e) => console.log(e.response.data));
    },
  },
};
</script>

<style>
</style>