import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiEye, HiEyeOff } from 'react-icons/hi'; 
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase authentication method
import { app } from '../../src/firebase/firebaseconfig';
import { getAuth } from 'firebase/auth'; // Import getAuth to initialize Firebase Authentication


type FormData = {
  email: string;
  password: string;
};

const auth = getAuth(app); // Initialize Firebase Authentication

const Index = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: FormData) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password); // Firebase authentication
      router.push('/home');
    } catch (error) {
      console.error('Error signing in: ', error);
      window.alert('Invalid credentials. Please try again.');
    }
  };


  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url("/images/bg1.jpg")` }}>
      <div className="w-full max-w-md bg-white   rounded-lg shadow-lg p-8 dark:bg-pink-800">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-10">Login</h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Email Address</label>
            <input type="email" id="email" {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
              className={`w-full bg-white-100 border border-white-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
              focus:border-primary-600 p-2.5 bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 
              dark:focus:border-blue-500 ${errors.email && 'border-red-500'}`}
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
          <button type="submit" className="w-full bg-gray-600 hover:bg-gray-800 focus:outline-none 
           font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white dark:bg-primary-600 
          dark:hover:bg-gray-800">
            Log In
          </button>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
            Don't have an account?{' '}
            <Link href="/signup"
              className="font-medium text-black hover:underline dark:text-black">Signup
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Index;