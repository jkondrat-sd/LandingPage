import React, { useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="text-red-600 text-sm">{errorMessages.message}</div>
    );

  const errors = {
    email: "invalid email",
    password: "invalid password",
  };
  const userDatabase = [
    {
      email: "puskomdkpp@gmail.com",
      password: "puskom123",
    },
    {
      email: "adminpuskom@email.com",
      password: "admin123",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    let { email, password } = document.forms[0];

    const userData = userDatabase.find((user) => user.email === email.value);

    if (userData) {
      if (userData.password !== password.value) {
        setErrorMessages({ name: "password", message: errors.password });
      } else {
        setIsSubmitted(true);
      }
    } else {
      setErrorMessages({ name: "email", message: errors.email });
    }
  };

  let router = useRouter();
  const handleLogin = () => {
    if (isSubmitted) {
      router.push("/admin");
    }
  };

  return (
    <div className="bg-white flex flex-col justify-center items-center">
      <div className="bg-white px-8 sm:px-12 w-full xs:w-full sm:w-auto md:w-auto lg:w-auto xl:w-auto h-screen sm:h-auto py-8">
        <div className="w-full p-4">
          <h1 className="font-lora font-bold text-center text-3xl leading-10 text-neutral-blue-gray">
            Masuk ke SI MAWAS PAGI
          </h1>
          <p className="text-base font-lato text-neutral-blue-gray text-center">
            Gunakan email anda untuk masuk ke Halaman Admin
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 px-0 py-4">
            <div>
              <label className="font-lato text-neutral-blue-gray text-base">
                Email
              </label>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="font-medium text-2xl text-gray-600 absolute p-2.5 px-3 w-11"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                className="py-2 pl-10 border border-gray-200 w-full"
                placeholder="Email"
                type="email"
                name="email"
                required
              />
              {renderErrorMessage("email")}
            </div>
            <div>
              <label className="font-lato text-neutral-blue-gray text-base">
                Kata Sandi
              </label>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="font-medium text-2xl text-gray-600 absolute p-2.5 px-3 w-11"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <input
                className="py-2 pl-10 border border-gray-200 w-full"
                placeholder="Masukkan Kata Sandi"
                type="password"
                name="password"
                required
              />
              {renderErrorMessage("password")}
            </div>
            <div>
              <label className="block text-gray-500" htmlFor="remember">
                <input
                  className="mr-2 leading-tight"
                  type="checkbox"
                  id="remember"
                  name="remember"
                />
                <span className="text-sm font-lato text-neutral-blue-gray">
                  Ingat saya
                </span>
              </label>
            </div>
            <div className="w-full">
              <button
                className="mt-4 mb-3 w-full bg-green-700 hover:bg-green-500 text-white py-2 rounded-sm transition duration-100"
                onClick={handleLogin}
              >
                Masuk
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
