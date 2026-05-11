import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Search, Package, Truck, MapPin, 
  CheckCircle, Clock, ShieldCheck, 
  ArrowLeft, ChevronRight, Info
} from 'lucide-react';
import './Tracking.css';

const MOCK_TRACKING_DATA = {
  'ORD-7721': {
    id: 'ORD-7721',
    status: 'In Transit',
    currentLocation: 'Manchester Hub, UK',
    estimatedDelivery: 'Oct 26, 2023',
    origin: 'London, UK',
    destination: 'Manchester, UK',
    provider: 'Swift Logistics',
    history: [
      { status: 'Delivered', time: 'Pending', location: 'Manchester, UK', completed: false },
      { status: 'Out for Delivery', time: 'Oct 25, 09:30 AM', location: 'Manchester North Office', completed: false },
      { status: 'In Transit', time: 'Oct 24, 11:45 PM', location: 'Manchester Hub', completed: true, active: true },
      { status: 'Package Picked Up', time: 'Oct 24, 02:15 PM', location: 'London Central Hub', completed: true },
      { status: 'Order Processed', time: 'Oct 23, 04:00 PM', location: 'Merchant Warehouse', completed: true },
    ]
  },
  'ORD-7720': {
    id: 'ORD-7720',
    status: 'Delivered',
    currentLocation: 'Chicago, IL',
    estimatedDelivery: 'Oct 22, 2023',
    origin: 'New York, NY',
    destination: 'Chicago, IL',
    provider: 'Global Express',
    history: [
      { status: 'Delivered', time: 'Oct 22, 03:45 PM', location: 'Chicago Residence', completed: true, active: true },
      { status: 'Out for Delivery', time: 'Oct 22, 08:15 AM', location: 'Chicago West Depot', completed: true },
      { status: 'In Transit', time: 'Oct 21, 10:00 PM', location: 'Chicago Logistics Park', completed: true },
      { status: 'Order Processed', time: 'Oct 20, 11:00 AM', location: 'NY Central Warehouse', completed: true },
    ]
  },
  'ORD-7719': {
    id: 'ORD-7719',
    status: 'Pending',
    currentLocation: 'Lagos, Nigeria',
    estimatedDelivery: 'Oct 24, 2023',
    origin: 'Lagos, Nigeria',
    destination: 'Abuja, Nigeria',
    provider: 'City Dashers',
    history: [
      { status: 'In Transit', time: 'Pending', location: 'En route to Abuja', completed: false },
      { status: 'Order Processed', time: 'Oct 23, 05:00 PM', location: 'Lagos Hub', completed: true, active: true },
      { status: 'Order Received', time: 'Oct 23, 02:00 PM', location: 'Lagos Hub', completed: true },
    ]
  }
};

const Tracking = () => {
  const { id } = useParams();
  const [searchId, setSearchId] = useState(id || '');
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      handleTrack(id);
    }
  }, [id]);

  const handleTrack = (idToTrack) => {
    const data = MOCK_TRACKING_DATA[idToTrack.toUpperCase()];
    if (data) {
      setTrackingInfo(data);
      setError('');
    } else {
      setTrackingInfo(null);
      setError('No tracking information found for this ID.');
    }
  };

  const onSearch = (e) => {
    e.preventDefault();
    if (searchId) handleTrack(searchId);
  };

  return (
    <div className="tracking-page animate-fade">
      <div className="container tracking-container">
        <header className="tracking-header">
          <div className="breadcrumb">
            <Link to="/dashboard" className="back-link">
              <ArrowLeft size={18} />
              Back to Dashboard
            </Link>
          </div>
          <h1>Track Your Shipment</h1>
          <p>Enter your tracking ID to get real-time updates on your package.</p>
          
          <form className="tracking-search-bar card" onSubmit={onSearch}>
            <Search size={20} className="search-icon" />
            <input 
              type="text" 
              placeholder="Enter Tracking ID (e.g., ORD-7721)" 
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Track Now</button>
          </form>
          {error && <div className="tracking-error animate-slide">{error}</div>}
        </header>

        {trackingInfo ? (
          <main className="tracking-results">
            <div className="tracking-summary-card card animate-slide">
              <div className="summary-header">
                <div className="order-id-badge">
                  <Package size={18} />
                  <span>{trackingInfo.id}</span>
                </div>
                <div className={`status-pill ${trackingInfo.status.toLowerCase().replace(' ', '-')}`}>
                  {trackingInfo.status}
                </div>
              </div>
              
              <div className="summary-grid">
                <div className="summary-item">
                  <span className="label">Estimated Delivery</span>
                  <strong>{trackingInfo.estimatedDelivery}</strong>
                </div>
                <div className="summary-item">
                  <span className="label">Current Location</span>
                  <strong>{trackingInfo.currentLocation}</strong>
                </div>
                <div className="summary-item">
                  <span className="label">Shipping Provider</span>
                  <strong>{trackingInfo.provider}</strong>
                </div>
              </div>

              <div className="tracking-route-viz">
                <div className="route-node">
                  <div className="node-icon completed"><MapPin size={16} /></div>
                  <div className="node-info">
                    <span>Origin</span>
                    <strong>{trackingInfo.origin}</strong>
                  </div>
                </div>
                <div className="route-line">
                  <div className="line-progress" style={{ width: trackingInfo.status === 'Delivered' ? '100%' : '65%' }}></div>
                </div>
                <div className="route-node">
                  <div className={`node-icon ${trackingInfo.status === 'Delivered' ? 'completed' : 'pending'}`}>
                    <MapPin size={16} />
                  </div>
                  <div className="node-info">
                    <span>Destination</span>
                    <strong>{trackingInfo.destination}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="tracking-details-grid">
              <section className="tracking-history card animate-slide" style={{ animationDelay: '0.1s' }}>
                <h3>Shipment History</h3>
                <div className="history-timeline">
                  {trackingInfo.history.map((item, i) => (
                    <div key={i} className={`timeline-item ${item.completed ? 'completed' : ''} ${item.active ? 'active' : ''}`}>
                      <div className="timeline-marker">
                        {item.completed ? <CheckCircle size={18} /> : <Clock size={18} />}
                      </div>
                      <div className="timeline-content">
                        <div className="timeline-header">
                          <strong>{item.status}</strong>
                          <span className="time">{item.time}</span>
                        </div>
                        <p className="location">{item.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <aside className="tracking-sidebar">
                <div className="support-card card animate-slide" style={{ animationDelay: '0.2s' }}>
                  <ShieldCheck size={32} className="card-icon" />
                  <h4>Insurance Protected</h4>
                  <p>Your shipment is fully insured up to $500.00 against loss or damage.</p>
                  <button className="secondary-link">View Policy Details</button>
                </div>

                <div className="help-card card animate-slide" style={{ animationDelay: '0.3s' }}>
                  <Info size={32} className="card-icon" />
                  <h4>Need Help?</h4>
                  <p>Having trouble with your shipment? Contact our support team.</p>
                  <button className="btn btn-outline btn-sm">Contact Support</button>
                </div>
              </aside>
            </div>
          </main>
        ) : !error && (
          <div className="tracking-placeholder animate-fade">
            <Package size={64} className="placeholder-icon" />
            <h3>Enter a Tracking ID to Begin</h3>
            <p>You can find your tracking ID in your confirmation email or dashboard.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tracking;
