import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <Navbar/>
      <main>
        <div className="flex flex-col min-h-[85vh]">
          {children}
        </div>
      </main>
      <Footer/>
    </>

  );
}
