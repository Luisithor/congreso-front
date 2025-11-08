import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/static/RegistrationForm.css';

const API_REGISTRO_URL = 'https://congreso-backend-1.onrender.com/api/registro';

function RegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    twitter: '',
    ocupacion: '',
    avatar: '', 
    aceptaTerminos: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAvatarSelect = (avatarValue) => {
    setFormData(prev => ({
      ...prev,
      avatar: avatarValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nombre || !formData.apellidos || !formData.email || !formData.aceptaTerminos) {
      setError('Por favor, completa todos los campos obligatorios y acepta los términos y condiciones.');
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_REGISTRO_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al registrar el participante.');
      }

      navigate('/participantes'); 

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <div className="registration-header">
          <h1 className="registration-title">Registro de Participante</h1>
          <p className="registration-subtitle">
            Únase a nuestro exclusivo congreso de tecnología e innovación
          </p>
        </div>

        <form onSubmit={handleSubmit} className="registration-form">
          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Nombre *</label>
              <input 
                type="text" 
                name="nombre" 
                value={formData.nombre} 
                onChange={handleChange} 
                className="form-input"
                placeholder="Ingrese su nombre"
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Apellidos *</label>
              <input 
                type="text" 
                name="apellidos" 
                value={formData.apellidos} 
                onChange={handleChange} 
                className="form-input"
                placeholder="Ingrese sus apellidos"
                required 
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label">Email *</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                className="form-input"
                placeholder="ejemplo@correo.com"
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Usuario de Twitter</label>
              <input 
                type="text" 
                name="twitter" 
                value={formData.twitter} 
                onChange={handleChange} 
                className="form-input"
                placeholder="@usuario" 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Ocupación</label>
              <input 
                type="text" 
                name="ocupacion" 
                value={formData.ocupacion} 
                onChange={handleChange} 
                className="form-input"
                placeholder="Su profesión o cargo" 
              />
            </div>
          </div>

          <div className="avatar-section">
            <h3 className="section-title">Seleccione su avatar</h3>
            <div className="avatar-options">
              <div 
                className={`avatar-option ${formData.avatar === 'avatar1.png' ? 'selected' : ''}`}
                onClick={() => handleAvatarSelect('avatar1.png')}
              >
                <img src="/images/avatar2.png" alt="Avatar 1" className="avatar-image" />                
                <span className="avatar-label">Profesional</span>
                <div className="avatar-check">✓</div>
              </div>
              
              <div 
                className={`avatar-option ${formData.avatar === 'avatar2.png' ? 'selected' : ''}`}
                onClick={() => handleAvatarSelect('avatar2.png')}
              >
                <img src="/images/avatar3.png" alt="Avatar 2" className="avatar-image" />
                <span className="avatar-label">Ejecutivo</span>
                <div className="avatar-check">✓</div>
              </div>
              
              <div 
                className={`avatar-option ${formData.avatar === 'avatar3.png' ? 'selected' : ''}`}
                onClick={() => handleAvatarSelect('avatar3.png')}
              >
                <img src="images/avatar1.png" alt="Avatar 3" className="avatar-image" />
                <span className="avatar-label">Académico</span>
                <div className="avatar-check">✓</div>
              </div>
            </div>
          </div>

          <div className="terms-section">
            <label className="terms-label">
              <input 
                type="checkbox" 
                name="aceptaTerminos" 
                checked={formData.aceptaTerminos} 
                onChange={handleChange} 
                className="terms-checkbox"
                required 
              />
              <span className="checkmark"></span>
              <span className="terms-text">
                He leído y acepto los <a href="/terminos" className="terms-link">términos y condiciones</a> del congreso *
              </span>
            </label>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              disabled={loading} 
              className={`submit-button ${loading ? 'loading' : ''}`}
            >
              {loading ? (
                <>
                  <div className="button-spinner"></div>
                  Procesando registro...
                </>
              ) : (
                'Completar Registro'
              )}
            </button>
            
            <button 
              type="button" 
              onClick={() => navigate('/participantes')}
              className="cancel-button"
            >
              Ver Listado
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;