<template>
  <div id="app">
    <section class="section" id="article">
      <!-- card แสดงบทความ -->
      <div class="container is-two-third">
        <div class="columns">
          <div class="column">
            <router-link to="/" class="button is-primary"
              >Back to All article</router-link
            >
          </div>
          <div class="column" v-if="isBlogOwner">
            <button class="button is-primary"  
                    @click="
                    $router.push({
                      name: 'update-blog',
                      params: { id: blog.id },
                    })
            ">Edit</button>
          </div>
          <div class="column" v-if="isBlogOwner">
            <button class="button is-danger">Delete</button>
          </div>
        </div>
        <h1 class="title is-size-1"><!--{{blog.Blog_Title}}--></h1>
        <h6 class="subtitle is-size-5"><!--{{blog.Create_User_ID}}--></h6>
        <figure class="image is-900x600">
          <img
            src="https://wallpapers.com/images/featured/hd-a5u9zq0a0ymy2dug.jpg"
            alt="รุปปกบทความ"
          />
           <!-- <img
                    style="height: 120px"
                    :src="imagePath(blog.file_path)"
                    alt="Placeholder image"
                  /> -->
        </figure>
      </div>
      <div class="container mt-6">
        <p class="is-size-5"><!--{{blog.Blog_Content}}--></p>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      blogs: [],
    };
  },
  methods: {
    isBlogOwner(blog) {
      if (!this.user) return false;
      return blog.create_by_id === this.user.id || this.user.role == "admin";
    },
    imagePath(file_path) {
      if (file_path) {
        return "http://localhost:3000/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
  },
};
</script>