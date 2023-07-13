'use client'

import React, { useEffect, useState } from 'react'
import EditProductImage from './editImage';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { firestoredb } from '@/firebase/firebaseconfig';
import { doc, getDoc, collection, updateDoc, Timestamp } from 'firebase/firestore';
import Link from 'next/link';

interface TagType {
  tag1: string, 
  tag2: string, 
  tag3: string, 
  tag4: string,
}

interface AppType { 
  id: string,
  applicationImage: string,
  applicationName : string,
  applicationPublisher: string,
  applicationReleaseDate: Timestamp,
  tags: TagType,
  applicationPrice: number,
  applicationDownloadLink: string,
  applicationPlatform: Array<string>,
  currentEvent:string,
  eventDiscount: number,
}

interface FormDataType {
  applicationName: string;
  applicationImage:string;
  applicationPublisher: string;
  currentEvent:string;
  applicationPrice:number;
}

function EditProduct({ params }: { params: {id:string}}) {

  //Declare Variables
  const itemID = String(params.id);
  const router = useRouter();
  const [applicationName, setApplicationName] = useState<string>('');
  const [applicationDescription, setApplicationDescription] = useState<string>('');
  const [applicationPublisher, setApplicationPublisher] = useState<string>('');
  const [applicationReleaseDate, setApplicationReleaseDate] = useState<Timestamp>();
  const [applicationPrice, setApplicationPrice] = useState<number>();
  const [applicationPlatform, setApplicationPlatform] = useState<Array<string>>([]);
  const [appTags, setApplicationTags] = useState<TagType>({
                                                    tag1: '',
                                                    tag2: '',
                                                    tag3: '',
                                                    tag4: '',
                                                  });
  const [applicationImage, setApplicationImage] = useState<any>();
  const [currentEvent, setCurrentEvent] = useState<any>();
  const [eventDiscount, setEventDiscount] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState('');
    useEffect(() => {
      (async () => {
        const appRef = doc(firestoredb, 'applicationlist', itemID);
        const snapshots = await getDoc(appRef);
        const fetchedData = snapshots?.data();
        if (fetchedData) {
          setApplicationName(fetchedData.applicationName);
          setApplicationDescription(fetchedData.applicationDescription);
          setApplicationImage(fetchedData.applicationImage);
          setApplicationPublisher(fetchedData.applicationPublisher);
          setApplicationReleaseDate(fetchedData.applicationReleaseDate)
          setCurrentEvent(fetchedData.currentEvent);
          setEventDiscount(fetchedData.eventDiscount);
          setApplicationTags(fetchedData.tags);
          setApplicationPlatform(fetchedData.applicationPlatform)
          setApplicationPrice(fetchedData.applicationPrice);
        }
        console.log(fetchedData)
      })();
    }, [itemID]);

    const handleAppNameChange = (e:any) => {
      setApplicationName(e.target.value);
    };
  
    const handleAppDescriptionChange = (e:any) => {
      setApplicationDescription(e.target.value);
    };
  
    const handleAppPublisherChange = (e:any) => {
      setApplicationPublisher(e.target.value);
    };
    const handleAppReleaseDateChange = (e: any) => {
      const date = new Date(e.target.value);
      const timestamp = Timestamp.fromDate(date);
      setApplicationReleaseDate(timestamp);
    };
    const handleAppPrice = (e:any) => {
      setApplicationPrice(e.target.value);
    };
    const handleEventDiscount = (e:any) => {
      setEventDiscount(e.target.value);
    };
    const handleSpecialEvent = (e:any) => {
      setApplicationPrice(e.target.value);
    };
    const handlePlatformChange = (e: any) => {
      const { id, checked } = e.target;
      if (checked) {
        setApplicationPlatform((prevPlatforms) => [...prevPlatforms, id]);
      } else {
        setApplicationPlatform((prevPlatforms) => prevPlatforms.filter((platform) => platform !== id));
      }
    };
    const handleAppTagsChange = (e: any) => {
      const { name, value } = e.target;
      setApplicationTags((prevTags) => ({
        ...prevTags,
        [name]: value,
      }));
    }
  
    const handleImageUpload = async (e: any) => {
      setApplicationImage(e.target.files[0]);
    };

  //Form Control - Submit Edit
    const handleEditProduct = (async (event:any) => {
        event.preventDefault();
        
        await updateDoc(doc(collection(firestoredb, 'applicationlist'), itemID), {
          applicationName,
          applicationDescription,
          applicationImage,
          applicationPublisher,
          applicationReleaseDate,
          currentEvent,
          eventDiscount,
          tags: appTags,
          applicationPlatform,
          applicationPrice,
        });
      
        setApplicationName('');
        setApplicationDescription('');
        setApplicationImage(null);
        setApplicationPublisher('');
        setCurrentEvent('');
        setEventDiscount(0);
        setApplicationPrice(0);
        setApplicationPlatform([]);
        setApplicationTags({tag1:'', tag2:'', tag3:'', tag4:''});
        setAlert('Application successfuly Edited!');
        router.push('/admin/product/edit')
        
    })

  return (
    <>
      <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-center text-3xl font-semibold text-slate-600 text-[28px] mb-8">Edit Application Data</h2>
        {alert && <p>{alert}</p>}
        <form onSubmit={handleEditProduct}>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label htmlFor="image" className="block text-sm font-medium leading-6 text-slate-500">
                Application Image
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-slate-300/25 px-6 py-10">
                {applicationImage ? (
                  <>
                  <label
                    htmlFor="image-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <div className='h-[500px]'>
                    <Image 
                    src={applicationImage} 
                    alt="" 
                    className="object-cover border rounded-lg"
                    width={240}
                    height={120} 
                    />
                    </div>
                    <input id="image-upload" name="image-upload" type="file" className="sr-only" onChange={handleImageUpload} />
                  </label>
                  </>
                ) : (
                  <div className="text-center">
                    <button className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="image-upload"
                        className="relative cursor-pointer rounded-md  font-semibold text-sky-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input id="image-upload" name="image-upload" type="file" className="sr-only" onChange={handleImageUpload} />
                      </label>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                  </div>
                )}
            </div>
          </div>
          <div className="sm:col-span-4">
              <label htmlFor="appname" className="block text-sm font-medium leading-6 text-slate-500">
                Application Name:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="appname"
                    id="appname"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white/75 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    value={applicationName} 
                    onChange={handleAppNameChange}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="appname" className="block text-sm font-medium leading-6 text-slate-500">
                Application Description:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="appname"
                    id="appname"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white/75 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    value={applicationDescription} 
                    onChange={handleAppDescriptionChange}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="publisher" className="block text-sm font-medium leading-6 text-slate-500">
                Application Publisher:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="publisher"
                    id="publisher"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white/75 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    value={applicationPublisher} 
                    onChange={handleAppPublisherChange}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="releasedate" className="block text-sm font-medium leading-6 text-slate-500">
                Application Release Date:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="datetime-local"
                    name="releasedate"
                    id="releasedate"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white/75 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    onChange={handleAppReleaseDateChange}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="currentEvent" className="block text-sm font-medium leading-6 text-slate-500">
                Current Event
              </label>
              <div className="mt-2">
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                  <input
                    type="text"
                    name="currentEvent"
                    id="currentEvent"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white/75 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    defaultValue={currentEvent}
                    onChange={handleSpecialEvent}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="discount" className="block text-sm font-medium leading-6 text-slate-500">
                Event Discount:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="number"
                    name="discount"
                    id="discount"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white/75 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    value={eventDiscount} 
                    onChange={handleEventDiscount}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-slate-500">
                Application Price:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white/75 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    value={applicationPrice} 
                    onChange={handleAppPrice}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="border-b border-gray-900/10 pb-12 pt-5">
          <h2 className="text-base font-semibold leading-7 text-slate-500">Application Tags</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="tag1" className="block text-sm font-medium leading-6 text-slate-500">
                Tag 1
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="tag1"
                    id="tag1"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white/75 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    value={appTags?.tag1} 
                    onChange={handleAppTagsChange}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="tag2" className="block text-sm font-medium leading-6 text-slate-500">
                Tag 2
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="tag2"
                    id="tag2"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white/75 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    value={appTags?.tag2} 
                    onChange={handleAppTagsChange}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="tag3" className="block text-sm font-medium leading-6 text-slate-500">
                Tag 3
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="tag3"
                    id="tag3"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white/75 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    value={appTags?.tag3} 
                    onChange={handleAppTagsChange}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="tag4" className="block text-sm font-medium leading-6 text-slate-500">
                Tag 4
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="tag4"
                    id="tag4"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white/75 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    value={appTags?.tag4} 
                    onChange={handleAppTagsChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-slate-500">Platforms</h2>

          <div className="mt-10 space-y-10">
            <fieldset>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                  <input
                    id="windows"
                    name="platform"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    checked={applicationPlatform.includes('windows')}
                    onChange={handlePlatformChange}
                  />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="comments" className="font-medium text-slate-500">
                      Windows
                    </label>
                    <p className="text-white/75">Windows OS</p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                  <input
                    id="linux"
                    name="platform"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    checked={applicationPlatform.includes('linux')}
                    onChange={handlePlatformChange}
                  />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="candidates" className="font-medium text-slate-500">
                      Linux
                    </label>
                    <p className="text-white/75">Linux OS</p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                  <input
                    id="android"
                    name="platform"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    checked={applicationPlatform.includes('android')}
                    onChange={handlePlatformChange}
                  />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="offers" className="font-medium text-slate-500">
                      Android
                    </label>
                    <p className="text-white/75">Android OS</p>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
          <div className="flex justify-center">
            <button className="px-4 py-2 rounded-full bg-green-600 text-white">
              Save
            </button>
            <Link href='/admin/products' className="px-4 py-2 rounded-full bg-blue-600 text-white">
              Back
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default EditProduct;