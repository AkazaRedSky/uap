import Link from 'next/link';
import React, { FC } from 'react';
import { buttonVariants } from './buttoncomponent';
import Welcome from './navbar/welcome';
import AdminNavbar from './navbar/admin';

export default function Navbar() {

  return (
    <>
    <nav>
    <div className='fixed backdrop-blur-sm bg-white/75 dark:bg-slate-900 z-50 top-0 left-0 right-0 h-20 border-b border-slate-300 dark:border-slate-700 shadow-sm flex item-center justify-between'>
        <div className='container max-w-7x1 mx-auto w-full flex justify-between items-center'>
            <Link href='/dashboard' className={buttonVariants({variant: 'link'})}>
                UAP 1.1
            </Link>
        </div>
        <div className='hidden md:flex gap-4 items-center'>
            <Link href='/dashboard' className={buttonVariants({variant: 'ghost'})}>
                Home
            </Link>
        </div>
        <AdminNavbar />           
        <Welcome />
    </div>
    </nav>
    </>
  )
}