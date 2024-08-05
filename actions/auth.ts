"use server";
import { cookies } from "next/headers";
import { signin, signup } from "@/utils/authTools";
import { z } from "zod";
import { redirect } from "next/navigation";
import { COOKIE_NAME } from "@/utils/constants";

const authSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const registerUser = async (prevState: any, formData: FormData) => {
  try {
    const data = authSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    const { token } = await signup(data);
    cookies().set(COOKIE_NAME, token);
  } catch (e) {
    console.error(e);
    if (e.message === "db insert error") {
      return {
        message: "이미 가입된 이메일입니다.",
      };
    }
    return { message: "회원가입에 실패했습니다. 잠시 후 시도해주세요." };
  }
  redirect("/dashboard");
};

export const signinUser = async (prevState: any, formData: FormData) => {
  try {
    const data = authSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    const { token } = await signin(data);
    cookies().set(COOKIE_NAME, token);
  } catch (e) {
    console.error(e);
    return { message: "아이디 또는 비밀번호를 확인해주세요" };
  }
  redirect("/dashboard");
};
