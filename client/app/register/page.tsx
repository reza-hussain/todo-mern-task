"use client";
import { registerUser } from "@/lib/user";
import { isValidEmail } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleRegister = async () => {
    if (!email.length || !password.length) {
      setError("All fields are mandatory");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    const response = await registerUser(email, password);

    console.log({ response });
  };

  return (
    <div className="w-[300px] max-w-xl mx-auto p-5 border border-gray-300 rounded-lg">
      <h2 className="text-2xl font-bold mb-5 text-center">Sign Up</h2>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <p className="mt-1 text-base text-red-500">{error}</p>

      <div className="text-center">
        <button
          onClick={handleRegister}
          className="w-full py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Signup
        </button>
        <p>
          Existing user? &nbsp;
          <em
            className="not-italic cursor-pointer text-blue-800"
            onClick={() => router.push("/login")}
          >
            Login
          </em>
        </p>
      </div>
    </div>
  );
};

export default Register;
