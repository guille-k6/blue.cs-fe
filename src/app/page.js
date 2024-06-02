import Image from "next/image";
import Login from "../components/ui/login/login";

import Link from "next/link";
import Navbar from "@/components/layout/navbar/navbar";

export default function Home() {
  return (
    <main className="">
      {/* <Link></Link>
      <Link></Link>
      <Link></Link>
      <Link></Link> */}
      <Navbar></Navbar>
      <Login></Login>
    </main>
  );
}
