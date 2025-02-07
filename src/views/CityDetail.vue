<script lang="ts" setup>
import { format, parse } from 'date-fns'
import { es } from 'date-fns/locale'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

type Forecast = {
  city_name: string
  daily_weather: Array<{
    date: string
    temp_min: string
    temp_max: string
    condition: string
  }>
}

const route = useRoute()
const forecast = ref<Forecast>()
const loading = ref(true)

const fetchForecast = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/weather?city=${route.params.slug}`,
    )
    forecast.value = response.data
  } catch (error) {
    console.error('Error fetching the forecast', error)
  } finally {
    loading.value = false
  }
}

const friendlyDate = (date: string) => {
  return format(parse(date, 'yyyy-MM-dd', new Date()), 'PPPP', { locale: es })
}

onMounted(fetchForecast)
</script>

<template>
  <div class="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h1 class="text-2xl font-bold text-center">📍 {{ forecast?.city_name }}</h1>

    <div v-if="loading" class="text-center my-4">⏳ Cargando...</div>

    <ul v-if="forecast" class="space-y-3 mt-4">
      <li
        v-for="(day, index) in forecast.daily_weather"
        :key="index"
        class="bg-blue-100 p-3 rounded-lg shadow"
      >
        <h2 class="font-semibold">{{ friendlyDate(day.date) }}</h2>

        <div>Min: {{ day.temp_min }}°C / Max: {{ day.temp_max }}°C</div>
        <div>{{ day.condition }}</div>
      </li>
    </ul>

    <router-link to="/" class="block mt-4 text-blue-500 text-center">⬅ Volver</router-link>
  </div>
</template>
