<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useWeatherStore } from '@/stores/weatherStore'
import CustomLoader from '@/components/CustomLoader.vue'

type City = Array<{
  name: string
  slug: string
  temperature: string
  condition: string
}>

const store = useWeatherStore()
const searchQuery = ref('')

const searchCities = () => {
  if (searchQuery.value) store.fetchCities(searchQuery.value)
}

onMounted(() => {
  store.fetchCities()
})
</script>

<template>
  <custom-loader v-if="store.loading" msg="Cargando datos..." />

  <div class="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h1 class="text-2xl font-bold text-center">🌤️ Clima en Ciudades Populares</h1>

    <div class="flex gap-2 my-4">
      <input
        v-model="searchQuery"
        placeholder="Buscar ciudad..."
        class="flex-1 p-2 border rounded-lg"
        @keyup.enter="searchCities"
      />
      <button @click="searchCities" class="bg-blue-500 text-white px-4 py-2 rounded-lg">
        Buscar
      </button>
    </div>

    <div v-if="store.loading" class="text-center my-4">⏳ Cargando...</div>
    <div v-if="store.error" class="text-red-500">{{ store.error }}</div>

    <ul v-if="store.cities.length" class="space-y-2">
      <li
        v-for="city in store.cities as City"
        :key="city.name"
        class="bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200"
      >
        <router-link :to="{ name: 'city.detail', params: { slug: city.slug } }">
          <div class="text-lg font-semibold">{{ city.name }}</div>
          <div class="text-gray-700">{{ city.temperature }}°C - {{ city.condition }}</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
