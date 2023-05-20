<template>
  <div id="app">
    <!-- content -->
    <section class="section">
      <!-- Highlight -->
      <div class="container p-5"></div>

      <div class="container p-5">
        <div class="columns is-desktop is-multiline">
          <!-- การ์ดหัวข้อบทความแบบมีรูป -->
          <div id="card" class="column is-one-third" v-for="blog in blogs" :key="blog.Blog_ID">
            <!-- v-for="blog in blogs" :key="blog.Blog_ID" -->
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
                  <p class="title is-4"><!--{{blog.Blog_Title}}-->{{blog.Blog_Title}}</p>
                  <p class="subtitle is-6" style="text-align:left">
                    create_by : {{blog.Create_User_ID}}  view({{blog.View_Count}})
                    <br>create_date :{{blog.Create_Date}}
                  </p>
                </div>
              </div>
              <div class="card-footer">
                <router-link class="card-footer-item" :to="`/blog/detail/`"
                  >Read more... </router-link
                ><!--${blog.Blog_ID}-->
                <div class="card-footer-item">
                  <a
                    v-if="true"
                    class="card-footer-item"
                    @click="
                      $router.push({
                        name: 'EditBlog',
                        params: { id: blog.Blog_ID },
                      })
                    "
                    ><!--isBlogOwner(blog)-->
                    <span class="icon-text">
                      <span>Edit</span>
                    </span>
                  </a>
                  <a v-if="true" class="card-footer-item" @click="deleteBlog"
                    ><!--isBlogOwner(blog)-->
                    <span>Delete</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "App",
  props: ["user"],
  data() {
    return {
      blogs: [{
        Blog_ID:1,
        Blog_Title:"aaa",
        Create_User_ID:1,
        Create_Date:"10-01-2001",
        View_Count:1
      }],
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
    deleteBlog() {
      const result = confirm(
        `Are you sure you want to delete \'${this.blog.Blog_Title}\'`
      );
      if (result) {
        axios
          .delete(`/blogs/${this.blog.Blog_ID}`)
          .then((response) => {
            this.$router.push("/");
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
      }
    },
    isBlogOwner(blog) {
      if (!this.user) return false;
      return (
        blog.Create_User_ID === this.user.user_id //|| this.user.role == "admin"
      );
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
