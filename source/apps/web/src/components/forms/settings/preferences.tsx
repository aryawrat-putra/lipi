import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card"
import { Label } from "@repo/ui/components/label"
import { Separator } from "@repo/ui/components/separator"
import { Switch } from "@repo/ui/components/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select"
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/radio-group"
import { useTheme } from "../../../state/theme-provider"

export function PreferencesSettings() {
    const { setTheme, theme } = useTheme()

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-lg font-bold tracking-tight text-foreground">Appearance</h2>
                <p className="text-muted-foreground mt-2">Customize how the app looks and feels.</p>
            </div>
            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Theme */}
                <Card>
                    <CardHeader>
                        <CardTitle>Theme</CardTitle>
                        <CardDescription>Choose your preferred color scheme</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RadioGroup value={theme} onValueChange={setTheme}>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 p-3 border border-border rounded-md cursor-pointer hover:bg-muted">
                                    <RadioGroupItem value="light" id="light" />
                                    <Label htmlFor="light" className="cursor-pointer flex-1">
                                        <p className="font-medium">Light</p>
                                        <p className="text-xs text-muted-foreground">Bright and clean interface</p>
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2 p-3 border border-border rounded-md cursor-pointer hover:bg-muted">
                                    <RadioGroupItem value="dark" id="dark" />
                                    <Label htmlFor="dark" className="cursor-pointer flex-1">
                                        <p className="font-medium">Dark</p>
                                        <p className="text-xs text-muted-foreground">Easy on the eyes</p>
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2 p-3 border border-border rounded-md cursor-pointer hover:bg-muted">
                                    <RadioGroupItem value="system" id="system" />
                                    <Label htmlFor="system" className="cursor-pointer flex-1">
                                        <p className="font-medium">System</p>
                                        <p className="text-xs text-muted-foreground">Match your device settings</p>
                                    </Label>
                                </div>
                            </div>
                        </RadioGroup>
                    </CardContent>
                </Card>

                {/* UI Elements */}
                <Card>
                    <CardHeader>
                        <CardTitle>UI Elements</CardTitle>
                        <CardDescription>Toggle interface components</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="sidebar">Show Sidebars</Label>
                            <Switch id="sidebar" defaultChecked={true} />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <Label htmlFor="toolbar">Show Editing Toolbar</Label>
                            <Switch id="toolbar" defaultChecked={true} />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div>
                <h2 className="text-lg font-bold tracking-tight text-foreground">Editor</h2>
                <p className="text-muted-foreground mt-2">Configure your editing experience and AI features.</p>
            </div>
            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Editor Preferences */}
                <Card>
                    <CardHeader>
                        <CardTitle>Editor Preferences</CardTitle>
                        <CardDescription>Customize how blocks behave</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="default-block">Default Block Type</Label>
                            <Select defaultValue="paragraph">
                                <SelectTrigger id="default-block" className="mt-1">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="paragraph">Paragraph</SelectItem>
                                    <SelectItem value="heading">Heading</SelectItem>
                                    <SelectItem value="list">List</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <Label htmlFor="auto-format">Auto-formatting</Label>
                            <Switch id="auto-format" defaultChecked={true} />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <Label htmlFor="smart-lists">Smart Lists</Label>
                            <Switch id="smart-lists" defaultChecked={true} />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <Label htmlFor="markdown">Markdown Shortcuts</Label>
                            <Switch id="markdown" defaultChecked={true} />
                        </div>
                    </CardContent>
                </Card>

                {/* AI Features */}
                <Card>
                    <CardHeader>
                        <CardTitle>AI Features</CardTitle>
                        <CardDescription>Manage AI writing assistance</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="ai-writing">Enable AI Writing Tools</Label>
                            <Switch id="ai-writing" defaultChecked={true} />
                        </div>
                        <Separator />
                        <div>
                            <Label htmlFor="ai-model">AI Model</Label>
                            <Select defaultValue="gpt4">
                                <SelectTrigger id="ai-model" className="mt-1">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="gpt4">GPT-4</SelectItem>
                                    <SelectItem value="gpt35">GPT-3.5</SelectItem>
                                    <SelectItem value="claude">Claude</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <Label htmlFor="ai-privacy">Content Audit & Privacy</Label>
                            <Switch id="ai-privacy" defaultChecked={true} />
                        </div>
                    </CardContent>
                </Card>


                {/* Autosave */}
                <Card>
                    <CardHeader>
                        <CardTitle>Autosave</CardTitle>
                        <CardDescription>Automatically save your work</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="autosave-interval">Autosave Interval</Label>
                            <Select defaultValue="1000">
                                <SelectTrigger id="autosave-interval" className="mt-1">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="500">Every 500ms</SelectItem>
                                    <SelectItem value="1000">Every 1 second</SelectItem>
                                    <SelectItem value="5000">Every 5 seconds</SelectItem>
                                    <SelectItem value="10000">Every 10 seconds</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Separator />
                        <div>
                            <Label htmlFor="conflict-mode">Conflict Resolution Mode</Label>
                            <Select defaultValue="manual">
                                <SelectTrigger id="conflict-mode" className="mt-1">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="manual">Manual</SelectItem>
                                    <SelectItem value="auto">Automatic</SelectItem>
                                    <SelectItem value="latest">Latest Version</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
