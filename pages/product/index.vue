<template>
  <div style="position: relative">
    <div class="product-header">
      <h2>Products</h2>
      <div>
        <v-btn
          @click="showCategoryChange = true"
          color="#ff9f43"
          class="text-white mr-4"
        >
          Manage category
        </v-btn>
        <v-btn
          @click="showCategory = true"
          color="#ff9f43"
          class="text-white mr-4"
        >
          Add new category
        </v-btn>
        <v-btn @click="showNewItem = true" color="#ff9f43" class="text-white">
          Add new product
        </v-btn>
      </div>
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
                (text = `${selectList.length} items`)
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
            label="Search by name"
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
        <v-select
          density="compact"
          :items="categoryFilter"
          v-model="category"
          label="Category:"
          variant="solo"
          hide-details
        ></v-select>
        <v-select
          density="compact"
          :items="priceFilter"
          v-model="price"
          label="Price:"
          variant="solo"
          hide-details
        ></v-select>
        <v-select
          density="compact"
          :items="soldFilter"
          v-model="sold"
          label="Sold:"
          variant="solo"
          hide-details
        ></v-select>
        <v-select
          density="compact"
          :items="quantityFilter"
          v-model="quantity"
          label="Quantity:"
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
            <th class="name">Name</th>
            <th style="text-align: start">Type</th>
            <th>
              Price
              <v-icon
                @click="setSort('price')"
                style="cursor: pointer"
                :icon="
                  sortType == 'price' && sortOrder
                    ? sortOrder == 'asc'
                      ? 'mdi-chevron-up'
                      : 'mdi-chevron-down'
                    : 'mdi-unfold-more-horizontal'
                "
              ></v-icon>
            </th>
            <th>
              Sold
              <v-icon
                @click="setSort('sold')"
                style="cursor: pointer"
                :icon="
                  sortType == 'sold' && sortOrder
                    ? sortOrder == 'asc'
                      ? 'mdi-chevron-up'
                      : 'mdi-chevron-down'
                    : 'mdi-unfold-more-horizontal'
                "
              ></v-icon>
            </th>
            <th>
              Quantity
              <v-icon
                @click="setSort('quantity')"
                style="cursor: pointer"
                :icon="
                  sortType == 'quantity' && sortOrder
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
              <td class="name">{{ item.name }}</td>
              <td style="text-align: start; text-transform: capitalize">
                {{ item.type }}
              </td>
              <td>${{ item.price }}</td>
              <td>{{ item.sold }}</td>
              <td>{{ item.quantity }}</td>
              <td>
                <v-icon
                  @click.stop="
                    (showDelete = true),
                      (deleteItem = item),
                      (text = `The book: '${item.name}'`)
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
      <p style="margin: 12px 0">
        {{ text }}
        will be deleted from the list
      </p>
    </the-detail>

    <the-detail
      confirm="true"
      text="Add"
      bgc="rgb(40, 200, 111)"
      :isValid="isValid"
      :isChanged="isChanged"
      :success="isSuccess"
      v-if="showCategory"
      @submit="addNewCategory"
      @closeDetail="showCategory = false"
    >
      <h3>Add new category</h3>
      <h5 class="mb-2">Category list:</h5>
      <v-chip
        v-for="item in detailCategoryList"
        :key="item"
        class="mr-2 mb-2"
        color="green"
        text-color="white"
      >
        {{ item }}
      </v-chip>
      <v-text-field
        v-model="categoryToAdd"
        :rules="[rules.required]"
        class="mb-1"
        density="compact"
        label="Category"
        ref="categoryToAdd"
        variant="outlined"
      ></v-text-field>
    </the-detail>

    <the-detail
      confirm="true"
      text="Save"
      bgc="rgb(40, 200, 111)"
      :isValid="isValid"
      :isChanged="isChanged"
      :success="isSuccess"
      v-if="showCategoryChange"
      @submit="changeCategory"
      @closeDetail="showCategoryChange = false"
    >
      <h3>Manage category</h3>
      <h5 class="mb-2">Category list:</h5>
      <v-chip
        style="cursor: pointer"
        v-for="item in categoryToChangeList"
        :key="item"
        class="mr-2 mb-2"
        color="green"
        text-color="white"
        @click="categoryToChange = item"
      >
        {{ item.type }}
        <v-icon
          @click="
            (showDelete = true),
              (categoryToDelete = item),
              (text = `Category: '${item.type}'`)
          "
          end
          color="#EA5455"
          icon="mdi-close-circle-outline"
        ></v-icon>
      </v-chip>
      <v-text-field
        v-model="categoryToChange.type"
        :rules="[rules.required]"
        class="mb-1"
        density="compact"
        label="Category"
        ref="categoryToChange"
        variant="outlined"
      ></v-text-field>
    </the-detail>

    <the-detail
      v-if="showDetail"
      text="Add"
      bgc="rgb(40, 200, 111)"
      :isValid="isValid"
      :isChanged="isChanged"
      :success="isSuccess"
      @submit="submit"
      @closeDetail="showDetail = false"
    >
      <div>
        <h3>Book detail</h3>
        <div class="product-detail-center">
          <div>
            <img :src="detailItem.urlImage" alt="" />
          </div>
          <div style="flex-grow: 1">
            <div>
              <v-text-field
                style="width: 30%"
                v-model="detailItem.name"
                :rules="[rules.min, rules.required]"
                class="mb-1"
                density="compact"
                label="Name"
                ref="name"
                variant="outlined"
              ></v-text-field>
              <v-text-field
                v-model="detailItem.author"
                :rules="[rules.min, rules.required]"
                class="mb-1"
                density="compact"
                label="Author"
                ref="author"
                variant="outlined"
              ></v-text-field>
              <v-select
                class="mb-1"
                v-model="detailItem.type"
                density="compact"
                :items="detailCategoryList"
                label="Category"
                variant="solo"
              ></v-select>
            </div>
            <div>
              <v-file-input
                density="compact"
                label="Image"
                variant="solo"
                clearable
                v-model="urlImage"
              ></v-file-input>
              <v-text-field
                class="mb-1"
                label="Url image"
                v-model="detailItem.urlImage"
                ref="urlImage"
                :rules="[rules.required]"
                density="compact"
                variant="outlined"
                readonly
              ></v-text-field>
            </div>
            <div>
              <v-textarea
                clearable
                no-resize
                density="compact"
                label="Label"
                variant="outlined"
                v-model="detailItem.description"
                ref="description"
                :rules="[rules.min, rules.required]"
              ></v-textarea>
            </div>
            <div>
              <v-text-field
                class="mb-1"
                v-model="detailItem.price"
                ref="price"
                :rules="[rules.numberMatch]"
                density="compact"
                label="Price"
                variant="outlined"
                prefix="$"
              ></v-text-field>
              <v-text-field
                class="mb-1"
                v-model="detailItem.published"
                ref="published"
                :rules="[rules.numberMatch, rules.validYear]"
                density="compact"
                label="Published"
                variant="outlined"
              ></v-text-field>
              <v-text-field
                class="mb-1"
                density="compact"
                label="Sold"
                v-model="detailItem.sold"
                readonly
                variant="outlined"
              ></v-text-field>
              <v-text-field
                class="mb-1"
                density="compact"
                label="Quantity"
                v-model="detailItem.quantity"
                ref="quantity"
                :rules="[rules.numberMatch]"
                variant="outlined"
              ></v-text-field>
            </div>
          </div>
        </div>
      </div>
    </the-detail>

    <the-detail
      text="Add"
      bgc="rgb(40, 200, 111)"
      v-if="showNewItem"
      :isValid="isValid"
      :isChanged="isChanged"
      :success="isSuccess"
      @submit="submit"
      @closeDetail="(showNewItem = false), (newItem.urlImage = '')"
    >
      <div>
        <h3>Add new book</h3>
        <div class="product-detail-center">
          <div>
            <img :src="newItem.urlImage" alt="" />
            <div v-show="!newItem.urlImage"><i>Empty picture</i></div>
          </div>
          <div style="flex-grow: 1">
            <div>
              <v-text-field
                style="width: 30%"
                v-model="newItem.name"
                :rules="[rules.min, rules.required]"
                class="mb-1"
                density="compact"
                label="Name"
                ref="name"
                variant="outlined"
              ></v-text-field>
              <v-text-field
                v-model="newItem.author"
                :rules="[rules.min, rules.required]"
                class="mb-1"
                density="compact"
                label="Author"
                ref="author"
                variant="outlined"
              ></v-text-field>
              <v-select
                class="mb-1"
                v-model="newItem.type"
                density="compact"
                :items="detailCategoryList"
                label="Category"
                variant="solo"
              ></v-select>
            </div>
            <div>
              <v-file-input
                density="compact"
                label="Image"
                v-model="urlImage"
                clearable
                variant="solo"
              ></v-file-input>
              <v-text-field
                class="mb-1"
                v-model="newItem.urlImage"
                ref="urlImage"
                readonly
                :rules="[rules.required]"
                density="compact"
                label="Url Image"
                variant="outlined"
              ></v-text-field>
            </div>
            <div>
              <v-textarea
                clearable
                no-resize
                density="compact"
                label="Label"
                variant="outlined"
                v-model="newItem.description"
                ref="description"
                :rules="[rules.min, rules.required]"
              ></v-textarea>
            </div>
            <div>
              <v-text-field
                class="mb-1"
                v-model="newItem.price"
                ref="price"
                :rules="[rules.numberMatch]"
                density="compact"
                label="Price"
                variant="outlined"
                prefix="$"
              ></v-text-field>
              <v-text-field
                class="mb-1"
                v-model="newItem.published"
                ref="published"
                :rules="[rules.numberMatch, rules.validYear]"
                density="compact"
                label="Published"
                variant="outlined"
              ></v-text-field>
              <v-text-field
                class="mb-1"
                density="compact"
                label="Sold"
                v-model="newItem.sold"
                readonly
                variant="outlined"
              ></v-text-field>
              <v-text-field
                class="mb-1"
                density="compact"
                label="Quantity"
                v-model="newItem.quantity"
                ref="quantity"
                :rules="[rules.numberMatch]"
                variant="outlined"
              ></v-text-field>
            </div>
          </div>
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
      urlImage: "",
      deleteItem: "",
      showDelete: false,
      showCategory: false,
      showCategoryChange: false,
      curentPage: 1,
      perPage: 10,
      productList: [],
      showFilter: false,
      category: "default",
      categoryToAdd: "",
      categoryToChange: "",
      categoryToDelete: "",
      categoryToChangeList: [],
      categoryFilter: [],
      detailCategoryList: [],
      rules: {
        required: (value) => !!value || "Required.",
        min: (value) => value.length >= 8 || "Min 8 characters",
        numberMatch: (value) => {
          const pattern = /^\d+(\.\d+)?$/;
          return pattern.test(value) || "Invalid number";
        },
        validYear: (value) => {
          const currentYear = new Date().getFullYear();
          return value <= currentYear || "Invalid year";
        },
      },
      price: "",
      priceFilter: [
        { value: "", title: "default" },
        {
          value: "0-9",
          title: "less than $10",
        },
        {
          value: "10-20",
          title: "from $10 to $20",
        },
        {
          value: "20-50",
          title: "from $20 to $50",
        },
        {
          value: "51-1200",
          title: "more than $50",
        },
      ],
      sold: "",
      soldFilter: [
        { value: "", title: "default" },
        { value: "0-19", title: "less than 20 items" },
        { value: "20-50", title: "from 20 to 50 items" },
        { value: "51-1200", title: "more than 50 items" },
      ],
      quantity: "",
      quantityFilter: [
        { value: "", title: "default" },
        { value: "0-49", title: "less than 50 items" },
        { value: "50-100", title: "from 50 to 100 items" },
        { value: "101-1200", title: "more than 100 items" },
      ],
      filter: {
        category: "",
        price: "",
        sold: "",
        quantity: "",
      },
      isLoading: true,
      selectList: [],
      validateField: {
        name: "",
        author: "",
        description: "",
        urlImage: "",
        price: "",
        published: "",
        quantity: "",
      },
      isValid: false,
      isSuccess: false,
      isChanged: false,
      showDetail: false,
      showNewItem: false,
      selectAll: false,
      detailItem: {},
      newItem: {
        id: "",
        name: "",
        author: "",
        published: "",
        price: "",
        type: "action",
        urlImage: "",
        description: "",
        sold: 0,
        quantity: "",
      },
      totalRecord: 1,
      totalPage: 1,
      sortType: "",
      sortOrder: "",
      text: "",
    };
  },
  watch: {
    urlImage() {
      if (this.urlImage.length) {
        if (this.showDetail) {
          this.detailItem.urlImage = URL.createObjectURL(this.urlImage[0]);
        } else {
          this.newItem.urlImage = URL.createObjectURL(this.urlImage[0]);
        }
      } else {
        this.newItem.urlImage = "";
        this.detailItem.urlImage = "";
      }
    },

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

    showNewItem() {
      this.urlImage = "";
      if (!this.showNewItem) {
        this.urlImage = "";
        this.newItem = {
          id: "",
          name: "",
          author: "",
          published: "",
          price: "",
          type: "action",
          urlImage: "",
          description: "",
          sold: 0,
          quantity: "",
        };
      }
    },

    showCategoryChange() {
      this.categoryToChange = "";
      this.categoryToDelete = "";
    },

    showCategory() {
      this.categoryToAdd = "";
    },

    perPage() {
      this.curentPage = 1;
    },
  },
  computed: {
    urlApiToTal() {
      var urlApi =
        api.getWarehouse() +
        api.getBook(
          this.filter.category == "default" ? "" : this.filter.category,
          "",
          ""
        ) +
        `&name_like=${this.searchTextFilter}`;
      if (this.filter.price) {
        urlApi = urlApi + api.getSearchPrice("price", this.filter.price);
      }
      if (this.filter.sold) {
        urlApi = urlApi + api.getSearchPrice("sold", this.filter.sold);
      }
      if (this.filter.quantity) {
        urlApi = urlApi + api.getSearchPrice("quantity", this.filter.quantity);
      }
      return urlApi;
    },
    urlApi() {
      var urlApi =
        api.getWarehouse() +
        api.getBook(
          this.filter.category == "default" ? "" : this.filter.category,
          this.curentPage,
          this.perPage
        ) +
        `&name_like=${this.searchTextFilter}`;
      if (this.filter.price) {
        urlApi = urlApi + api.getSearchPrice("price", this.filter.price);
      }
      if (this.filter.sold) {
        urlApi = urlApi + api.getSearchPrice("sold", this.filter.sold);
      }
      if (this.filter.quantity) {
        urlApi = urlApi + api.getSearchPrice("quantity", this.filter.quantity);
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
      (this.urlImage = ""), (this.category = "default");
      this.price = "";
      this.sold = "";
      (this.filter = {
        category: "",
        price: "",
        sold: "",
        quantity: "",
      }),
        (this.quantity = ""),
        (this.curentPage = 1);
      this.productList = await common.method(
        "get",
        api.getWarehouse() +
          api.getBook("", this.curentPage, this.perPage) +
          api.getSort("modifiedDate", "desc")
      );
      this.totalRecord = await common.getTotalPage(
        "get",
        api.getWarehouse() + api.getBook("", "", "")
      );
      this.totalPage = Math.ceil(this.totalRecord / this.perPage);
    },

    async getCategory() {
      this.categoryFilter = [];
      const get = await common.method("get", api.getCategory());
      this.categoryToChangeList = get;
      get.forEach((el) => {
        this.categoryFilter.push(el.type);
      });
      this.detailCategoryList = [...this.categoryFilter];
      this.categoryFilter.unshift("default");
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
      this.filter.price = this.price;
      this.filter.category = this.category;
      this.filter.sold = this.sold;
      this.filter.quantity = this.quantity;
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

    async submit() {
      this.isValid = true;
      for (const f of Object.keys(this.validateField)) {
        const result = await this.$refs[f].validate(true);
        if (result.length) {
          this.isValid = false;
        }
      }
      if (this.isValid) {
        this.isSuccess = false;
        if (this.showDetail) {
          this.detailItem.price = parseFloat(this.detailItem.price);
          this.detailItem.quantity = parseInt(this.detailItem.quantity);
          if (this.urlImage) {
            this.detailItem.urlImage = await common.uploadImage(
              this.urlImage[0]
            );
          }
          this.detailItem.modifiedDate = common.getDate();
          const update = await common.method(
            "put",
            api.getWarehouse() + `/${this.detailItem.id}`,
            this.detailItem
          );
          if (update) {
            this.isSuccess = true;
            setTimeout(() => {
              this.showDetail = false;
              this.getData();
            }, 1000);
          }
        }
        if (this.showNewItem) {
          this.newItem.id = common.uuidv4();
          this.newItem.price = parseFloat(this.newItem.price);
          this.newItem.quantity = parseInt(this.newItem.quantity);
          this.newItem.urlImage = await common.uploadImage(this.urlImage[0]);
          this.newItem.modifiedDate = common.getDate();
          var add = await common.method(
            "post",
            api.getWarehouse(),
            this.newItem
          );
          delete this.newItem.sold;
          delete this.newItem.quantity;
          add = await common.method("post", api.getApi(), this.newItem);
          if (add) {
            this.isSuccess = true;
            setTimeout(() => {
              this.showNewItem = false;
              this.getData();
            }, 1000);
          }
        }
        this.isChanged = !this.isChanged;
      }
    },

    async confirmDelete() {
      var update;
      if (this.categoryToDelete) {
        update = await common.method(
          "delete",
          api.getCategory() + `/${this.categoryToDelete.id}`
        );
      }
      if (this.deleteItem) {
        update = await common.method(
          "delete",
          api.getApi() + `/${this.deleteItem.id}`
        );
        update = await common.method(
          "delete",
          api.getWarehouse() + `/${this.deleteItem.id}`
        );
      } else {
        for (var i = 0; i < this.selectList.length; i++) {
          update = await common.method(
            "delete",
            api.getApi() + `/${this.selectList[i]}`
          );
          update = await common.method(
            "delete",
            api.getWarehouse() + `/${this.selectList[i]}`
          );
        }
      }
      if (update) {
        this.isValid = true;
        this.isSuccess = true;
        this.isChanged = !this.isChanged;
        setTimeout(() => {
          this.getData();
          this.getCategory();
        }, 1000);
      }
    },

    async addNewCategory() {
      const result = await this.$refs.categoryToAdd.validate(true);
      if (!result.length) {
        const update = await common.method("post", api.getCategory(), {
          id: common.uuidv4(),
          type: this.categoryToAdd,
        });
        if (update) {
          this.isValid = true;
          this.isSuccess = true;
          this.isChanged = !this.isChanged;
          setTimeout(() => {
            this.showCategory = false;
            this.getData();
            this.getCategory();
          }, 1000);
        }
      }
    },

    async changeCategory() {
      const result = await this.$refs.categoryToChange.validate(true);
      if (!result.length) {
        const update = await common.method(
          "put",
          api.getCategory() + `/${this.categoryToChange.id}`,
          this.categoryToChange
        );
        if (update) {
          this.isValid = true;
          this.isSuccess = true;
          this.isChanged = !this.isChanged;
          setTimeout(() => {
            this.showCategoryChange = false;
            this.getData();
            this.getCategory();
          }, 1000);
        }
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
    this.getCategory();
  },
};
</script>

<style scoped>
.product-header {
  display: flex;
  justify-content: space-between;
}

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
  width: 250px;
  max-width: 250px;
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
</style>