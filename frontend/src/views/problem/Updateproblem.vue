<template>
  <div id="app">
    <section class="section">
      <div class="container p-5" style="text-align:left">
        <h2 class="title p-2">Edit problem</h2>
        <div class="field">
          <label class="label">อ้างอิงรหัส</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="อ้างอิงรหัส"
             v-model="$v.problem_ref_id.$model"
            :class="{ 'is-danger': $v.problem_ref_id.$error }"
            />
          <template v-if="$v.problem_ref_id.$error">
            <p class="help is-danger" v-if="!$v.problem_ref_id.required">
              This field is required
            </p>
          </template>
          </div>
        </div>
        <div class="field">
          <label class="label">ปัญหา</label>
          <div class="control">
            <input
              class="input"
              placeholder="ปัญหา"
             v-model="$v.context.$model"
            :class="{ 'is-danger': $v.context.$error }"
            />
          <template v-if="$v.context.$error">
            <p class="help is-danger" v-if="!$v.context.required">
              This field is required
            </p>
          </template>
          </div>
        </div>
        <div class="field">
          <label class="label">สาเหตุ</label>
          <div class="control">
            <input
              class="input"
              placeholder="สาเหตุ"
             v-model="answer"
            />
          </div>
        </div>
        <button class="button is-danger" @click="editproblem()">ยืนยัน</button>
      </div>
    </section>
  </div>
</template>

<script>
import axios from '@/plugins/axios'
import { required} from "vuelidate/lib/validators";
export default {
  props: ["user"],
  data() {
    return {
      problem: [],
      problem_ref_id:'',
      context:'',
      answer:''
    };
  },
  created() {
    axios
      .post(`/problem/${this.$route.params.id}`)
      .then((response) => {
        this.problem = response.data;
        this.problem_ref_id = this.problem[0].problem_ref_id;
        this.context = this.problem[0].context;
        this.answer = this.problem[0].answer;
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    editproblem() {
      this.$v.$touch();
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
  validations: {
    problem_ref_id: {
      required: required,
    },
    context: {
      required: required,
    },
  },
};
</script>