<template>
  <div id="app">
    <section class="section">
      <div class="container p-5" style="text-align: left">
        <h2 class="title p-2">Edit Blog</h2>
        <!-- <div class="field">
          <h1 class="is-size-4">New Image</h1>
          <input
            class="mb"
            multiple
            type="file"
            accept="image/png, image/jpeg, image/webp"
            @change="selectImages"
          />
          <template v-if="$v.images.$error">
            <p class="help is-danger" v-if="!$v.images.required">
              This file is required
            </p>
          </template>
        </div> -->
        <div class="field">
          <label class="label">Title</label>
          <div class="control">
            <input
              v-model="$v.Blog_Title.$model"
              :class="{ 'is-danger': $v.Blog_Title.$error }"
              class="input"
              type="text"
              placeholder=""
            />
          </div>
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
          <label class="label">Content</label>
          <div class="control">
            <input
              v-model="$v.Blog_Content.$model"
              :class="{ 'is-danger': $v.Blog_Content.$error }"
              class="input"
              placeholder=""
            />
          </div>
          <template v-if="$v.Blog_Content.$error">
            <p class="help is-danger" v-if="!$v.Blog_Content.required">
              This field is required
            </p>
            <p class="help is-danger" v-if="!$v.Blog_Content.maxLength">
              Must not be at more 10000 character
            </p>
          </template>
        </div>
        <!-- <label class="label">Status</label>

        <div class="control">
          <label class="radio">
            <input v-model="Status" type="radio" name="answer" value="01" />
            01
          </label>
          <label class="radio">
            <input v-model="Status" type="radio" name="answer" value="02" />
            02
          </label>
        </div>

        <div class="field mt-3">
          <div class="control">
            <label class="checkbox">
              <input v-model="Pin" type="checkbox" />
              Pinned
            </label>
          </div>
        </div> -->
        <button class="button is-danger" @click="editblog()">ยืนยัน</button>
      </div>
    </section>
  </div>
</template>

<script>
import axios from '@/plugins/axios'
import { required, minLength, maxLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      blog:[],
      Blog_Title: "",
      Blog_Content: "",
      Status: "",
      Pin: "",
      images: null,
    };
  },
  created() {
    axios
      .get(`/blogs/${this.$route.params.id}`)
      .then((response) => {
        this.blog = response.data;
        this.Blog_Title = this.blog[0].Blog_Title;
        this.Blog_Content = this.blog[0].Blog_Content;
        // this.currentImage = response.data.images;
        // this.selectMainId = this.currentImage.filter((x) => x.main === 1)[0].id;
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    selectImages(event) {
      this.images = event.target.files;
    },
    editblog() {
      this.$v.$touch();
      let formData = new FormData();
      formData.append("title", this.Blog_Title);
      formData.append("content", this.Blog_Content);

      axios
        .put("/blogs/edit/" + this.$route.params.id, formData)
        .then((res) => {
          console.log(res);
          this.$router.push({ path: "/blogs" });
        })
        .catch((e) => console.log(e));
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
    images: {
      required: required,
    },
  },
};
</script>
