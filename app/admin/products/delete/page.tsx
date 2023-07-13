'use client'

import React, { useState } from 'react';
import { collection, doc, deleteDoc } from 'firebase/firestore';
import { firestoredb } from '@/firebase/firebaseconfig';
import { useRouter } from 'next/navigation';


function DeleteApplication({ ItemID }:any) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteDoc(doc(collection(firestoredb, 'applicationlist'), ItemID));
      console.log('Deleted');
    } catch (error) {
      console.error('Failed:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      className='px-4 py-2 rounded-full bg-red-600 text-white'
      disabled={isDeleting}
      onClick={handleDelete}
    >
      {isDeleting ? 'Deleting Application...' : 'Delete'}
    </button>
  );
};

export default DeleteApplication;