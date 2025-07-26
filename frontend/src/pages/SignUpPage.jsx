import { MessageSquare } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";
import useSignUp from "../hooks/useSignUp.js";
import { motion } from "framer-motion";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border border-cyan-400/20 flex flex-col lg:flex-row w-full max-w-5xl mx-auto backdrop-blur-md rounded-xl shadow-xl overflow-hidden"
      >
        {/* SIGNUP FORM */}
        <div className="w-full lg:w-1/2 p-4 flex sm:p-8 flex-col">
          {/* LOGO */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 flex items-center justify-start gap-2"
          >
            <MessageSquare className="size-9 text-cyan-400" />
            <div>
              <h1 className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 tracking-wider">
                Sova
              </h1>
              <p className="text-sm text-gray-300 opacity-70">
                Connect Seamlessly. Anywhere, Anytime.
              </p>
            </div>
          </motion.div>

          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response?.data?.message}</span>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-5">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">
                Create an account to proceed
              </h2>
            </div>

            {/* FULL NAME */}
            <div className="form-control w-full">
              <label className="label mb-1">
                <span className="label-text text-white">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your Full Name"
                className="input input-bordered w-full bg-slate-700 text-white border-slate-600"
                value={signupData.fullname}
                onChange={(e) =>
                  setSignupData({ ...signupData, fullname: e.target.value })
                }
                required
              />
            </div>

            {/* EMAIL */}
            <div className="form-control w-full">
              <label className="label mb-1">
                <span className="label-text text-white">Email</span>
              </label>
              <input
                type="email"
                placeholder="eg. name@123gmail.com"
                className="input input-bordered w-full bg-slate-700 text-white border-slate-600"
                value={signupData.email}
                onChange={(e) =>
                  setSignupData({ ...signupData, email: e.target.value })
                }
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="form-control w-full">
              <label className="label mb-1">
                <span className="label-text text-white">Password</span>
              </label>
              <input
                type="password"
                placeholder="*********"
                className="input input-bordered w-full bg-slate-700 text-white border-slate-600"
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
                required
              />
              <p className="text-xs text-center text-gray-300 mt-1">
                Password must be at least 6 characters long
              </p>
            </div>

            {/* TERMS CHECKBOX */}
            <div className="form-control mt-2">
              <label className="label cursor-pointer justify-start gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-primary"
                  required
                />
                <span className="text-xs text-gray-300 leading-tight">
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="text-cyan-400 hover:underline"
                  >
                    terms of service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-cyan-400 hover:underline">
                    privacy policy
                  </Link>
                </span>
              </label>
            </div>

            {/* SUBMIT BUTTON */}
            <motion.button
              type="submit"
              className="btn btn-primary w-full text-white font-semibold"
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Loading...
                </>
              ) : (
                "Create account"
              )}
            </motion.button>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="text-cyan-400 hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* ILLUSTRATION SECTION */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-slate-800 to-slate-900 items-center justify-center"
        >
          <div className="max-w-md p-8 flex flex-col items-center space-y-6">
            <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/signup2.png"
                alt="Signup illustration"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="text-center space-y-3">
              <h2 className="text-2xl font-bold text-white">
                Join a World of Real-Time Communication
              </h2>
              <p className="text-gray-300">
                Seamless video calls and messaging — connect with anyone,
                anywhere.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
