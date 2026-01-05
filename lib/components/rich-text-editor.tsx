"use client"
import { useEffect, useRef, useState } from "react"
import { Bold, Italic, List, ListOrdered, Heading2, LinkIcon } from "lucide-react"
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

  useEffect(() => {
    setIsReady(true)
  }, [])

  const applyFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
  }

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  if (!isReady) return null

  return (
    <div className={cn("border rounded-lg overflow-hidden", className)}>
      <div className="bg-gray-50 border-b p-2 flex flex-wrap gap-1">
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => applyFormat("bold")}
          title="Bold (Ctrl+B)"
          className="w-10 h-10 p-0"
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => applyFormat("italic")}
          title="Italic (Ctrl+I)"
          className="w-10 h-10 p-0"
        >
          <Italic className="w-4 h-4" />
        </Button>
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
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => applyFormat("formatBlock", "h2")}
          title="Heading"
          className="w-10 h-10 p-0"
        >
          <Heading2 className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => {
            const url = prompt("Enter URL:")
            if (url) applyFormat("createLink", url)
          }}
          title="Insert Link"
          className="w-10 h-10 p-0"
        >
          <LinkIcon className="w-4 h-4" />
        </Button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        suppressContentEditableWarning
        className="min-h-64 p-4 focus:outline-none overflow-auto prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  )
}
