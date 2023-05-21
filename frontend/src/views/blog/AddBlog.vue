<template>
  <div id="app">
    <section class="section">
      <div class="container p-5" style="text-align: left">
        <h1 class="title">ระบบเขียนบทความ</h1>
        <!-- <form class="form" action="/blogs/add" enctype="multipart/form-data" method="post"> -->
        <div class="field">
          <label class="label" for="">หัวข้อ</label>
          <input
            class="input"
            type="text"
            placeholder="พิมพ์ชื่อหัวบทความ"
            v-model="$v.Blog_Title.$model"
            :class="{ 'is-danger': $v.Blog_Title.$error }"
          />
          <template v-if="$v.Blog_Title.$error">
            <p class="help is-danger" v-if="!$v.Blog_Title.required">
              This field is required
            </p>
            <p class="help is-danger" v-if="!$v.Blog_Title.minLength">
              Must be at least 10 character
            </p>
            <p class="help is-danger" v-if="!$v.Blog_Title.maxLength">
              Must not be at more 100 character
            </p>
          </template>
        </div>
        <div class="field">
          <div class="file">
            <label class="file-label">
              <input
                class="file-input"
                type="file"
                id="file"
                ref="file"
                name="bannerImage"
                @change="handleFileUpload()"
              />
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label"> Choose an image… </span>
              </span>
            </label>
          </div>
          <template v-if="$v.file.$error">
              <p class="help is-danger"  v-if="!$v.file.required">
                This file is required
              </p>
            </template>
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
            v-model="$v.Blog_Content.$model"
            :class="{ 'is-danger': $v.Blog_Content.$error }"
          ></textarea>
          <template v-if="$v.Blog_Content.$error">
            <p class="help is-danger" v-if="!$v.Blog_Content.required">
              This field is required
            </p>
            <p class="help is-danger" v-if="!$v.Blog_Content.maxLength">
              Must not be at more 10000 character
            </p>
          </template>
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
import axios from '@/plugins/axios'
import { required, minLength, maxLength } from "vuelidate/lib/validators";
export default {
  props: ["user"],
  name: "App",
  data() {
    return {
      blog: [],
      Blog_Title: "",
      file: null,
      Blog_Content: "",
      showNav: false,
      agreement: false,
    };
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      // console.log(this.file)
    },
    addblog() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = {
          Blog_Title: this.Blog_Title,
          Blog_Content: this.Blog_Content,
        };

        var formData = new FormData();
        formData.append("blog_title", this.Blog_Title);
        formData.append("blog_content", this.Blog_Content);
        formData.append("bannerImage", this.file);
        // console.log(formData.get('bannerImage'))

        axios
          .post("/blogs/add", formData, {
            headers:{
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((res) => this.$router.push({ name: "HomePage" }))
          .catch((e) => console.log(e.response.data));
      }
    },
  },
  validations: {
    Blog_Title: {
      required: required,
      minLength: minLength(10),
      maxLength: maxLength(100),
    },
    Blog_Content: {
      required: required,
      maxLength: maxLength(10000),
    },
    file: {
      required: required,
    },
  },
};
</script>

<style>
</style>