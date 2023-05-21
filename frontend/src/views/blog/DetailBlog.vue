<template>
  <div id="app">
    <section class="section" id="article">
      <!-- card แสดงบทความ -->
      <div class="container is-two-third">
        <h1 class="title is-size-1"><!--{{blog.Blog_Title}}--></h1>
        <h6 class="subtitle is-size-5"><!--{{blog.Create_User_ID}}--></h6>
        <figure class="image is-900x600">
          <img
            src="https://wallpapers.com/images/featured/hd-a5u9zq0a0ymy2dug.jpg"
            alt="รุปปกบทความ"
          />
           <!-- <img
                    style="height: 120px"
                    :src="imagePath(blog.Blog_Banner)"
                    alt="Placeholder image"
                  /> -->
        </figure>
      </div>
      <div class="container mt-6">
        <p class="is-size-5"><!--{{blog.Blog_Content}}--></p>
      </div>
      <div class="container mt-6">
        <div class="columns p-3">
            <div class="column is-2">
                <router-link to="/" class="button is-primary"
                >Back to All article</router-link
                >
            </div>
            </div>
      </div>
    </section>
  </div>
</template>
<script>
// import axios from "@/plugins/axios";

export default {
  props: ["user"],
  data() {
    return {
      blogs: [],
      images: [],
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
          this.blog = response.data.blog;
          this.images = response.data.images;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    imagePath(Blog_Banner) {
      if (Blog_Banner) {
        return "http://localhost:3000/" + Blog_Banner;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
  },
};
</script>