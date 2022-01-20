<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <br/>
        <h1>Зареєструватись</h1>
        <form
          class="text-center border border-primary p-5"
          style="margin-top:30px;height:auto;padding-top:100px !important;"
          @submit.prevent="registerUser"
        >
          <input
            type="text"
            id="name"
            class="form-control mb-5"
            placeholder="Ваше ім'я"
            v-model="register.name"
            required
          />
          <input
            type="email"
            id="email"
            class="form-control mb-5"
            placeholder="Ваша електронна пошта"
            v-model="register.email"
            required
          />
          <!-- Password -->
          <input
            type="password"
            id="password"
            class="form-control mb-5"
            placeholder="Ваш пароль"
            v-model="register.password"
          />
          <p>
            Уже маєте аккаунт?<router-link to="/"
              >Нажміть сюди</router-link
            >
            <!-- Sign in button -->
            <center>
              <button class="btn btn-primary btn-block w-75 my-4" type="submit">
                Зареєструватись
              </button>
            </center>
          </p>
        </form>
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
      register: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async registerUser() {
      try {
        let response = await axios.post("/api/auth/register", this.register);
        console.log(response);
        let token = response.data.token;
        if (token) {
          this.$router.push("/");
          swal("Success", "Реєстрація пройшла успішно", "success");
        } else {
          swal("Error", "Щось пішло не так", "error");
        }
      } catch (err) {
        console.log(err);
        if (err.status == 409) {
          swal("Error", err, "error");
        } else {
          swal("Error", err, "error");
        }
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