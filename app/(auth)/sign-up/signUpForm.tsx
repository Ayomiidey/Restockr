"use client";

import { signUpUser } from "@/app/lib/actions/user-action";
import { User, Lock, Mail, ChevronRight, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

const SignUpForm = () => {
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: "",
  });

  const router = useRouter();

  const SignUpButton = () => {
    const { pending } = useFormStatus();
    return (
      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {pending ? (
          <Loader className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
        ) : null}
        {pending ? "Registering..." : "Sign Up"}
        <ChevronRight className="ml-2 h-4 w-4" />
      </button>
    );
  };

  return (
    <form action={action}>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Create Account</h2>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="text-gray-400 hover:text-gray-500"
            >
              ✕
            </button>
          </div>
          <div>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="At least 8 characters"
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Re-enter password"
                />
              </div>
            </div>
            <SignUpButton />
          </div>
          {data && !data.success && (
            <div className="mt-4 text-center text-red-600">{data.message}</div>
          )}
          <div className="mt-4 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <button type="button" className="text-blue-600 hover:underline">
              Sign in
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
