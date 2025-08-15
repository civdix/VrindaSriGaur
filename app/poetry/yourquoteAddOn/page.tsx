"use client"

import {useState,useEffect} from 'react'
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"


export default function YourQouteAddOn(){
    const [sorted,setSorted] = useState([])
    const [Alert,setAlert] = useState("")
    const [page,setPage] = useState(1)
    const loadYourQuote10 = async (page:number) => {
      const respo = await fetch(`/api/Post/yourquote/${page}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      })
      if (respo.ok) {
        const data = await respo.json()
          setSorted(prev=> [...prev,...data])
      }
    }

    useEffect(()=>{
      loadYourQuote10(page)
    },[page])

    const importQuote =async(p)=>{
        const respo = await fetch('/api/Post/yourquote/0', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...p }),
        })
        if (respo.ok) {

            setAlert("Quote Imported Successfully Reload to View the Result")
            setTimeout(() => {
                setAlert("")
            }, 3000)
        }
    }

          return( 

          <div className="mx-auto max-w-6xl px-4">
{Alert.length > 0 && (
  <div className="fixed top-2 left-1/2 -translate-x-1/2 w-[75%] md:w-1/3 bg-white text-black rounded-xl flex justify-between shadow p-2 z-50">
    {Alert}
    <Button
      className="cursor-pointer bg-black text-white"
      onClick={() => setAlert("")}
    >
      Dismiss
    </Button>
  </div>
)}


      <div className="flex items-center justify-between">


          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <h1 className="col-span-full text-2xl font-bold">YourQuote Add-On</h1>
        {sorted.map((p, i) => (
          <motion.article
          key={p.id}
            className="group"s
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="h-full overflow-hidden relative">
                <Button className="absolute cursor-pointer top-1 right-1 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-white/20 transition" onClick={() => importQuote(p)}>
                    Quick Import
                </Button>
              {p.img_url && <img src={p.img_url || "/placeholder.svg"} alt={p.poetry.substring(0,10)+"..."} className="h-40 w-full object-cover" onMouseEnter={(e) => {
                  e.currentTarget.classList.remove("object-cover");
                  e.currentTarget.classList.add("object-contain");
              }} onMouseLeave={(e) => {
                e.currentTarget.classList.remove("object-contain");
                e.currentTarget.classList.add("object-cover");
            }} />}
              <CardHeader>
                <CardTitle className="font-serif text-2xl">{p.title}</CardTitle>
                
              </CardHeader>
              <CardContent>
                <pre className="whitespace-pre-wrap font-[var(--font-poetry,ui-serif)] text-base leading-relaxed">
                  {p.poetry}
                </pre>
                <div className='flex justify-between'>

                <p className="mt-3 text-xs text-muted-foreground">
                  {!p.timestamp.includes(" ") ? new Date(p.createdAt).toLocaleString() : p.timestamp}
                </p>
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className='bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 text-white px-6 py-2 rounded-full shadow-lg hover:from-purple-700 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 ease-in-out cursor-pointer'>View on YourQuote</a>
                </div>

              </CardContent>
            </Card>
          </motion.article>
        ))}
        {sorted.length === 0 && (
          <p className="col-span-full  text-center text-muted-foreground">
            Loading Post...
          </p>
        )}

              </div>
      </div>
      <center>
        <Button className="my-4 cursor-pointer " onClick={() => setPage(prev => prev + 1)}>Load More</Button>
      </center>
      </div>)
  
}