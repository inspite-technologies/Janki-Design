"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-body transition-colors duration-300 bg-background-light dark:bg-background-dark">
      <div className="w-full max-w-6xl p-4 md:p-8 flex items-center justify-center">
        <div className="bg-surface-light dark:bg-surface-dark w-full max-w-[1000px] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] transition-colors duration-300 relative border border-gray-200 dark:border-primary/30">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

          {/* Left Side (Branding) */}
          <div className="hidden md:flex md:w-1/2 bg-maroon-gradient relative items-center justify-center p-12 text-center flex-col overflow-hidden">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(#FFD700 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            ></div>
            <div className="relative z-10 transform transition-transform duration-500 hover:scale-105">
              <div className="w-24 h-24 mx-auto mb-6 text-secondary">
                <span className="material-symbols-outlined text-[6rem] drop-shadow-lg leading-none">
                  spa
                </span>
              </div>
              <h1 className="font-display text-5xl font-bold text-secondary mb-2 tracking-wide drop-shadow-md">
                Janki
              </h1>
              <p className="font-display text-xl text-white tracking-[0.4em] uppercase opacity-90">
                Design
              </p>
            </div>
            <div className="relative z-10 mt-12 max-w-xs">
              <p className="text-white/80 font-light text-sm italic">
                "Elegance is not standing out, but being remembered."
              </p>
              <div className="w-16 h-px bg-secondary mx-auto mt-4 opacity-50"></div>
            </div>
          </div>

          {/* Right Side (Form) */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative bg-white dark:bg-surface-dark/50">
            <div className="md:hidden text-center mb-8">
              <span className="material-symbols-outlined text-5xl text-primary dark:text-secondary mb-2">
                spa
              </span>
              <h2 className="font-display text-3xl font-bold text-primary dark:text-secondary">
                Janki
              </h2>
              <p className="font-display text-xs text-gray-500 dark:text-gray-300 tracking-[0.3em] uppercase">
                Design
              </p>
            </div>
            <div className="mb-8">
              <h2 className="font-display text-3xl text-gray-800 dark:text-white mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Please enter your details to access the admin panel.
              </p>
            </div>
            <form action="#" className="space-y-6" method="POST">
              <div className="space-y-1">
                <label
                  className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 ml-1"
                  htmlFor="role"
                >
                  Select Role
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <span className="material-symbols-outlined text-[20px]">
                      badge
                    </span>
                  </span>
                  <select
                    className="block w-full pl-10 pr-3 py-3 text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm appearance-none"
                    id="role"
                    name="role"
                    defaultValue=""
                  >
                    <option disabled value="">
                      Choose your role...
                    </option>
                    <option value="super_admin">Super Admin</option>
                    <option value="manager">Store Manager</option>
                    <option value="tailor">Master Tailor</option>
                    <option value="inventory">Inventory Clerk</option>
                  </select>
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                    <span className="material-symbols-outlined text-[20px]">
                      expand_more
                    </span>
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <label
                  className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 ml-1"
                  htmlFor="username"
                >
                  Username or Email
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <span className="material-symbols-outlined text-[20px]">
                      person
                    </span>
                  </span>
                  <input
                    className="block w-full pl-10 pr-3 py-3 text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm placeholder-gray-400"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    type="text"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center ml-1">
                  <label
                    className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <Link
                    href="#"
                    className="text-xs text-primary dark:text-secondary hover:underline font-medium"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <span className="material-symbols-outlined text-[20px]">
                      lock
                    </span>
                  </span>
                  <input
                    className="block w-full pl-10 pr-10 py-3 text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm placeholder-gray-400"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? "visibility" : "visibility_off"}
                    </span>
                  </button>
                </div>
              </div>
              <button
                className="w-full bg-primary hover:bg-[#5a001c] text-white font-display font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform active:scale-[0.98] transition-all duration-200 flex items-center justify-center group"
                type="submit"
              >
                <span>Secure Login</span>
                <span className="material-symbols-outlined ml-2 text-sm transform group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </form>
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-400 dark:text-gray-500">
                © 2026 Janki Design. All rights reserved.<br />
                Protected by reCAPTCHA and subject to the Privacy Policy and
                Terms of Service.
              </p>
            </div>
          </div>
        </div>
        <button
          className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-yellow-400 hover:scale-110 transition-transform z-50 cursor-pointer"
          onClick={toggleTheme}
          aria-label="Toggle Dark Mode"
        >
          <span className="material-symbols-outlined block dark:hidden">
            dark_mode
          </span>
          <span className="material-symbols-outlined hidden dark:block">
            light_mode
          </span>
        </button>
      </div>
    </div>
  );
}
