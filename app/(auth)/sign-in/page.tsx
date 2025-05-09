"use client";

import { signInWithCredential } from "@/app/lib/actions/user-action";
import { User, Lock, ChevronRight } from "lucide-react";
import { Dispatch, SetStateAction, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signIn } from "next-auth/react";

// import { signIn } from "@/auth";
const SignInForm = ({
  setIsLoginOpen,
}: {
  setIsLoginOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [data, action] = useActionState(signInWithCredential, {
    success: false,
    message: "",
  });

  const LoginButton = () => {
    const { pending } = useFormStatus();
    return (
      <button
        disabled={pending}
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-center items-center"
      >
        {pending ? "Logging in..." : "Login"}
        <ChevronRight className="ml-2 h-4 w-4" />
      </button>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Login to SmartInventory
          </h2>
          <button
            onClick={() => setIsLoginOpen(false)}
            className="text-gray-400 hover:text-gray-500"
          >
            ✕
          </button>
        </div>
        <form action={action}>
          <div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <div className="relative">
                <User className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
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
            <div className="mb-6">
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
                  autoComplete="current-password"
                  className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <LoginButton />
          </div>
          {data && !data.success && (
            <div className="mt-4 text-center text-red-600">{data.message}</div>
          )}
        </form>
        <div className="mt-6">
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M12.24 10.055V13.91h3.766c-.152.858-.655 1.582-1.404 2.193v1.824h2.27c1.328-.798 2.346-2.32 2.346-4.013 0-.225-.022-.447-.062-.668h-6.916z"
                fill="#4285F4"
              />
              <path
                d="M12 4.04c1.896 0 3.586.714 4.933 1.885l1.84-1.84C16.102 1.908 14.162.757 12 .757c-3.314 0-6.152 2.264-7.184 5.312l2.346 1.824C6.548 4.918 9.036 4.04 12 4.04z"
                fill="#EA4335"
              />
              <path
                d="M5.816 7.886L3.47 6.062C2.44 8.11 2 10.468 2 12.943c0 2.475.44 4.833 1.47 6.881l2.346-1.824C4.964 17.058 4.548 15.418 4.548 13.943c0-1.475.416-3.115 1.268-4.057z"
                fill="#FBBC05"
              />
              <path
                d="M12 21.243c2.162 0 4.102-.858 5.524-2.25l-2.27-1.824c-.71.468-1.606.798-2.754.798-2.112 0-3.914-1.428-4.548-3.346H2.346v1.824C3.378 19.979 6.216 22.243 12 22.243z"
                fill="#34A853"
              />
            </svg>
            Sign in with Google
          </button>
        </div>
        <div className="mt-4 text-center text-sm text-gray-500">
          <a href="##" className="text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;

// "use client";

// import { signInWithCredential } from "@/app/lib/actions/user-action";
// import { User, Lock, ChevronRight } from "lucide-react";
// import { Dispatch, SetStateAction, useActionState } from "react";
// import { useFormStatus } from "react-dom";

// const SignInForm = ({
//   setIsLoginOpen,
// }: {
//   setIsLoginOpen: Dispatch<SetStateAction<boolean>>;
// }) => {
//   const [data, action] = useActionState(signInWithCredential, {
//     success: false,
//     message: "",
//   });

//   const LoginButton = () => {
//     const { pending } = useFormStatus();
//     return (
//       <button
//         disabled={pending}
//         type="submit"
//         className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-center items-center"
//       >
//         Login <ChevronRight className="ml-2 h-4 w-4" />
//       </button>
//     );
//   };

//   return (
//     <form action={action}>
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//         <div className="bg-white rounded-lg p-8 max-w-md w-full">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-bold text-gray-900">
//               Login to SmartInventory
//             </h2>
//             <button
//               onClick={() => setIsLoginOpen(false)}
//               className="text-gray-400 hover:text-gray-500"
//             >
//               ✕
//             </button>
//           </div>
//           <div>
//             <div className="mb-4">
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Email
//               </label>
//               <div className="relative">
//                 <User className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
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
//             <div className="mb-6">
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
//             <LoginButton />
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

// export default SignInForm;
