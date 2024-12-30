import ViolationReport from "@/components/ViolationReport";
import Home from "@/components/Home";
import About from "@/components/About";
import Partners from "@/components/Partners";
import Contact from "@/components/Contact";
import FileUploader from "@/components/FileUploader";

export default function Page() {
  return (
    <div className="main-content">
      <Home />
      <About />
      <Partners />
      <Contact /> 
      <ViolationReport />
    </div>
  );
}