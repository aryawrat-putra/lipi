import { SidebarProvider, SidebarTrigger, SidebarInset } from "@repo/ui/components/sidebar";
import { Link, Outlet } from "react-router";
import { AppSidebar } from "../../../components/sidebar/app-sidebar";
import { Separator } from "@repo/ui/components/separator";
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

import { ModeToggle } from "../../../components/theme-toggle";
import Logo from "../../../components/logo";
import FileSearch from "../../../components/forms/file-search";

export default function DashboardLayout() {
    return (
        <section className="container mx-auto">
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    {/* Page Header */}
                    <header className="flex shrink-0 items-center justify-between gap-2 md:border-b px-4 sticky top-0 backdrop-blur-lg py-4 z-10">
                        <div className="flex gap-4 md:gap-6 items-center">
                            <SidebarTrigger className="ml-1" />
                            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-5" />
                        </div>

                        <span className="sm:hidden"><Logo /></span>

                        {/* Search Bar */}
                        <span className="lg:min-w-sm max-sm:hidden"><FileSearch /></span>

                        {/* User Menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size={'icon'}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Avatar>
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
                    </header>

                    {/* Page Starts */}
                    <main className="p-2">
                        <Outlet />
                    </main>

                </SidebarInset>
            </SidebarProvider >
        </section>

    )
}