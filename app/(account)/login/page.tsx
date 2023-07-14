import React from "react";
import LoginForm from "./loginForm";

function Login() {
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
               <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                     <LoginForm />
                  </div>
               </div>
            </div>
         </section>
      </>
   );
}

export default Login;
