import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { BookOpen, CircleUser, DollarSign, ExternalLink, HelpCircle, LogOut, Settings, User, Users } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ModeToggle } from "@/components/interactive/theme-toggle";
import { authClient } from "@/lib/auth-client"

export default function UserMenu() {
    const user = authClient.useSession().data?.user;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size={'icon'}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            {user?.image === '' ? (
                                <CircleUser className="size-6 opacity-80" />
                            ) : (
                                <Avatar className="size-8">
                                    <AvatarImage src={user?.image!} alt={`${user?.name}'s Avatar Image`} />
                                    <AvatarFallback className='uppercase text-xs'>{user?.name.split(' ')[0][0]}.{user?.name.split(' ')[1][0]}.</AvatarFallback>
                                </Avatar>
                            )}
                        </TooltipTrigger>
                        <TooltipContent className="space-y-1">
                            <p className="capitalize">{user?.name}</p>
                            <p className="lowercase">{user?.email}</p>
                        </TooltipContent>
                    </Tooltip>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-3xs space-y-2" align="end">
                <div className="px-2 py-3 border-b border-border">
                    <p className="font-semibold text-sm">{user?.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
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
                        <Link to='/'>
                            <DollarSign className="mr-2 h-4 w-4" />
                            <span>Pricing</span>
                            <ExternalLink className="ml-auto h-3 w-3 opacity-50" />
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link to='/'>
                            <BookOpen className="mr-2 h-4 w-4" />
                            <span>Documentation</span>
                            <ExternalLink className="ml-auto h-3 w-3 opacity-50" />
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link to='/'>
                            <Users className="mr-2 h-4 w-4" />
                            <span>Community Forum</span>
                            <ExternalLink className="ml-auto h-3 w-3 opacity-50" />
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link to='/'>
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
                <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" variant={'destructive'} asChild>
                    <Link to="/logout">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sign Out</span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}