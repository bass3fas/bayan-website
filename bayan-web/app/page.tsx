import ViolationReport from "@/components/ViolationReport"
import Home from "@/components/Home"
import About from "@/components/About"
export default async function Page() {
  return (
    <div className="main-content">
      <Home/>
      <About/>
      <ViolationReport />

    </div>
  )
}