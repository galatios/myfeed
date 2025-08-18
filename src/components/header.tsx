import { Home, Bell, MessageSquare, Users, Search, Newspaper } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export function Header() {
  return (
    <header className="sticky top-0 z-20 w-full border-b bg-card shadow-sm">
      <div className="container flex h-14 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Newspaper className="h-8 w-8 text-primary" />
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search feed" className="h-9 w-[250px] rounded-full bg-secondary pl-9" />
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="h-12 w-24 rounded-none border-b-2 border-primary text-primary">
            <Home className="h-7 w-7" />
          </Button>
          <Button variant="ghost" size="icon" className="h-12 w-24 rounded-lg text-muted-foreground hover:bg-secondary">
            <Users className="h-7 w-7" />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="secondary" size="icon" className="rounded-full">
            <MessageSquare className="h-5 w-5" />
          </Button>
          <Button variant="secondary" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className='h-9 w-9'>
                  <AvatarImage src="https://placehold.co/40x40.png?text=U" data-ai-hint="user avatar" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">User</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    user@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
