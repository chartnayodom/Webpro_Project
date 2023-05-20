<template>
  <div id="app">
    <section class="section">
      <div class="container p-5" style="text-align:left">
        <h2 class="title p-2">Edit Blog</h2>
        <h1 class="is-size-4">New Image</h1>
        <input
          class="mb-5"
          multiple
          type="file"
          accept="image/png, image/jpeg, image/webp"
          @change="selectImages"
        />
        <div class="field">
          <label class="label">Title</label>
          <div class="control">
            <input
              v-model="Blog_Title"
              class="input"
              type="text"
              placeholder=""
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Content</label>
          <div class="control">
            <input v-model="Blog_Content" class="input" placeholder="" />
          </div>
        </div>
        <label class="label">Status</label>

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
        </div>
        <button class="button is-danger" @click="editblog()">ยืนยัน</button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Blog_Title: "",
      Blog_Content: "",
      Status: "",
      Pin: "",
    };
  },
  created() {
    axios
      .get(`/blogs/${this.$route.params.id}`)
      .then((response) => {
        this.Blog_Title = response.data.blog.Blog_Title;
        this.Blog_Content = response.data.blog.Blog_Content;
        this.Status = response.data.blog.Status;
        this.Pin = response.data.blog.Pin ? 1 : 0;
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
      let formData = new FormData();
      formData.append("Blog_Title", this.Blog_Title);
      formData.append("Blog_Content", this.Blog_Content);
      formData.append("Pin", this.Pin ? 1 : 0);
      formData.append("Status", this.Status);
      this.images.forEach((image) => {
        formData.append("myImage", image);
      });

      axios
        .put("/blogs/" + this.$route.params.id, formData)
        .then((res) => {
          console.log(res);
          this.$router.push({ path: "/" });
        })
        .catch((e) => console.log(e));
    },
  },
};
</script>
