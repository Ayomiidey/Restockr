"use server";

import { signInSchema, signUpFormSchema } from "../validation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { prisma } from "@/db/prisma";
import { hashSync } from "bcrypt-ts-edge";
import { formatError } from "./utils";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

export async function signInWithCredential(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!dbUser) {
      return { success: false, message: "Invalid email or password" };
    }
    redirect("/dashboard");
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof AuthError) {
      return { success: false, message: "Authentication failed" };
    }

    return { success: false, message: "Invalid email or password" };
  }
}

export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (existingUser) {
      return {
        success: false,
        message: "Email already registered",
      };
    }

    const hashedPassword = hashSync(user.password, 10);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
    });

    redirect("/dashboard");
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: formatError(error) };
  }
}

// "use server";

// import { signIn } from "next-auth/react";
// import { signInSchema, signUpFormSchema } from "../validation";
// import { isRedirectError } from "next/dist/client/components/redirect-error";
// import { prisma } from "@/db/prisma";
// import { hashSync } from "bcrypt-ts-edge";
// import { formatError } from "./utils";

// export async function signInWithCredential(
//   prevState: unknown,
//   formData: FormData
// ) {
//   try {
//     const user = signInSchema.parse({
//       email: formData.get("email"),
//       password: formData.get("password"),
//     });
//     await signIn("credentials", user);
//     return { success: true, message: "Signed in successfully" };
//   } catch (error) {
//     if (isRedirectError(error)) {
//       throw error;
//     }

//     return { success: false, message: "Invalid email or password" };
//   }
// }

// export async function signUpUser(prevState: unknown, formData: FormData) {
//   try {
//     const user = signUpFormSchema.parse({
//       name: formData.get("name"),
//       email: formData.get("email"),
//       password: formData.get("password"),
//       confirmPassword: formData.get("confirmPassword"),
//     });

//     const existingUser = await prisma.user.findUnique({
//       where: { email: user.email },
//     });
//     if (existingUser) {
//       return {
//         success: false,
//         message: "Email already registered",
//       };
//     }

//     const plainPassword = user.password;
//     user.password = hashSync(user.password, 10);

//     await prisma.user.create({
//       data: {
//         name: user.name,
//         email: user.email,
//         password: user.password,
//       },
//     });

//     await signIn("credentials", {
//       email: user.email,
//       password: plainPassword,
//     });

//     return { success: true, message: "User registered successfully" };
//   } catch (error) {
//     if (isRedirectError(error)) {
//       throw error;
//     }

//     return { success: false, message: formatError(error) };
//   }
// }
