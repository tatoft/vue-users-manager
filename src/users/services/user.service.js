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

  update(users, updatedUser) {
    const index = users.findIndex((u) => u.id === updatedUser.id)
    if (index === -1) {
      throw new Error(`User with id ${updatedUser.id} not found`)
    }
    users[index] = updatedUser
    return updatedUser
  }

  delete(users, userId) {
    const index = users.findIndex((u) => u.id === userId)
    if (index === -1) {
      throw new Error(`User with id ${userId} not found`)
    }
    users.splice(index, 1)
  }
}
