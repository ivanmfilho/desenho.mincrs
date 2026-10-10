import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'

type RevealSectionProps = {
  as?: ElementType
  children: ReactNode
  className?: string
  id?: string
  ariaLabelledby?: string
}

export default function RevealSection({
  as: Element = 'section',
  children,
  className = '',
  id,
  ariaLabelledby,
}: RevealSectionProps) {
  const elementRef = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <Element
      ref={elementRef}
      id={id}
      aria-labelledby={ariaLabelledby}
      className={`reveal-section ${isVisible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </Element>
  )
}
