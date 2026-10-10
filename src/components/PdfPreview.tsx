import { useEffect, useRef, useState } from 'react'
import pdfUrl from '@/assets/desenho-colorir-minc-cc8b3.pdf?url'

const previewFallback = `${pdfUrl}#page=1&view=FitH&toolbar=0&navpanes=0&scrollbar=0`

export default function PdfPreview() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [previewReady, setPreviewReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    let loadingTask: ReturnType<typeof import('pdfjs-dist').getDocument> | undefined

    async function renderFirstPage() {
      try {
        const pdfjs = await import('pdfjs-dist')
        const workerUrl = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url)
        pdfjs.GlobalWorkerOptions.workerSrc = workerUrl.toString()

        loadingTask = pdfjs.getDocument(pdfUrl)
        const document = await loadingTask.promise
        const page = await document.getPage(1)
        const baseViewport = page.getViewport({ scale: 1 })
        const targetWidth = 1786
        const viewport = page.getViewport({ scale: targetWidth / baseViewport.width })
        const canvas = canvasRef.current
        if (!canvas || cancelled) return

        const context = canvas.getContext('2d', { alpha: false })
        if (!context) return

        canvas.width = Math.round(viewport.width)
        canvas.height = Math.round(viewport.height)
        await page.render({ canvas, canvasContext: context, viewport }).promise
        if (!cancelled) setPreviewReady(true)
      } catch {
        if (!cancelled) setPreviewReady(false)
      }
    }

    void renderFirstPage()

    return () => {
      cancelled = true
      void loadingTask?.destroy()
    }
  }, [])

  return (
    <div
      className={`paper-preview ${previewReady ? 'is-rendered' : ''}`}
      role="img"
      aria-label="Desenho Minc em preto e branco para crianças colorirem."
    >
      <object
        className="paper-preview__fallback"
        data={previewFallback}
        type="application/pdf"
        aria-hidden="true"
        tabIndex={-1}
      />
      <canvas ref={canvasRef} className="paper-preview__canvas" aria-hidden="true" />
    </div>
  )
}
