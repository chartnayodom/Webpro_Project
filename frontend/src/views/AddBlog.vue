<template>
  <div id="app">
    <section class="section">
      <div class="container">
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
        <div class="field">
          <label class="label" for="">รูปประกอบหัวข้อ</label>
          <input type="file" src="#" alt="" z />
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
export default {
  name: "App",
  data() {
    return {
      blog: [],
      title: "",
      image: "",
      text: "",
      showNav: false,
      agreement: false,
    };
  },
  methods: {
    addblog() {
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("text", this.text);
      formData.append("myImage", image);
  
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