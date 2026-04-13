import { User } from '../model/user.entity.js'
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
    const data = await res.json()
    return data.map((u) => new User(u.id, u.name, u.username, u.email, u.phone))
  }

  create(users, newUser) {
    const id = users.length + 1
    const user = new User(id, newUser.name, newUser.username, newUser.email, newUser.phone)
    users.push(user)
    return user
  }

  update(users, updatedUser) {
    const index = users.findIndex((u) => u.id === updatedUser.id)
    if (index === -1) {
      throw new Error(`User with id ${updatedUser.id} not found`)
    }
    const user = new User(
      updatedUser.id,
      updatedUser.name,
      updatedUser.username,
      updatedUser.email,
      updatedUser.phone,
    )
    users[index] = user
    return user
  }

  delete(users, userId) {
    const index = users.findIndex((u) => u.id === userId)
    if (index === -1) {
      throw new Error(`User with id ${userId} not found`)
    }
    users.splice(index, 1)
  }
}
