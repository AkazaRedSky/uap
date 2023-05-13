'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { getCookie } from 'typescript-cookie';
import { firestoredb } from '../../../firebase/firestore';
import { auth } from '../../../firebase/firebaseAuth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = auth.currentUser;
    const username = getCookie('username')


    const checkUserAdmin = async () => {
      if (user) {
        const userColRef = collection(firestoredb, 'userdata');
        const q = query(userColRef, where('username', '==', username));
        const userSnap = await getDocs(q);
        const userDoc = userSnap.docs[0];
        if (userDoc.exists()) {
          setIsAdmin(userDoc.get("userType") === 'admin')
        } else {
          router.push('/404');
        }
      } else {
        router.push('/404'); 
      }
    };

    checkUserAdmin();
  }, [router]);
  
    return (
      <section>
        {children}
      </section>
    );
  }