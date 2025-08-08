"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type Post = {
  id: string
  title: string
  imageUrl?: string
  body: string
  createdAt: number
}

const STORAGE_KEY = "vrinda_poetry_posts"

function loadPosts(): Post[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return seed
    const parsed = JSON.parse(raw) as Post[]
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
    imageUrl: "/moonlit-ocean-poetry.png",
    body:
      "In silver hush, the sea keeps time,\nWith secrets cast in whispered rhyme;\nWhere code and verse in twilight meet,\nI fold the waves beneath my feet.",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
  },
]

export default function PoetryCorner() {
  const [posts, setPosts] = useState<Post[]>([])
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [body, setBody] = useState("")

  useEffect(() => {
    const initial = loadPosts()
    setPosts(initial)
  }, [])

  useEffect(() => {
    savePosts(posts)
  }, [posts])

  const sorted = useMemo(() => [...posts].sort((a, b) => b.createdAt - a.createdAt), [posts])

  function addPost() {
    if (!title.trim() || !body.trim()) return
    const p: Post = {
      id: Math.random().toString(36).slice(2),
      title: title.trim(),
      imageUrl: imageUrl.trim() || undefined,
      body: body.trim(),
      createdAt: Date.now(),
    }
    setPosts((prev) => [p, ...prev])
    setOpen(false)
    setTitle("")
    setImageUrl("")
    setBody("")
  }

  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-3xl">Poetry Corner</h2>
        <Button onClick={() => setOpen(true)}>New Post</Button>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        {"A space for shayari & poetry—titles use elegant calligraphy style; posts persist locally for this demo and can be connected to MongoDB later."}
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p, i) => (
          <motion.article
            key={p.id}
            className="group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="h-full overflow-hidden">
              {p.imageUrl && <img src={p.imageUrl || "/placeholder.svg"} alt="" className="h-40 w-full object-cover" />}
              <CardHeader>
                <CardTitle className="font-serif text-2xl">{p.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="whitespace-pre-wrap font-[var(--font-poetry,ui-serif)] text-base leading-relaxed">
                  {p.body}
                </pre>
                <p className="mt-3 text-xs text-muted-foreground">
                  {new Date(p.createdAt).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          </motion.article>
        ))}
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
              <Input id="image" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="body">Poetry</Label>
              <Textarea id="body" rows={6} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write your verses..." />
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
