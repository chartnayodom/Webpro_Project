<template>
    <div id="app">
         <section class="section" style="text-align: center;">
        <h2 class="title">ช่วงนี้มีความผิดปกติอะไรมั้ย ?</h2>
            <div class="content">
                <div class="pt-4" v-for="problem in problems">
                    <div v-if="problem.answer == ''">
                      <router-link :to="`/predict/${problem.problem_id}`" class="button is-primary">{{problem.context}}</router-link>
                    </div>
                    <div v-else="problem.answer != ''">
                      <button @click="$router.push({name:'Result',params: {'answer':problem.answer, 'problem': problem.context }})" class="button is-primary">
                        {{problem.context}}</button>
                    </div>
                    
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
        problems:[],
    };
  },
  mounted() {
    this.getProblem(this.$route.params.asking);
  },
  methods: {
    getProblem(problem_id) {
      axios
        .get(`/problem/${problem_id}`)
        .then((response) => {
          this.problems = response.data;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
  }
}
</script>