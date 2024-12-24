import ViolationReport from "@/components/ViolationReport"
import Home from "@/components/Home"
export default async function Page() {
  return (
    <div className="main-content">
      <Home/>
      <ViolationReport />

    </div>
  )
}