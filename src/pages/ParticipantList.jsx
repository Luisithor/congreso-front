import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import '../assets/static/ParticipantList.css';

const API_URL = 'https://congreso-backend-1.onrender.com/api/listado'; 

function ParticipantsList() {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchParticipants();
  }, []);

  const location = useLocation();

  const fetchParticipants = async (query = '') => {
    setLoading(true);
    setError(null);
    let url = API_URL;
    if (query) {
      url = `${API_URL}?q=${query}`; 
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('No se pudo obtener el listado de participantes.');
      }
      const data = await response.json();
      setParticipants(data);
      console.log('Participantes obtenidos:', data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, [location.search]);
  
  const handleSearch = (searchTerm) => {
    fetchParticipants(searchTerm);
  };

  return (
    <div className="participants-container">
      <div className="participants-header">
        <div className="header-content">
          <h1 className="page-title">Asistentes Registrados</h1>
          <p className="page-subtitle">Conoce a los profesionales que formarán parte del congreso</p>
          
          <div className="header-actions">
            <Link to="/registro" className="register-link">
              <span className="link-icon">+</span>
              Nuevo Registro
            </Link>
          </div>
        </div>
      </div>

      <div className="search-section">
        <SearchBar onSearch={handleSearch} />
      </div>

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando participantes...</p>
        </div>
      )}
      
      {error && (
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <p className="error-message">Error: {error}</p>
        </div>
      )}

      <div className="participants-grid">
        {!loading && participants.map(participant => (
          <div key={participant.id} className="participant-card">
            <div className="card-header">
              <Link to={`/gafete/${participant.id}`} className="avatar-link">
                <img 
                  src={`/images/${participant.avatar}`} 
                  alt={`${participant.nombre} ${participant.apellidos}`}
                  className="participant-avatar"
                  onError={(e) => {
                    e.target.src = '/images/avatar-default.png';
                  }}
                />
              </Link>
              <div className="participant-badge">Asistente</div>
            </div>
            
            <div className="card-body">
              <h3 className="participant-name">
                {participant.nombre} {participant.apellidos}
              </h3>
              
              <div className="participant-info">
                <div className="info-item">
                  <span className="info-label">Ocupación:</span>
                  <span className="info-value">{participant.ocupacion}</span>
                </div>
                
                {participant.twitter && (
                  <div className="info-item">
                    <span className="info-label">Twitter:</span>
                    <a 
                      href={`https://twitter.com/${participant.twitter}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="twitter-link"
                    >
                      @{participant.twitter}
                    </a>
                  </div>
                )}
              </div>
            </div>
            
            <div className="card-footer">
              <Link to={`/gafete/${participant.id}`} className="view-badge-btn">
                Ver Gafete
              </Link>
            </div>
          </div>
        ))}
      </div>

      {!loading && participants.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">👥</div>
          <h3>No hay participantes registrados</h3>
          <p>No se encontraron participantes que coincidan con tu búsqueda.</p>
          <Link to="/registro" className="empty-state-link">
            Registrar primer participante
          </Link>
        </div>
      )}
    </div>
  );
}

export default ParticipantsList;