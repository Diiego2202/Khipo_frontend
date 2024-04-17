"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Cadastro: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    const userData = {
      name,
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:8000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setErrorMessage("");
        setSuccessMessage("Cadastro realizado com sucesso!");
        setEmail("");
        setPassword("");
        setName("");
        setTimeout(() => {
          setSuccessMessage("");
          router.push("/");
        }, 2000);
      } else {
        setSuccessMessage("");
        setErrorMessage(data.message || "Erro ao cadastrar o usuário.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar o usuário:", error);
      setErrorMessage("Erro ao cadastrar o usuário. Tente novamente.");
    }
  };

  const handleLoginPage = () => {
    router.push("/");
  };

  return (
    <div className="bg-white p-8 rounded shadow-md w-[32rem]">
      <h1 className="text-2xl font-bold mb-4 text-black">Cadastro</h1>

      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      {successMessage && (
        <p className="text-green-500 mb-4">{successMessage}</p>
      )}

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Nome
        </label>
        <input
          className="border rounded w-full py-2 px-3 text-black"
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

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
          onClick={handleSignup}
        >
          Criar usuário
        </button>
        <button
          className="bg-blue-500 text-white rounded hover:bg-blue-600 py-2 w-full"
          onClick={handleLoginPage}
        >
          Voltar
        </button>
      </div>
    </div>
  );
};

export default Cadastro;
