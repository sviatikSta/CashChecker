<template>
  <div class="container mt-4 add-container">
    <div class="col-md-6 col-10 mx-auto">
      <h1>Створити категорію</h1>
      <form @submit.prevent="addPost" class="mb-5">
        <div class="form-group">
          <label>Назва:</label>
          <input
            v-model="category.title"
            type="text"
            class="form-control"
            id="name"
            name="name"
          />
        </div>
        <br />
        <div class="form-group">
          <label>Опис:</label>
          <input
            v-model="category.description"
            type="text"
            class="form-control"
            id="name"
            name="name"
          />
        </div>
        <br />
        <div>
          <button
            type="button"
            class="button button-back mb-3 mr-2"
            @click="$router.go(-1)"
          >
            Назад
          </button>
          <button type="submit" class="button mb-3 ml-2">Додати</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import VueJwtDecode from 'vue-jwt-decode';
export default {
  data() {
    return {
      user: undefined,
      category: {},
    };
  },
  methods: {
    async addPost() {
      let uri = '/api/categories';
      this.category.user = this.user._id;
      await axios.post(uri, this.category).then(() => {
        this.$router.push('/categories');
      });
    },
    getUserDetails() {
      let token = localStorage.getItem('jwt');
      let decoded = VueJwtDecode.decode(token);
      this.user = decoded;
    },
  },
  created() {
    this.getUserDetails();
  },
};
</script>

<style scoped>
form {
  background-color: white;
  padding: 20px;
  border: 1px solid rgba(206, 206, 206, 0.678);
  box-shadow: 10px 10px 45px -31px rgba(0, 0, 0, 0.75);
}
.button-back {
  background-color: rgb(238, 238, 238);
  color: rgb(143, 143, 143);
}
.button-back:hover {
  background-color: rgb(228, 228, 228);
}
.button {
  margin: 0;
  display: unset;
  width: auto;
  padding: 8px 20px;
}
</style>
