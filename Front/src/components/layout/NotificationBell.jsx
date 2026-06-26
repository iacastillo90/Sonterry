import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNotifications, useMarkNotificationRead, useMarkAllNotificationsRead, useDeleteNotification, useDeleteAllNotifications } from '../../queries/useNotifications';
import { useAuthStore } from '../../store/authStore';
import { formatDate } from '../../utils/formatDate';

const NotificationBell = ({ asAdmin = false }) => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { data } = useNotifications(asAdmin);
  const { mutate: markRead } = useMarkNotificationRead();
  const { mutate: markAllRead } = useMarkAllNotificationsRead();
  const { mutate: deleteNotification } = useDeleteNotification();
  const { mutate: deleteAllNotifications } = useDeleteAllNotifications();

  const notifications = data?.notifications || [];
  const unreadCount = data?.unreadCount || 0;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const handleNotificationClick = (notif) => {
    if (!notif.isRead) {
      markRead({ id: notif._id, asAdmin });
    }
    setIsOpen(false);
    if (notif.link) {
      navigate(notif.link);
    }
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    deleteNotification({ id, asAdmin });
  };

  const handleDeleteAll = () => {
    deleteAllNotifications({ asAdmin });
  };

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      <button 
        className="nav-action-btn"
        onClick={() => setIsOpen(!isOpen)}
        style={{ position: 'relative', border: 'none', background: 'transparent' }}
      >
        <div style={{ position: 'relative', display: 'flex' }}>
          <Bell size={22} color="var(--green-deep)" />
          {unreadCount > 0 && (
            <span className="nav-cart-badge">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </div>
        <span>Alertas</span>
      </button>

      {isOpen && (
        <div className="animate-fade-in" style={{
          position: 'absolute',
          top: 'calc(100% + 5px)',
          right: '0',
          width: '320px',
          backgroundColor: '#FFF',
          borderRadius: '12px',
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
          border: '1px solid #E2E8F0',
          zIndex: 1000,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '400px'
        }}>
          <div style={{
            padding: '1rem',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#F8FAFC'
          }}>
            <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#0F172A' }}>Notificaciones</h4>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              {unreadCount > 0 && (
                <button 
                  onClick={() => markAllRead({ asAdmin })}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '0.75rem',
                    color: '#2563EB',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.2rem',
                    fontWeight: 600
                  }}
                  title="Marcar todo como leído"
                >
                  <Check size={14} /> Leer
                </button>
              )}
              {notifications.length > 0 && (
                <button 
                  onClick={handleDeleteAll}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '0.75rem',
                    color: '#DC2626',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.2rem',
                    fontWeight: 600
                  }}
                  title="Eliminar todas las notificaciones"
                >
                  <Trash2 size={14} /> Limpiar
                </button>
              )}
            </div>
          </div>

          <div style={{ overflowY: 'auto', flex: 1 }}>
            {notifications.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#64748B' }}>
                <Bell size={24} style={{ opacity: 0.5, marginBottom: '0.5rem' }} />
                <p style={{ margin: 0, fontSize: '0.85rem' }}>No tienes notificaciones</p>
              </div>
            ) : (
              notifications.map(notif => (
                <div 
                  key={notif._id}
                  onClick={() => handleNotificationClick(notif)}
                  style={{
                    padding: '1rem',
                    borderBottom: '1px solid #F1F5F9',
                    backgroundColor: notif.isRead ? '#FFF' : '#EFF6FF',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = notif.isRead ? '#F8FAFC' : '#DBEAFE'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = notif.isRead ? '#FFF' : '#EFF6FF'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: notif.isRead ? 600 : 700, color: '#0F172A' }}>
                      {notif.title}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {!notif.isRead && <span style={{ width: '8px', height: '8px', backgroundColor: '#3B82F6', borderRadius: '50%', flexShrink: 0, marginTop: '4px' }}></span>}
                      <button 
                        onClick={(e) => handleDelete(e, notif._id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#94A3B8',
                          cursor: 'pointer',
                          padding: '2px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '4px',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.color = '#DC2626'; e.currentTarget.style.backgroundColor = '#FEE2E2'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                        title="Eliminar"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <p style={{ margin: '0 0 0.4rem 0', fontSize: '0.8rem', color: '#475569', lineHeight: 1.4 }}>
                    {notif.message}
                  </p>
                  <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>
                    {formatDate(notif.createdAt)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
