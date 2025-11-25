import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card"
import { Label } from "@repo/ui/components/label"
import { Separator } from "@repo/ui/components/separator"
import { Switch } from "@repo/ui/components/switch"
import { Button } from "@repo/ui/components/button"
import { Badge } from "@repo/ui/components/badge"
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/radio-group"
import { useState } from "react"

export function AdvancedSettings() {
  const [defaultVisibility, setDefaultVisibility] = useState("workspace")

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-lg font-bold tracking-tight text-foreground">Offline & Sync</h2>
                <p className="text-muted-foreground mt-2">Manage offline editing and synchronization settings.</p>
            </div>
            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Offline Mode */}
                <Card>
                    <CardHeader>
                        <CardTitle>Offline Mode</CardTitle>
                        <CardDescription>Work without internet connection</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="offline">Enable Offline Editing</Label>
                            <Switch id="offline" defaultChecked={true} />
                        </div>
                    </CardContent>
                </Card>

                {/* Sync Status */}
                <Card>
                    <CardHeader>
                        <CardTitle>Sync Status</CardTitle>
                        <CardDescription>Monitor your synchronization</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Last Synced</p>
                                <p className="text-sm text-muted-foreground">2 minutes ago</p>
                            </div>
                            <Badge>Synced</Badge>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Pending Changes</p>
                                <p className="text-sm text-muted-foreground">No pending changes</p>
                            </div>
                            <Button variant="outline" size="sm">
                                Resync
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Storage Management */}
                <Card>
                    <CardHeader>
                        <CardTitle>Storage Management</CardTitle>
                        <CardDescription>Manage local cache and database</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Local Cache Size</p>
                                <p className="text-sm text-muted-foreground">542 MB of 1 GB</p>
                            </div>
                            <Button variant="outline" size="sm">
                                Clear Cache
                            </Button>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">IndexedDB Usage</p>
                                <p className="text-sm text-muted-foreground">234 MB</p>
                            </div>
                            <Button variant="outline" size="sm">
                                Manage
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div>
                <h2 className="text-lg font-bold tracking-tight text-foreground">Access & Sharing</h2>
                <p className="text-muted-foreground mt-2">Set default sharing behavior for new documents.</p>
            </div>
            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Default Visibility */}
                <Card>
                    <CardHeader>
                        <CardTitle>Default Visibility for New Docs</CardTitle>
                        <CardDescription>Choose who can access new documents by default</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RadioGroup value={defaultVisibility} onValueChange={setDefaultVisibility}>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 p-3 border border-border rounded-md cursor-pointer hover:bg-muted">
                                    <RadioGroupItem value="private" id="private" />
                                    <Label htmlFor="private" className="cursor-pointer flex-1">
                                        <p className="font-medium">Private</p>
                                        <p className="text-xs text-muted-foreground">Only you can access</p>
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2 p-3 border border-border rounded-md cursor-pointer hover:bg-muted">
                                    <RadioGroupItem value="workspace" id="workspace" />
                                    <Label htmlFor="workspace" className="cursor-pointer flex-1">
                                        <p className="font-medium">Workspace</p>
                                        <p className="text-xs text-muted-foreground">All workspace members</p>
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2 p-3 border border-border rounded-md cursor-pointer hover:bg-muted">
                                    <RadioGroupItem value="public" id="public" />
                                    <Label htmlFor="public" className="cursor-pointer flex-1">
                                        <p className="font-medium">Public</p>
                                        <p className="text-xs text-muted-foreground">Anyone with link</p>
                                    </Label>
                                </div>
                            </div>
                        </RadioGroup>
                    </CardContent>
                </Card>

                {/* Permission Defaults */}
                <Card>
                    <CardHeader>
                        <CardTitle>Permission Defaults</CardTitle>
                        <CardDescription>Set default permissions for shared documents</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {[
                            { role: "Viewer", desc: "Can view only" },
                            { role: "Commenter", desc: "Can view and comment" },
                            { role: "Editor", desc: "Can edit" },
                        ].map((perm) => (
                            <div key={perm.role} className="flex items-center justify-between p-3 border border-border rounded-md">
                                <div>
                                    <p className="font-medium text-sm">{perm.role}</p>
                                    <p className="text-xs text-muted-foreground">{perm.desc}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Public Link Controls */}
                <Card>
                    <CardHeader>
                        <CardTitle>Public Link Controls</CardTitle>
                        <CardDescription>Restrict what people can do with public links</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="download">Allow Download</Label>
                            <Switch id="download" defaultChecked={true} />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <Label htmlFor="copy">Allow Copying</Label>
                            <Switch id="copy" defaultChecked={true} />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <Label htmlFor="duplicate">Allow Duplication</Label>
                            <Switch id="duplicate" defaultChecked={false} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
