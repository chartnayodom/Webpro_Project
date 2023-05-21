<template>
  <div id="app">
    <section class="section">
      <div class="container p-5" style="text-align: left">
        <div class="content">
          <h1 class="title">เช็คระยะรถเบื้องต้น</h1>
          <div class="field">
            <label class="label">ระยะทางโดยเฉลี่ยในแต่ละวัน</label>
            <input
              class="input"
              type="text"
              placeholder="ระยะทาง(กิโลเมตร)"
              v-model="$v.distance.$model"
              :class="{ 'is-danger': $v.distance.$error }"
            />
            <template v-if="$v.distance.$error">
              <p class="help is-danger" v-if="!$v.distance.required">
                This field is required
              </p>
            </template>
          </div>
          <div class="field">
            <label class="label">จำนวนวันต่อสัปดาห์</label>
            <input
              class="input"
              type="text"
              placeholder="จำนวนวัน"
              v-model="$v.day.$model"
              :class="{ 'is-danger': $v.day.$error }"
            />
            <template v-if="$v.day.$error">
              <p class="help is-danger" v-if="!$v.day.required">
                This field is required
              </p>
            </template>
          </div>
          <div class="field">
            <label class="label">อายุการใช้งาน</label>
            <input
              class="input"
              type="number"
              placeholder="เดือน"
              min="1"
              max="100"
              v-model="$v.age.$model"
              :class="{ 'is-danger': $v.age.$error }"
            />
            <template v-if="$v.age.$error">
              <p class="help is-danger" v-if="!$v.age.required">
                This field is required
              </p>
              <p
                class="help is-danger"
                v-if="$v.age.$model <= 0 && $v.age.$model > 100"
              >
                1 - 100
              </p>
            </template>
          </div>
          <!-- <div class="field">
                           <input type="radio" name="car" value="1" v-model="car">รถยนต์
                           <input type="radio" name="car" value="2" v-model="car">จักรยานยนต์
                        </div> -->
          <button class="button is-primary" @click="checkdistance()">
            คำนวนเบื้องต้น
          </button>
          <div class="field p-5">
            <label class="label"><h2>ผลการเช็คระยะเบื้องต้น</h2></label>
            <label class="label" v-show="show"
              ><h2>{{ checkresult }}</h2></label
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      distance: "",
      day: "",
      // car:'',
      age: "",
      result: "",
      show: false,
    };
  },
  methods: {
    checkdistance() {
      this.show = true;
    },
  },
  computed: {
    checkresult() {
      this.$v.$touch();
      if (!this.$v.$invalid ) {
        let data = {
          distance: this.distance,
          day: this.day,
          age: this.age,
        };
        if(this.age <=0 || this.age >100){
            this.result = "";
        }
        else if (this.age < 6 && this.age >0) {
          if (5000 - this.distance * this.day > 0) {
            this.result =
              "เหลือระยะทางอีก " +
              (5000 - this.distance * this.day) +
              " กิโลเมตร";
          } else {
            this.result = "ควรไปตรวจสอบสภาพรถยนต์";
          }
        } else if (this.age >= 6 && this.age < 12) {
          if (10000 - this.distance * this.day > 0) {
            this.result =
              "เหลือระยะทางอีก " +
              (10000 - this.distance * this.day) +
              " กิโลเมตร";
          } else {
            this.result = "ควรไปตรวจสอบสภาพรถยนต์";
          }
        } else if (this.age >= 12 && this.age < 24) {
          if (40000 - this.distance * this.day > 0) {
            this.result =
              "เหลือระยะทางอีก " +
              (40000 - this.distance * this.day) +
              " กิโลเมตร";
          } else {
            this.result = "ควรไปตรวจสอบสภาพรถยนต์";
          }
        } else if (this.age >= 24 && this.age < 36) {
          if (60000 - this.distance * this.day > 0) {
            this.result =
              "เหลือระยะทางอีก " +
              (60000 - this.distance * this.day) +
              " กิโลเมตร";
          } else {
            this.result = "ควรไปตรวจสอบสภาพรถยนต์";
          }
        } else {
          if (100000 - this.distance * this.day > 0) {
            this.result =
              "เหลือระยะทางอีก " +
              (100000 - this.distance * this.day) +
              " กิโลเมตร";
          } else {
            this.result = "ควรไปตรวจสอบสภาพรถยนต์";
          }
        }
      }
      return this.result;
    },
  },
  watch: {
    distance: function () {
      this.show = false;
    },
    day: function () {
      this.show = false;
    },
    age: function () {
      this.show = false;
    },
  },
  validations: {
    distance: {
      required: required,
    },
    day: {
      required: required,
    },
    age: {
      required: required,
    },
  },
};
</script>

<style>
</style>