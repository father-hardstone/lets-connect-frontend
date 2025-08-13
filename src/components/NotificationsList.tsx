import React, { useState, useEffect, useRef } from 'react';
import { Notification } from '../types/notification';
import notificationsData from '../data/notifications.json';

const NotificationsList: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [fadeRanges, setFadeRanges] = useState<{ [key: number]: number }>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Filter notifications for today and tomorrow
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const todayStr = today.toISOString().split('T')[0];
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    
    const filteredNotifications = (notificationsData.notifications as Notification[]).filter(
      notification => notification.date === todayStr || notification.date === tomorrowStr
    );
    
    // Sort by priority and time
    const sortedNotifications = filteredNotifications.sort((a, b) => {
      const priorityOrder: Record<string, number> = { high: 3, medium: 2, low: 1 };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      
      // If same priority, sort by time
      return a.time.localeCompare(b.time);
    });
    
    setNotifications(sortedNotifications);
  }, []);

  // Calculate fade opacity based on card position
  const calculateFadeOpacity = (cardElement: HTMLElement) => {
    if (!scrollContainerRef.current) return 1;
    
    const container = scrollContainerRef.current;
    const containerRect = container.getBoundingClientRect();
    const cardRect = cardElement.getBoundingClientRect();
    
    // Calculate how much of the card is below the visible area
    const cardBottom = cardRect.bottom;
    const containerBottom = containerRect.bottom;
    
    // Start fading when card bottom is 100px from container bottom
    const fadeStartDistance = 100;
    const fadeDistance = 80; // Distance over which to fade
    
    if (cardBottom > containerBottom - fadeStartDistance) {
      const distanceFromBottom = containerBottom - cardBottom;
      const fadeAmount = Math.max(0, (distanceFromBottom + fadeStartDistance) / fadeDistance);
      return Math.max(0.3, Math.min(1, fadeAmount)); // Minimum opacity of 0.3
    }
    
    return 1;
  };

  // Update fade opacities on scroll
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const cards = scrollContainerRef.current.querySelectorAll('[data-notification-card]');
    const newFadeRanges: { [key: number]: number } = {};
    
    cards.forEach((card, index) => {
      const opacity = calculateFadeOpacity(card as HTMLElement);
      newFadeRanges[index] = opacity;
    });
    
    setFadeRanges(newFadeRanges);
  };

  // Initial fade calculation
  useEffect(() => {
    setTimeout(handleScroll, 100); // Small delay to ensure DOM is ready
  }, [notifications]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ff6b6b';
      case 'medium': return '#ffd93d';
      case 'low': return '#6bcf7f';
      default: return '#ffffff';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'appointment': return '📅';
      case 'reminder': return '⏰';
      case 'event': return '🎉';
      case 'notification': return '🔔';
      default: return '📋';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    }
    return date.toLocaleDateString();
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      padding: '20px',
      backgroundColor: 'transparent',
      borderRadius: '12px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      animation: 'slideInFromBottom 0.5s ease-out',
      position: 'relative',
    }}>
      <div 
        ref={scrollContainerRef}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          paddingTop: '20px',
          paddingBottom: '20px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          position: 'relative',
          zIndex: 1,
        }}
        onScroll={handleScroll}
      >
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        
        {notifications.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: 'rgba(255, 255, 255, 0.7)',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📭</div>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>
              No notifications for today or tomorrow
            </p>
          </div>
        ) : (
          notifications.map((notification, index) => (
            <div
              key={notification.id}
              data-notification-card
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '16px',
                border: `1px solid rgba(255, 255, 255, 0.2)`,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                backdropFilter: 'blur(10px)',
                animation: `fadeInFromBottom 0.5s ease-out ${index * 0.1}s both`,
                opacity: fadeRanges[index] ?? 1,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginBottom: '12px',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}>
                  <span style={{ fontSize: '1.2rem' }}>
                    {getTypeIcon(notification.type)}
                  </span>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: getPriorityColor(notification.priority),
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    padding: '4px 8px',
                    borderRadius: '6px',
                  }}>
                    {notification.priority}
                  </span>
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  textAlign: 'right',
                }}>
                  <div style={{ fontWeight: 600 }}>{formatDate(notification.date)}</div>
                  <div>{notification.time}</div>
                </div>
              </div>

              <h4 style={{
                margin: '0 0 8px 0',
                fontSize: '1rem',
                fontWeight: 600,
                color: '#ffffff',
                lineHeight: '1.3',
              }}>
                {notification.title}
              </h4>

              <p style={{
                margin: '0 0 12px 0',
                fontSize: '0.85rem',
                color: 'rgba(255, 255, 255, 0.8)',
                lineHeight: '1.4',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
                {notification.description}
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.7)',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}>
                  <span>📍</span>
                  <span style={{
                    maxWidth: '140px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {notification.location}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}>
                  <span>👥</span>
                  <span>{notification.participants.length}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes slideInFromBottom {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeInFromBottom {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOutToBottom {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(100%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default NotificationsList; 