<template>
  <div id="app">
    <section class="section">
      <div class="container p-5" style="text-align:left">
        <h2 class="title p-2">Edit problem</h2>
        <div class="field">
          <label class="label">อ้างอิงรหัส</label>
          <div class="control">
            <input
              v-model="problem_ref_id"
              class="input"
              type="text"
              placeholder="อ้างอิงรหัส"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">ปัญหา</label>
          <div class="control">
            <input
              v-model="context"
              class="input"
              placeholder="ปัญหา"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">สาเหตุ</label>
          <div class="control">
            <input
              v-model="answer"
              class="input"
              placeholder="สาเหตุ"
            />
          </div>
        </div>
        <button class="button is-danger" @click="editproblem()">ยืนยัน</button>
      </div>
    </section>
  </div>
</template>

<script>
//import axios from '@/plugins/axios'
export default {
  data() {
    return {
      problems: [],
      problem_ref_id:'',
      context:'',
      answer:''
    };
  },
  created() {
    axios
      .get(`/problem/${this.$route.params.id}`)
      .then((response) => {
        this.problem_ref_id = response.data.problem.problem_ref_id;
        this.context = response.data.problem.context;
        this.answer = response.data.problem.answer;
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    editproblem() {
      let formData = new FormData();
      formData.append("problem_ref_id", this.problem_ref_id);
      formData.append("context", this.context);
      formData.append("answer", this.answer);
      axios
        .put("/problem/edit/" + this.$route.params.id, formData)
        .then((res) => {
          console.log(res);
          this.$router.push({ path: "/problem" });
        })
        .catch((e) => console.log(e));
    },
  },
};
</script>