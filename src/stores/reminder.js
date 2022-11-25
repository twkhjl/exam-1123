import { onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useFetchData } from '@/helpers/fetchData'

export const useReminderStore = defineStore('reminder', () => {
  const API_ROOT_URL =
    import.meta.env.VITE_API_ROOT_URL + import.meta.env.VITE_API_REMINDER_URL

  const fetchData = useFetchData()

  onMounted(() => { })

  async function all() {
    const url = 'all'
    const result = await fetchData.getData(API_ROOT_URL + url)
    return result
  }

  // async function show(category_id) {
  //   const url = `show/${category_id}`
  //   const result = await fetchData.getData(API_ROOT_URL + url)
  //   return result
  // }

  async function store(data) {
    const url = 'store'
    const result = await fetchData.postData(API_ROOT_URL + url, data)
    return result
  }
  async function update(data) {
    const url = 'update'
    const result = await fetchData.postData(API_ROOT_URL + url, data)
    return result
  }

  async function destroy(data) {
    const url = 'destroy'
    const result = await fetchData.postData(API_ROOT_URL + url, data)
    return result
  }

  return {
    all,
    store,
    destroy,
    // show,
    update,
  }
})
