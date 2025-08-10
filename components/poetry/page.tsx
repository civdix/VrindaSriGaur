"use client"

import { useEffect, useMemo, useState  } from "react"
import { usePathname } from "next/navigation";

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DeleteIcon, LucideDelete, Trash2 } from "lucide-react";

type Post = {
  id: string
  title: string
  img_url?: string
  poetry: string
  createdAt: number
  author: string
  timestamp?: string
}

const STORAGE_KEY = "vrinda_poetry_posts"

async function loadPosts(page: number): Promise<Post[]> {
  if (typeof window === "undefined") return []
  try {
    const raw = await fetch(`api/Post/own?page=${page}`)
    if (!raw) return seed
    const parsed = await raw.json() as Post[]
    return parsed
  } catch {
    return seed
  }
}

function savePosts(posts: Post[]) {
  
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
}

const seed: Post[] = [
  {
    id: "seed-1",
    title: "Moonlit Lines",
    img_url: "/moonlit-ocean-poetry.png",
    poetry:
      "In silver hush, the sea keeps time,\nWith secrets cast in whispered rhyme;\nWhere code and verse in twilight meet,\nI fold the waves beneath my feet.",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
    author: "Anonymous",
  },
]

export default function PoetryCorner() {
  const [posts, setPosts] = useState<Post[]>([])
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [img_url, setimg_url] = useState("")
  const [poetry, setpoetry] = useState("")
  const [author, setAuthor] = useState("")
  const [page, setPage] = useState(1)
  const [loadState, setLoadState] = useState(true)
  const [Alert,setAlert] = useState("")
const pathname = usePathname()
  useEffect(() => {
    loadPosts(page).then((data) => {
      if (data.length != 0) {
        return setPosts(prev => [...prev, ...data])
      }
      setLoadState(false)
    })
  }, [page])

  useEffect(() => {
    savePosts(posts)
  }, [posts])

  const sorted = useMemo(() => [...posts].sort((a, b) => b.createdAt - a.createdAt), [posts])
  async function deletePost(id: string){
    const respo = await fetch(`api/Post/own?id=${id}`, {
      method: "DELETE",
      headers:{
        responsible:"Vrinda"
      }
    })
    if (respo.ok) {
      setPosts((prev) => prev.filter((p) => p._id !== id))
    } else {
      setAlert("Failed to delete post. Please try again later.")
      setTimeout(() => {
        setAlert("");
      },3000)
    }
  }
  async function addPost() {
    const respo = await fetch("api/Post/own", {
      method: "POST",
      body: JSON.stringify({
        title,
        img_url: img_url,
        poetry: poetry,
        author
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const status = respo.ok && true

    if (!title.trim() || !poetry.trim()) return alert("Title and Poetry are required fields.")
    const p: Post = {
      id: Math.random().toString(36).slice(2),
      title: title.trim(),
      img_url: img_url.trim() || undefined,
      poetry: poetry.trim(),
      createdAt: Date.now(),
      author: author.trim() || "Anonymous",
    }
    if(status){
      setPosts((prev) => [p, ...prev])
      setOpen(false)
      setTitle("")
      setimg_url("")
      setpoetry("")
      setAuthor("")
    }else{
      alert("Failed to create post. Please try again later.")
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 ">
      {Alert.length>0 && <div className="absolute top-2 w-50">
{Alert}
      </div> }

      <div className="flex items-center justify-between">
        <h2 className="font-serif text-3xl">Poetry Corner</h2>
        <Button onClick={() => setOpen(true)} disabled={pathname !== "/poetry"}>New Post {pathname !== "/poetry"?"(Ask Vrinda for Permission)":""}</Button>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        {"A space for shayari & poetry—titles use elegant calligraphy style in Images"}
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p, i) => (
          <motion.article
            key={p._id}
            className="group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="h-full relative overflow-hidden">
              <Button className="absolute cursor-pointer top-1 right-1 bg-red-500/10 backdrop-blur-md border border-red-700/20 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-900/40 transition" onClick={() => deletePost(p._id)}>
                  <Trash2 />
              </Button>
              {p.img_url && <img src={p.img_url || "/placeholder.svg"} alt="" className="h-40 w-full object-cover" onMouseEnter={(e) => {
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
                <p className="mt-3 text-xs text-muted-foreground">
                  {!p.timestamp.includes(" ") ? new Date(p.createdAt).toLocaleString() : p.timestamp}
                </p>
              </CardContent>
            </Card>
          </motion.article>
        ))}
        {sorted.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground">
            No posts yet. Be the first to add one!
          </p>
        )}

      </div>
      <div className="mt-6 flex justify-center">
        <Button onClick={() => setPage((prev) => prev + 1)} className="cursor-pointer" disabled={!loadState}>{loadState ? "Load More" : "No More Posts to Show"}</Button>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Publish a new poem</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">

            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="E.g., Sakura Breeze" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Cover Image URL (optional)</Label>
              <Input id="image" value={img_url} onChange={(e) => setimg_url(e.target.value)} placeholder="https://..." />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="poetry">Poetry</Label>
              <Textarea id="poetry" rows={6} value={poetry} onChange={(e) => setpoetry(e.target.value)} placeholder="Write your verses..." />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="author">Pen/Author Name</Label>
              <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="E.g., Vrian Shri" />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={addPost}>Publish</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
