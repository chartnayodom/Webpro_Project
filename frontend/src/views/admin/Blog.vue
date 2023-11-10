<template>
  <div id="app">
    <section class="section">
      <!-- Highlight -->
      <div class="container p-5"></div>

      <div class="container p-5">
        <div class="columns is-desktop is-multiline">
          <!-- การ์ดหัวข้อบทความแบบมีรูป -->
          <div
            id="card"
            class="column is-one-third"
            v-for="blog in blogs"
            :key="blog.Blog_ID"
          >
            <div class="card">
              <div class="card-header">
                <div class="card-image">
                  <figure class="image is-900x600">
                    <img
                      class="image is-900x600"
                      :src="imagePath(blog.Blog_Banner)"
                      alt="Placeholder image"
                    />
                  </figure>
                </div>
              </div>
              <div class="card-content">
                <div class="media-content">
                  <p class="title is-4">{{ blog.Blog_Title }}</p>
                  <p class="subtitle is-6" style="text-align: left">
                    create_by : {{ blog.Create_User_ID }} view({{
                      blog.View_Count
                    }}) <br />create_date :{{ blog.Create_Date }}
                  </p>
                </div>
              </div>
              <div class="card-footer">
                <!-- <router-link class="card-footer-item" :to="`/blogs/${blog.Blog_ID}`"
                  >Read more... </router-link
                >-->
                <div class="card-footer-item">
                  <!-- <a
                    v-if="true"
                    class="card-footer-item"
                    @click="
                      $router.push({
                        name: 'EditBlog',
                        params: { id: blog.Blog_ID },
                      })
                    "
                    >
                    <span class="icon-text">
                      <span>Edit</span>
                    </span>
                  </a>
                  <a v-if="true" class="card-footer-item" @click="deleteBlog(blog)"
                    >
                    <span>Delete</span>
                  </a> -->
                  <a class="card-footer-item" @click="approveBlog(blog)">
                    <span>Approve</span>
                  </a>
                  <a class="card-footer-item" @click="disapproveBlog(blog)">
                    <span>Disapprove</span>
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
import axios from "@/plugins/axios";

export default {
  props: ["user"],
  data() {
    return {
      blogs: [],
      showNav: false,
    };
  },
  mounted() {
    this.getadminBlogs();
  },
  methods: {
    getadminBlogs() {
      axios
        .get("/admin/blogs", {})
        .then((response) => {
          this.blogs = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    imagePath(Blog_Banner) {
      if (Blog_Banner) {
        return "http://localhost:3000//uploads/image/" + Blog_Banner;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
    approveBlog(blog) {
        axios
          .get(`/admin/approveBlog/${blog.Blog_ID}`)
          .then((response) => {
            this.$router.push("/blogs");
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
    },
    disapproveBlog(blog) {
        axios
          .get(`/admin/disapproveBlog/${blog.Blog_ID}`)
          .then((response) => {
            this.$router.push("/blogs");
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
    },
  },
};
</script>

<style>
</style>