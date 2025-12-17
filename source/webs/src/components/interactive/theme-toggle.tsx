import { Monitor, Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    ButtonGroup,
    ButtonGroupSeparator,
    ButtonGroupText,
} from "@/components/ui/button-group"
import { useTheme } from "@/components/providers/theme-provider"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export function ModeToggle() {
    const { setTheme, theme } = useTheme()

    return (
        <ButtonGroup
            orientation="horizontal"
            aria-label="Media controls"
            className="h-fit"
        >
            <ButtonGroupText>Mode</ButtonGroupText>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant={theme === 'dark' ? "outline" : "secondary"} size="icon" onClick={() => setTheme("dark")}>
                        <Moon />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Dark</TooltipContent>
            </Tooltip>
            <ButtonGroupSeparator />
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant={theme === 'light' ? "outline" : "secondary"} size="icon" onClick={() => setTheme("light")}>
                        <Sun />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Light</TooltipContent>
            </Tooltip>
            <ButtonGroupSeparator />
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant={theme === 'system' ? "outline" : "secondary"} size="icon" onClick={() => setTheme("system")}>
                        <Monitor />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>System</TooltipContent>
            </Tooltip>
        </ButtonGroup >
    )
}