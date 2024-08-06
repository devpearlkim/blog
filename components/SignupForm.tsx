"use client";

import { registerUser } from "@/actions/auth";
import { Input } from "@nextui-org/react";
import Link from "next/link";
import { useFormState } from "react-dom";
import Submit from "./Submit";

const initState = { message: null };

type FormState = {
  message: string | null;
};

const SignupForm = () => {
  const wrappedRegisterUser = async (state: FormState): Promise<FormState> => {
    const formData = new FormData();
    formData.set(
      "email",
      (document.querySelector('[name="email"]') as HTMLInputElement)?.value
    );
    formData.set(
      "password",
      (document.querySelector('[name="password"]') as HTMLInputElement)?.value
    );

    return registerUser({ prevState: state, formData });
  };

  const [formState, action] = useFormState<FormState>(
    wrappedRegisterUser,
    initState
  );

  return (
    <form
      action={action}
      className="bg-content1 border border-default-100 shadow-lg rounded-md p-3 flex flex-col gap-2 "
    >
      <h3 className="my-4">Sign up</h3>
      <Input fullWidth size="lg" placeholder="Email" name="email" required />
      <Input
        name="password"
        fullWidth
        size="lg"
        type="password"
        placeholder="Password"
        required
      />
      <Submit label={"Sign up"} />
      {formState?.message && (
        <p className="text-red-400">{formState.message}</p>
      )}
      <div>
        <Link href="/signin">{`Already have an account?`}</Link>
      </div>
    </form>
  );
};

export default SignupForm;
