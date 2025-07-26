import { useState } from "react";
import { User, Lock, MessageSquare , LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center px-4 py-10">
      <motion.div
        className="border border-cyan-400/20 flex flex-col lg:flex-row w-full max-w-5xl mx-auto backdrop-blur-md rounded-xl shadow-xl overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="w-full lg:w-1/2 p-4 sm:p-10 flex flex-col">
          {/* Logo */}
          <motion.div
            className="mb-6 flex items-center justify-start gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <MessageSquare className="size-9 text-cyan-400 animate-pulse" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 tracking-wider">
              Sova
            </span>
          </motion.div>

          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response?.data?.message}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="w-full">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white">Welcome Back</h2>
              <p className="text-sm text-gray-400">Sign in to your account</p>
            </div>

            <div className="flex flex-col gap-6">
              {/* Email */}
              <div className="form-control w-full">
                <label className="flex items-center gap-2 mb-2">
                  <User className="text-white size-4" />
                  <span className="text-white text-sm">Email</span>
                </label>
                <input
                  type="email"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                  placeholder="eg. name@123gmail.com"
                  required
                  className="input input-bordered w-full bg-slate-700 text-white border-slate-600"
                />
              </div>

              {/* Password */}
              <div className="form-control w-full">
                <label className="flex items-center gap-2 mb-2">
                  <Lock className="text-white size-4" />
                  <span className="text-white text-sm">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="********"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  required
                  className="input input-bordered w-full bg-slate-700 text-white border-slate-600"
                />
              </div>

              {/* Login Button */}
              <motion.button
                type="submit"
                className="btn btn-primary w-full text-white font-semibold"
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
                disabled={isPending}
              >
                
                {isPending ? (
                  <>
                    <span className="loading loading-spinner loading-xs"></span>
                    Signing in...
                  </>
                ) : (
                  "Login"
                )}
                <LogIn className="size-4 animate-pulse" />
              </motion.button>

              {/* Footer */}
              <div className="text-center mt-2">
                <p className="text-sm text-gray-400">
                  Don't have an account?
                  <Link
                    to="/signup"
                    className="text-cyan-400 ml-1 hover:underline"
                  >
                    Create account
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>

        <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-slate-800 to-slate-900 items-center justify-center">
          <div className="max-w-md p-8 flex flex-col items-center space-y-6">
            {/* Image at the top with styling */}
            <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/signup2.png"
                alt="Signup illustration"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Heading section */}
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
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
