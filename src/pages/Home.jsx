import { useNavigate } from 'react-router-dom';
import UTL from '../assets/UTL.png';
import React from 'react';
import Congreso from '../assets/Congreso.png';
import '../assets/static/Home.css';

function Home() {
  const navigate = useNavigate();

  const handleEntry = () => {
    navigate('/participantes'); 
  };

  return (
    <div className="home-container">
      <div className="content-wrapper">
        <main className="main-content">
          <div className="text-content">
            <div className="images-section">
              <img 
                src={UTL} 
                alt="UTL Logo" 
                className="utl-logo" 
                style={{width: "80px"}}
              />
              <img 
                src={Congreso} 
                alt="Congreso Logo" 
                className="congreso-logo" 
                style={{width: "80px"}}
              />
            </div>
            <h1 className="congress-title">
              Congreso Internacional de TIC's
            </h1>
            <p className="congress-subtitle">
              Innovación, Tecnología y Desarrollo
            </p>
            
            <hr className="content-separator" />
            
            <p className="welcome-message">
              Bienvenido al sistema de registro de participantes. 
              Únase a líderes y expertos en tecnología para compartir 
              conocimientos y experiencias innovadoras.
            </p>
          </div>

          {/* Botón de acción */}
          <div className="action-section">
            <button 
              onClick={handleEntry}
              className="entry-button"
            >
              Ingresar al Sistema
            </button>
          </div>
        </main>

        {/* Footer */}
        <footer className="footer">
          <p className="footer-text">
            Un evento de clase mundial para profesionales y académicos
          </p>
        </footer>

      </div>
    </div>
  );
}

export default Home;