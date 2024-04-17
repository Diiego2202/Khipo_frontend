"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.statusCode == 200) {
      setErrorMessage("");
      router.push("/tasks");
    } else {
      setErrorMessage(data.message);
    }
  };

  const handleCadastro = () => {
    router.push("/cadastro");
  };

  return (
    <div className="bg-white p-8 rounded shadow-md w-[32rem]">
      <h1 className="text-2xl font-bold mb-4 text-black">Login</h1>

      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="border rounded w-full py-2 px-3 text-black"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Senha
        </label>
        <input
          className="border rounded w-full py-2 px-3 text-black"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <button
          className="bg-green-500 text-white rounded hover:bg-green-600 py-2 w-full"
          onClick={handleLogin}
        >
          Entrar
        </button>
        <button
          className="bg-blue-500 text-white rounded hover:bg-blue-600 py-2 w-full"
          onClick={handleCadastro}
        >
          Cadastrar
        </button>
      </div>
    </div>
  );
};

export default Login;
