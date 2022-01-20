<template>
  <div>
    <br />
    <div>
      <div class="col-12 mx-auto">
        <input
          class="form-control search"
          type="search"
          v-model="search"
          placeholder="Пошук..."
          autofocus
          style="width: 30% !important"
        />
        <button
          type="button"
          v-on:click="addTransaction"
          class="btn btn-outline-primary"
          style="margin-left: 10px"
        >
          Додати транзакцію
        </button>
      </div>
    </div>
    <br />
    <br />
    <table
      v-if="transactions.length > 0"
      class="table table-striped text-left mx-auto"
      style="width: 80%"
    >
      <thead>
        <th scope="col">id</th>
        <th scope="col">Категорія</th>
        <th scope="col">Назва</th>
        <th scope="col">Ціна(грн.)</th>
        <th scope="col">Опис</th>
        <th scope="col">Редагувати</th>
        <th scope="col">Видалити</th>
      </thead>
      <tbody>
        <tr v-for="(transaction, key) in filterList" :key="transaction.key">
          <td>{{ key + 1 }}</td>

          <td>
            {{ transaction.category.title }}
          </td>

          <td>
            {{ transaction.title }}
          </td>

          <td>
            {{ Number(transaction.price).toFixed(2) + '₴' }}
          </td>

          <td>
            {{ transaction.description }}
          </td>

          <td>
            <a
              :href="'/EditTransaction/' + transaction._id"
              class="btn btn-info"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pen-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"
                />
              </svg>
            </a>
          </td>

          <td>
            <button
              @click.prevent="DeleteTransaction(transaction._id)"
              class="btn btn-danger"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
                />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot></tfoot>
    </table>
    <h4 v-else>Створіть свою першу транзакцію</h4>
  </div>
</template>

<script>
import axios from 'axios';
import VueJwtDecode from 'vue-jwt-decode';
import swal from 'sweetalert';
export default {
  data: () => ({
    user: {},
    transactions: [],
    categories: [],
    search: '',
  }),
  methods: {
    async DeleteTransaction(id) {
      let uri = `/api/transactions/${id}`;
      await axios.delete(uri).then(() => {
        this.transactions.splice(this.transactions.indexOf(id - 1), 1);
      });
    },
    getUserDetails() {
      let token = localStorage.getItem('jwt');
      let decoded = VueJwtDecode.decode(token);
      this.user._id = decoded._id;
      this.user.name = decoded.name;
    },
    async GetTransactions() {
      let uri = `/api/transactions`;
      axios
        .get(uri, { headers: { userID: `${this.user._id}` } })
        .then((response) => {
          this.transactions = response.data;
          console.log(this.transactions);
        });
    },
    async GetCategories() {
      let uri = `/api/categories`;
      axios
        .get(uri, { headers: { userID: `${this.user._id}` } })
        .then((response) => {
          this.categories = response.data;
        });
    },
    addTransaction() {
      if (this.categories.length > 0) {
        this.$router.push('/AddTransaction');
      } else {
        swal('Помилка', 'У вас ще немає жодної категорії', 'error');
      }
    },
  },
  async mounted() {
    await this.getUserDetails();
    this.GetTransactions();
    this.GetCategories();
  },
  computed: {
    filterList() {
      return this.transactions.filter((searched) => {
        return (
          searched.title.toLowerCase().includes(this.search.toLowerCase()) ||
          searched.category.title
            .toLowerCase()
            .includes(this.search.toLowerCase())
        );
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  width: 30% !important;
  display: unset;
}
.search:focus {
  border: 1px solid rgba(151, 151, 151, 0.678);
}

body {
  font-family: 'Raleway', sans-serif;
  font-size: 16px;
  font-weight: 300;
}

.add-button {
  color: white;
  border: none;
  text-decoration: none;
  font-size: 16px;
  text-align: center;
  line-height: 2em;
  padding: 10px 20px;
  width: fit-content;
}
</style>
