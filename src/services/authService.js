import { api } from './api'

export async function login(email, password) {
  try {
    const data = await api.post('/auth/login', { email, password })
    if (data.token) localStorage.setItem('token', data.token)
    return data.user
  } catch {
    // Mock para desenvolvimento
    if (email === 'admin@rota.com' && password === '123456') {
      const user = { id: 1, name: 'Admin', email, isAdmin: true }
      localStorage.setItem('token', 'mock-token-admin')
      return user
    }
    if (email && password.length >= 4) {
      const name = email.split('@')[0]
      const user = { id: 2, name, email, isAdmin: false }
      localStorage.setItem('token', 'mock-token-user')
      return user
    }
    throw new Error('Email ou senha inválidos')
  }
}

export async function register(name, email, password) {
  try {
    const data = await api.post('/auth/register', { name, email, password })
    if (data.token) localStorage.setItem('token', data.token)
    return data.user
  } catch {
    // Mock para desenvolvimento
    const user = { id: Date.now(), name, email, isAdmin: false }
    localStorage.setItem('token', `mock-token-${Date.now()}`)
    return user
  }
}

export function logout() {
  localStorage.removeItem('token')
}

export function getStoredToken() {
  return localStorage.getItem('token')
}
