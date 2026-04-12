const BASE_URL = import.meta.env.VITE_API_BASE_URL

if (!BASE_URL) {
  throw new Error('VITE_API_BASE_URL is not defined')
}

export class UserService {
  resourceEndpoint = `${BASE_URL}/users`

  async getAll() {
    const res = await fetch(this.resourceEndpoint)
    if (!res.ok) {
      throw new Error(`Failed to fetch users (${res.status} ${res.statusText})`)
    }
    return res.json()
  }

  create(users, newUser) {
    const id = users.length + 1
    const user = { id, ...newUser }
    users.push(user)
    return user
  }
}
