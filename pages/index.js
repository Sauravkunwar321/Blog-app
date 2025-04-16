import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useRouter } from "next/navigation";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {

  const router = useRouter();

  return(
    <div className="bg-green-100 w-screen h-screen">
      <h1 className="text-2xl flex justify-center items-center pt-10 ">This is a Blog Website. Signup/Login to get Started</h1>
      <div className="flex justify-center items-center gap-3">
      <Link href="/signup" className="block w-fit  mt-4 bg-blue-600 text-white font-bold px-6 py-2 rounded-lg text-lg text-center hover:bg-blue-700 transition-all duration-300">Sign Up</Link>
      <Link href="/login" className="block w-fit  mt-4 bg-blue-600 text-white font-bold px-6 py-2 rounded-lg text-lg text-center hover:bg-blue-700 transition-all duration-300">Login</Link>
      </div>
    </div>
  )
}
