"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Linkedin } from 'lucide-react'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})

type FormData = z.infer<typeof schema>

export default function ContactSection() {
  const [sent, setSent] = useState<string | null>(null)
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    // Demo: simulate server action
    await new Promise((r) => setTimeout(r, 800))
    setSent(`Thanks ${data.name}! I’ll get back to you at ${data.email}.`)
    reset()
  }

  return (
    <div className="mx-auto max-w-4xl px-4">
      <h2 className="font-serif text-3xl">Contact</h2>
      <Card className="mt-6">
        <CardContent className="grid gap-6 p-6 md:grid-cols-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} />
              {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" rows={6} {...register("message")} />
              {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send message"}
            </Button>
            {sent && <p className="text-sm text-green-600">{sent}</p>}
          </form>

          <div className="space-y-3 text-sm">
            <p><strong>Email:</strong> <a className="underline" href="mailto:vrinaxz@gmail.com">vrinaxz@gmail.com</a></p>
            <p><strong>Phone:</strong> <a className="underline" href="tel:7017287836">7017287836</a></p>
            <a
              className="inline-flex items-center gap-2 text-pink-600 underline underline-offset-4 hover:text-pink-700 dark:text-indigo-300 dark:hover:text-indigo-200"
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <p className="text-muted-foreground">
              {"Fully responsive with smooth scroll and parallax. Dark mode renders animated moonlit ocean with sakura petals."}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
