<template>
  <div id="app">
    <section class="section">
      <div class="container p-5" style="text-align: left">
        <h1 class="title">เพิ่มปัญหาในระบบ</h1>
        <div class="field">
          <label class="label" for="">อ้างอิงรหัส</label>
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
        <div class="field">
          <label class="label" for="">ปัญหา</label>
          <input
            class="input"
            type="text"
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
        <div class="field">
          <label class="label" for="">สาเหตุ</label>
          <input
            class="input"
            type="text"
            placeholder="สาเหตุ"
            v-model="$v.answer.$model"
            :class="{ 'is-danger': $v.answer.$error }"
          />
          <template v-if="$v.answer.$error">
            <p class="help is-danger" v-if="!$v.answer.required">
              This field is required
            </p>
          </template>
        </div>
        <button class="button is-danger" @click="addproblem()">ยืนยัน</button>
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
      problem_ref_id: "",
      context: "",
      answer: "",
    };
  },
  methods: {
    addproblem() {
      this.$v.$touch();
      let formData = new FormData();
      formData.append("problem_ref_id", this.problem_ref_id);
      formData.append("context", this.context);
      formData.append("answer", this.answer);

      axios
        .post("/problem/add", formData)
        .then((res) => this.$router.push({ name: "Problem" }))
        .catch((e) => console.log(e.response.data));
    },
  },
  validations: {
    problem_ref_id: {
      required: required,
    },
    context: {
      required: required,
    },
    answer: {
      required: required,
    },
  },
};
</script>
