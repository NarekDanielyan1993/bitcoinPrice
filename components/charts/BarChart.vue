<template>
  <Bar width="800" :data="toRaw(chartData)" :options="chartOptions" />
</template>

<script setup>
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { toRaw } from "vue";
import { Bar } from "vue-chartjs";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const chartData = defineModel();

const props = defineProps({
  chartOptions: {
    type: Object,
    default: () => ({
      responsive: true,
    }),
  },
});
</script>
