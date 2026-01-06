"use client"
import { useEffect, useRef, useState } from "react"
import type React from "react"

import { Bold, Italic, Underline, List, ListOrdered, Heading2, LinkIcon, Redo2, Undo2, Code, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = useState(false)
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set())
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    setIsReady(true)
  }, [])

  useEffect(() => {
    if (isReady && editorRef.current && !isInitialized && value) {
      editorRef.current.innerHTML = value
      setIsInitialized(true)
    }
  }, [isReady, isInitialized, value])

  const updateActiveFormats = () => {
    const formats = new Set<string>()
    if (document.queryCommandState("bold")) formats.add("bold")
    if (document.queryCommandState("italic")) formats.add("italic")
    if (document.queryCommandState("underline")) formats.add("underline")
    setActiveFormats(formats)
    setCanUndo(document.queryCommandValue("undo") !== "0")
    setCanRedo(document.queryCommandValue("redo") !== "0")
  }

  const applyFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    if (editorRef.current) {
      editorRef.current.focus()
      updateActiveFormats()
    }
  }

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
      updateActiveFormats()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      if (e.key === "z" && !e.shiftKey) {
        e.preventDefault()
        applyFormat("undo")
      } else if ((e.key === "z" && e.shiftKey) || e.key === "y") {
        e.preventDefault()
        applyFormat("redo")
      }
    }
  }

  if (!isReady) return null

  return (
    <div className={cn("border rounded-lg overflow-hidden bg-background transition-all", className)}>
      <div className="bg-muted border-b p-3 space-y-2">
        <div className="flex flex-wrap gap-1">
          {/* Text Formatting Group */}
          <div className="flex gap-1 border-r border-border pr-2">
            <Button
              type="button"
              size="sm"
              variant={activeFormats.has("bold") ? "default" : "outline"}
              onClick={() => applyFormat("bold")}
              title="Bold (Ctrl+B)"
              className="w-10 h-10 p-0"
            >
              <Bold className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              size="sm"
              variant={activeFormats.has("italic") ? "default" : "outline"}
              onClick={() => applyFormat("italic")}
              title="Italic (Ctrl+I)"
              className="w-10 h-10 p-0"
            >
              <Italic className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              size="sm"
              variant={activeFormats.has("underline") ? "default" : "outline"}
              onClick={() => applyFormat("underline")}
              title="Underline (Ctrl+U)"
              className="w-10 h-10 p-0"
            >
              <Underline className="w-4 h-4" />
            </Button>
          </div>

          {/* Blocks Group */}
          <div className="flex gap-1 border-r border-border pr-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => applyFormat("formatBlock", "<h2>")}
              title="Heading 2"
              className="w-10 h-10 p-0"
            >
              <Heading2 className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => {
                document.execCommand("insertHTML", false, "<blockquote>Enter quote...</blockquote>")
                if (editorRef.current) {
                  editorRef.current.focus()
                  updateActiveFormats()
                }
              }}
              title="Quote"
              className="w-10 h-10 p-0"
            >
              <Quote className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => {
                document.execCommand("insertHTML", false, "<pre><code>// Code here...</code></pre>")
                if (editorRef.current) {
                  editorRef.current.focus()
                  updateActiveFormats()
                }
              }}
              title="Code Block"
              className="w-10 h-10 p-0"
            >
              <Code className="w-4 h-4" />
            </Button>
          </div>

          {/* Lists Group */}
          <div className="flex gap-1 border-r border-border pr-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => applyFormat("insertUnorderedList")}
              title="Bullet List"
              className="w-10 h-10 p-0"
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => applyFormat("insertOrderedList")}
              title="Numbered List"
              className="w-10 h-10 p-0"
            >
              <ListOrdered className="w-4 h-4" />
            </Button>
          </div>

          {/* Link & Undo/Redo Group */}
          <div className="flex gap-1">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => {
                const url = prompt("Enter URL (e.g., https://example.com):")
                if (url) {
                  const text = window.getSelection()?.toString() || "Link"
                  document.execCommand("createLink", false, url)
                  if (editorRef.current) {
                    editorRef.current.focus()
                    updateActiveFormats()
                  }
                }
              }}
              title="Insert Link"
              className="w-10 h-10 p-0"
            >
              <LinkIcon className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => applyFormat("undo")}
              disabled={!canUndo}
              title="Undo (Ctrl+Z)"
              className="w-10 h-10 p-0"
            >
              <Undo2 className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => applyFormat("redo")}
              disabled={!canRedo}
              title="Redo (Ctrl+Y)"
              className="w-10 h-10 p-0"
            >
              <Redo2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">Tip: Use Ctrl+B, Ctrl+I, Ctrl+U for quick formatting</p>
      </div>

      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        suppressContentEditableWarning
        className="min-h-64 p-4 focus:outline-none focus:ring-1 focus:ring-ring overflow-auto prose prose-sm max-w-none bg-card text-card-foreground transition-shadow"
      />
    </div>
  )
}
