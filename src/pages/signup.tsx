import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiEye, HiEyeOff } from 'react-icons/hi'; 
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Import Firebase authentication methods
import { app } from '../../src/firebase/firebaseconfig';

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const auth = getAuth(app); // Initialize Firebase Authentication

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = async (data: FormData) => {
    try {
     
      
      // Firebase authentication - create user with email and password
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      
      window.alert('Signup successful!');
      router.push('/');
    } catch (error) {
      console.error('Error adding document: ', error);
      window.alert('Error signing up. Please try again.');
    }
  };

  return (
    <section className="bg-cover items-center justify-center"
    style={{ backgroundImage: `url("/images/bg1.jpg")` }}>
      <section className="bg-gray-50 dark:bg-gray-900"></section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" id="email" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} 
                  className={`bg-white-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                  focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.email && 'border-red-500'}`} 
                  placeholder="name@gmail.com" required />
                {errors.email && <p className="text-sm text-red-500 mt-1">Valid email is required</p>}
              </div>
              <div className="relative">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  {...register('password', { required: true, minLength: 8 })}
                  placeholder="••••••••"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                    focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.password && 'border-red-500'}`}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <HiEyeOff className="text-gray-400 mt-6" /> : <HiEye className="text-gray-400 mt-6" />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-red-500 mt-1">Password must be at least minimum of 8 characters</p>}
              
              <div className="relative">
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  {...register('confirmPassword', { required: true, minLength: 8 })}
                  placeholder="••••••••"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                    focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.confirmPassword && 'border-red-500'}`}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <HiEyeOff className="text-gray-400 mt-6" /> : <HiEye className="text-gray-400 mt-6" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">Confirm Password is required and must be at least 8 characters</p>}
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded 
                    bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 
                    dark:ring-offset-gray-800" required />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the{' '} 
                    <a className="font-medium text-black hover:underline dark:text-black" href="#">Terms and Conditions</a></label>
                </div>
              </div>
              <button type="submit" className="w-full text-white bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:outline-none 
                focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-gray-800 
                dark:focus:ring-primary-800">Create an account</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{' '} 
                <Link href="/" className="font-medium text-black hover:underline dark:text-black">Login here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
function addDoc(arg0: string, arg1: { email: string; password: string; confirmPassword: string; }) {
  throw new Error('Function not implemented.');
}
