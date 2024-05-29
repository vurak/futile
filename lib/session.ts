import { SessionOptions, getIronSession } from "iron-session"
import { cookies } from "next/headers"

export interface SessionData {
  id: string
  username: string
  isLoggedIn: boolean
  expires: number
}

export const defaultSession: SessionData = {
  id: "",
  username: "",
  isLoggedIn: false,
  expires: 0,
}

export const sessionOptions: SessionOptions = {
  password: process.env.IRON_SESSION_PASSWORD!,
  cookieName: "thesesh",
  cookieOptions: {
    // secure only works in `https` environments
    // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    secure: process.env.NODE_ENV === "production",
  },
}

export const getSession = async () => {
  return await getIronSession<SessionData>(cookies(), sessionOptions)
}

export const killSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions)
  session.destroy()
}
