"use client";

import { signUpUser } from "@/app/lib/actions/user-action";
import { User, Lock, Mail, ChevronRight, Loader } from "lucide-react";
import { Dispatch, SetStateAction, useActionState } from "react";
import { useFormStatus } from "react-dom";

const SignUpForm = ({
  setIsSignUpOpen,
}: {
  setIsSignUpOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: "",
  });

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
              onClick={() => setIsSignUpOpen(false)}
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
            <button
              type="button"
              onClick={() => setIsSignUpOpen(false)}
              className="text-blue-600 hover:underline"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;

// "use client";
// import { signUpUser } from "@/app/lib/actions/user-action";
// import { User, Lock, Mail, ChevronRight } from "lucide-react";
// import { Dispatch, SetStateAction, useActionState } from "react";
// import { useFormStatus } from "react-dom";

// const SignUpForm = ({
//   setIsSignUpOpen,
// }: {
//   setIsSignUpOpen: Dispatch<SetStateAction<boolean>>;
// }) => {
//   const [data, action] = useActionState(signUpUser, {
//     success: false,
//     message: "",
//   });

//   const SignUpButton = () => {
//     const { pending } = useFormStatus();
//     return (
//       <button
//         type="submit"
//         disabled={pending}
//         className="flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
//       >
//         {pending ? "Registering..." : "Sign Up"}
//         <ChevronRight className="ml-2 h-4 w-4" />
//       </button>
//     );
//   };

//   return (
//     <form action={action}>
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//         <div className="bg-white rounded-lg p-8 max-w-md w-full">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-bold text-gray-900">Create Account</h2>
//             <button
//               onClick={() => setIsSignUpOpen(false)}
//               className="text-gray-400 hover:text-gray-500"
//             >
//               ✕
//             </button>
//           </div>
//           <div>
//             <div className="mb-4">
//               <label
//                 htmlFor="name"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Full Name
//               </label>
//               <div className="relative">
//                 <User className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   autoComplete="name"
//                   className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>
//             <div className="mb-4">
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Email
//               </label>
//               <div className="relative">
//                 <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="you@example.com"
//                 />
//               </div>
//             </div>
//             <div className="mb-4">
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Password
//               </label>
//               <div className="relative">
//                 <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="password"
//                   className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="••••••••"
//                 />
//               </div>
//             </div>
//             <div className="mb-6">
//               <label
//                 htmlFor="confirmPassword"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Confirm Password
//               </label>
//               <div className="relative">
//                 <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
//                 <input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type="password"
//                   autoComplete="confirmPassword"
//                   className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="••••••••"
//                 />
//               </div>
//             </div>
//             <SignUpButton />
//           </div>
//           {data && !data.success && (
//             <div className="text-center text-destructive">{data.message}</div>
//           )}
//           <div className="mt-4 text-center text-sm text-gray-500">
//             <a href="#" className="text-blue-600 hover:underline">
//               Forgot password?
//             </a>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default SignUpForm;

// "use client";

// import { useState } from "react";
// import { Box, Check, Mail, Lock, User, ArrowLeft } from "lucide-react";

// export default function SignUpForm({ setIsSignUpOpen }) {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     // Clear error for this field when user starts typing
//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }
//   };

//   const validate = () => {
//     const newErrors = {};

//     if (!formData.fullName.trim()) {
//       newErrors.fullName = "Full name is required";
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Email is invalid";
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 8) {
//       newErrors.password = "Password must be at least 8 characters";
//     }

//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validate()) {
//       return;
//     }

//     setLoading(true);

//     // Simulate API call
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1500));
//       setSuccess(true);
//       // In a real app, you would redirect or perform additional actions here
//     } catch (error) {
//       setErrors({ form: "Failed to create account. Please try again." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
//         <div className="bg-blue-600 h-2"></div>

//         {success ? (
//           <div className="p-8 text-center">
//             <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
//               <Check className="h-8 w-8 text-green-600" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">
//               Account Created!
//             </h2>
//             <p className="text-gray-600 mb-6">
//               Your SmartInventory account has been successfully created.
//             </p>
//             <button
//               onClick={() => setIsSignUpOpen(false)}
//               className="w-full py-3 px-4 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               Continue to Dashboard
//             </button>
//           </div>
//         ) : (
//           <>
//             <div className="flex justify-between items-center p-6 border-b border-gray-200">
//               <div className="flex items-center">
//                 <button
//                   onClick={() => setIsSignUpOpen(false)}
//                   className="mr-2 p-1 rounded-full hover:bg-gray-100"
//                 >
//                   <ArrowLeft className="h-5 w-5 text-gray-500" />
//                 </button>
//                 <h2 className="text-xl font-bold text-gray-900">
//                   Create Your Account
//                 </h2>
//               </div>
//               <Box className="h-6 w-6 text-blue-600" />
//             </div>

//             <div className="p-6">
//               <form onSubmit={handleSubmit}>
//                 <div className="space-y-5">
//                   {errors.form && (
//                     <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
//                       {errors.form}
//                     </div>
//                   )}

//                   <div>
//                     <label
//                       htmlFor="fullName"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Full Name
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <User className="h-5 w-5 text-gray-400" />
//                       </div>
//                       <input
//                         id="fullName"
//                         name="fullName"
//                         type="text"
//                         value={formData.fullName}
//                         onChange={handleChange}
//                         className={`pl-10 w-full px-4 py-3 border ${
//                           errors.fullName ? "border-red-300" : "border-gray-300"
//                         } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                         placeholder="John Doe"
//                       />
//                     </div>
//                     {errors.fullName && (
//                       <p className="mt-1 text-sm text-red-600">
//                         {errors.fullName}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="email"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Email Address
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <Mail className="h-5 w-5 text-gray-400" />
//                       </div>
//                       <input
//                         id="email"
//                         name="email"
//                         type="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         className={`pl-10 w-full px-4 py-3 border ${
//                           errors.email ? "border-red-300" : "border-gray-300"
//                         } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                         placeholder="your.email@example.com"
//                       />
//                     </div>
//                     {errors.email && (
//                       <p className="mt-1 text-sm text-red-600">
//                         {errors.email}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="password"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Password
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <Lock className="h-5 w-5 text-gray-400" />
//                       </div>
//                       <input
//                         id="password"
//                         name="password"
//                         type="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         className={`pl-10 w-full px-4 py-3 border ${
//                           errors.password ? "border-red-300" : "border-gray-300"
//                         } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                         placeholder="At least 8 characters"
//                       />
//                     </div>
//                     {errors.password && (
//                       <p className="mt-1 text-sm text-red-600">
//                         {errors.password}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="confirmPassword"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Confirm Password
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <Lock className="h-5 w-5 text-gray-400" />
//                       </div>
//                       <input
//                         id="confirmPassword"
//                         name="confirmPassword"
//                         type="password"
//                         value={formData.confirmPassword}
//                         onChange={handleChange}
//                         className={`pl-10 w-full px-4 py-3 border ${
//                           errors.confirmPassword
//                             ? "border-red-300"
//                             : "border-gray-300"
//                         } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                         placeholder="Re-enter your password"
//                       />
//                     </div>
//                     {errors.confirmPassword && (
//                       <p className="mt-1 text-sm text-red-600">
//                         {errors.confirmPassword}
//                       </p>
//                     )}
//                   </div>

//                   <div className="pt-2">
//                     <button
//                       type="submit"
//                       disabled={loading}
//                       className={`w-full py-3 px-4 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                         loading ? "opacity-70 cursor-not-allowed" : ""
//                       }`}
//                     >
//                       {loading ? (
//                         <div className="flex items-center justify-center">
//                           <svg
//                             className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                           >
//                             <circle
//                               className="opacity-25"
//                               cx="12"
//                               cy="12"
//                               r="10"
//                               stroke="currentColor"
//                               strokeWidth="4"
//                             ></circle>
//                             <path
//                               className="opacity-75"
//                               fill="currentColor"
//                               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                             ></path>
//                           </svg>
//                           Creating Account...
//                         </div>
//                       ) : (
//                         "Create Account"
//                       )}
//                     </button>
//                   </div>

//                   <div className="text-center text-sm">
//                     <p className="text-gray-600">
//                       Already have an account?{" "}
//                       <button
//                         type="button"
//                         onClick={() => setIsSignUpOpen(false)}
//                         className="text-blue-600 font-medium hover:text-blue-500 focus:outline-none"
//                       >
//                         Sign in
//                       </button>
//                     </p>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
