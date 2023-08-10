import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

export async function getAllEvents() {
  try {
    const userId = localStorage.getItem("browser_UUID");
    
    const { data } = await api.get(`/api/v1/events?userId=${userId}`)

    return data
  } catch (e) {
    return {
      error: 'Something went wrong.'
    }
  }
}

export async function handleEventSub({ userId, eventId }: { userId: string, eventId: number }) {
  try {
    const { data } = await api.put(`/api/v1/events/${eventId}/${userId}`)

    return data
  } catch (e) {
    return {
      error: 'Something went wrong.'
    }
  }
}

