import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FaGraduationCap, 
  FaEnvelope, 
  FaTwitter, 
  FaQrcode, 
  FaPrint, 
  FaArrowLeft, 
  FaMousePointer,
  FaExclamationTriangle 
} from 'react-icons/fa';
import '../assets/static/Badge.css';

const API_BASE_URL = 'https://congreso-backend-1.onrender.com/api/participante';

const BadgeCard = ({ participante }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="badge-container" onClick={() => setIsFlipped(!isFlipped)}>
      <div className={`badge-inner ${isFlipped ? 'flipped' : ''}`}>
        {/* Frente del gafete */}
        <div className="badge-face badge-front">
          <div className="badge-header">
            <div className="congress-logo">
              <div className="logo-icon">
                <FaGraduationCap />
              </div>
              <h2>Congreso Internacional</h2>
            </div>
            <h1>TIC's 2025</h1>
          </div>
          
          <div className="participant-photo">
            <img 
              src={`/images/${participante.avatar}`} 
              alt={`${participante.nombre} ${participante.apellidos}`}
              className="avatar-image"
              onError={(e) => {
                e.target.src = '/images/avatar-default.png';
              }}
            />
            <div className="photo-frame"></div>
          </div>
          
          <div className="participant-info">
            <h3 className="participant-name">
              {participante.nombre} {participante.apellidos}
            </h3>
            <p className="participant-occupation">{participante.ocupacion}</p>
            <div className="badge-id">ID: {participante.id}</div>
          </div>
        </div>

        <div className="badge-face badge-back">
          <div className="back-header">
            <h3>Información de Contacto</h3>
          </div>
          
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">
                <FaEnvelope />
              </span>
              <div className="contact-details">
                <span className="contact-label">Email</span>
                <span className="contact-value">{participante.email}</span>
              </div>
            </div>
            
            <div className="contact-item">
              <span className="contact-icon">
                <FaTwitter />
              </span>
              <div className="contact-details">
                <span className="contact-label">Twitter</span>
                <span className="contact-value">@{participante.twitter}</span>
              </div>
            </div>
          </div>
          
          <div className="badge-message">
            <p>
              Gracias por ser parte del Congreso Internacional de Tecnologías 
              de la Información. Su participación enriquece este evento académico.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

function Badge() {
  const { id } = useParams(); 
  const [participante, setParticipante] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParticipant = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (!response.ok) {
          throw new Error('Participante no encontrado.');
        }
        const data = await response.json();
        setParticipante(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipant();
  }, [id]);

  if (loading) return (
    <div className="badge-loading">
      <div className="loading-spinner"></div>
      <p>Cargando gafete de acreditación...</p>
    </div>
  );
  
  if (error) return (
    <div className="badge-error">
      <div className="error-icon">
        <FaExclamationTriangle />
      </div>
      <h3>Error al cargar el gafete</h3>
      <p>{error}</p>
      <Link to="/participantes" className="back-link">
        Volver al listado
      </Link>
    </div>
  );

  return (
    <div className="badge-page">
      <div className="badge-page-header">
        <Link to="/participantes" className="back-button">
          <FaArrowLeft />
          Volver al listado
        </Link>
        <h1>Gafete de Acreditación</h1>
        <p className="page-subtitle">Credencial oficial del congreso</p>
      </div>
      
      <div className="badge-content">
        {participante && <BadgeCard participante={participante} />}
        
        <div className="badge-instructions">
          <div className="instruction-icon">
            <FaMousePointer />
          </div>
          <p>Haz click en el gafete para ver el reverso</p>
        </div>
        
        <div className="badge-actions">
          <button className="print-button" onClick={() => window.print()}>
            <FaPrint />
            Imprimir Gafete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Badge;