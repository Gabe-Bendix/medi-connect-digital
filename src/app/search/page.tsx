'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './page.module.css'

type Message = { from: 'user' | 'assistant' | 'system'; text: string }

export default function SearchPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // preload system prompt
  useEffect(() => {
    setMessages([{ from: 'system', text: '…type hello and click send to try it out…' }])
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight)
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMsg: Message = { from: 'user', text: input }
    setMessages(m => [...m, userMsg])
    setInput(''); setLoading(true)

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input, history: messages })
    })
    const { reply } = await res.json()
    setMessages(m => [...m, { from: 'assistant', text: reply }])
    setLoading(false)
  }

  return (
    <div className={styles.MainContainer}>
      <div className={styles.TextBox}>
        <h2>Medication Search</h2>
        <h1>
          Our AI chat bot can help you find a local medication that is similar what you are use to at home. It even provides a translated flashcard for the pharmacist.
        </h1>
      </div>

      <div className={styles.ChatBox} ref={scrollRef}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={
              msg.from === 'assistant'
                ? styles.AssistantBubble
                : msg.from === 'user'
                ? styles.UserBubble
                : styles.SystemBubble
            }
          >
            <h1 className={styles.chatText}>{msg.text}</h1>
          </div>
        ))}
      </div>

      <div className={styles.InputBox}>
        <input
          type="text"
          className={styles.Input}
          placeholder="Type your message…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          disabled={loading}
        />
        <button
          className={styles.SendButton}
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? '…' : 
          <h1>
          Send
          </h1>
          }
        </button>
      </div>
    </div>
  )
}
