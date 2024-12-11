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

const Navbar = () => {

    // const {
    //     state,
    //     open,
    //     setOpen,
    //     openMobile,
    //     setOpenMobile,
    //     isMobile,
    //     toggleSidebar,
    //     SIDEBAR_WIDTH
    //   } = useSidebar();

    // const [sidebarWidth, setSidebarWidth] = useState(isMobile ? '0px' : SIDEBAR_WIDTH);

    // useEffect(() => {
    //     if (isMobile == false) {   
    //       if (open === false) {
    //           setSidebarWidth('0px');
    //       } else {
    //           setSidebarWidth(SIDEBAR_WIDTH);
    //       }
    //     } else {
    //       setSidebarWidth('0px')
    //     }

    // }, [open, isMobile]);

    return (
        <>
        {/* <div className="transition-all fixed top-0 right-0 bg-background border-b h-12 z-50" style={{'--sidebar-width': sidebarWidth,width: 'calc(100% - var(--sidebar-width))'}}> */}
         <div className="transition-width duration-200 fixed top-0 right-0 bg-background border-b h-12 z-50 navbar-container w-full">
          <div className="flex flex-wrap w-full h-full items-center px-4 justify-end">
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
                    <Link href={route('profile.edit')}>
                      <DropdownMenuItem className="hover:cursor-pointer">
                          Profile
                      </DropdownMenuItem>
                    </Link>
                  <DropdownMenuItem>
                    Settings
                  </DropdownMenuItem>
                  <Link href={route('logout')} method='post' as='button' className='w-full'>
                    <DropdownMenuItem className="hover:cursor-pointer">
                        Log out
                    </DropdownMenuItem>
                   </Link>
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
