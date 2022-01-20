<template>
  <div class="container mt-4 add-container">
    <div class="col-md-6 col-10 mx-auto">
      <h1>Редагувати категорію</h1>
      <form @submit.prevent="EditCaregory" class="mb-5">
        <div class="form-group">
          <label>Назва:</label>
          <input
            v-model="category[0].title"
            type="text"
            class="form-control"
            id="title"
            name="title"
          />
        </div>
        <br />
        <div class="form-group">
          <label>Опис:</label>
          <input
            v-model="category[0].description"
            type="text"
            class="form-control"
            id="decription"
            name="decription"
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
          <button type="submit" class="button mb-3 ml-2">Редагувати</button>
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
      category: [
        {
          title: '',
          description: '',
        },
      ],
    };
  },
  methods: {
    EditCaregory() {
      let uri = `/api/categories/${this.$route.params.id}`;
      axios.put(uri, this.category[0]).then(() => {
        this.$router.push('/categories');
      });
    },
  },
  created() {
    let token = localStorage.getItem('jwt');
    let decoded = VueJwtDecode.decode(token);
    this.user = decoded;
    let uri = `/api/categories/${this.$route.params.id}`;
    axios
      .get(uri, { headers: { userID: `${this.user._id}` } })
      .then((response) => {
        this.category = response.data;
      });
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
