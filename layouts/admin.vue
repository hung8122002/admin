<template>
  <div class="layout">
    <nav :class="{ collapse: navWidth != 200 }" :style="`width:${navWidth}px`">
      <div class="nav-top">
        <v-icon icon="mdi-menu"></v-icon> <span>Menu</span>
      </div>
      <div class="nav-center">
        <nuxt-link to="/home">
          <div class="nav-item">
            <v-icon icon="mdi-home"> </v-icon> <span>Home</span>
          </div>
        </nuxt-link>
        <nuxt-link to="/product">
          <div class="nav-item">
            <v-icon icon="mdi-cube-scan"> </v-icon><span>Product</span>
          </div>
        </nuxt-link>
        <nuxt-link to="/order">
          <div class="nav-item">
            <v-icon icon="mdi-currency-usd"> </v-icon><span>Order</span>
          </div>
        </nuxt-link>
        <nuxt-link to="/user">
          <div class="nav-item">
            <v-icon icon="mdi-account"> </v-icon> <span>User</span>
          </div>
        </nuxt-link>
        <nuxt-link to="/feedback">
          <div class="nav-item">
            <v-icon icon="mdi-comment-quote"> </v-icon> <span>Feedback</span>
          </div>
        </nuxt-link>
      </div>
      <div class="nav-bottom">
        <div @click="changeWidth" class="nav-item">
          <v-icon
            :icon="navWidth == 200 ? 'mdi-chevron-left' : 'mdi-chevron-right'"
          ></v-icon
          ><span>Collapse</span>
        </div>
      </div>
    </nav>
    <header :style="`width:calc(100% - ${navWidth}px)`">
      <div class="header-left">
        <div>
          <h1>flagshipbook</h1>
        </div>
      </div>
      <div class="header-right">
        <v-text-field
          style="max-width: 400px"
          density="compact"
          variant="solo"
          label="Search templates"
          append-inner-icon="mdi-magnify"
          single-line
          hide-details
        ></v-text-field>
        <div>
          <v-btn
            density="comfortable"
            class="ml-3"
            style="color: #67748e"
            color="#2c2c50"
            icon="mdi-web"
          ></v-btn>
          <v-btn
            density="comfortable"
            class="ml-3"
            style="color: #67748e"
            color="#2c2c50"
            icon="mdi-help"
          ></v-btn>
          <v-btn
            density="comfortable"
            class="ml-3"
            style="color: #67748e"
            color="#2c2c50"
            icon="mdi-bell"
          ></v-btn>
          <v-btn
            @click="logout"
            density="comfortable"
            class="ml-3"
            style="color: #67748e"
            color="#2c2c50"
            icon="mdi-logout-variant"
          ></v-btn>
        </div>
      </div>
    </header>
    <main>
      <slot></slot>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navWidth: 200,
    };
  },
  methods: {
    changeWidth() {
      if (this.navWidth == 200) {
        this.navWidth = 80;
      } else {
        this.navWidth = 200;
      }
    },

    logout() {
      localStorage.removeItem("adminId");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.layout {
  color: #8ea0af;
  background-color: #141432;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 100vh;
  overflow: hidden;
}

/* header */
.layout header {
  height: 60px;
  width: calc(100% - 200px);
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #8ea0af;
}

.header-left h1 {
  width: 300px;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 4px;
}

.header-right {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* main */
.layout main {
  flex: 1;
  padding: 24px;
  overflow: auto;
}

/* nav */
.layout nav {
  height: 100vh;
  text-align: center;
  padding: 20px;
  border-right: 1px solid #8ea0af;
  transition: all ease-in-out 0.05s;
  position: relative;
  padding-bottom: 0;
}

.collapse {
  padding: 20px 8px !important;
}

.nav-top {
  height: 40px;
  border-bottom: 1px solid #8ea0af;
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-top span {
  font-size: 18px;
  margin-left: 12px;
}

.nav-center {
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  height: calc(100% - 120px);
}

.nav-center a {
  margin: 4px 0;
}

.nav-item {
  padding: 10px 20px;
  text-align: start;
  border-radius: 8px;
  cursor: pointer;
  transition: all ease-in-out 0.3s;
}

.router-link-active {
  border-radius: 8px;
  color: #8ea0af;
  text-decoration: none;
}

.router-link-active,
.nav-item:hover {
  background-color: rgba(254, 159, 67, 0.08);
}

.nav-item i {
  margin-right: 12px;
}

.nav-bottom {
  margin-top: 20px;
  margin-bottom: 12px;
  padding-top: 12px;
  border-top: 1px solid #8ea0af;
}

.collapse span {
  display: none;
}
</style>