// app/(auth)/register/page.tsx
"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Minimum 2 characters")
    .max(50, "Maximum 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const result = registerSchema.safeParse(form);
    if (!result.success) {
      result.error.issues.forEach((issue) => toast.error(issue.message));
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Registration failed, please try again.");
        setLoading(false);
        return;
      }

      toast.success("Account created! Logging in...");

      const signInRes = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (signInRes?.error) {
        toast.error("Login failed, please log in manually.");
        setTimeout(() => router.push("/login"), 1500);
      } else {
        setTimeout(() => router.push("/"), 1000);
      }
    } catch (e) {
      console.error("Error :", e);
      toast.error("Server error, please try again.");
    }

    setLoading(false);
  };

  const handleGoogle = async () => {
    toast.loading("You are being redirected to Google...");
    await signIn("google", { callbackUrl: "/" });
  };
  const handleFacebook = async () => {
    toast.loading("You are being redirected to Facebook...");
    await signIn("facebook", { callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen flex w-full overflow-x-hidden  items-center justify-center bg-gray-950 overflow-hidden">
      <div className="relative  w-full h-full my-23 flex items-center justify-center ">
        {/* Arka plan efekti */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/20 via-gray-950 to-gray-950" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-lg px-4">
          <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-2xl">
            {/* Başlık */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-green-500/10 border border-green-500/20 rounded-2xl mb-4">
                <span className="text-2xl">🍽️</span>
              </div>
              <h1 className="text-2xl font-bold text-white">Create Account</h1>
              <p className="text-gray-400 text-sm mt-1">Sign up for free now</p>
            </div>

            {/* Form */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-300">
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-300">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">
                  At least 6 characters
                </p>
              </div>

              <button
                onClick={handleRegister}
                disabled={loading}
                className="mt-2 py-3 bg-green-500 hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-green-500/25"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Registering...
                  </span>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>

            {/* Ayraç */}
            <div className="flex items-center gap-3 my-6">
              <hr className="flex-1 border-gray-700" />
              <span className="text-gray-500 text-xs font-medium">OR</span>
              <hr className="flex-1 border-gray-700" />
            </div>

            {/* Google */}
            <button
              onClick={handleGoogle}
              className="w-full flex items-center justify-center gap-3 mb-2 py-3 bg-white hover:bg-gray-100 text-gray-800 font-semibold rounded-xl transition-all duration-200 hover:shadow-lg"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84z"
                />
              </svg>
              Sign Up with Google
            </button>
            <button
              onClick={handleFacebook}
              className="w-full flex items-center justify-center gap-3  py-3 bg-white hover:bg-gray-100 text-gray-800 font-semibold rounded-xl transition-all duration-200 hover:shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="25"
                height="25"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#3F51B5"
                  d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                ></path>
                <path
                  fill="#FFF"
                  d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"
                ></path>
              </svg>
              Sign Up with Facebook
            </button>

            {/* Giriş yap linki */}
            <p className="text-center text-gray-400 text-sm mt-6">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-green-500 hover:text-green-400 font-medium transition-colors"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
