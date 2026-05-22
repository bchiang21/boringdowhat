import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('file') as File | null

  if (!file || file.size === 0) {
    return Response.json({ error: 'No file provided' }, { status: 400 })
  }

  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const imagesDir = path.join(process.cwd(), 'public', 'images')

  await mkdir(imagesDir, { recursive: true })
  await writeFile(path.join(imagesDir, filename), Buffer.from(await file.arrayBuffer()))

  return Response.json({ url: `/images/${filename}` })
}
