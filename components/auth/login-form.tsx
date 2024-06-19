"use client"
import { z } from "zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { DefaultInput } from "@/components/input"
import { DefaultButton } from "@/components/buttons"
import { LoginSchema, LoginType } from "@/lib/validation"
import { useRouter } from "next/navigation"

export default function LoginForm() {
  const {
    register,
    handleSubmit: handleLogin,
    formState: { errors },
  } = useForm<LoginType>({
    defaultValues: { username: "frodo" },
    resolver: zodResolver(LoginSchema),
  })

  const router = useRouter()

  const onLogin: SubmitHandler<LoginType> = async (data) => {
    console.log(data)
    const loginResult = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    })

    if (loginResult.status === 200) {
      router.push("/")
    }
  }

  return (
    <form
      onSubmit={handleLogin(onLogin)}
      className="flex flex-col gap-2 w-full"
      noValidate
    >
      {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
      <DefaultInput
        placeholder="username"
        type="text"
        error={errors.username?.message}
        {...register("username")}
      ></DefaultInput>
      <DefaultInput
        placeholder="password"
        type="password"
        error={errors.password?.message}
        {...register("password")}
      ></DefaultInput>
      <DefaultButton type="submit" className="justify-center">
        login
      </DefaultButton>
    </form>
  )
}
