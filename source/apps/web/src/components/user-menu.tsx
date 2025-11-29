import { Avatar, AvatarImage, AvatarFallback } from "@repo/ui/components/avatar";
import { BookOpen, DollarSign, ExternalLink, HelpCircle, LogOut, Settings, User, Users } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@repo/ui/components/tooltip";
import { Button } from "@repo/ui/components/button";
import { Link } from "react-router";
import { ModeToggle } from "./theme-toggle";

export default function UserMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size={'icon'}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Avatar className="size-10">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                        </TooltipTrigger>
                        <TooltipContent className="space-y-1">
                            <p>John Doe</p>
                            <p>mail@johndoe.com</p>
                        </TooltipContent>
                    </Tooltip>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-3xs space-y-2" align="end">
                <div className="px-2 py-3 border-b border-border">
                    <p className="font-semibold text-sm">John Doe</p>
                    <p className="text-xs text-muted-foreground truncate">doe@john.com</p>
                </div>

                <DropdownMenuGroup>
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link to={'/settings/profile'}>
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link to={'/settings'}>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuLabel>Other</DropdownMenuLabel>
                    <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link to='#'>
                            <DollarSign className="mr-2 h-4 w-4" />
                            <span>Pricing</span>
                            <ExternalLink className="ml-auto h-3 w-3 opacity-50" />
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link to='#'>
                            <BookOpen className="mr-2 h-4 w-4" />
                            <span>Documentation</span>
                            <ExternalLink className="ml-auto h-3 w-3 opacity-50" />
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link to='#'>
                            <Users className="mr-2 h-4 w-4" />
                            <span>Community Forum</span>
                            <ExternalLink className="ml-auto h-3 w-3 opacity-50" />
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link to='#'>
                            <HelpCircle className="mr-2 h-4 w-4" />
                            <span>Feedback</span>
                            <ExternalLink className="ml-auto h-3 w-3 opacity-50" />
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuLabel>Preferences</DropdownMenuLabel>
                    <div className="px-2 py-1.5"><ModeToggle /></div>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                {/* Sign Out */}
                <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" asChild>
                    <Link to={'/logout'}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sign Out</span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}