<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-4">
    <h1 class="text-2xl font-bold mb-4">Bitcoin Price History</h1>
    <div class="w-full max-w-md space-y-4">
      <div class="flex flex-col space-y-2">
        <label class="text-sm font-medium">Select Period:</label>
        <USelect
          v-model="selectedPeriod"
          :items="periodOptions"
          @change="fetchData"
          class="w-full"
        />
      </div>

      <div v-if="selectedPeriod === 'custom'" class="flex flex-col space-y-2">
        <label class="text-sm font-medium">Start Date:</label>
        <UInput
          v-model="startDate"
          type="date"
          :min="minDate"
          :max="maxDate"
          class="w-full"
        />

        <label class="text-sm font-medium">End Date:</label>
        <UInput
          v-model="endDate"
          type="date"
          :min="minDate"
          :max="maxDate"
          class="w-full"
        />

        <UButton
          :disabled="!(startDate && endDate)"
          @click="fetchData"
          class="w-full justify-center"
        >
          Apply
        </UButton>
      </div>
    </div>

    <div v-if="chartData?.labels?.length > 0">
      <BarChart
        :key="chartData?.labels"
        v-model="chartData"
        :chart-options="chartOptions"
      />
    </div>
    <div v-else>
      <p class="mt-4">No data available.</p>
    </div>
  </div>
</template>

<script setup>
import BarChart from "@/components/charts/BarChart.vue";
import { GET_ALL } from "@/constant/url";
import { ref } from "vue";

const minDate = "2020-01-01";
const maxDate = new Date().toISOString().split("T")[0];
const selectedPeriod = ref("day");
const startDate = ref(null);
const endDate = ref(null);
const chartData = reactive({
  labels: [],
  datasets: [
    {
      label: "Data One",
      backgroundColor: "#f87979",
      data: [],
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  scales: {
    x: {
      type: "category",
    },
    y: {
      beginAtZero: true,
    },
  },
});

const periodOptions = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
  { value: "custom", label: "Custom" },
];

const { data } = await useFetch(GET_ALL, {
  method: "GET",
  params: {
    start: new Date(new Date().setDate(new Date().getDate() - 1))
      .toISOString()
      .split("T")[0],
    end: maxDate,
  },
});

if (data?.value) {
  chartData.labels = data.value.prices.map((p) => p.date);
  chartData.datasets[0].data = data.value.prices.map((p) => p.price);
}

const fetchData = async () => {
  let start, end;
  const now = new Date();

  end = new Date().toISOString().split("T")[0];
  switch (selectedPeriod.value) {
    case "day":
      start = new Date(now.setDate(now.getDate() - 1))
        .toISOString()
        .split("T")[0];
      break;
    case "week":
      start = new Date(now.setDate(now.getDate() - 7))
        .toISOString()
        .split("T")[0];
      break;
    case "month":
      start = new Date(now.setMonth(now.getMonth() - 1))
        .toISOString()
        .split("T")[0];
      break;
    case "year":
      start = new Date(now.setFullYear(now.getFullYear() - 1))
        .toISOString()
        .split("T")[0];
      break;
    case "custom":
      start = startDate.value;
      end = endDate.value;
      break;
  }

  try {
    const data = await $fetch(GET_ALL, {
      method: "GET",
      params: {
        start: start,
        end: end,
      },
    });

    if (data.prices) {
      chartData.labels = data.prices.map((p) => p.date);
      chartData.datasets[0].data = data.prices.map((p) => p.price);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return error;
  }
};
</script>
