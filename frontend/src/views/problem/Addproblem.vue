<template>
  <div id="app">
    <section class="section">
      <div class="container p-5 " style="text-align:left">
        <h1 class="title">เพิ่มปัญหาในระบบ</h1>
        <div class="field">
          <label class="label" for="">อ้างอิงรหัส</label>
          <input
            class="input"
            type="text"
            placeholder="อ้างอิงรหัส"
            v-model="problem_ref_id"
          />
        </div>
        <div class="field">
          <label class="label" for="">ปัญหา</label>
          <input
            class="input"
            type="text"
            placeholder="ปัญหา"
            v-model="context"
          />
        </div>
        <div class="field">
          <label class="label" for="">สาเหตุ</label>
          <input
            class="input"
            type="text"
            placeholder="สาเหตุ"
            v-model="answer"
          />
        </div>
         <button class="button is-danger" @click="addproblem()">ยืนยัน</button>
      </div>
    </section>
  </div>
</template>

<script>
// import axios from '@/plugins/axios'
export default {
  data() {
    return {
      problem_ref_id: "",
      context: "",
      answer: "",
    };
  },
  methods: {
    addproblem() {
      let formData = new FormData();
      formData.append("problem_ref_id", this.problem_ref_id);
      formData.append("context",this.context);
      formData.append("answer",this.answer);
  
      axios
        .post("/problem/add", formData)
        .then((res) => this.$router.push({ name: "Problem" }))
        .catch((e) => console.log(e.response.data));
    },
  },
};
</script>
