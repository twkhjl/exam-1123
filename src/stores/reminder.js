import { onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useFetchData } from '@/helpers/fetchData'
import { useStorageStore } from './auth/user_storage'

export const useReminderStore = defineStore('reminder', () => {
  const API_ROOT_URL =
    import.meta.env.VITE_API_ROOT_URL + import.meta.env.VITE_API_REMINDER_URL

  const fetchData = useFetchData()

  const storage = useStorageStore()

  async function all(query_string_obj) {
    fetchData.setTokenToHeader(storage.getToken())

    let url = 'all'

    let query_string = '?'
    if (query_string_obj) {

      const entries = Object.entries(query_string_obj);

      for (let i = 0; i < entries.length; i++) {
        let [prop, value] = entries[i];

        if (i == entries.length - 1) {
          query_string += `${prop}=${value}`
        } else {
          query_string += `${prop}=${value}&`
        }
      }
      url += query_string
    }
    const result = await fetchData.getData(API_ROOT_URL + url)

    return result
  }

  // async function show(category_id) {
  //   const url = `show/${category_id}`
  //   const result = await fetchData.getData(API_ROOT_URL + url)
  //   return result
  // }

  async function store(data) {
    fetchData.setTokenToHeader(storage.getToken())

    const url = 'store'
    const result = await fetchData.postData(API_ROOT_URL + url, data)
    return result
  }
  async function update(data) {
    fetchData.setTokenToHeader(storage.getToken())

    const url = 'update'
    const result = await fetchData.postData(API_ROOT_URL + url, data)
    return result
  }

  async function destroy(data) {
    fetchData.setTokenToHeader(storage.getToken())

    const url = 'destroy'
    const result = await fetchData.postData(API_ROOT_URL + url, data)
    return result
  }
  async function toggle_is_done(data) {
    fetchData.setTokenToHeader(storage.getToken())

    const url = 'toggle_is_done'
    const result = await fetchData.postData(API_ROOT_URL + url, data)
    return result
  }

  return {
    all,
    store,
    destroy,
    // show,
    update,
    toggle_is_done,
  }
})
