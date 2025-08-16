import React from 'react';
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer section-padding bg-light py-4">
      <div className="container">
        <div 
          className="row" 
          style={{ gap: '2rem 1rem', justifyContent: 'space-between' }}
        >
          <div className="col-md-4 col-12" style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
              <img 
                src="/images/image1.jpeg" 
                alt="Logo ou illustration" 
                style={{ height: '150px', width: 'auto', borderRadius: '10px' }} 
              />
              <div>
                <p style={{ color: 'black', fontWeight: 'bold', marginBottom: '1rem' }}>
                  Archivistes Leaders International
                </p>
                <p>
                  <a href="mailto:archivistesleaders@gmail.com">
                    archivistesleaders@gmail.com
                  </a>
                </p>
                <p>
                  <a href="http://www.archivistesleaders.org" target="_blank" rel="noopener noreferrer">
                    www.archivistesleaders.org
                  </a>
                </p>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                  <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <img src="/images/facebook.png" alt="Facebook" style={{ height: '30px', width: '30px' }} />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <img src="/images/linkedin.png" alt="LinkedIn" style={{ height: '30px', width: '30px' }} />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                    <img src="/images/youtube.png" alt="YouTube" style={{ height: '30px', width: '30px' }} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-12" style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <img
                src="/images/image2.jpeg"
                alt="Icône"
                style={{ height: '100px', width: '100px' }}
              />
              <ul className="list-unstyled" style={{ margin: 0 }}>
                {['Accueil', 'À propos', 'Actualités', 'Tableau de gestion'].map(t => (
                  <li key={t} style={{ marginBottom: '0.5rem' }}>
                    <a href="#" style={{ color: 'black', textDecoration: 'underline' }}>
                      {t}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-md-3 col-12" style={{ minWidth: '400px', marginBottom: '2rem' }}>
            <p style={{ color: 'black', fontWeight: 'bold', textDecoration: 'underline', marginBottom: '1rem' }}>
              PARTENAIRES
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <img src="/images/image4.jpeg" alt="Cocody Abidjan R.C.I" style={{ height: '60px', width: 'auto' }} />
              <img src="/images/image6.jpeg" alt="Email Archivistes Leaders" style={{ height: '60px', width: 'auto' }} />
              <img src="/images/image7.jpeg" alt="Site Archivistes Leaders" style={{ height: '60px', width: 'auto' }} />
              <img src="/images/image5.jpeg" alt="Site Archivistes Leaders" style={{ height: '60px', width: 'auto' }} />
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <img src="/images/image3.jpeg" alt="Cocody Abidjan R.C.I" style={{ height: '60px', width: 'auto' }} />
      </div>

      <div className="text-center mt-4">
        <p style={{ color: '#045148ff', fontWeight: 'bold' }}>
          Copyright © 2025 Archistes Leaders International | Portail des délais de conservation des documents administratifs | Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
