import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Link } from '@inertiajs/react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/Components/ui/dropdown-menu";
import { Menu } from 'lucide-react';

const Navbar = () => {

    return (
        <>
         <div className="transition-width duration-200 fixed top-0 right-0 bg-background border-b h-12 z-50 navbar-container w-full">
          <div className="flex flex-wrap w-full h-full items-center px-4 justify-between">
            <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-7 w-7 [&_svg]:size-5" size="icon" ><Menu strokeWidth={2.5} /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" sideOffset={15}>
              <DropdownMenuGroup>
                <DropdownMenuItem asChild className="hover:cursor-pointer">
                  <Link href={route('dashboard')}>
                    Home
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:cursor-pointer">
                  <Link href={route('products.index')}>
                    Product
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:cursor-pointer">
                  <Link href={route('categories.index')}>
                    Category
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:cursor-pointer">
                  <Link href={route('orders.index')}>
                    Order
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
            <div className="flex items-center">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Avatar className="w-7 h-7 self-center">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" sideOffset={15} align="end">
                <DropdownMenuGroup>
                    <DropdownMenuItem className="hover:cursor-pointer" asChild>
                      <Link href={route('logout')} method='post' as='button' className='w-full'>
                        Log out
                       </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
          </div>
         </div>
        </>
    );
}

export default Navbar;
