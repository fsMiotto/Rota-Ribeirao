import { api } from './api'

// Dados mock para desenvolvimento sem backend
export const MOCK_PLACES = [
  {
    id: 1,
    name: 'Restaurante Sinhá Moça',
    category: 'restaurante',
    address: 'Av. Costábile Romano, 2201 - Ribeirânia',
    rating: 4.7,
    priceLevel: 3,
    occasion: ['familia', 'comemoracao'],
    description: 'Tradicional restaurante de culinária brasileira, famoso pelos pratos mineiros e o ambiente aconchegante.',
    reviews: [
      { id: 1, author: 'Maria S.', rating: 5, comment: 'Comida incrível! O frango com quiabo é imperdível.', date: '2025-05-10' },
      { id: 2, author: 'João P.', rating: 4, comment: 'Ótimo atendimento, lugar espaçoso para a família.', date: '2025-04-22' },
    ],
  },
  {
    id: 2,
    name: 'Barão Bar',
    category: 'bar',
    address: 'Rua Duque de Caxias, 780 - Centro',
    rating: 4.4,
    priceLevel: 2,
    occasion: ['encontro', 'amigos'],
    description: 'Bar animado no centro com boa seleção de cervejas artesanais e petiscos.',
    reviews: [
      { id: 1, author: 'Lucas M.', rating: 4, comment: 'Ótimas cervejas artesanais e ambiente descontraído.', date: '2025-05-18' },
    ],
  },
  {
    id: 3,
    name: 'Choperia Americana',
    category: 'bar',
    address: 'R. Visconde de Inhaúma, 392 - Centro',
    rating: 4.2,
    priceLevel: 2,
    occasion: ['amigos', 'comemoracao'],
    description: 'Clássica choperia do centro, ponto de encontro ribeirão-pretano há décadas.',
    reviews: [],
  },
  {
    id: 4,
    name: 'Café Colonial Sabores',
    category: 'cafe',
    address: 'Rua Álvares Cabral, 1450 - Jardim América',
    rating: 4.8,
    priceLevel: 2,
    occasion: ['encontro', 'familia'],
    description: 'Café charmoso com decoração acolhedora, famoso pelos bolos caseiros e café especial.',
    reviews: [
      { id: 1, author: 'Ana C.', rating: 5, comment: 'Melhor café da cidade! Bolo de laranja divino.', date: '2025-05-01' },
    ],
  },
  {
    id: 5,
    name: 'Festival de Jazz de Ribeirão',
    category: 'evento',
    address: 'Parque Curupira - Ribeirão Preto',
    rating: 4.9,
    priceLevel: 3,
    occasion: ['comemoracao', 'encontro', 'amigos'],
    eventDate: '2025-08-15',
    description: 'Festival anual de jazz que reúne artistas nacionais e internacionais no Parque Curupira.',
    reviews: [
      { id: 1, author: 'Pedro A.', rating: 5, comment: 'Experiência incrível! Já é tradição na minha agenda.', date: '2025-03-15' },
    ],
  },
  {
    id: 6,
    name: 'Mercado Municipal de RP',
    category: 'mercado',
    address: 'Av. Jerônimo Gonçalves, 80 - Centro',
    rating: 4.3,
    priceLevel: 1,
    occasion: ['familia'],
    description: 'Mercado tradicional com feiras de produtos frescos, artesanato e comidas típicas da região.',
    reviews: [],
  },
  {
    id: 7,
    name: 'Restaurante Panelão',
    category: 'restaurante',
    address: 'R. General Osório, 560 - Centro',
    rating: 4.1,
    priceLevel: 1,
    occasion: ['familia', 'amigos'],
    description: 'Self-service com variedade de pratos caseiros e preço acessível no coração da cidade.',
    reviews: [],
  },
  {
    id: 8,
    name: 'The Pub Ribeirão',
    category: 'bar',
    address: 'Shopping Iguatemi - Av. Nações Unidas, 3501',
    rating: 4.0,
    priceLevel: 3,
    occasion: ['encontro', 'amigos'],
    description: 'Bar estilo pub inglês com menu variado de drinques e hambúrgueres artesanais.',
    reviews: [],
  },
]

export async function getPlaces(filters = {}) {
  try {
    const params = new URLSearchParams()
    if (filters.category)   params.set('category',    filters.category)
    if (filters.priceLevel) params.set('price_level', filters.priceLevel)
    if (filters.occasion)   params.set('occasion',    filters.occasion)
    if (filters.minRating)  params.set('min_rating',  filters.minRating)

    return await api.get(`/places?${params}`)
  } catch {
    // Fallback para dados mock enquanto o backend não está disponível
    let places = [...MOCK_PLACES]
    if (filters.category)   places = places.filter(p => p.category === filters.category)
    if (filters.priceLevel) places = places.filter(p => p.priceLevel <= Number(filters.priceLevel))
    if (filters.occasion)   places = places.filter(p => p.occasion.includes(filters.occasion))
    if (filters.minRating)  places = places.filter(p => p.rating >= Number(filters.minRating))
    return places
  }
}

export async function getPlaceById(id) {
  try {
    return await api.get(`/places/${id}`)
  } catch {
    return MOCK_PLACES.find(p => p.id === Number(id)) || null
  }
}

export async function createPlace(data) {
  return api.post('/places', data)
}

export async function deletePlace(id) {
  return api.delete(`/places/${id}`)
}

export async function addReview(placeId, data) {
  try {
    return await api.post(`/places/${placeId}/reviews`, data)
  } catch {
    return { ...data, id: Date.now(), date: new Date().toISOString().split('T')[0] }
  }
}
