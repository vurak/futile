"use client"
import { z } from "zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TextInput } from "@/components/input"
import { DefaultButton } from "@/components/buttons"
import { LoginSchema, LoginType } from "@/lib/validation"

export default function LoginForm() {
  const {
    register,
    handleSubmit: handleLogin,
    formState: { errors },
  } = useForm<LoginType>({
    defaultValues: { username: "frodo" },
    resolver: zodResolver(LoginSchema),
  })

  const onLogin: SubmitHandler<LoginType> = async (data) => {
    console.log(data)
    fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  return (
    <form
      onSubmit={handleLogin(onLogin)}
      className="flex flex-col gap-2 w-full"
      noValidate
    >
      {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
      <TextInput
        placeholder="username"
        type="text"
        error={errors.username?.message ?? null}
        {...register("username")}
      ></TextInput>
      <TextInput
        placeholder="password"
        type="password"
        error={errors.password?.message ?? null}
        {...register("password")}
      ></TextInput>
      <DefaultButton type="submit" className="justify-center">
        login
      </DefaultButton>
    </form>
  )
}
