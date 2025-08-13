export interface Notification {
  id: number;
  type: 'appointment' | 'reminder' | 'event' | 'notification';
  title: string;
  description: string;
  date: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
  status: 'upcoming' | 'scheduled' | 'urgent' | 'completed';
  participants: string[];
  location: string;
}

export interface NotificationsData {
  notifications: Notification[];
} 