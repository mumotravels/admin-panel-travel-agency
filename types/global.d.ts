/**
 * Global type declarations for Facebook Pixel
 * Extends the Window interface to include fbq and _fbq properties
 */

interface FacebookPixelQueue {
    push: unknown[]
    loaded?: boolean
    version?: string
    callMethod?: (...args: unknown[]) => void
}

interface FacebookPixel extends FacebookPixelQueue {
    (command: string, event?: string, data?: Record<string, unknown>): void
}

declare global {
    interface Window {
        fbq?: FacebookPixel
        _fbq?: FacebookPixel
    }
}

export { }
