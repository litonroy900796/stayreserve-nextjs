import Navbar from "@/components/Navbar";
import { dbConnect } from "@/lib/dbConnect";


export default async function HomeLayout({ children }) {
  await dbConnect();
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
