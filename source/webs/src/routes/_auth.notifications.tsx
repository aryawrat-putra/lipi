import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/notifications')({
    component: RouteComponent,
})

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Bell, BellOff, FileText, GitPullRequest, MessageSquare, AlertCircle, Info } from 'lucide-react'
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import type { NotificationsT } from '@/helpers/types'
import NotificationCard from '@/components/cards/notification-card'

function RouteComponent() {
    const [notifications, setNotifications] = useState<NotificationsT[]>(initialNotifications)
    const [filter, setFilter] = useState<'all' | 'unread'>('all')

    const unreadCount = notifications.filter(n => !n.read).length

    const markAsRead = (id: string) => {
        setNotifications(prev =>
            prev.map(n => (n.id === id ? { ...n, read: true } : n))
        )
    }

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    }

    if (initialNotifications.length > 1) {
        return (
            <main className="min-h-screen py-4">
                <Tabs value={filter} onValueChange={(v) => setFilter(v as 'all' | 'unread')} className="w-full sm:w-auto">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-8 max-sm:flex-wrap max-sm:gap-2">
                        <h1 className="text-xl max-md:w-full md:text-2xl">
                            Notifications {unreadCount > 0 && (
                                <Badge variant="secondary">{unreadCount} new</Badge>
                            )}
                        </h1>

                        <div className="flex items-center gap-2 md:gap-4 max-sm:w-full max-sm:justify-between">
                            {unreadCount > 0 && (
                                <Button variant="outline" onClick={markAllAsRead}>
                                    <BellOff className="mr-2 h-4 w-4" />
                                    Mark all as read
                                </Button>
                            )}

                            <TabsList>
                                <TabsTrigger value="all">All</TabsTrigger>
                                <TabsTrigger value="unread">
                                    Unread
                                    {unreadCount > 0 && (
                                        <span className="ml-1.5 text-xs">({unreadCount})</span>
                                    )}
                                </TabsTrigger>
                            </TabsList>
                        </div>
                    </div>

                    <TabsContent value="all">
                        <div className="space-y-4">
                            {initialNotifications.map((notification) => (
                                <button
                                    key={notification.id}
                                    onClick={() => !notification.read && markAsRead(notification.id)}
                                    className={cn(
                                        "w-full text-left transition-all",
                                        !notification.read && "cursor-pointer"
                                    )}
                                >
                                    <NotificationCard key={notification.id} {...notification} />
                                </button>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="unread">
                        <div className="space-y-4">
                            {initialNotifications
                                .filter((n) => n.read !== true)
                                .map((notification) => (
                                    <button
                                        key={notification.id}
                                        onClick={() => markAsRead(notification.id)}
                                        className={cn(
                                            "w-full text-left transition-all",
                                            !notification.read && "cursor-pointer"
                                        )}
                                    >
                                        <NotificationCard {...notification} />
                                    </button>
                                ))}
                        </div>

                    </TabsContent>
                </Tabs>
            </main >
        )
    } else {
        return (
            <Empty className="my-16">
                <EmptyHeader>
                    <EmptyMedia variant="icon"><BellOff /></EmptyMedia>
                    <EmptyTitle>No Notification Yet</EmptyTitle>
                    <EmptyDescription>
                        You haven&apos;t got any notification yet.
                    </EmptyDescription>
                </EmptyHeader>
            </Empty>
        )
    }
};


const initialNotifications: NotificationsT[] = [
  {
    id: '1',
    type: 'update',
    title: 'Documentation Updated',
    description: 'The API reference documentation has been updated with new endpoints and examples.',
    timestamp: '2 minutes ago',
    read: false,
    icon: FileText
  },
  {
    id: '2',
    type: 'info',
    title: 'New Comment on Your Issue',
    description: 'Sarah Chen replied to your issue #234 regarding the authentication flow.',
    timestamp: '1 hour ago',
    read: false,
    icon: MessageSquare
  },
  {
    id: '3',
    type: 'success',
    title: 'Pull Request Merged',
    description: 'Your pull request #156 "Add dark mode support" has been successfully merged.',
    timestamp: '3 hours ago',
    read: false,
    icon: GitPullRequest
  },
  {
    id: '4',
    type: 'warning',
    title: 'API Rate Limit Warning',
    description: 'You have used 80% of your API rate limit for this billing period.',
    timestamp: '5 hours ago',
    read: true,
    icon: AlertCircle
  },
  {
    id: '5',
    type: 'info',
    title: 'System Maintenance Scheduled',
    description: 'Scheduled maintenance will occur on Saturday, 2:00 AM - 4:00 AM UTC.',
    timestamp: '1 day ago',
    read: true,
    icon: Info
  },
  {
    id: '6',
    type: 'update',
    title: 'New Feature Released',
    description: 'Check out our new real-time collaboration features in the editor.',
    timestamp: '2 days ago',
    read: true,
    icon: Bell
  }
]