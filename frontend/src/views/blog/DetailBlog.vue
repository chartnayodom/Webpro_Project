<template>
  <div id="app">
    <section class="section" style="text-align:left">
      <!-- card แสดงบทความ -->
      <div class="container is-two-third">
        <h1 class="title is-size-1">{{blog[0].Blog_Title}}</h1>
        <h6 class="subtitle is-size-5">create by user : {{blog[0].Create_User_ID}}</h6>
        <figure class="image is-360x120">
           <img class="image is-360x120"
                    :src="imagePath(blog[0].Blog_Banner)"
                    alt="Placeholder image"
                  />
        </figure>
      </div>
      <div class="container mt-6">
        <p class="is-size-5">{{blog[0].Blog_Content}}</p>
      </div>
      <div class="container mt-6">
        <div class="columns p-3">
            <div class="column is-2">
                <router-link to="/" class="button is-primary"
                >Back to All Blog</router-link
                >
            </div>
            </div>
      </div>
    </section>
  </div>
</template>
<script>
import axios from "@/plugins/axios";

export default {
  name: "app",
  props: ["user"],
  data() {
    return {
      blog: [],
      // images: [],
    };
  },
  mounted() {
    this.getBlogDetail(this.$route.params.id);
  },
  methods: {
    getBlogDetail(blogId) {
      axios
        .get(`/blogs/${blogId}`)
        .then((response) => {
          this.blog = response.data;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
       axios
        .get(`/blog/addview/${blogId}`)
        .then((response) => {
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    imagePath(Blog_Banner) {
      if (Blog_Banner) {
        return "http://localhost:3000//uploads/image/" + Blog_Banner;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
  },
};
</script>
