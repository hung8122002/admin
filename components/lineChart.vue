<template>
  <div class="line">
    <Line :data="data" :options="options" :key="chartKey" />
  </div>
</template>
  
  <script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default {
  props: ["data", "options"],
  components: {
    Line,
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
.line {
  padding: 20px;
  color: #97a2d2;
  border: 1px solid #353570;
  border-radius: 6px;
  background: #1d1d42;
}
</style>
  