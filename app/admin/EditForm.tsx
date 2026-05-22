'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Listing } from '@/types'

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

type Props = { listing: Partial<Listing>; isNew?: boolean }

export default function EditForm({ listing, isNew = false }: Props) {
  const router = useRouter()
  const [form, setForm] = useState<Partial<Listing>>({
    id: '',
    slug: '',
    title: '',
    provider: '',
    category: '',
    location: '',
    duration: '',
    price: 0,
    pax: '',
    featured: false,
    tags: [],
    description: '',
    image: '',
    images: [],
    host: { name: '', bio: '', avatar: '' },
    whatToExpect: '',
    ...listing,
  })
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  const set = (key: keyof Listing, value: unknown) =>
    setForm(f => ({ ...f, [key]: value }))

  const uploadImage = async (file: File): Promise<string> => {
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error)
    return data.url
  }

  const handleSave = async () => {
    setStatus('saving')
    try {
      const url = isNew
        ? '/api/admin/listings'
        : `/api/admin/listings/${listing.slug}`
      const method = isNew ? 'POST' : 'PUT'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Save failed')
      setStatus('saved')
      if (isNew) router.push(`/admin/${form.slug}`)
      setTimeout(() => setStatus('idle'), 2500)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  const handleDelete = async () => {
    if (!confirm(`Delete "${form.title}"? This cannot be undone.`)) return
    await fetch(`/api/admin/listings/${listing.slug}`, { method: 'DELETE' })
    router.push('/admin')
  }

  const setImages = (next: string[]) => set('images', next)
  const addImage = (url: string) => setImages([...(form.images ?? []), url])
  const removeImage = (i: number) => setImages((form.images ?? []).filter((_, idx) => idx !== i))
  const replaceImage = (i: number, url: string) =>
    setImages((form.images ?? []).map((src, idx) => (idx === i ? url : src)))

  return (
    <div className="space-y-8">

      {/* ── Core details ──────────────────────────────────────── */}
      <Section title="Core details">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Slug" hint="URL-safe, e.g. candle-workshop-bugis">
            <input
              className={input}
              value={form.slug}
              onChange={e => set('slug', e.target.value)}
              readOnly={!isNew}
            />
          </Field>
          <Field label="Title">
            <input className={input} value={form.title} onChange={e => set('title', e.target.value)} />
          </Field>
          <Field label="Provider">
            <input className={input} value={form.provider} onChange={e => set('provider', e.target.value)} />
          </Field>
          <Field label="Category">
            <input className={input} value={form.category} onChange={e => set('category', e.target.value)} />
          </Field>
          <Field label="Location">
            <input className={input} value={form.location} onChange={e => set('location', e.target.value)} />
          </Field>
          <Field label="Duration">
            <input className={input} value={form.duration} onChange={e => set('duration', e.target.value)} placeholder="e.g. 2h" />
          </Field>
          <Field label="Price / pax (SGD)">
            <input className={input} type="number" value={form.price ?? ''} onChange={e => set('price', Number(e.target.value))} />
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

        <div className="flex items-center gap-3 mt-4">
          <input
            id="featured"
            type="checkbox"
            checked={form.featured ?? false}
            onChange={e => set('featured', e.target.checked)}
            className="w-4 h-4 accent-emerald-600"
          />
          <label htmlFor="featured" className="text-sm text-gray-700">Featured listing</label>
        </div>
      </Section>

      {/* ── Tags ──────────────────────────────────────────────── */}
      <Section title="Tags">
        <div className="flex flex-wrap gap-2">
          {ALL_TAGS.map(({ value, label }) => {
            const active = form.tags?.includes(value)
            return (
              <button
                key={value}
                type="button"
                onClick={() =>
                  set('tags', active
                    ? form.tags!.filter(t => t !== value)
                    : [...(form.tags ?? []), value])
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
      <Section title="Photos" hint="Primary image + up to 3 more. Together they form the 4-image mosaic on the listing page.">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Primary image */}
          <ImageSlot
            label="Primary"
            src={form.image}
            onUpload={async file => {
              const url = await uploadImage(file)
              set('image', url)
            }}
            onRemove={() => set('image', '')}
          />
          {/* Additional images (slots 1–3) */}
          {[0, 1, 2].map(i => {
            const src = form.images?.[i]
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
      <Section title="About the host">
        <div className="flex gap-4 items-start">
          <div className="shrink-0">
            <p className="text-xs text-gray-400 mb-1.5">Avatar</p>
            <ImageSlot
              src={form.host?.avatar}
              onUpload={async file => {
                const url = await uploadImage(file)
                set('host', { ...form.host, avatar: url })
              }}
              onRemove={() => set('host', { ...form.host, avatar: '' })}
              size="sm"
            />
          </div>
          <div className="flex-1 space-y-3">
            <Field label="Host name">
              <input
                className={input}
                value={form.host?.name ?? ''}
                onChange={e => set('host', { ...form.host, name: e.target.value })}
              />
            </Field>
            <Field label="Host bio">
              <textarea
                className={`${input} resize-y min-h-[80px]`}
                value={form.host?.bio ?? ''}
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
          value={form.whatToExpect ?? ''}
          onChange={e => set('whatToExpect', e.target.value)}
          placeholder={"First paragraph...\n\nSecond paragraph...\n\nThird paragraph..."}
        />
      </Section>

      {/* ── Actions ───────────────────────────────────────────── */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        {!isNew && (
          <button
            type="button"
            onClick={handleDelete}
            className="text-sm text-red-500 hover:text-red-700 transition-colors"
          >
            Delete listing
          </button>
        )}
        <div className="flex items-center gap-3 ml-auto">
          {status === 'saved' && <span className="text-sm text-emerald-600">Saved ✓</span>}
          {status === 'error' && <span className="text-sm text-red-500">Save failed — try again</span>}
          <button
            type="button"
            onClick={handleSave}
            disabled={status === 'saving'}
            className="text-sm font-semibold bg-emerald-600 text-white px-6 py-2.5 rounded-xl hover:bg-emerald-700 disabled:opacity-50 transition-colors"
          >
            {status === 'saving' ? 'Saving…' : isNew ? 'Create listing' : 'Save changes'}
          </button>
        </div>
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

function Field({ label, hint, children, className = '' }: { label?: string; hint?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      {label && <label className="block text-xs text-gray-500 mb-1">{label}</label>}
      {hint && <p className="text-xs text-gray-400 mb-1">{hint}</p>}
      {children}
    </div>
  )
}

function ImageSlot({
  src, label, onUpload, onRemove, size = 'md',
}: {
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
              <button
                type="button"
                onClick={() => ref.current?.click()}
                className="text-xs bg-white/90 text-gray-800 px-2 py-1 rounded-lg font-medium"
              >
                Replace
              </button>
              <button
                type="button"
                onClick={onRemove}
                className="text-xs bg-white/90 text-red-600 px-2 py-1 rounded-lg font-medium"
              >
                Remove
              </button>
            </div>
          </>
        ) : (
          <button
            type="button"
            onClick={() => ref.current?.click()}
            className="w-full h-full flex flex-col items-center justify-center gap-1 text-gray-300 hover:text-gray-500 transition"
          >
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
