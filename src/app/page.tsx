import Link from "next/link";

export default function Home() {
   return (
      <div className="bg-home-img bg-black bg-cover bg-center">
         <main className="flex flex-col justify-center text-center max-w-5xl mx-auto h-dvh bg-blend-darken">
            <div className="flex flex-col text-white gap-6 p-12 rounded-xl bg-gray-950 w-4/5 sm:max-w-96 mx-auto sm:text-2xl shadow-sm shadow-slate-300">
               <h1 className="text-4xl font-bold">
                  Dan&apos;s Computer
                  <br />
                  Repair Shop
               </h1>
               <address>
                  1234 Elm St.
                  <br />
                  Springfield, IL 62701
               </address>
               <p>Open Daily: 9am to 5pm</p>
               <Link href={"tel:8666677777"} className="hover:underline">
                  866-667-7777
               </Link>
            </div>
         </main>
      </div>
   );
}

