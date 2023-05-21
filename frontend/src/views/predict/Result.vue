<template>
  <div id="app">
    <section class="section">
      <div class="container p-5" style="text-align: center;">
        <div class="content">
          <h2 class="title">เราคาดการณ์ว่าอาการ </h2>
          <h2 class="title">{{ problem }}</h2>

          <h4 class="subtitle"> {{ answer }}</h4>
          <router-link to="/repairshop" class="button is-primary">หาศูนย์บริการ</router-link>

        </div>
      </div>
    </section>
  </div>
</template>

<script>
// import axios from '@/plugins/axios'
export default {
  data() {
    return {
      problem: "",
      answer: "",

    };
  },
  mounted() {
    this.answer = this.$route.params.answer;
    this.problem = this.$route.params.problem;
    // this.getProblem(this.$route.params.asking);
  },
  // methods: {
  //   getProblem(problem_id) {
  //     axios
  //       .get(`/problem/${problem_id}`)
  //       .then((response) => {
  //         this.problems = response.data;
  //       })
  //       .catch((error) => {
  //         this.error = error.response.data.message;
  //       });
  //   },
  // }
}
</script>

<style></style>