"use client"

import { useState, useEffect, useRef } from "react"

interface TypewriterTextProps {
  text: string
  delay?: number        // ms between each character
  className?: string
}

export function TypewriterText({ text, delay = 60, className }: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState("")
  const [done, setDone] = useState(false)
  const indexRef = useRef(0)

  useEffect(() => {
    if (done) return

    const interval = setInterval(() => {
      const next = indexRef.current + 1
      setDisplayed(text.slice(0, next))
      indexRef.current = next

      if (next >= text.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, delay)

    return () => clearInterval(interval)
  }, [text, delay, done])

  return (
    <span className={className}>
      {displayed}
      {!done && (
        <span className="inline-block w-0.5 h-[1em] bg-current align-middle ml-0.5 animate-pulse" />
      )}
    </span>
  )
}
