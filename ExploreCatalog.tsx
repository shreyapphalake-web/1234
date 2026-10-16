import React, { useState, useMemo } from 'react';
import { AccommodationListing, MessListing, RecommendationResult } from '../types';
import { accommodationsData } from '../data/accommodations';
import { messesData } from '../data/messes';
import { collegesData } from '../data/colleges';
import { formatINR } from '../utils/formatters';
import { 
  Search, 
  MapPin, 
  Utensils, 
  Building2, 
  Filter, 
  Info, 
  Check, 
  ShieldAlert, 
  Coffee 
} from 'lucide-react';

interface ExploreCatalogProps {
  onOpenAccommodationDetails: (acc: AccommodationListing) => void;
}

export const ExploreCatalog: React.FC<ExploreCatalogProps> = ({ onOpenAccommodationDetails }) => {
  const [activeTab, setActiveTab] = useState<'accommodations' | 'messes'>('accommodations');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocality, setSelectedLocality] = useState('all');
  const [selectedCollege, setSelectedCollege] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');
  const [selectedFoodType, setSelectedFoodType] = useState('all');

  const localities = useMemo(() => {
    const set = new Set<string>();
    accommodationsData.forEach(a => set.add(a.locality));
    messesData.forEach(m => set.add(m.locality));
    return Array.from(set);
  }, []);

  const filteredAccommodations = useMemo(() => {
    return accommodationsData.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.amenities.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchLocality = selectedLocality === 'all' || item.locality === selectedLocality;
      const matchCollege = selectedCollege === 'all' || item.collegesServed.some(cs => cs.collegeId === selectedCollege);
      const matchType = selectedType === 'all' || item.type === selectedType;
      const matchGender = selectedGender === 'all' || item.genderAllowed === selectedGender;

      return matchSearch && matchLocality && matchCollege && matchType && matchGender;
    });
  }, [searchQuery, selectedLocality, selectedCollege, selectedType, selectedGender]);

  const filteredMesses = useMemo(() => {
    return messesData.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchLocality = selectedLocality === 'all' || item.locality === selectedLocality;
      const matchCollege = selectedCollege === 'all' || item.collegesNearby.some(cn => cn.collegeId === selectedCollege);
      const matchFood = selectedFoodType === 'all' || item.foodType === selectedFoodType;

      return matchSearch && matchLocality && matchCollege && matchFood;
    });
  }, [searchQuery, selectedLocality, selectedCollege, selectedFoodType]);

  return (
    <div className="section-wrapper">
      <div className="section-header">
        <h2 className="section-title">Explore Kolhapur Student Listings</h2>
        <p className="section-desc">
          Browse all {accommodationsData.length} verified demo accommodation options and {messesData.length} authentic student messes across Kolhapur.
        </p>
      </div>

      {/* Explore Tabs */}
      <div className="explore-tabs">
        <button
          className={`explore-tab-btn ${activeTab === 'accommodations' ? 'active' : ''}`}
          onClick={() => setActiveTab('accommodations')}
        >
          <Building2 size={18} style={{ marginRight: '6px', verticalAlign: 'text-bottom' }} />
          Accommodations & PGs ({filteredAccommodations.length})
        </button>
        <button
          className={`explore-tab-btn ${activeTab === 'messes' ? 'active' : ''}`}
          onClick={() => setActiveTab('messes')}
        >
          <Utensils size={18} style={{ marginRight: '6px', verticalAlign: 'text-bottom' }} />
          Student Messes & Bhojanalays ({filteredMesses.length})
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 240px', position: 'relative' }}>
          <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="form-input"
            placeholder={activeTab === 'accommodations' ? "Search by name, address, or amenity..." : "Search mess name or specialty..."}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '2.25rem' }}
          />
        </div>

        <select
          className="form-select"
          style={{ width: 'auto', minWidth: '180px' }}
          value={selectedLocality}
          onChange={e => setSelectedLocality(e.target.value)}
        >
          <option value="all">All Localities</option>
          {localities.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>

        <select
          className="form-select"
          style={{ width: 'auto', minWidth: '200px' }}
          value={selectedCollege}
          onChange={e => setSelectedCollege(e.target.value)}
        >
          <option value="all">All Colleges (10)</option>
          {collegesData.map(c => (
            <option key={c.id} value={c.id}>{c.shortName} ({c.locality})</option>
          ))}
        </select>

        {activeTab === 'accommodations' && (
          <>
            <select
              className="form-select"
              style={{ width: 'auto', minWidth: '160px' }}
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
            >
              <option value="all">All Stay Types</option>
              <option value="Shared Room (2-Sharing)">2-Sharing</option>
              <option value="Shared Room (3-Sharing)">3-Sharing</option>
              <option value="Single Room">Single Room</option>
              <option value="Student Hostel / PG">Hostel / PG</option>
              <option value="1RK / 1BHK Flat">Flat</option>
            </select>

            <select
              className="form-select"
              style={{ width: 'auto', minWidth: '140px' }}
              value={selectedGender}
              onChange={e => setSelectedGender(e.target.value)}
            >
              <option value="all">All Genders</option>
              <option value="Boys">Boys Only</option>
              <option value="Girls">Girls Only</option>
              <option value="Co-ed / Any">Co-ed / Any</option>
            </select>
          </>
        )}

        {activeTab === 'messes' && (
          <select
            className="form-select"
            style={{ width: 'auto', minWidth: '180px' }}
            value={selectedFoodType}
            onChange={e => setSelectedFoodType(e.target.value)}
          >
            <option value="all">All Food Types</option>
            <option value="Pure Veg">Pure Veg</option>
            <option value="Veg & Non-Veg">Veg & Non-Veg</option>
            <option value="Kolhapuri Special (Veg & Non-Veg)">Kolhapuri Special</option>
          </select>
        )}
      </div>

      {/* Accommodations Catalog Grid */}
      {activeTab === 'accommodations' && (
        <div className="cards-grid">
          {filteredAccommodations.map(item => (
            <div key={item.id} className="listing-card">
              <div className="card-top-bar">
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  <span className="card-type-badge">{item.type}</span>
                  <span style={{ 
                    fontSize: '0.72rem', 
                    fontWeight: 700, 
                    padding: '0.2rem 0.5rem', 
                    borderRadius: '9999px',
                    background: item.genderAllowed === 'Girls' ? '#fdf2f8' : item.genderAllowed === 'Boys' ? '#eff6ff' : '#f0fdf4',
                    color: item.genderAllowed === 'Girls' ? '#be185d' : item.genderAllowed === 'Boys' ? '#1d4ed8' : '#15803d'
                  }}>
                    {item.genderAllowed}
                  </span>
                </div>
                <span className="card-type-badge" style={{ background: '#f8fafc', color: '#64748b' }}>
                  {item.foodIncluded ? 'Food Included' : 'Separate Mess'}
                </span>
              </div>

              <div className="card-body">
                <h3 className="card-title">{item.name}</h3>
                <div className="card-locality">
                  <MapPin size={14} color="#64748b" />
                  <span>{item.address}</span>
                </div>

                <div className="cost-box">
                  <div className="cost-primary-row">
                    <span className="cost-label">Monthly Rent</span>
                    <span className="cost-value-total">{formatINR(item.monthlyRent)}/mo</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Utilities Estimate:</span>
                    <strong>{formatINR(item.monthlyUtilities)}/mo</strong>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#b45309', marginTop: '0.25rem' }}>
                    Deposit: <strong>{formatINR(item.oneTimeDeposit)}</strong> (one-time)
                  </div>
                </div>

                <div style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '0.75rem' }}>
                  {item.highlight}
                </div>

                <div className="amenities-strip">
                  {item.amenities.slice(0, 4).map((a, i) => (
                    <span key={i} className="amenity-chip">{a}</span>
                  ))}
                </div>
              </div>

              <div className="card-footer">
                <button
                  className="btn-card-action"
                  onClick={() => onOpenAccommodationDetails(item)}
                >
                  <Info size={15} />
                  <span>View Details & Colleges</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Messes Catalog Grid */}
      {activeTab === 'messes' && (
        <div className="cards-grid">
          {filteredMesses.map(mess => (
            <div key={mess.id} className="listing-card" style={{ borderLeft: '4px solid #a855f7' }}>
              <div className="card-top-bar">
                <span className="card-type-badge" style={{ background: '#f3e8ff', color: '#7e22ce' }}>
                  {mess.foodType}
                </span>
                {mess.tiffinAvailable && (
                  <span style={{ fontSize: '0.72rem', background: '#ecfdf5', color: '#047857', padding: '0.2rem 0.5rem', borderRadius: '9999px', fontWeight: 600 }}>
                    Dabba / Tiffin Available
                  </span>
                )}
              </div>

              <div className="card-body">
                <h3 className="card-title">{mess.name}</h3>
                <div className="card-locality">
                  <MapPin size={14} color="#64748b" />
                  <span>{mess.address}</span>
                </div>

                <div className="cost-box" style={{ background: '#faf5ff', borderColor: '#f3e8ff' }}>
                  <div className="cost-primary-row">
                    <span className="cost-label" style={{ color: '#7e22ce' }}>Monthly Meal Pass</span>
                    <span className="cost-value-total" style={{ color: '#6b21a8' }}>
                      {formatINR(mess.monthlyMealPrice)}/mo
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#6b21a8' }}>
                    {mess.mealPlan}
                  </div>
                </div>

                <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', padding: '0.6rem 0.8rem', borderRadius: '8px', marginBottom: '0.75rem', fontSize: '0.82rem', color: '#92400e' }}>
                  <strong>Sunday Special:</strong> {mess.sundaySpecial}
                </div>

                <div style={{ marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>Specialties:</span>
                  <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginTop: '0.3rem' }}>
                    {mess.specialties.map((s, idx) => (
                      <span key={idx} className="amenity-chip" style={{ background: '#f5f3ff', color: '#5b21b6' }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ background: '#f8fafc', padding: '0.6rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.78rem', color: '#475569' }}>
                  <div><strong>Demo Manager:</strong> {mess.demoContact.managerName}</div>
                  <div><strong>Contact:</strong> {mess.demoContact.phone} ({mess.demoContact.timing})</div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '2px' }}>{mess.demoStatus}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
