<template>
  <div style="position: relative">
    <div class="product-header">
      <h2>Users</h2>
    </div>
    <div class="product-center">
      <div class="product-table-header">
        <div class="pth-left">
          <v-btn
            @click="selectList = []"
            :disabled="selectList.length < 2"
            class="mr-4"
            >Uncheck All</v-btn
          >
          <v-btn
            :disabled="selectList.length < 2"
            class="text-white"
            @click="
              (showDelete = true),
                (deleteItem = ''),
                (text = `${selectList.length} users`)
            "
            color="#ea5455"
            >Delete All</v-btn
          >
        </div>
        <div class="pth-right">
          <v-text-field
            @input="searchByName"
            v-model="searchText"
            style="max-width: 400px"
            density="compact"
            variant="solo"
            label="Search by username"
            append-inner-icon="mdi-magnify"
            single-line
            hide-details
          ></v-text-field>
          <v-btn
            density="comfortable"
            class="ml-3"
            :style="showFilter ? 'color: #c84e53' : 'color: #ff9f43'"
            color="rgba(249,110,111,.12)"
            :icon="showFilter ? 'mdi-close' : 'mdi-filter'"
            @click="showFilter = !showFilter"
          ></v-btn>
          <v-btn
            density="comfortable"
            class="ml-3"
            style="color: #00cfe8"
            color="rgba(0,207,232,.12)"
            icon="mdi-reload"
            @click="getData"
          ></v-btn>
        </div>
      </div>
      <div class="filter" v-show="showFilter">
        <v-text-field
          density="compact"
          v-model="email"
          label="Email:"
          variant="outlined"
          hide-details
        ></v-text-field>
        <v-text-field
          density="compact"
          v-model="phoneNumber"
          label="Phone number:"
          variant="outlined"
          hide-details
        ></v-text-field>
        <v-text-field
          density="compact"
          v-model="address"
          label="Address:"
          variant="outlined"
          hide-details
        ></v-text-field>
        <v-select
          density="compact"
          :items="['pending', 'verified']"
          v-model="status"
          label="Status:"
          variant="solo"
          hide-details
        ></v-select>
        <v-btn
          @click="setFilter"
          density="comfortable"
          style="color: #28c86f"
          color="rgba(40,199,111,.12)"
          icon="mdi-magnify"
        ></v-btn>
      </div>
      <div
        :style="showFilter ? 'height: 284px' : ''"
        class="product-table-center"
      >
        <img
          style="width: 100%"
          v-show="!productList.length"
          src="https://cdni.iconscout.com/illustration/premium/thumb/search-result-not-found-2130355-1800920.png"
          alt=""
        />
        <table v-show="productList.length">
          <thead>
            <th style="text-align: center; width: 50px">
              <label style="text-align: center" for="item">
                <input
                  @change="selectAllClick"
                  v-model="selectAll"
                  hidden
                  type="checkbox"
                  id="item"
                />
                <div class="check-box">
                  <v-icon icon="mdi-check"></v-icon>
                </div>
              </label>
            </th>
            <th class="name">Username</th>
            <th style="text-align: start">Email</th>
            <th>Status</th>
            <th>
              Create
              <v-icon
                @click="setSort('createdAt')"
                style="cursor: pointer"
                :icon="
                  sortType == 'createdAt' && sortOrder
                    ? sortOrder == 'asc'
                      ? 'mdi-chevron-up'
                      : 'mdi-chevron-down'
                    : 'mdi-unfold-more-horizontal'
                "
              ></v-icon>
            </th>
            <th>
              Modified
              <v-icon
                @click="setSort('modifiedAt')"
                style="cursor: pointer"
                :icon="
                  sortType == 'modifiedAt' && sortOrder
                    ? sortOrder == 'asc'
                      ? 'mdi-chevron-up'
                      : 'mdi-chevron-down'
                    : 'mdi-unfold-more-horizontal'
                "
              ></v-icon>
            </th>
            <th>Delete</th>
          </thead>
          <tbody>
            <tr
              @click.stop="(showDetail = true), (detailItem = { ...item })"
              v-for="item in productList"
              :key="item.id"
            >
              <td>
                <label @click.stop="" style="text-align: center" :for="item.id">
                  <input
                    hidden
                    type="checkbox"
                    :id="item.id"
                    :value="item.id"
                    v-model="selectList"
                  />
                  <div class="check-box">
                    <v-icon icon="mdi-check"></v-icon>
                  </div>
                </label>
              </td>
              <td class="name">{{ item.username }}</td>
              <td style="text-align: start">
                {{ item.email }}
              </td>
              <td>{{ item.status }}</td>
              <td>{{ common.formatDate(item.createdAt) }}</td>
              <td>{{ common.formatDate(item.modifiedAt) }}</td>
              <td>
                <v-icon
                  @click.stop="
                    (showDelete = true),
                      (deleteItem = item),
                      (text = `User: ${item.username}`)
                  "
                  icon="mdi-delete"
                ></v-icon>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-show="productList.length" class="product-table-bottom">
        <div class="ptb-left">
          <p><b>Total record: </b>{{ totalRecord }}</p>
        </div>
        <div class="ptb-right">
          <p>Items per page:</p>
          <v-select
            density="compact"
            :items="['10', '20', '30', '40', '50']"
            variant="solo"
            v-model="perPage"
            single-line
            hide-details
          ></v-select>
          <v-pagination
            density="comfortable"
            v-model="curentPage"
            :length="totalPage"
            :total-visible="6"
          ></v-pagination>
        </div>
      </div>
    </div>

    <the-detail
      style="z-index: 3"
      confirm="true"
      text="Delete"
      bgc="#c84e53"
      :isValid="isValid"
      :isChanged="isChanged"
      :success="isSuccess"
      v-show="showDelete"
      @submit="confirmDelete"
      @closeDetail="showDelete = false"
    >
      <h1>Confirm delete</h1>
      <hr />
      <p style="margin: 12px 0">{{ text }} will be deleted from the list</p>
    </the-detail>

    <the-detail
      v-if="showDetail"
      text="Add"
      bgc="rgb(40, 200, 111)"
      :isValid="isValid"
      :isChanged="isChanged"
      :success="isSuccess"
      :hideFooter="true"
      @closeDetail="showDetail = false"
    >
      <div>
        <h3>User detail</h3>
        <div style="display: flex; gap: 20px">
          <v-text-field
            v-model="detailItem.username"
            class="mt-2"
            density="compact"
            label="Username"
            readonly
            hide-details
            variant="outlined"
          ></v-text-field>
          <v-text-field
            v-model="detailItem.email"
            class="mt-2"
            density="compact"
            label="Email"
            readonly
            hide-details
            variant="outlined"
          ></v-text-field>
        </div>
        <div style="display: flex; gap: 20px">
          <v-text-field
            v-model="detailItem.address"
            class="mt-4"
            density="compact"
            label="Address"
            readonly
            hide-details
            variant="outlined"
          ></v-text-field>
          <v-text-field
            v-model="detailItem.phonenumber"
            class="mt-4"
            density="compact"
            label="Phone number"
            readonly
            hide-details
            variant="outlined"
          ></v-text-field>
          <v-text-field
            v-model="detailItem.fullname"
            class="mt-4"
            density="compact"
            label="Full name"
            readonly
            hide-details
            variant="outlined"
          ></v-text-field>
        </div>
        <div style="display: flex; gap: 20px">
          <v-text-field
            v-model="detailItem.status"
            class="mt-4"
            density="compact"
            label="Status"
            readonly
            hide-details
            variant="outlined"
          ></v-text-field>
          <v-text-field
            :value="common.formatDate(detailItem.createdAt)"
            v-model="detailItem.createdAt"
            class="mt-4"
            density="compact"
            label="Create"
            readonly
            hide-details
            variant="outlined"
          ></v-text-field>
          <v-text-field
            :value="common.formatDate(detailItem.modifiedAt)"
            v-model="detailItem.modifiedAt"
            class="mt-4"
            density="compact"
            label="Create"
            readonly
            hide-details
            variant="outlined"
          ></v-text-field>
        </div>
      </div>
    </the-detail>

    <div v-show="isLoading" class="loading">
      <v-progress-circular
        color="#8ea0af"
        indeterminate
        :size="128"
        :width="12"
      ></v-progress-circular>
      <p>Loading... Please wait in few seconds</p>
    </div>
  </div>
</template>
  
  <script>
definePageMeta({
  layout: "admin",
});
export default {
  data() {
    return {
      searchText: "",
      searchTextFilter: "",
      deleteItem: "",
      curentPage: 1,
      perPage: 10,
      showFilter: false,
      showDelete: false,
      isLoading: true,
      selectList: [],
      productList: [],
      isValid: false,
      isSuccess: false,
      isChanged: false,
      showDetail: false,
      showDetailBook: false,
      email: "",
      phoneNumber: "",
      address: "",
      status: "pending",
      filter: {
        email: "",
        phoneNumber: "",
        address: "",
        status: "pending",
      },
      selectAll: false,
      detailItem: {},
      detailBook: {},
      totalRecord: 1,
      totalPage: 1,
      sortType: "",
      sortOrder: "",
      text: "",
      snackbar: false,
    };
  },
  watch: {
    selectList() {
      this.selectAll = true;
      this.productList.forEach((product) => {
        if (!this.selectList.includes(product.id)) {
          this.selectAll = false;
          return;
        }
      });
    },

    async urlApi() {
      this.productList = await common.method("get", this.urlApi);
      this.selectAll = true;
      this.productList.forEach((product) => {
        if (!this.selectList.includes(product.id)) {
          this.selectAll = false;
          return;
        }
      });
      this.totalRecord = await common.getTotalPage("get", this.urlApiToTal);
      this.totalPage = Math.ceil(this.totalRecord / this.perPage);
    },

    sortType(newValue, oldValue) {
      if (oldValue) {
        this.sortOrder = "asc";
      }
    },

    perPage() {
      this.curentPage = 1;
    },
  },
  computed: {
    urlApiToTal() {
      var urlApi = api.getUser() + `?status_like=${this.filter.status}`;
      if (this.filter.email) {
        urlApi = urlApi + `&email_like=${this.filter.email}`;
      }
      if (this.filter.phoneNumber) {
        urlApi = urlApi + `&phonenumber_like=${this.filter.phoneNumber}`;
      }
      if (this.filter.address) {
        urlApi = urlApi + `&address_like=${this.filter.address}`;
      }
      if (this.searchTextFilter) {
        urlApi = urlApi + `&username_like=${this.searchTextFilter}`;
      }
      return urlApi;
    },
    urlApi() {
      var urlApi =
        api.getUser() +
        `?_page=${this.curentPage}&_limit=${this.perPage}&status_like=${this.filter.status}`;
      if (this.filter.email) {
        urlApi = urlApi + `&email_like=${this.filter.email}`;
      }
      if (this.filter.phoneNumber) {
        urlApi = urlApi + `&phonenumber_like=${this.filter.phoneNumber}`;
      }
      if (this.filter.address) {
        urlApi = urlApi + `&address_like=${this.filter.address}`;
      }
      if (this.searchTextFilter) {
        urlApi = urlApi + `&username_like=${this.searchTextFilter}`;
      }
      if (this.sortOrder) {
        urlApi = urlApi + api.getSort(this.sortType, this.sortOrder);
      } else {
        urlApi = urlApi + api.getSort("modifiedDate", "desc");
      }
      return urlApi;
    },
  },
  methods: {
    async getData() {
      (this.sortOrder = ""), (this.selectList = []);
      this.curentPage = 1;
      this.searchText = "";
      this.searchTextFilter = "";
      this.status = "pending";
      (this.email = ""), (this.address = ""), (this.phoneNumber = "");
      this.productList = await common.method(
        "get",
        api.getUser() +
          `?_page=${this.curentPage}&_limit=${this.perPage}` +
          api.getSort("modifiedDate", "desc")
      );
      this.totalRecord = await common.getTotalPage("get", this.urlApiToTal);
      this.totalPage = Math.ceil(this.totalRecord / this.perPage);
      this.isLoading = false;
    },

    selectAllClick() {
      if (this.selectAll) {
        this.productList.forEach((el) => {
          if (!this.selectList.includes(el.id)) this.selectList.push(el.id);
        });
      } else {
        this.productList.forEach((el) => {
          this.selectList = this.selectList.filter(
            (element) => element != el.id
          );
        });
      }
    },

    setFilter() {
      this.filter.email = this.email;
      this.filter.address = this.address;
      this.filter.phoneNumber = this.phoneNumber;
      this.filter.status = this.status;
    },

    setSort(type) {
      this.sortType = type;
      if (this.sortOrder == "asc") {
        this.sortOrder = "desc";
        return;
      }
      if (this.sortOrder == "desc") {
        this.sortOrder = "";
        return;
      }

      if (!this.sortOrder) {
        this.sortOrder = "asc";
        return;
      }
    },

    async confirmDelete() {
      var update;
      if (this.deleteItem) {
        update = await common.method(
          "delete",
          api.getUser() + `/${this.deleteItem.id}`
        );
      } else {
        for (var i = 0; i < this.selectList.length; i++) {
          update = await common.method(
            "delete",
            api.getUser() + `/${this.selectList[i]}`
          );
        }
      }
      if (update) {
        this.isValid = true;
        this.isSuccess = true;
        this.isChanged = !this.isChanged;
        setTimeout(() => {
          this.getData();
        }, 1000);
      }
    },

    async searchByName() {
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(() => {
        this.searchTextFilter = this.searchText;
      }, 1000);
    },

    async update(status) {
      for (let index = 0; index < this.selectList.length; index++) {
        const element = this.selectList[index];
        const get = await common.method("get", api.getOrder() + `/${element}`);
        get.status = status;
        get.modifiedAt = common.getDate();
        const update = await common.method(
          "put",
          api.getOrder() + `/${element}`,
          get
        );
        if (update) {
          this.snackbar = true;
          this.getData();
        }
      }
    },

    async setDetailBook(id) {
      this.showDetailBook = true;
      this.detailBook = await common.method(
        "get",
        api.getWarehouse() + `/${id}`
      );
    },
  },
  created() {
    if (process.client) {
      if (!localStorage.getItem("adminId")) {
        this.$router.push("/");
        return;
      }
    }
    this.getData();
  },
};
</script>
  
  <style scoped>
.product-center {
  margin-top: 20px;
  padding: 20px;
  color: #97a2d2;
  border: 1px solid #353570;
  border-radius: 6px;
  background: #1d1d42;
}

.product-table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pth-right {
  width: 40%;
  display: flex;
  align-items: center;
}

.filter {
  display: flex;
  gap: 20px;
  margin-top: 10px;
  align-items: center;
}

/* table center */
.name {
  width: 150px;
  max-width: 150px;
}

.product-table-center {
  max-height: 334px;
  margin: 10px 0;
  overflow: auto;
}

thead th {
  position: sticky;
  top: 0;
}

/* table bottom */
.product-table-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ptb-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.order-detail-center {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.order-detail-center > div {
  width: calc(100% / 2 - 20px / 2);
}
</style>