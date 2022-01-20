<template>
  <div class="container mt-4 add-container">
    <div class="col-md-6 col-10 mx-auto">
      <h1 v-if="$route.params.id == undefined">Створити транзакцію</h1>
      <h1 v-else>Редагувати транзакцію</h1>
      <form @submit.prevent="addPost" class="mb-5">
        <div class="form-group">
          <label>Назва:</label>
          <input
            v-model="newTransaction.title"
            type="text"
            class="form-control"
            id="name"
            name="name"
          />
        </div>
        <br />
        <div class="form-group">
          <label>Категорія:</label>
          <select v-model="newTransaction.category">
            <option
              v-for="category in categories"
              v-bind:key="category._id"
              :value="category._id"
            >
              {{ category.title }}
            </option>
          </select>
        </div>
        <br />
        <div class="form-group">
          <label>Опис:</label>
          <input
            v-model="newTransaction.description"
            type="text"
            class="form-control"
            id="name"
            name="name"
          />
        </div>
        <br />
        <div class="form-group">
          <label>Ціна:</label>
          <input
            v-model="newTransaction.price"
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
      newTransaction: {},
      categories: {},
      user: {},
      now: '',
    };
  },
  methods: {
    async addPost() {
      let uri = '/api/transactions';
      this.newTransaction.user = this.user._id;
      this.date_function();
      this.newTransaction.date = this.now;
      await axios.post(uri, this.newTransaction).then(() => {
        this.$router.push('/transactions');
      });
    },
    getUserDetails() {
      let token = localStorage.getItem('jwt');
      let decoded = VueJwtDecode.decode(token);
      this.user._id = decoded._id;
      this.user.name = decoded.name;
    },
    async GetCategories() {
      let uri = `/api/categories`;
      axios
        .get(uri, { headers: { userID: `${this.user._id}` } })
        .then((response) => {
          this.categories = response.data;
        });
    },
    date_function() {
      var currentDate = new Date().toLocaleString('en-US', {
        timeZone: 'Europe/Kiev',
      });
      this.now = currentDate;
    },
  },
  async created() {
    await this.getUserDetails();
    this.GetCategories();
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
