<template>
  <div id="app">
    <!-- content -->
    <section class="section">
      <!-- Highlight -->
      <div class="container p-5">
      </div>

      <div class="container p-5">
        <div class="columns is-desktop is-multiline">
          <!-- การ์ดหัวข้อบทความแบบมีรูป -->
          <div id="card" class="column is-one-third"><!-- v-for="blog in blogs" :key="blog.Blog_ID" -->
            <router-link :to="`/blog/detail/`"> <!--${blog.Blog_ID}-->
              <div class="card">
                <div class="card-header">
                  <div class="card-image">
                    <figure class="image is-900x600">
                      <img
                        src="https://wallpapers.com/images/featured/1080p-3qmj7oaige168170.jpg"
                        alt="รูปประกอบหัวข้อ"
                      />
                      <!-- <img style="height: 120px"
                    :src="imagePath(blog.file_path)"
                    alt="Placeholder image"/> -->
                    </figure>
                  </div>
                </div>
                <div class="card-content">
                  <div class="media-content">
                    <p class="title is-4"> <!--{{blog.Blog_Title}}--></p>
                    <p class="subtitle is-6"><!--{{blog.Create_User_ID}} {{blog.Create_Date}} {{blog.View_Count}}--></p>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      blogs: [],
      showNav: false,
    };
  },
  mounted() {
    this.getBlogs();
  },
  methods: {
    getBlogs() {
      // axios
      //   .get("/", {
      //     params: {
      //       search: this.search,
      //     },
      //   })
      //   .then((response) => {
      //     this.blogs = response.data;
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
    imagePath(file_path) {
      if (file_path) {
        return "http://localhost:3000/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
    // shortContent(content) {
    //   if (content.length > 200) {
    //     return content.substring(0, 197) + "...";
    //   }
    //   return content;
    // },
    // addLike(blogId) {
    //   axios
    //     .put(`/blogs/addlike/${blogId}`)
    //     .then((response) => {
    //       let selectedBlog = this.blogs.filter((e) => e.id === blogId)[0];
    //       selectedBlog.like = response.data.like;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    isBlogOwner(blog) {
      if (!this.user) return false;
      return blog.create_by_id === this.user.id || this.user.role == 'admin';
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
