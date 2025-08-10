"use client"
import PoetryCorner from "@/components/poetry/page"
import YourQouteAddOn from "./yourquoteAddOn/page"
export default function PoetryCornerWrittenPermissioned() {


  return (
   <div className="min-h-screen pt-5 bg-background text-foreground">
   <PoetryCorner />
   <YourQouteAddOn/>
   </div>
  )
}
