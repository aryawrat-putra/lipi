import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card"
import { Button } from "@repo/ui/components/button"
import { Input } from "@repo/ui/components/input"
import { Label } from "@repo/ui/components/label"
import { Separator } from "@repo/ui/components/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar"
import { useState } from "react"
import { Badge } from "@repo/ui/components/badge"
import { Switch } from "@repo/ui/components/switch"

export function ProfileSettings() {
    const [profile, setProfile] = useState({
        name: "John Doe",
        username: "johndoe",
        email: "john@example.com",
        bio: "Product designer and developer",
    })

    return ( 
        <div className="space-y-8">
            <div>
                <h2 className="text-lg font-bold tracking-tight text-foreground">Profile</h2>
                <p className="text-muted-foreground mt-2">Manage your personal information and account details.</p>
            </div>
            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Profile Picture */}
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Picture</CardTitle>
                        <CardDescription>Upload a photo to personalize your account</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center gap-6">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src="https://avatar.vercel.sh/jd" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="flex gap-2">
                            <Button variant="outline">Upload</Button>
                            <Button variant="ghost">Remove</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Profile Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Keep your profile up to date</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4">
                            <div>
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    value={profile.name}
                                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    value={profile.username}
                                    onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="bio">Bio</Label>
                                <Input
                                    id="bio"
                                    value={profile.bio}
                                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                    className="mt-1"
                                />
                            </div>
                        </div>
                        <Button>Save Changes</Button>
                    </CardContent>
                </Card>


                {/* Email & Password */}
                <Card>
                    <CardHeader>
                        <CardTitle>Email & Password</CardTitle>
                        <CardDescription>Update your email or change your password</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                value={profile.email}
                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                className="mt-1"
                            />
                            <p className="text-xs text-muted-foreground mt-2">We'll send verification to your new email</p>
                        </div>
                        <Button>Change Email</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Password</CardTitle>
                        <CardDescription>Ensure your account stays secure with a strong password</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline">Change Password</Button>
                    </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="border-destructive/20 bg-destructive/5">
                    <CardHeader>
                        <CardTitle className="text-destructive">Delete Account</CardTitle>
                        <CardDescription>This action cannot be undone. Please be certain.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="destructive">Delete Account</Button>
                    </CardContent>
                </Card>
            </div>

            <div>
                <h2 className="text-lg font-bold tracking-tight text-foreground">Encryption & Privacy</h2>
                <p className="text-muted-foreground mt-2">Manage your encryption keys and privacy controls.</p>
            </div>
            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Encryption Keys */}
                <Card>
                    <CardHeader>
                        <CardTitle>Encryption Keys</CardTitle>
                        <CardDescription>Your end-to-end encryption configuration</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <Label>Key Fingerprint</Label>
                                <Badge>Active</Badge>
                            </div>
                            <code className="bg-muted p-3 rounded-md text-sm block font-mono text-foreground overflow-clip">
                                A7B4:C9D2:E1F5:8G2H:I3J4:K5L6:M7N8:O9P0
                            </code>
                        </div>
                        <Separator />
                        <div className="space-y-2">
                            <Button>Rotate Keys</Button>
                            <p className="text-xs text-muted-foreground">
                                Generate new encryption keys. Your old keys will remain valid.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Backup & Recovery */}
                <Card>
                    <CardHeader>
                        <CardTitle>Backup & Recovery</CardTitle>
                        <CardDescription>Safely backup your encryption keys</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label>Recovery Key</Label>
                            <p className="text-sm text-muted-foreground mb-3">
                                Store this key in a safe place. You'll need it to recover your account.
                            </p>
                            <div className="flex gap-2 flex-wrap">
                                <Button variant="outline">Backup Recovery Key</Button>
                                <Button variant="outline">Export Encrypted Backup</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Local Vault */}
                <Card>
                    <CardHeader>
                        <CardTitle>Local Vault</CardTitle>
                        <CardDescription>Manage decrypted keys in memory</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Clear Decrypted Keys</p>
                                <p className="text-sm text-muted-foreground">Remove all decrypted keys from memory</p>
                            </div>
                            <Button variant="outline">Clear</Button>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <Label htmlFor="passphrase">Require Passphrase on App Open</Label>
                            <Switch id="passphrase" defaultChecked={true} />
                        </div>
                    </CardContent>
                </Card>

                {/* Privacy Controls */}
                <Card>
                    <CardHeader>
                        <CardTitle>Privacy Controls</CardTitle>
                        <CardDescription>Manage your data and privacy settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="telemetry">Telemetry</Label>
                            <Switch id="telemetry" defaultChecked={false} />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <Label htmlFor="analytics">Document Analytics</Label>
                            <Switch id="analytics" defaultChecked={true} />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <Label htmlFor="ai-privacy">AI Usage Privacy</Label>
                            <Switch id="ai-privacy" defaultChecked={true} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
