declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
    gtag?: (...args: unknown[]) => void
  }
}

export function track(eventName: string): void {
  try {
    if (typeof window === 'undefined') return

    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName)
      return
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName })
      return
    }

    if (import.meta.env.DEV) {
      console.info(`[tracking] ${eventName}`)
    }
  } catch {
    // A mensuração nunca deve interferir na ação principal da página.
  }
}
