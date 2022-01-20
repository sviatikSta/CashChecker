<template>
  <div class="container mt-4 add-container">
    <div class="col-md-6 col-10 mx-auto">
      <form @submit.prevent="UpdateCharts" class="mb-5">
        <div class="form-group">
          <label>Початкова дата:</label>
          <input
            v-model="fromDate"
            type="date"
            class="form-control"
            id="title"
            name="title"
          />
        </div>
        <br />
        <div class="form-group">
          <label>Кінцева дата:</label>
          <input
            v-model="toDate"
            type="date"
            class="form-control"
            id="decription"
            name="decription"
          />
        </div>
        <br />
        <div>
          <button type="submit" class="button mb-3 ml-2">Створити</button>
        </div>
      </form>
      <div v-show="filteredData.length <= 0">
        <h4>Неможливо побудувати графіки</h4>
      </div>
      <div v-show="filteredData.length > 0" class="container">
        <apexchart
          ref="PieInfo"
          type="pie"
          width="400"
          :options="chartOptions"
          :series="series"
        ></apexchart>
        <apexchart
          ref="LineInfo"
          type="line"
          width="400"
          :options="chartOptions2"
          series="series"
          style="margin-left: 100px"
        ></apexchart>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts';
import axios from 'axios';
import VueJwtDecode from 'vue-jwt-decode';
export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      user: {},
      fromDate: undefined,
      toDate: undefined,
      filteredData: [{ 123: 123 }],

      series: [],
      chartOptions: {
        chart: {
          width: 300,
          type: 'pie',
        },
        labels: [],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      },

      chartOptions2: {
        series: [
          {
            data: [],
          },
        ],
        chart: {
          type: 'line',
          height: 350,
        },
        stroke: {
          curve: 'stepline',
        },
        dataLabels: {
          enabled: false,
        },
        title: {
          text: 'Лінійний графік',
          align: 'left',
        },
        markers: {
          hover: {
            sizeOffset: 4,
          },
        },
      },
    };
  },
  methods: {
    async GetAllTimeInfo() {
      let uri = `/api/charts/pie/`;
      axios
        .get(uri, { headers: { userID: `${this.user._id}` } })
        .then((response) => {
          this.filteredData = response.data;
          if (this.filteredData.length > 0) {
            this.$refs.PieInfo.updateOptions({
              labels: this.filteredData.map((item) => item.name),
            });
            this.$refs.PieInfo.updateOptions({
              series: this.filteredData.map((item) => item.sum),
            });
          }
        });
    },
    async GetSelectedInfo() {
      let uri = `/api/charts/pie/${this.fromDate}/${this.toDate}`;
      console.log(this.fromDate, this.toDate);
      axios
        .get(uri, { headers: { userID: `${this.user._id}` } })
        .then((response) => {
          this.filteredData = response.data;
          if (this.filteredData.length > 0) {
            this.$refs.PieInfo.updateOptions({
              labels: this.filteredData.map((item) => item.name),
            });
            this.$refs.PieInfo.updateOptions({
              series: this.filteredData.map((item) => item.sum),
            });
          }
        });
    },
    getUserDetails() {
      let token = localStorage.getItem('jwt');
      let decoded = VueJwtDecode.decode(token);
      this.user._id = decoded._id;
      this.user.name = decoded.name;
    },
    UpdateCharts() {
      this.GetSelectedInfoLine();
      this.GetSelectedInfo();
    },
    async GetAllTimeInfoLine() {
      let uri = `/api/charts/line/`;
      axios
        .get(uri, { headers: { userID: `${this.user._id}` } })
        .then((response) => {
          this.filteredData = response.data;
          if (this.filteredData.length > 0) {
            this.$refs.LineInfo.updateOptions({
              series: [{ data: this.filteredData, name: 'Витрати' }],
            });
          }
        });
    },
    async GetSelectedInfoLine() {
      let uri = `/api/charts/line/${this.fromDate}/${this.toDate}`;
      axios
        .get(uri, { headers: { userID: `${this.user._id}` } })
        .then((response) => {
          this.filteredData = response.data;
          if (this.filteredData.length > 0) {
            this.$refs.LineInfo.updateOptions({
              series: [
                {
                  data: this.filteredData,
                  name: 'Витрати',
                },
              ],
            });
          }
        });
    },
  },
  async mounted() {
    await this.getUserDetails();
    await this.GetAllTimeInfo();
    await this.GetAllTimeInfoLine();
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
