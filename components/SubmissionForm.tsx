'use client'

import { useRef, useState } from 'react'

const ALL_TAGS = [
  { value: 'team-bonding', label: 'Team bonding' },
  { value: 'burned-out', label: 'Burned out' },
  { value: 'kids-parents', label: 'Kids + parents' },
  { value: 'introvert', label: 'Introvert-friendly' },
  { value: 'educational', label: 'Educational' },
  { value: 'creative', label: 'Creative' },
  { value: 'active', label: 'Active' },
  { value: 'solo', label: 'Solo-friendly' },
]

type FormData = {
  title: string
  provider: string
  category: string
  location: string
  duration: string
  price: number
  pax: string
  tags: string[]
  description: string
  image: string
  images: string[]
  host: { name: string; bio: string; avatar: string }
  whatToExpect: string
  contactName: string
  contactEmail: string
}

export default function SubmissionForm() {
  const [form, setForm] = useState<FormData>({
    title: '',
    provider: '',
    category: '',
    location: '',
    duration: '',
    price: 0,
    pax: '',
    tags: [],
    description: '',
    image: '',
    images: [],
    host: { name: '', bio: '', avatar: '' },
    whatToExpect: '',
    contactName: '',
    contactEmail: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle')

  const set = (key: keyof FormData, value: unknown) =>
    setForm(f => ({ ...f, [key]: value }))

  const uploadImage = async (file: File): Promise<string> => {
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error)
    return data.url
  }

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.contactEmail.trim()) {
      alert('Please fill in at least the experience title and your email.')
      return
    }
    setStatus('submitting')
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Submit failed')
      setStatus('submitted')
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  if (status === 'submitted') {
    return (
      <div className="bg-emerald-50 rounded-2xl p-10 text-center">
        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-emerald-900 mb-2">Submission received!</h2>
        <p className="text-sm text-emerald-700">
          We'll review your listing and be in touch at {form.contactEmail} within 48 hours.
        </p>
      </div>
    )
  }

  const setImages = (next: string[]) => set('images', next)
  const addImage = (url: string) => setImages([...form.images, url])
  const removeImage = (i: number) => setImages(form.images.filter((_, idx) => idx !== i))
  const replaceImage = (i: number, url: string) =>
    setImages(form.images.map((src, idx) => (idx === i ? url : src)))

  return (
    <div className="space-y-8">

      {/* ── Contact info ──────────────────────────────────────── */}
      <Section title="Your contact details" hint="So we can reach you once your listing is reviewed.">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Your name">
            <input className={input} value={form.contactName} onChange={e => set('contactName', e.target.value)} />
          </Field>
          <Field label="Your email *">
            <input className={input} type="email" value={form.contactEmail} onChange={e => set('contactEmail', e.target.value)} />
          </Field>
        </div>
      </Section>

      {/* ── Core details ──────────────────────────────────────── */}
      <Section title="About your experience">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Experience title *">
            <input className={input} value={form.title} onChange={e => set('title', e.target.value)} />
          </Field>
          <Field label="Provider / business name">
            <input className={input} value={form.provider} onChange={e => set('provider', e.target.value)} />
          </Field>
          <Field label="Category" hint="e.g. Craft, Art, Culinary, Adventure, Wellness, Outdoor">
            <input className={input} value={form.category} onChange={e => set('category', e.target.value)} placeholder="e.g. Craft" />
          </Field>
          <Field label="Location (in Singapore)">
            <input className={input} value={form.location} onChange={e => set('location', e.target.value)} />
          </Field>
          <Field label="Duration">
            <input className={input} value={form.duration} onChange={e => set('duration', e.target.value)} placeholder="e.g. 2h" />
          </Field>
          <Field label="Price / person (SGD)">
            <input className={input} type="number" value={form.price || ''} onChange={e => set('price', Number(e.target.value))} />
          </Field>
          <Field label="Group size">
            <input className={input} value={form.pax} onChange={e => set('pax', e.target.value)} placeholder="e.g. 1–15" />
          </Field>
        </div>
        <Field label="Short description" className="mt-4">
          <textarea
            className={`${input} resize-y min-h-[80px]`}
            value={form.description}
            onChange={e => set('description', e.target.value)}
          />
        </Field>
      </Section>

      {/* ── Tags ──────────────────────────────────────────────── */}
      <Section title="Tags" hint="Pick all that apply — these help people find your experience.">
        <div className="flex flex-wrap gap-2">
          {ALL_TAGS.map(({ value, label }) => {
            const active = form.tags.includes(value)
            return (
              <button
                key={value}
                type="button"
                onClick={() =>
                  set('tags', active
                    ? form.tags.filter(t => t !== value)
                    : [...form.tags, value])
                }
                className={`text-sm px-3 py-1.5 rounded-full border transition-all ${
                  active
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : 'border-gray-200 text-gray-600 hover:border-gray-400'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>
      </Section>

      {/* ── Photos ────────────────────────────────────────────── */}
      <Section title="Photos" hint="Primary image + up to 3 more.">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <ImageSlot
            label="Primary"
            src={form.image}
            onUpload={async file => { const url = await uploadImage(file); set('image', url) }}
            onRemove={() => set('image', '')}
          />
          {[0, 1, 2].map(i => {
            const src = form.images[i]
            return (
              <ImageSlot
                key={i}
                label={`Photo ${i + 2}`}
                src={src}
                onUpload={async file => {
                  const url = await uploadImage(file)
                  if (src !== undefined) replaceImage(i, url)
                  else addImage(url)
                }}
                onRemove={() => removeImage(i)}
              />
            )
          })}
        </div>
      </Section>

      {/* ── Host ──────────────────────────────────────────────── */}
      <Section title="About you (the host)">
        <div className="flex gap-4 items-start">
          <div className="shrink-0">
            <p className="text-xs text-gray-400 mb-1.5">Avatar</p>
            <ImageSlot
              src={form.host.avatar}
              onUpload={async file => { const url = await uploadImage(file); set('host', { ...form.host, avatar: url }) }}
              onRemove={() => set('host', { ...form.host, avatar: '' })}
              size="sm"
            />
          </div>
          <div className="flex-1 space-y-3">
            <Field label="Host name">
              <input
                className={input}
                value={form.host.name}
                onChange={e => set('host', { ...form.host, name: e.target.value })}
              />
            </Field>
            <Field label="Host bio">
              <textarea
                className={`${input} resize-y min-h-[80px]`}
                value={form.host.bio}
                onChange={e => set('host', { ...form.host, bio: e.target.value })}
              />
            </Field>
          </div>
        </div>
      </Section>

      {/* ── What to expect ────────────────────────────────────── */}
      <Section title="What to expect" hint="Separate paragraphs with a blank line.">
        <textarea
          className={`${input} resize-y min-h-[200px] font-mono text-xs`}
          value={form.whatToExpect}
          onChange={e => set('whatToExpect', e.target.value)}
          placeholder={"First paragraph...\n\nSecond paragraph...\n\nThird paragraph..."}
        />
      </Section>

      {/* ── Submit ────────────────────────────────────────────── */}
      <div className="flex items-center justify-end pt-4 border-t border-gray-100">
        {status === 'error' && (
          <span className="text-sm text-red-500 mr-4">Something went wrong — please try again.</span>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={status === 'submitting'}
          className="text-sm font-semibold bg-emerald-600 text-white px-8 py-3 rounded-xl hover:bg-emerald-700 disabled:opacity-50 transition-colors"
        >
          {status === 'submitting' ? 'Submitting…' : 'Submit listing for review'}
        </button>
      </div>

    </div>
  )
}

/* ── Sub-components ─────────────────────────────────────────────── */

function Section({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h2 className="text-sm font-semibold text-gray-900 mb-0.5">{title}</h2>
      {hint && <p className="text-xs text-gray-400 mb-4">{hint}</p>}
      {!hint && <div className="mb-4" />}
      {children}
    </div>
  )
}

function Field({ label, hint, children, className = '' }: {
  label?: string; hint?: string; children: React.ReactNode; className?: string
}) {
  return (
    <div className={className}>
      {label && <label className="block text-xs text-gray-500 mb-1">{label}</label>}
      {hint && <p className="text-xs text-gray-400 mb-1">{hint}</p>}
      {children}
    </div>
  )
}

function ImageSlot({ src, label, onUpload, onRemove, size = 'md' }: {
  src?: string; label?: string; onUpload: (file: File) => Promise<void>; onRemove: () => void; size?: 'sm' | 'md'
}) {
  const ref = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const handleFile = async (file: File) => {
    setUploading(true)
    try { await onUpload(file) } finally { setUploading(false) }
  }

  const dim = size === 'sm' ? 'w-20 h-20' : 'aspect-square w-full'

  return (
    <div>
      {label && <p className="text-xs text-gray-400 mb-1.5">{label}</p>}
      <div className={`relative ${dim} rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center`}>
        {src ? (
          <>
            <img src={src} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition flex items-center justify-center gap-2 opacity-0 hover:opacity-100">
              <button type="button" onClick={() => ref.current?.click()} className="text-xs bg-white/90 text-gray-800 px-2 py-1 rounded-lg font-medium">Replace</button>
              <button type="button" onClick={onRemove} className="text-xs bg-white/90 text-red-600 px-2 py-1 rounded-lg font-medium">Remove</button>
            </div>
          </>
        ) : (
          <button type="button" onClick={() => ref.current?.click()} className="w-full h-full flex flex-col items-center justify-center gap-1 text-gray-300 hover:text-gray-500 transition">
            {uploading ? (
              <span className="text-xs">Uploading…</span>
            ) : (
              <>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                {size === 'md' && <span className="text-xs">Add photo</span>}
              </>
            )}
          </button>
        )}
      </div>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
      />
    </div>
  )
}

const input = 'w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-emerald-400 transition-colors bg-white'
