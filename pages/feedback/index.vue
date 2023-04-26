<template>
  <div style="position: relative">
    <div class="product-header">
      <h2>Feedback</h2>
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
            label="Search by full name"
            append-inner-icon="mdi-magnify"
            single-line
            hide-details
          ></v-text-field>
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
      <div class="product-table-center">
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
            <th class="name">Full name</th>
            <th style="text-align: start">Feedback</th>
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
              <td class="name">{{ item.fullname }}</td>
              <td style="text-align: start">
                {{ item.message }}
              </td>
              <td>{{ common.formatDate(item.createdAt) }}</td>
              <td>
                <v-icon
                  @click.stop="
                    (showDelete = true),
                      (deleteItem = item),
                      (text = `Feedback of: ''${item.fullname}''`)
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
        <h3>Feedback detail</h3>
        <div style="display: flex; gap: 20px">
          <v-text-field
            v-model="detailItem.fullname"
            class="mt-2"
            density="compact"
            label="Fullname"
            readonly
            hide-details
            variant="outlined"
          ></v-text-field>
          <v-text-field
            :value="common.formatDate(detailItem.createdAt)"
            v-model="detailItem.createdAt"
            class="mt-2"
            density="compact"
            label="Create"
            readonly
            hide-details
            variant="outlined"
          ></v-text-field>
        </div>
        <v-text-field
          class="mt-3"
          label="Label"
          density="compact"
          hide-details
          readonly
          v-model="detailItem.message"
          variant="outlined"
        ></v-text-field>
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
      showDelete: false,
      isLoading: true,
      selectList: [],
      productList: [],
      isValid: false,
      isSuccess: false,
      isChanged: false,
      showDetail: false,
      selectAll: false,
      detailItem: {},
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
      var urlApi = api.getFeedBack();
      if (this.searchTextFilter) {
        urlApi = urlApi + `?fullname_like=${this.searchTextFilter}`;
      }
      return urlApi;
    },
    urlApi() {
      var urlApi =
        api.getFeedBack() + `?_page=${this.curentPage}&_limit=${this.perPage}`;
      if (this.searchTextFilter) {
        urlApi = urlApi + `&fullname_like=${this.searchTextFilter}`;
      }
      urlApi = urlApi + api.getSort("createdAt", "desc");
      return urlApi;
    },
  },
  methods: {
    async getData() {
      (this.sortOrder = ""), (this.selectList = []);
      this.curentPage = 1;
      this.searchText = "";
      this.searchTextFilter = "";
      this.productList = await common.method(
        "get",
        api.getFeedBack() +
          `?_page=${this.curentPage}&_limit=${this.perPage}` +
          api.getSort("createdAt", "desc")
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
          api.getFeedBack() + `/${this.deleteItem.id}`
        );
      } else {
        for (var i = 0; i < this.selectList.length; i++) {
          update = await common.method(
            "delete",
            api.getFeedBack() + `/${this.selectList[i]}`
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
  height: 334px;
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