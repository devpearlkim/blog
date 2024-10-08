"use client";

import { useFormState } from "react-dom";
import { Input, Button } from "@nextui-org/react";
import { signinUser } from "@/actions/auth";
import Link from "next/link";
import Submit from "./Submit";

const initState = { message: null };

type FormState = {
  message: string | null;
};

const SigninForm = () => {
  const wrappedSigninUser = async (state: FormState): Promise<FormState> => {
    const formData = new FormData(
      document.querySelector("form") as HTMLFormElement
    );

    return signinUser({ prevState: state, formData });
  };

  const [formState, action] = useFormState<{ message: string | null }>(
    wrappedSigninUser,
    initState
  );

  return (
    <form
      action={action}
      className="bg-content1 border border-default-100 shadow-lg rounded-md p-3 flex flex-col gap-2 "
    >
      <h3 className="my-4">Sign in</h3>
      <Input
        fullWidth
        required
        size="lg"
        placeholder="Email"
        name="email"
        type="email"
      />
      <Input
        name="password"
        fullWidth
        required
        size="lg"
        type="password"
        placeholder="Password"
      />
      <Submit label={"Signin"} />
      {formState?.message && (
        <p className="text-red-400">{formState.message}</p>
      )}
      <div>
        <Link href="/signup">{`Don't have an account?`}</Link>
      </div>
    </form>
  );
};

export default SigninForm;
