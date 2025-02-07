import { defineStore } from 'pinia'
import axios from 'axios'

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    cities: [],
    loading: false,
    error: '',
  }),

  actions: {
    async fetchCities(query: string = '') {
      this.loading = true
      this.error = ''

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/cities?q=${query}`)
        this.cities = response.data
      } catch (err) {
        if (err.response?.status === 404) {
          this.error = 'No se encontraron ciudades con ese nombre.'
        } else {
          this.error = 'Hubo un error al obtener los datos. Inténtalo más tarde.'
        }
      } finally {
        this.loading = false
      }
    },
  },
})
