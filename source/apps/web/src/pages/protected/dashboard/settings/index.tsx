import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/tabs"
import { UserRoundPen, Palette, FolderSync, BellRing } from 'lucide-react'
import { ProfileSettings } from "../../../../components/forms/settings/profile"
import { PreferencesSettings } from "../../../../components/forms/settings/preferences"
import { NotificationSettings } from "../../../../components/forms/settings/notifications"
import { AdvancedSettings } from "../../../../components/forms/settings/advanced"

export default function SettingsPage() {
  return (
    <main className="min-h-screen py-4">
      <Tabs defaultValue="profile">

        {/* Header */}
        <div className="flex items-center justify-between mb-8 gap-4 max-sm:flex-wrap max-sm:gap-2">
          <h1 className="text-xl max-md:w-full md:text-2xl">
            Settings
          </h1>

          <div className="flex items-center gap-2 md:gap-4 max-sm:w-full max-sm:justify-between">
            <TabsList className='flex-wrap h-auto md:space-x-2 lg:space-x-4 max-sm:space-y-1'>
              <TabsTrigger value="profile"><UserRoundPen className="mr-1 text-muted-foreground" /> Profile</TabsTrigger>
              <TabsTrigger value="preferences"><Palette className="mr-1 text-muted-foreground" />Preferences</TabsTrigger>
              <TabsTrigger value="notifications"><BellRing className="mr-1 text-muted-foreground" />Notifications</TabsTrigger>
              <TabsTrigger value="advanced"><FolderSync className="mr-1 text-muted-foreground" />Advanced</TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="profile"><ProfileSettings /></TabsContent>
        <TabsContent value="preferences"><PreferencesSettings/></TabsContent>
        <TabsContent value="notifications"><NotificationSettings/></TabsContent>
        <TabsContent value="advanced"><AdvancedSettings/></TabsContent>
      </Tabs>
    </main >
  )
}