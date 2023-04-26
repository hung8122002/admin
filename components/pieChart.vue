<template>
  <div class="pie">
    <Pie :data="data" :options="options" :key="chartKey" />
  </div>
</template>
  
  <script lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  props: ["data", "options"],
  name: "App",
  components: {
    Pie,
  },
  data() {
    return {
      chartKey: 0, // Khởi tạo key
    };
  },
  watch: {
    data: {
      handler() {
        this.chartKey++;
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.pie {
  padding: 20px;
  color: #97a2d2;
  border: 1px solid #353570;
  border-radius: 6px;
  background: #1d1d42;
}
</style>
  