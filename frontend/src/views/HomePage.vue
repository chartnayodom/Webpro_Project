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
          <div id="card" class="column is-one-third"><!-- v-for="(blog, index) in blogs" -->
            <router-link :to="`/blog/detail/`"> <!--${blog.id}-->
              <div class="card">
                <div class="card-header">
                  <div class="card-image">
                    <figure class="image is-900x600">
                      <img
                        src="https://wallpapers.com/images/featured/1080p-3qmj7oaige168170.jpg"
                        alt="รูปประกอบหัวข้อ"
                      />
                    </figure>
                  </div>
                </div>
                <div class="card-content">
                  <div class="media-content">
                    <p class="title is-4"> <!--{{blog.title}}--></p>
                    <p class="subtitle is-6"><!--{{blog.writer_id}} {{blog.date}}--></p>
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
