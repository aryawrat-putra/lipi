import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { NotificationsT } from '@/helpers/types';
import { cn } from '@/lib/utils';

const getAlertVariant = (type: NotificationsT['type']) => {
    if (type === 'warning') return 'destructive'
    return 'default'
}


export default function NotificationCard({ description, icon, read, timestamp, title, type }: NotificationsT) {
    const Icon = icon;

    return (
        <Alert
            variant={getAlertVariant(type)}
            className={cn(
                "relative transition-all hover:shadow-sm",
                !read && "border-l-4 border-l-primary bg-accent/30"
            )}
        >
            <Icon className="h-4 w-4" />
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <AlertTitle className="flex items-center gap-2">
                        {title}
                        {!read && (
                            <span className="h-2 w-2 rounded-full bg-primary" />
                        )}
                    </AlertTitle>
                    <AlertDescription className="mt-1">
                        {description}
                    </AlertDescription>
                    <p className="mt-2 text-xs text-muted-foreground">
                        {timestamp}
                    </p>
                </div>
            </div>
        </Alert>
    )
}