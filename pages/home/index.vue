<template>
  <div style="position: relative">
    <div class="home-header">
      <the-item-number :number="totalAcc" text="Total Account"
        ><v-btn
          style="color: #28c86f"
          color="rgba(40,199,111,.12)"
          icon="mdi-account"
        ></v-btn
      ></the-item-number>
      <the-item-number :number="totalBook" text="Total Book"
        ><v-btn
          style="color: #ff9f43"
          color="rgba(249,110,111,.12)"
          icon="mdi-book"
        ></v-btn
      ></the-item-number>
      <the-item-number :number="totalCart" text="Total Cart"
        ><v-btn
          style="color: #00cfe8"
          color="rgba(0,207,232,.12)"
          icon="mdi-cart"
        ></v-btn
      ></the-item-number>
      <the-item-number :number="totalOrder" text="Total Order"
        ><v-btn
          style="color: #c84e53"
          color="rgba(234,84,85,.12)"
          icon="mdi-zip-box"
        ></v-btn
      ></the-item-number>
    </div>
    <div class="home-center">
      <div v-show="isLoading" class="loading">
        <v-progress-circular
          color="#8ea0af"
          indeterminate
          :size="128"
          :width="12"
        ></v-progress-circular>
        <p>Loading... Please wait in few seconds</p>
      </div>
      <div style="margin-top: 20px">
        <h3>Order per month</h3>
        <line-chart :data="data" :options="options"></line-chart>
      </div>
      <div class="home-bottom" style="margin-top: 20px">
        <div>
          <h3>Rate of category sold</h3>
          <pie-chart :data="data1" :options="options"></pie-chart>
        </div>
        <div>
          <h3>Top 5 best selling products</h3>
          <div class="table">
            <table>
              <thead>
                <tr>
                  <th class="name">Name</th>
                  <th>Price</th>
                  <th>Sold</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  @click="(detailBook = item), (showDetailBook = true)"
                  v-for="item in bookList"
                  :key="item.id"
                  class="cart-item"
                >
                  <td class="name">{{ item.name }}</td>
                  <td>${{ item.price }}</td>
                  <td>{{ item.sold }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <the-detail
      v-if="showDetailBook"
      text="Add"
      bgc="rgb(40, 200, 111)"
      :hideFooter="true"
      @closeDetail="showDetailBook = false"
    >
      <div>
        <h3>Book detail</h3>
        <div class="product-detail-center">
          <div>
            <img :src="detailBook.urlImage" alt="" />
          </div>
          <div style="flex-grow: 1">
            <div>
              <v-text-field
                readonly
                style="width: 30%"
                v-model="detailBook.name"
                class="mb-1"
                density="compact"
                label="Name"
                variant="outlined"
              ></v-text-field>
              <v-text-field
                readonly
                v-model="detailBook.author"
                class="mb-1"
                density="compact"
                label="Author"
                variant="outlined"
              ></v-text-field>
              <v-text-field
                readonly
                class="mb-1"
                v-model="detailBook.type"
                density="compact"
                label="Category"
                variant="outlined"
              ></v-text-field>
            </div>
            <div>
              <v-text-field
                readonly
                class="mb-1"
                label="Url image"
                v-model="detailBook.urlImage"
                density="compact"
                variant="outlined"
              ></v-text-field>
            </div>
            <div>
              <v-textarea
                readonly
                no-resize
                density="compact"
                label="Label"
                variant="outlined"
                v-model="detailBook.description"
              ></v-textarea>
            </div>
            <div>
              <v-text-field
                readonly
                class="mb-1"
                v-model="detailBook.price"
                density="compact"
                label="Price"
                variant="outlined"
                prefix="$"
              ></v-text-field>
              <v-text-field
                readonly
                class="mb-1"
                v-model="detailBook.published"
                density="compact"
                label="Published"
                variant="outlined"
              ></v-text-field>
              <v-text-field
                readonly
                class="mb-1"
                density="compact"
                label="Sold"
                v-model="detailBook.sold"
                variant="outlined"
              ></v-text-field>
              <v-text-field
                readonly
                class="mb-1"
                density="compact"
                label="Quantity"
                v-model="detailBook.quantity"
                variant="outlined"
              ></v-text-field>
            </div>
          </div>
        </div>
      </div>
    </the-detail>
  </div>
</template>

<script>
definePageMeta({
  layout: "admin",
});
export default {
  data() {
    return {
      showDetailBook: false,
      detailBook: {},
      totalAcc: 0,
      totalOrder: 0,
      totalBook: 0,
      totalCart: 0,
      bookList: [],
      isLoading: true,
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Order per month",
            backgroundColor: "rgb(234, 84, 85)",
            borderColor: "rgb(40, 199, 111)",
            tension: 0.5,
          },
        ],
      },
      data1: {
        labels: [],
        datasets: [
          {
            backgroundColor: [
              "#41B883",
              "#E46651",
              "#00D8FF",
              "#DD1B16",
              "#ff9f43",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  created() {
    if (process.client) {
      if (!localStorage.getItem("adminId")) {
        this.$router.push("/");
        return;
      }
    }
    this.isLoading = true;
    this.getDataLine();
    this.getDataPie();
    this.getTable();
    common.getTotalPage("get", api.getUser()).then((response) => {
      this.totalAcc = response;
    });
    common.getTotalPage("get", api.getOrder()).then((response) => {
      this.totalOrder = response;
    });
    common.getTotalPage("get", api.getApi()).then((response) => {
      this.totalBook = response;
    });
    common.getTotalPage("get", api.getCart()).then((response) => {
      this.totalCart = response;
    });
    this.isLoading = false;
  },
  methods: {
    async getDataLine() {
      const getData = [];
      for (var i = 1; i <= 12; i++) {
        const get = await common.getTotalPage(
          "get",
          api.getOrder() + api.getOrderByDate(i)
        );
        getData.push(get);
      }
      this.data.datasets[0].data = [...getData];
    },

    async getDataPie() {
      const total = [];
      var getCategory = [];
      const getData = await common.method("get", api.getCategory());
      getData.forEach((el) => {
        this.data1.labels.push(el.type);
        getCategory.push(el.type);
      });
      for (var i = 0; i < getCategory.length; i++) {
        var count = 0;
        const get = await common.method(
          "get",
          api.getWarehouse() + `?type=${getCategory[i]}`
        );
        get.forEach((element) => {
          count += element.sold;
        });
        total.push(count);
      }
      this.data1.datasets[0].data = [...total];
    },

    async getTable() {
      const getData = await common.method(
        "get",
        api.getWarehouse() + "?&_limit=5" + api.getSort("sold", "desc")
      );
      for (let index = 0; index < getData.length; index++) {
        const element = getData[index];
        const getBook = await common.method(
          "get",
          api.getApi() + `/${element.id}`
        );
        getBook.sold = element.sold;
        getBook.quantity = element.quantity;
        this.bookList.push(getBook);
      }
    },
  },
};
</script>

<style>
.home-header {
  display: flex;
  gap: 24px;
}

h3 {
  margin-bottom: 4px;
}

.home-header > div {
  width: calc(100% / 3 - 24px * 2 / 3);
}

.home-bottom {
  display: flex;
  gap: 20px;
  height: 400px;
}

.home-bottom > div:first-child {
  width: 60%;
}

.home-bottom > div:last-child {
  flex: 1;
}

.home-bottom .table {
  padding: 20px;
  color: #97a2d2;
  border: 1px solid #353570;
  border-radius: 6px;
  background: #1d1d42;
  height: 342px;
}

table {
  width: 100%;
  text-align: center;
  border-collapse: separate;
  border-spacing: 0;
}

thead th {
  background-color: #141432;
  font-size: 16px;
  color: #8ea0af;
  padding: 10px 20px;
  z-index: 1;
}

tbody td {
  border-bottom: 1px solid #353570;
  padding: 14px 20px;
  font-size: 16px;
  cursor: pointer;
}

.check-box {
  font-size: 11px;
  width: 20px;
  height: 20px;
  border: 1px solid;
  border-radius: 4px;
  margin-left: 12px;
  cursor: pointer;
}

.check-box i {
  display: none;
}

input[type="checkbox"]:checked ~ div {
  background-color: #03dac6;
}

input[type="checkbox"]:checked ~ div i {
  display: block;
  color: #fff;
}

.name {
  text-align: start;
  max-width: 160px;
  width: 160px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>