import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PlaceCard from '../components/PlaceCard'
import { MOCK_PLACES } from '../services/placesService'
import './Favorites.css'

export default function Favorites() {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('favorites') || '[]') } catch { return [] }
  })

  const favoritePlaces = MOCK_PLACES.filter(p => favorites.includes(p.id))

  function removeFavorite(id) {
    setFavorites(prev => {
      const next = prev.filter(f => f !== id)
      localStorage.setItem('favorites', JSON.stringify(next))
      return next
    })
  }

  if (!user) {
    return (
      <div className="page-wrapper favorites-page">
        <div className="container">
          <div className="empty-state">
            <i className="fa-solid fa-lock"></i>
            <p>Você precisa estar logado para ver seus favoritos.</p>
            <Link to="/login" className="btn btn--primary">
              <i className="fa-solid fa-right-to-bracket"></i> Entrar
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-wrapper favorites-page">
      <div className="container">
        <div className="favorites-header">
          <h1 className="section-title">
            <i className="fa-solid fa-heart"></i> Meus Favoritos
          </h1>
          <p className="section-subtitle">
            {favoritePlaces.length === 0
              ? 'Você ainda não salvou nenhum lugar.'
              : `${favoritePlaces.length} lugar${favoritePlaces.length > 1 ? 'es' : ''} salvo${favoritePlaces.length > 1 ? 's' : ''}`}
          </p>
        </div>

        {favoritePlaces.length === 0 ? (
          <div className="empty-state">
            <i className="fa-regular fa-heart"></i>
            <p>Explore lugares e clique no coração para salvar aqui.</p>
            <Link to="/" className="btn btn--primary">
              <i className="fa-solid fa-compass"></i> Explorar lugares
            </Link>
          </div>
        ) : (
          <div className="favorites-grid">
            {favoritePlaces.map(place => (
              <PlaceCard
                key={place.id}
                place={place}
                isFavorite={true}
                onToggleFavorite={removeFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
