import ViolationReport from "@/components/ViolationReport";
import Home from "@/components/Home";
import About from "@/components/About";
import Partners from "@/components/Partners";

export default function Page() {
  return (
    <div className="main-content">
      <Home />
      <About />
      <Partners />
      <ViolationReport />
    </div>
  );
}