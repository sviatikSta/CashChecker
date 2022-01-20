<template>
<div class="container wrapper mt-5">
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <br />
        <h1>Увійдіть в систему</h1>
        <form
          class="text-center border border-primary p-5"
          style="margin-top:30px;height:auto;padding-top:100px !important;"
          @submit.prevent="loginUser"
        >
          <input
            type="text"
            id="email"
            class="form-control mb-5"
            placeholder="Email"
            v-model="login.email"
            required
          />

          <!-- Password -->
          <input
            type="password"
            id="password"
            class="form-control mb-5"
            placeholder="Password"
            v-model="login.password"
            required
          />

          <p>
            Ще не зарєєстрований?<router-link to="/register"
              >Нажми сюди</router-link
            >
          </p>

          <!-- Sign in button -->
          <center>
            <button class="btn btn-primary btn-block w-75 my-4" type="submit">
              Увійти
            </button>
          </center>
        </form>
      </div>
    </div>
  </div>
    </div>
</template>

<script>
import swal from "sweetalert";
import axios from "axios";
export default {
  data() {
    return {
      login: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async loginUser() {
      try {
        let response = await axios.post("/api/auth/login", this.login);
        let token = response.data.token;
        localStorage.setItem("jwt", token);
        if (token) {
          swal("Success", "Ви успішно увійшли", "success");
          location = "/transactions";
        }
      } catch (err) {
        swal("Error", "Щось пішло не так", "error");
        console.log(err.response);
      }
    }
  },
  mounted() {
    if (localStorage.getItem("jwt") != null) {
      this.$router.push("/transactions");
    }
  },
};
</script>

<style>
form {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 10px 10px 45px -31px rgba(0, 0, 0, 0.75);
}
</style>