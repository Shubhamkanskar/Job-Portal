import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import firebaseApp from "/src/firebase/firebase.config";
import { FaGoogle } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Login = () => {
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        alert(`Logged in as ${user.displayName}`);
      })
      .catch((error) => {
        console.error("Google Sign-in Error:", error.message);
      });
  };

  const handleEmailPasswordLogin = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      alert(`Logged in as ${user.email}`);
    } catch (error) {
      console.error("Email/Password Login Error:", error.message);
    }
  };

  const handleCreateAccount = async () => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;
      alert(`Account created and logged in as ${user.email}`);
    } catch (error) {
      console.error("Create Account Error:", error.message);
    }
  };

  return (
    <>
      <div className="h-screen w-full flex items-center justify-center">
        <div className="bg-white shadow-md rounded p-8 max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-6">Login</h2>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="bg-blue text-white px-4 py-2 rounded-md hover:bg-blue mr-2"
            onClick={handleEmailPasswordLogin}
          >
            Login
          </button>
          <Link to={"/SignUp"}>
            <button
              className="bg-blue text-white px-4 py-2 rounded-md hover:bg-blue mr-2"
              onClick={handleCreateAccount}
            >
              Create Account
            </button>
          </Link>
          <button
            className="bg-blue text-white px-10  py-2 rounded-md hover:bg-blue mr-2"
            onClick={handleGoogleLogin}
          >
            <FaGoogle className="h-6" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
