'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { buttonVariants } from '../buttoncomponent';
import { firestoredb } from '@/firebase/firestore';
import { auth } from '@/firebase/firebaseAuth';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getCookie } from 'typescript-cookie';

interface userType {
    userType: string;
}

export default function AdminNavbar() {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
      const user = auth.currentUser;
      const username = String(getCookie('username'));

      const checkUserAdmin = async () => {
        if (user) {
          const userColRef = collection(firestoredb, 'userdata');
          const q = query(userColRef, where('username', '==', username));
          const userSnap = await getDocs(q);
          const userDoc = userSnap.docs[0];
          if (userDoc.exists()) {
            setIsAdmin(userDoc.get("userType") === 'admin')
          }
        }
      };


      const unsubscribe = onAuthStateChanged(auth, () => {
        checkUserAdmin();
      });
  
      return () => {
        unsubscribe();
      };
    }, [auth, getCookie, firestoredb, onAuthStateChanged]);

  return (
    <>
    {isAdmin && (
        <>
            <div className='hidden md:flex gap-4 items-center'>
                <Link href='/admin/product' className={buttonVariants({variant: 'ghost'})}>
                    Products
                </Link>
            </div>  
            <div className='hidden md:flex gap-4 items-center whitespace-nowrap'>
                <p className={buttonVariants({variant: 'ghost'})}>
                    Audit Logs (Disabled)
                </p>
            </div>  
            <div className='hidden md:flex gap-4 items-center whitespace-nowrap'>
                <p className={buttonVariants({variant: 'ghost'})}>
                    Download Storage (Disabled)
                </p>
            </div>
        </>
    )}  
    </>
  )
}
