import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { authClient } from "@/lib/auth-client"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Controller, useForm } from "react-hook-form"
import { ProfileUpdateSchema, EmailUpdateSchema, PasswordUpdateSchema } from "@/types"
import { toast } from "sonner"

import { compressFileToBase64 } from "@/helpers"
import type z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Field, FieldGroup, FieldLabel, FieldError, FieldDescription } from "@/components/ui/field"
import ImageUpload from "@/components/forms/file-upload-default"
import { Spinner } from "@/components/ui/spinner"
import { useState } from "react"

export function ProfileSettings() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-lg font-bold tracking-tight text-foreground">Profile</h2>
                <p className="text-muted-foreground mt-2">Manage your personal information and account details.</p>
            </div>
            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Profile Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Update your name and profile picture</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ProfileInfoSection />
                    </CardContent>
                </Card>

                {/* Email & Password */}
                <Card>
                    <CardHeader>
                        <CardTitle>Email Address</CardTitle>
                        <CardDescription>
                            We'll send a verification link to your new email before switching
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <EmailSection />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Password</CardTitle>
                        <CardDescription>Use a strong password you don't use elsewhere</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <PasswordSection />
                    </CardContent>
                </Card>
            </div>

            <div>
                <h2 className="text-lg font-bold tracking-tight text-foreground">Encryption & Privacy</h2>
                <p className="text-muted-foreground mt-2">Manage your encryption keys and privacy controls.</p>
            </div>
            <Separator />
            <EncryptionSection />

            <div>
                <h2 className="text-lg font-bold tracking-tight text-foreground">Delete Account</h2>
                <p className="text-muted-foreground mt-2">Permanently delete your account and all associated data. This cannot be undone.</p>
            </div>
            <Separator />

            <DangerZoneSection />
        </div>
    )

}

function ProfileInfoSection() {
    const user = authClient.useSession().data?.user;

    const form = useForm<z.infer<typeof ProfileUpdateSchema>>({
        resolver: zodResolver(ProfileUpdateSchema),
        defaultValues: { name: user?.name, image: undefined },
    })

    async function onSubmit({ name, image }: z.infer<typeof ProfileUpdateSchema>) {
        const updates: { name?: string; image?: string } = {}

        if (name !== user?.name) updates.name = name

        if (image) {
            const base64Image = await compressFileToBase64(image)
            updates.image = base64Image
        }

        if (Object.keys(updates).length === 0) {
            toast.info("No changes to save")
            return
        }

        await authClient.updateUser(updates, {
            onSuccess: () => { toast.success("Profile updated successfully") },
            onError: (ctx) => { toast.error(ctx.error.message) },
        })
    }

    const avatarFallback = user?.name
        ?.split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) ?? "?"

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                {/* Avatar Preview */}
                <div className="flex items-center gap-4 mb-2">
                    <Avatar className="size-14">
                        <AvatarImage
                            src={user?.image ?? ""}
                            alt={`${user?.name}'s avatar`}
                        />
                        <AvatarFallback className="text-sm font-medium">
                            {avatarFallback}
                        </AvatarFallback>
                    </Avatar>
                    <div className="text-sm text-muted-foreground">
                        <p className="font-medium text-foreground">{user?.name}</p>
                        <p>{user?.email}</p>
                    </div>
                </div>

                {/* Profile Image Upload */}
                <Controller
                    name="image"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Profile Picture</FieldLabel>
                            <ImageUpload
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                {/* Full Name */}
                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="profile-name">Full Name</FieldLabel>
                            <Input
                                {...field}
                                id="profile-name"
                                type="text"
                                placeholder="John Doe"
                                aria-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Field>
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting && <Spinner />}
                        Save Changes
                    </Button>
                </Field>
            </FieldGroup>
        </form>
    )

}

// TODO : Enable change email
function EmailSection() {
    const user = authClient.useSession().data?.user;

    const form = useForm<z.infer<typeof EmailUpdateSchema>>({
        resolver: zodResolver(EmailUpdateSchema),
        defaultValues: { email: user?.email },
    })

    async function onSubmit({ email }: z.infer<typeof EmailUpdateSchema>) {
        if (email === user?.email) {
            toast.info("That's already your current email")
            return
        }

        await authClient.changeEmail(
            { newEmail: email, callbackURL: "/settings" },
            {
                onSuccess: () => {
                    toast.success("Verification email sent — check your inbox");
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message);
                },
            }
        )
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="settings-email">Email</FieldLabel>
                            <Input
                                {...field}
                                id="settings-email"
                                type="email"
                                placeholder={user?.email}
                                aria-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Field>
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting && <Spinner />}
                        Change Email
                    </Button>
                </Field>
            </FieldGroup>
        </form>
    )
}

function PasswordSection() {
    const form = useForm<z.infer<typeof PasswordUpdateSchema>>({
        resolver: zodResolver(PasswordUpdateSchema),
        defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
    })

    async function onSubmit({ currentPassword, newPassword }: z.infer<typeof PasswordUpdateSchema>) {
        await authClient.changePassword(
            { currentPassword, newPassword, revokeOtherSessions: true },
            {
                onSuccess: () => {
                    toast.success("Password updated successfully")
                    form.reset()
                },
                onError: (ctx) => { toast.error(ctx.error.message) },
            }
        )
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <Controller
                    name="currentPassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="current-password">Current Password</FieldLabel>
                            <Input
                                {...field}
                                id="current-password"
                                type="password"
                                placeholder="********"
                                aria-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="newPassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="new-password">New Password</FieldLabel>
                            <Input
                                {...field}
                                id="new-password"
                                type="password"
                                placeholder="********"
                                aria-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            <FieldDescription>At least 8 characters</FieldDescription>
                        </Field>
                    )}
                />

                <Controller
                    name="confirmPassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="confirm-password">Confirm New Password</FieldLabel>
                            <Input
                                {...field}
                                id="confirm-password"
                                type="password"
                                placeholder="********"
                                aria-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Field>
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting && <Spinner />}
                        Update Password
                    </Button>
                </Field>
            </FieldGroup>
        </form>
    )
}

// TODO : enable delete user 
function DangerZoneSection() {
    const [isDeleting, setIsDeleting] = useState(false)

    async function handleDeleteAccount() {
        setIsDeleting(true)
        await authClient.deleteUser(
            { callbackURL: "/" },
            {
                onSuccess: () => { toast.success("Account deleted") },
                onError: (ctx) => {
                    if (ctx.error.message === '') {
                        toast.error('Error deleting account! Please try again.')
                    } else {
                        toast.error(ctx.error.message)
                    }
                    setIsDeleting(false)
                },
            }
        )
    }

    return (
        <CardContent>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="destructive">Delete Account</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This will permanently delete your account, all your documents, encryption
                            keys, and settings. This action cannot be reversed.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button
                            variant={'destructive'}
                            onClick={handleDeleteAccount}
                            disabled={isDeleting}
                        >
                            {isDeleting && <Spinner />}
                            Delete my account
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </CardContent>
    )
}

function EncryptionSection() {
    // TODO : update real values
    const [privacySettings, setPrivacySettings] = useState({
        telemetry: false,
        documentAnalytics: true,
        aiPrivacy: true,
        requirePassphrase: true,
    })

    function handleToggle(key: keyof typeof privacySettings) {
        setPrivacySettings((prev) => {
            const updated = { ...prev, [key]: !prev[key] }
            // TODO: persist via authClient.updateUser({ metadata: { privacy: updated } })
            // or your own API endpoint
            toast.success("Privacy setting updated")
            return updated
        })
    }

    function handleClearVault() {
        // TODO: clear in-memory decrypted keys from your vault store
        toast.success("Vault cleared — decrypted keys removed from memory")
    }

    async function handleRotateKeys() {
        // TODO: call your key rotation API
        toast.success("Encryption keys rotated")
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Key Fingerprint */}
            <Card>
                <CardHeader>
                    <CardTitle>Encryption Keys</CardTitle>
                    <CardDescription>Your end-to-end encryption configuration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <Label>Key Fingerprint</Label>
                            <Badge variant="secondary">Active</Badge>
                        </div>
                        <code className="bg-muted p-3 rounded-md text-xs block font-mono text-foreground break-all">
                            A7B4:C9D2:E1F5:8G2H:I3J4:K5L6:M7N8:O9P0
                        </code>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                        <Button variant="outline" onClick={handleRotateKeys}>
                            Rotate Keys
                        </Button>
                        <p className="text-xs text-muted-foreground">
                            Generates new keys. Old keys remain valid during transition.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Backup & Recovery */}
            <Card>
                <CardHeader>
                    <CardTitle>Backup & Recovery</CardTitle>
                    <CardDescription>Safely store your encryption keys offline</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        Keep your recovery key somewhere safe — you'll need it if you lose access.
                    </p>
                    <div className="flex gap-2 flex-wrap">
                        <Button variant="outline">Backup Recovery Key</Button>
                        <Button variant="outline">Export Encrypted Backup</Button>
                    </div>
                </CardContent>
            </Card>

            {/* Local Vault */}
            <Card>
                <CardHeader>
                    <CardTitle>Local Vault</CardTitle>
                    <CardDescription>Manage decrypted keys stored in memory</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium">Clear Decrypted Keys</p>
                            <p className="text-xs text-muted-foreground">
                                Wipes all decrypted keys from browser memory
                            </p>
                        </div>
                        <Button variant="outline" size="sm" onClick={handleClearVault}>
                            Clear
                        </Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <Label htmlFor="passphrase-toggle" className="cursor-pointer">
                            Require Passphrase on Open
                        </Label>
                        <Switch
                            id="passphrase-toggle"
                            checked={privacySettings.requirePassphrase}
                            onCheckedChange={() => handleToggle("requirePassphrase")}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Privacy Controls */}
            <Card>
                <CardHeader>
                    <CardTitle>Privacy Controls</CardTitle>
                    <CardDescription>Control what data is collected and shared</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {[
                        {
                            id: "telemetry",
                            label: "Telemetry",
                            key: "telemetry" as const,
                        },
                        {
                            id: "doc-analytics",
                            label: "Document Analytics",
                            key: "documentAnalytics" as const,
                        },
                        {
                            id: "ai-privacy",
                            label: "AI Usage Privacy",
                            key: "aiPrivacy" as const,
                        },
                    ].map(({ id, label, key }, i, arr) => (
                        <div key={id}>
                            <div className="flex items-center justify-between">
                                <Label htmlFor={id} className="cursor-pointer">
                                    {label}
                                </Label>
                                <Switch
                                    id={id}
                                    checked={privacySettings[key]}
                                    onCheckedChange={() => handleToggle(key)}
                                />
                            </div>
                            {i < arr.length - 1 && <Separator className="mt-4" />}
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}
