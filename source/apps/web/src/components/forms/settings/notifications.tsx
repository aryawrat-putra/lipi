import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card"
import { Label } from "@repo/ui/components/label"
import { Separator } from "@repo/ui/components/separator"
import { Switch } from "@repo/ui/components/switch"

export function NotificationSettings() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-lg font-bold tracking-tight text-foreground">Notifications</h2>
                <p className="text-muted-foreground mt-2">Manage how you receive notifications across all channels.</p>
            </div>
            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Document Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle>Document Activity</CardTitle>
                        <CardDescription>Get notified about document changes</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="comments">Comments</Label>
                            <Switch id="comments" defaultChecked={true} />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <Label htmlFor="mentions">Mentions</Label>
                            <Switch id="mentions" defaultChecked={true} />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <Label htmlFor="approvals">Approvals</Label>
                            <Switch id="approvals" defaultChecked={true} />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <Label htmlFor="shared">Shared with You</Label>
                            <Switch id="shared" defaultChecked={true} />
                        </div>
                    </CardContent>
                </Card>

                {/* Workspace Notifications */}
                <Card>
                    <CardHeader>
                        <CardTitle>Workspace Notifications</CardTitle>
                        <CardDescription>Notifications about team activities</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="invites">Member Invites</Label>
                            <Switch id="invites" defaultChecked={true} />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <Label htmlFor="roles">Role Changes</Label>
                            <Switch id="roles" defaultChecked={true} />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <Label htmlFor="admin-alerts">Admin Alerts</Label>
                            <Switch id="admin-alerts" defaultChecked={true} />
                        </div>
                    </CardContent>
                </Card>

                {/* Email Notifications */}
                <Card>
                    <CardHeader>
                        <CardTitle>Email Notifications</CardTitle>
                        <CardDescription>Control email notification frequency</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="digest">Digest</Label>
                            <Switch id="digest" defaultChecked={true} />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <Label htmlFor="updates">Individual Updates</Label>
                            <Switch id="updates" defaultChecked={false} />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <Label htmlFor="security-alerts">Security Alerts</Label>
                            <Switch id="security-alerts" defaultChecked={true} />
                        </div>
                    </CardContent>
                </Card>

                {/* Push Notifications */}
                <Card>
                    <CardHeader>
                        <CardTitle>Push Notifications</CardTitle>
                        <CardDescription>Web and PWA notifications</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="push-enabled">Enable Push Notifications</Label>
                            <Switch id="push-enabled" defaultChecked={true} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
