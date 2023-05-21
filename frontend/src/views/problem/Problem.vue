<template>
  <div id="app" style="text-align: center;">
    <section class="section">
      <div class="container p-5">
        <div class="columns p-2">
          <div class="column is-3">
            <h2 class="title p-2">ปัญหาในระบบ</h2>
          </div>
          <div class="column mt-2 is-1">
            <router-link to="/problem/add" class="button is-primary"
              >Add</router-link
            >
          </div>
        </div>
        <div class="columns is-6">
          <table class="table" style="width: 1000px">
            <tr>
              <th>รหัส</th>
              <th>อ้างอิงรหัส</th>
              <th>ปัญหา</th>
              <th>สาเหตุ</th>
              <th></th>
              <th></th>
            </tr>

            <tr v-for="problem in problems" :key="problem.id">
              <td>{{ problem.problem_id }}</td>
              <td>{{ problem.problem_ref_id }}</td>
              <td>{{ problem.context }}</td>
              <td>{{ problem.answer }}</td>
              <td>
                <button
                  class="button is-primary"
                  @click="
                    $router.push({
                      name: 'EditProblem',
                      params: { id: problem.problem_id },
                    })
                  "
                >
                  Edit
                </button>
              </td>
              <td><button class="button is-danger" @click="deleteProblem">Delete</button></td>
            </tr>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from '@/plugins/axios'
export default {
  props: ["user"],
  data() {
    return {
      problems: [],
    };
  },
  mounted() {
    this.getproblem();
  },
  methods: {
    getproblem() {
      axios
        .get("/problem", {
        })
        .then((response) => {
          this.problems = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteProblem() {
      const result = confirm(
        `Are you sure you want to delete \'${this.problem.context}\'`
      );
      if (result) {
        axios
          .delete(`/problem/delete/${this.problem.id}`)
          .then((response) => {
            this.$router.push("/");
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
      }
    },
  },
};
</script>
