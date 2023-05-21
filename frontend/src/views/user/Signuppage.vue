<template>
  <div>
    <div class="container is-fluid mt-5" style="text-align: left">
      <div class="columns is-centered">
        <div class="column is-8">
          <h1 class="title">Signup</h1>
          <!-- Sign up form -->
          <div class="field">
            <label class="label">Username</label>
            <input
              v-model="$v.username.$model"
              :class="{ 'is-danger': $v.username.$error }"
              class="input"
              type="text"
            />
            <template v-if="$v.username.$error">
              <p class="help is-danger" v-if="!$v.username.required">
                This field is required
              </p>
              <p class="help is-danger" v-if="!$v.username.minLength">
                Must be at least 8 characters
              </p>
              <p class="help is-danger" v-if="!$v.username.maxLength">
                Must not be at more 16 characters
              </p>
            </template>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <input
              v-model="$v.password.$model"
              :class="{ 'is-danger': $v.password.$error }"
              class="input"
              type="password"
            />
            <template v-if="$v.password.$error">
              <p class="help is-danger" v-if="!$v.password.required">
                This field is required
              </p>
              <p class="help is-danger" v-if="!$v.password.minLength">
                Must be at least 8 character
              </p>
              <p class="help is-danger" v-if="!$v.password.complex">
                Password too easy
              </p>
            </template>
          </div>

          <div class="field">
            <label class="label">Confirm Password</label>
            <input
              v-model="$v.confirm_password.$model"
              :class="{ 'is-danger': $v.confirm_password.$error }"
              class="input"
              type="password"
            />
            <template v-if="$v.confirm_password.$error">
              <p class="help is-danger" v-if="!$v.confirm_password.sameAs">
                Password not match
              </p>
            </template>
          </div>

          <div class="field">
            <label class="label">Email</label>
            <input
              v-model="$v.email.$model"
              :class="{ 'is-danger': $v.email.$error }"
              class="input"
              type="text"
            />
            <template v-if="$v.email.$error">
              <p class="help is-danger" v-if="!$v.email.required">
                This field is required
              </p>
              <p class="help is-danger" v-if="!$v.email.email">Invalid Email</p>
            </template>
          </div>

          <div class="field">
            <label class="label">User sign</label>
            <input
              v-model="$v.user_sign.$model"
              :class="{ 'is-danger': $v.user_sign.$error }"
              class="input"
              type="text"
            />
            <template v-if="$v.user_sign.$error">
              <p class="help is-danger" v-if="!$v.user_sign.required">
                This field is required
              </p>
              <p class="help is-danger" v-if="!$v.user_sign.minLength">
                Must be at least 3 character
              </p>
              <p class="help is-danger" v-if="!$v.user_sign.maxLength">
                Must not be at more 30 character
              </p>
            </template>
          </div>

          <div class="field">
            <label class="label">First Name</label>
              <input
                v-model="$v.first_name.$model"
                :class="{ 'is-danger': $v.first_name.$error }"
                class="input"
                type="text"
              />
            <template v-if="$v.first_name.$error">
              <p class="help is-danger" v-if="!$v.first_name.required">
                This field is required
              </p>
              <p class="help is-danger" v-if="!$v.first_name.minLength">
                Must be at least 2 character
              </p>
              <p class="help is-danger" v-if="!$v.first_name.maxLength">
                Must not be at more 50 character
              </p>
            </template>
          </div>

          <div class="field">
            <label class="label">Last Name</label>
              <input
                v-model="$v.last_name.$model"
                :class="{ 'is-danger': $v.last_name.$error }"
                class="input"
                type="text"
              />
            <template v-if="$v.last_name.$error">
              <p class="help is-danger" v-if="!$v.last_name.required">
                This field is required
              </p>
              <p class="help is-danger" v-if="!$v.last_name.minLength">
                Must be at least 2 character
              </p>
              <p class="help is-danger" v-if="!$v.last_name.maxLength">
                Must not be at more 50 character
              </p>
            </template>
          </div>

          <button class="button is-danger is-fullwidth" @click="submit()">
            Sign Up
          </button>

          <p class="my-3">
            Already have an account?
            <router-link to="/user/login">Login</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/plugins/axios'
import {
  required,
  email,
  helpers,
  minLength,
  maxLength,
  sameAs,
} from "vuelidate/lib/validators";

function complexPassword(value) {
  if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
    return false;
  }
  return true;
}

export default {
  data() {
    return {
      username: "",
      password: "",
      confirm_password: "",
      email: "",
      user_sign: "",
      first_name: "",
      last_name: "",
    };
  },
  methods: {
    submit() {
      // Validate all fields
      this.$v.$touch();

      // เช็คว่าในฟอร์มไม่มี error
      if (!this.$v.$invalid) {
        let data = {
          username: this.username,
          password: this.password,
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          user_sign: this.user_sign,
        };

        axios
          .post("/user/signup", data)
          .then((res) => {
            alert("Sign up Success");
            this.$router.push({ name: "HomePage" });
          })
          .catch((err) => {
            // alert(err.response.data.details.message);
            alert("aa");
          });
      }
    },
  },
  validations: {
    email: {
      required: required,
      email: email,
    },
    user_sign: {
      required: required,
      minLength: minLength(3),
      maxLength: maxLength(30),
    },

    password: {
      required: required,
      minLength: minLength(8),
      complex: complexPassword,
    },
    confirm_password: {
      sameAs: sameAs("password"),
    },
    username: {
      required: required,
      minLength: minLength(8),
      maxLength: maxLength(16),
    },
    first_name: {
      required: required,
      minLength: minLength(2),
      maxLength: maxLength(50),
    },
    last_name: {
      required: required,
      minLength: minLength(2),
      maxLength: maxLength(50),
    },
  },
};
</script>