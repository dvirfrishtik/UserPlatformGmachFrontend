'use client';

interface Notification {
  id: string;
  message: string;
  timestamp: string;
  link?: {
    text: string;
    url: string;
  };
  hasAccent?: boolean;
  accentText?: string;
}

interface NotificationsDropdownProps {
  notifications?: Notification[];
}

const defaultNotifications: Notification[] = [
  {
    id: "1",
    message: "תחזוקת מערכת: ביום ראשון בין 00:00–04:00 לא ניתן יהיה לגשת לאזור האישי",
    timestamp: "היום, 16:54",
    hasAccent: false,
  },
  {
    id: "2",
    message: "כעת ניתן להגיש בקשות הלוואה דרך מערכת האיזור האישי",
    timestamp: "15:50, 14.6.2015",
    link: {
      text: "לפרטים נוספים",
      url: "#",
    },
    hasAccent: true,
    accentText: "חדש!",
  },
  {
    id: "3",
    message: "חלפו שנתיים מאז אימות כתובת האימייל הנוכחית שלך, יש לאמת את הכתובת מחדש",
    timestamp: "12:05, 05.6.2015",
    link: {
      text: "מעבר לאימות כתובת אימייל >>",
      url: "#",
    },
  },
  {
    id: "4",
    message: "חלפו שנתיים מאז אימות מס׳ הנייד של שרה, יש לאמת את הכתובת מחדש",
    timestamp: "12:05, 05.6.2015",
    link: {
      text: "מעבר לאימות מס׳ טלפון >>",
      url: "#",
    },
  },
  {
    id: "5",
    message: "תחזוקת מערכת: ביום ראשון בין 00:00–04:00 לא ניתן יהיה לגשת לאזור האישי",
    timestamp: "היום, 16:54",
  },
];

export function NotificationsDropdown({ notifications = defaultNotifications }: NotificationsDropdownProps) {
  return (
    <div
      className="absolute top-full left-0 mt-2 bg-popover rounded-[var(--radius-card)] shadow-[var(--elevation-sm)] border border-border w-[400px] max-h-[500px] overflow-hidden z-50"
      dir="rtl"
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-border">
        <h4 className="text-popover-foreground text-right">עדכונים</h4>
      </div>

      {/* Notifications List */}
      <div className="overflow-y-auto max-h-[440px] notifications-scrollbar">
        {notifications.map((notification, index) => (
          <div
            key={notification.id}
            className={`px-6 py-4 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors ${
              index < 2 ? 'bg-accent/5' : ''
            }`}
          >
            <div className="flex flex-col gap-2 items-end">
              {/* Message */}
              <p className="text-popover-foreground text-sm text-right leading-[1.5]">
                {notification.accentText && (
                  <span className="inline-block bg-accent text-accent-foreground px-2 py-0.5 rounded-[var(--radius)] text-xs font-bold ml-2">
                    {notification.accentText}
                  </span>
                )}
                {notification.message}
              </p>

              {/* Link */}
              {notification.link && (
                <a
                  href={notification.link.url}
                  className="text-accent text-sm hover:underline text-right transition-all hover:opacity-80"
                >
                  {notification.link.text}
                </a>
              )}

              {/* Timestamp */}
              <p className="text-muted-foreground text-caption text-right">
                {notification.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
