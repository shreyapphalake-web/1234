import React from 'react';
import { Building2, Heart, ShieldAlert, Sparkles, MapPin } from 'lucide-react';
import { collegesData } from '../data/colleges';

interface FooterProps {
  onSelectTab: (tab: 'home' | 'find' | 'explore' | 'about') => void;
  onSelectCollege: (collegeId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onSelectCollege }) => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem', color: 'white', fontWeight: 800, fontSize: '1.25rem' }}>
            <Building2 size={20} color="#3b82f6" />
            <span>CampusNest Kolhapur</span>
          </div>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#94a3b8', marginBottom: '1rem' }}>
            Empowering engineering students and parents with complete cost clarity before shifting to Kolhapur. 
            Pairing verified student stays with local messes since 2026.
          </p>
          <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
            📍 Kolhapur, Maharashtra, India
          </div>
        </div>

        <div>
          <h4 style={{ color: 'white', fontSize: '0.95rem', marginBottom: '0.85rem' }}>Kolhapur Engineering Campuses</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            {collegesData.map(c => (
              <li key={c.id}>
                <button
                  onClick={() => onSelectCollege(c.id)}
                  style={{ color: '#94a3b8', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <MapPin size={13} color="#3b82f6" />
                  <span>{c.shortName}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 style={{ color: 'white', fontSize: '0.95rem', marginBottom: '0.85rem' }}>Quick Navigation</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <li>
              <button onClick={() => onSelectTab('home')} style={{ color: '#94a3b8' }}>Home</button>
            </li>
            <li>
              <button onClick={() => onSelectTab('find')} style={{ color: '#94a3b8' }}>Find My Stay (Matcher)</button>
            </li>
            <li>
              <button onClick={() => onSelectTab('explore')} style={{ color: '#94a3b8' }}>Explore Accommodations & Messes</button>
            </li>
            <li>
              <button onClick={() => onSelectTab('about')} style={{ color: '#94a3b8' }}>About & Data Transparency</button>
            </li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: 'white', fontSize: '0.95rem', marginBottom: '0.85rem' }}>Transparency & Disclaimer</h4>
          <p style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '0.75rem' }}>
            CampusNest is a hackathon project MVP. All listings, phone numbers, and prices are illustrative demo models for student expense planning. 
            No financial transactions or confirmed bookings are conducted.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#1e293b', padding: '0.3rem 0.6rem', borderRadius: '6px', fontSize: '0.72rem', color: '#f59e0b' }}>
            <ShieldAlert size={13} />
            <span>Illustrative Data Only</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © 2026 CampusNest Kolhapur • Built with <Heart size={13} color="#ef4444" style={{ display: 'inline', verticalAlign: 'middle' }} /> for engineering students in Kolhapur.
        </p>
      </div>
    </footer>
  );
};
