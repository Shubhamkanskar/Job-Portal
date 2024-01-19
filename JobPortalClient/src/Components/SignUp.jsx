import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import firebaseApp from "/src/firebase/firebase.config";
import { FaGoogle } from "react-icons/fa";

const SignUp = () => {
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const handleGoogleSignUp = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        alert(`Signed up with Google as ${user.displayName}`);
      })
      .catch((error) => {
        console.error("Google Sign-up Error:", error.message);
      });
  };

  const handleEmailPasswordSignUp = async () => {
    try {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(result.user, { displayName });
      alert(`Account created and signed up as ${result.user.email}`);
    } catch (error) {
      console.error("Email/Password Sign-up Error:", error.message);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="bg-white shadow-md rounded p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-6">Create Account</h2>
        <div className="mb-4">
          <label
            htmlFor="displayName"
            className="block text-sm font-medium text-gray-600"
          >
            Display Name:
          </label>
          <input
            type="text"
            id="displayName"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Your display name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
        </div>
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
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-600"
          >
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          className="bg-blue text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
          onClick={handleEmailPasswordSignUp}
        >
          Create Account
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mr-2"
          onClick={handleGoogleSignUp}
        >
          Sign Up with Google
        </button>
      </div>
    </div>
  );
};

export default SignUp;
