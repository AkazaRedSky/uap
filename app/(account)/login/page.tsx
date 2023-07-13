"use client";

import React, { useState } from "react";
import { auth } from "@/firebase/firebaseAuth";
import { firestoredb } from "@/firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { setCookie } from "typescript-cookie";
import { collection, getDocs, query, where } from "firebase/firestore";

function Login() {
   const [username, setUsername] = useState<string>("");
   const [password, setPassword] = useState<string>("");
   const [error, setError] = useState<any>("");
   const router = useRouter();

   const handleLogin = async (event: any) => {
      event.preventDefault();
      try {
         // Retrieve user email  based on username
         const usersColRef = collection(firestoredb, "userdata");
         const q = query(usersColRef, where("username", "==", username));
         const querySnapshot = await getDocs(q);
         if (querySnapshot.empty) {
            setError("User not found");
            return;
         }
         const userDoc = querySnapshot.docs[0];
         const email = userDoc.get("userEmail");

         // Log in user and obtain Firebase Authentication token
         const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
         );
         const user = userCredential.user;
         const usertoken = await user.getIdToken();

         setCookie("username", username);
         setCookie("email", email);
         setCookie("token", usertoken);

         console.log(user);
         router.push("/dashboard");
      } catch (error: any) {
         const errorMessage = error.message;
         setError(errorMessage);
         console.log(errorMessage);
      }
   };

   return (
      <>
         <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
               <a
                  href="#"
                  className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
               >
                  Login
               </a>
               <div
                  className="w-full bg-white 
        rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
               >
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                     <form
                        className="space-y-4 md:space-y-6"
                        onSubmit={handleLogin}
                     >
                        <div>
                           <label
                              htmlFor="username"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                           >
                              Username
                           </label>
                           <input
                              type="text"
                              name="username"
                              id="username"
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              required
                              value={username}
                              onChange={(event) =>
                                 setUsername(event.target.value)
                              }
                           />
                        </div>
                        <div>
                           <label
                              htmlFor="password"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                           >
                              Password
                           </label>
                           <input
                              type="password"
                              name="password"
                              id="password"
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              required
                              value={password}
                              onChange={(event) =>
                                 setPassword(event.target.value)
                              }
                           />
                           <p className="text-end text-sm font-light text-gray-500 dark:text-gray-400">
                              <a
                                 href="#"
                                 className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                              >
                                 Forgot Password
                              </a>
                           </p>
                        </div>
                        {/* <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Captcha
                </label>
                
              </div> */}
                        <button
                           type="submit"
                           className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                           Login
                        </button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                           Don&apos;t have an account?
                           <a
                              href="/register"
                              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                           >
                              Create Account
                           </a>
                        </p>
                     </form>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
}

export default Login;
