import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import {
  matchChatReply,
  nextSuggestions,
  suggestedQuestions,
  welcomeParagraphs,
} from '../data/chat'
import '../styles/nav.css'
import '../styles/chat.css'

type Message = {
  id: string
  role: 'assistant' | 'user'
  paragraphs: string[]
  streaming?: boolean
}

function joinParagraphs(paragraphs: string[]) {
  return paragraphs.join('\n\n')
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      paragraphs: welcomeParagraphs,
    },
  ])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [focused, setFocused] = useState(false)
  const [asked, setAsked] = useState<string[]>([])
  const [chips, setChips] = useState(suggestedQuestions.slice(0, 3))
  const [showChips, setShowChips] = useState(true)
  const threadRef = useRef<HTMLDivElement>(null)
  const streamTimer = useRef<number | null>(null)

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, chips, showChips])

  useEffect(() => {
    return () => {
      if (streamTimer.current) window.clearInterval(streamTimer.current)
    }
  }, [])

  const streamReply = (fullParagraphs: string[]) => {
    const full = joinParagraphs(fullParagraphs)
    const replyId = crypto.randomUUID()

    setMessages((prev) => [
      ...prev,
      { id: replyId, role: 'assistant', paragraphs: [''], streaming: true },
    ])

    let i = 0
    if (streamTimer.current) window.clearInterval(streamTimer.current)

    streamTimer.current = window.setInterval(() => {
      i += 1
      const slice = full.slice(0, i)
      const parts = slice.split('\n\n')
      setMessages((prev) =>
        prev.map((m) => (m.id === replyId ? { ...m, paragraphs: parts, streaming: true } : m)),
      )

      if (i >= full.length) {
        if (streamTimer.current) window.clearInterval(streamTimer.current)
        streamTimer.current = null
        setMessages((prev) =>
          prev.map((m) =>
            m.id === replyId ? { ...m, paragraphs: fullParagraphs, streaming: false } : m,
          ),
        )
        setSending(false)
        setShowChips(true)
      }
    }, 16)
  }

  const ask = async (raw: string) => {
    const text = raw.trim()
    if (!text || sending) return

    setSending(true)
    setShowChips(false)
    setInput('')

    const nextAsked = [...asked, text]
    setAsked(nextAsked)
    setChips(nextSuggestions(nextAsked))

    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'user', paragraphs: [text] }])

    await new Promise((r) => setTimeout(r, 280))
    streamReply(matchChatReply(text))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    void ask(input)
  }

  const canSend = input.trim().length > 0 && !sending

  return (
    <main className="page page-chat">
      <section className="chat-page">
        <div className="chat-card">
          <header className="chat-header">
            <div className="chat-identity">
              <div className="chat-identity-avatar" aria-hidden="true">
                <img src="/avatar.png" alt="" />
                <span className="chat-identity-online" />
              </div>
              <div className="chat-identity-copy">
                <h1 className="chat-title">Tommy</h1>
                <p className="chat-subtitle">资深体验设计师替身 · 在线</p>
              </div>
            </div>
          </header>

          <div className="chat-body" aria-live="polite" ref={threadRef}>
            {messages.map((msg) =>
              msg.role === 'user' ? (
                <div key={msg.id} className="chat-row chat-row-user">
                  <div className="chat-user-bubble">
                    <p className="chat-text">{msg.paragraphs[0]}</p>
                  </div>
                </div>
              ) : (
                <div key={msg.id} className="chat-row chat-row-assistant">
                  <div className="chat-avatar" aria-hidden="true">
                    <img src="/avatar.png" alt="" />
                  </div>
                  <div className="chat-assistant-body">
                    {msg.paragraphs.map((p, idx) => (
                      <p
                        key={`${msg.id}-${idx}`}
                        className={`chat-text chat-assistant-text ${
                          msg.streaming && idx === msg.paragraphs.length - 1
                            ? 'chat-assistant-typing'
                            : ''
                        }`}
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              ),
            )}

            {showChips && !sending && chips.length > 0 ? (
              <div className="chat-suggestions">
                {chips.map((q) => (
                  <button key={q} type="button" className="chat-chip" onClick={() => void ask(q)}>
                    {q}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <form className="chat-composer-wrap" onSubmit={onSubmit}>
            <div className={`chat-composer ${focused ? 'is-active' : ''}`}>
              <div className="chat-input-shell">
                <textarea
                  className="chat-input"
                  placeholder=" "
                  rows={1}
                  enterKeyHint="send"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      void ask(input)
                    }
                  }}
                />
                {!input && !focused ? (
                  <div className="chat-placeholder" aria-hidden="true">
                    想问我什么？经历、作品、方法都可以
                    <span className="chat-placeholder-caret" />
                  </div>
                ) : null}
              </div>
              <button
                type="submit"
                className={`chat-send ${canSend ? 'is-active' : ''}`}
                disabled={!canSend}
                aria-label="发送"
              >
                <span className="chat-send-arrow" aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}
