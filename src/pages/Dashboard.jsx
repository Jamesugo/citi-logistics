import React from 'react';
import { 
  LayoutDashboard, Package, Truck, Clock, 
  TrendingUp, MapPin, ChevronRight, 
  Bell, Settings, Plus, Search as SearchIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const savedUser = localStorage.getItem('shipway_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const stats = [
    { label: 'Active Requests', value: '12', icon: <Package size={20} />, color: 'var(--primary-light)' },
    { label: 'In Transit', value: '05', icon: <Truck size={20} />, color: 'var(--success)' },
    { label: 'Pending Quotes', value: '08', icon: <Clock size={20} />, color: 'var(--warning)' },
    { label: 'Total Spent', value: '$2,450', icon: <TrendingUp size={20} />, color: 'var(--primary)' },
  ];

  const recentRequests = [
    { id: 'ORD-7721', company: 'Swift Logistics', route: 'London → Manchester', status: 'In Transit', date: 'Oct 24, 2023' },
    { id: 'ORD-7720', company: 'Global Express', route: 'New York → Chicago', status: 'Delivered', date: 'Oct 22, 2023' },
    { id: 'ORD-7719', company: 'City Dashers', route: 'Lagos → Abuja', status: 'Pending', date: 'Oct 21, 2023' },
  ];

  if (!user) return <div className="dashboard-loading">Redirecting...</div>;


  return (
    <div className="dashboard-page">
      <aside className="dashboard-sidebar">
        
        <nav className="sidebar-nav">

          <Link to="/dashboard" className="nav-item active">
            <LayoutDashboard size={20} />
            <span>Overview</span>
          </Link>
          <Link to="/search" className="nav-item">
            <Plus size={20} />
            <span>Find Provider</span>
          </Link>
          <div className="nav-group">Account</div>
          <Link to="/profile" className="nav-item">
            <Settings size={20} />
            <span>Profile Settings</span>
          </Link>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile-sm">
            <img src={user.logo || `https://ui-avatars.com/api/?name=${user.name}&background=random`} alt="" className="avatar-sm" />
            <div className="user-info-sm">
              <strong>{user.name}</strong>
              <span>{user.role === 'provider' ? 'Provider' : 'Customer'} Account</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-title">
            <h1>Welcome back, {user.name.split(' ')[0]}</h1>
            <p>Here's what's happening with your logistics today.</p>
          </div>
          <div className="header-actions">
            <button className="icon-btn-circle" title="Notifications">
              <Bell size={20} />
              <span className="badge-dot"></span>
            </button>
            <Link to="/search" className="btn btn-primary">
              <SearchIcon size={18} />
              <span>Find Services</span>
            </Link>
          </div>
        </header>

        <section className="stats-grid">
          {stats.map((stat, i) => (
            <div key={i} className="stat-card card">
              <div className="stat-icon" style={{ backgroundColor: stat.color + '15', color: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-info">
                <span className="stat-label">{stat.label}</span>
                <span className="stat-value">{stat.value}</span>
              </div>
            </div>
          ))}
        </section>

        <div className="dashboard-content-grid">
          <section className="recent-requests card">
            <div className="card-header">
              <h3>Recent Requests</h3>
              <Link to="/requests" className="view-all">View all</Link>
            </div>
            <div className="requests-table-wrapper">
              <table className="requests-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Service</th>
                    <th>Route</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRequests.map((req, i) => (
                    <tr key={i}>
                      <td><Link to={`/track/${req.id}`} className="order-id-link"><span className="order-id">{req.id}</span></Link></td>
                      <td><strong>{req.company}</strong></td>
                      <td>
                        <div className="route-cell">
                          <MapPin size={14} />
                          <span>{req.route}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`status-tag ${req.status.toLowerCase().replace(' ', '-')}`}>
                          {req.status}
                        </span>
                      </td>
                      <td>{req.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <aside className="dashboard-widgets">
            <div className="promo-card card">
              <h4>Need faster delivery?</h4>
              <p>Upgrade to Business Pro for priority handling and insurance.</p>
              <button className="btn btn-primary btn-sm">Upgrade Now</button>
            </div>
            
            <div className="activity-card card">
              <div className="card-header">
                <h3>Quick Actions</h3>
              </div>
              <div className="quick-actions-list">
                <Link to="/track" className="action-item">
                  <div className="action-icon"><Package size={18} /></div>
                  <span>Track Package</span>
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
