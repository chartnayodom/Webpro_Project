<template>
    <div id="app">
         <section class="section" style="text-align: center;">
        <h2 class="title">คำถาม</h2>
            <div class="content">
                <div class="pt-4" ><!--v-for="problem in problems" :key="problem.id"-->
                    <router-link to="/predict/result" class="button is-primary"><!--{{problem.context}}-->ตัวเลือก</router-link>
                </div>
            </div>
    </section>
    </div>
</template>
<script>
import axios from '@/plugins/axios'
export default {
    data() {
    return {
        problems:[]
    };
  },
  mounted() {
    this.getProblem(this.$route.params.asking);
  },
  methods: {
    getBlogDetail(problem_id) {
      axios
        .get(`/problem/${problem_id}`)
        .then((response) => {
          this.problems = response.data.problems;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
  }
}
</script>