<template>
  <nav
    v-if="!displayLogin"
    class="navbar navbar-expand-lg navbar-light bg-light"
  >
    <div class="container">
      <a class="navbar-brand" href="/">Cash checker</a>
      <button class="navbar-toggler" type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="/transactions">Транзакції</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/categories">Категорії</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/reports">Звіти</a>
          </li>
        </ul>
        <div>
          <button class="auth-button button-exit" @click="removeLocalStorage()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-box-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
              />
              <path
                fill-rule="evenodd"
                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      name: 'globalHeader',
      tokens: [],
      displayLogin: true,
      username: null,
    };
  },
  async created() {
    if (localStorage.getItem('jwt') != null) {
      this.displayLogin = false;
    }
  },
  methods: {
    removeLocalStorage() {
      localStorage.removeItem('jwt');
      this.displayLogin = true;
      location.href = '/';
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  border-bottom: 1px solid;
  padding-top: 10px;
  padding-left: 100px;
  display: flex;
  justify-content: space-between;
}
.nav {
  display: flex;
  list-style-type: none;
  justify-content: space-between;
  width: 100%;
  padding-inline-start: 0;

  &_link {
    margin-left: 10px;
  }
}
.button-exit {
  width: 30px !important;
}
</style>
