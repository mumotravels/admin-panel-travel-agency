/**
 * Meta Pixel utility for tracking events
 * Handles Facebook Pixel initialization and event tracking with proper error handling
 * Based on best practices from Next.js Meta Pixel example
 */

/**
 * Initialize Meta Pixel
 * Should be called once at app start (in layout)
 * Implements the standard Facebook Pixel initialization pattern
 */
export function initializeMetaPixel(pixelId: string): void {
    if (typeof window === "undefined") return
    if (window.fbq && "loaded" in window.fbq && window.fbq.loaded) return // Already initialized

    type FbqType = NonNullable<Window["fbq"]>
    
    const fbqFunction = function (this: FbqType, ...args: unknown[]) {
        if (this && typeof this === "function") {
            if ("callMethod" in this && typeof this.callMethod === "function") {
                this.callMethod.apply(this, args)
            } else if ("queue" in this && Array.isArray(this.queue)) {
                this.queue.push(args)
            }
        }
    } as unknown as FbqType

    ;(fbqFunction as any).push = fbqFunction
    ;(fbqFunction as any).loaded = true
    ;(fbqFunction as any).version = "2.0"
    ;(fbqFunction as any).queue = []

    if (!window._fbq) {
        window._fbq = fbqFunction
    }
    window.fbq = fbqFunction
}

/**
 * Track a page view event with comprehensive data
 * @param pageName - Descriptive name for the page (e.g., 'HomePage', 'ContactPage')
 * @param additionalData - Optional additional tracking data
 */
export function trackPageView(pageName: string, additionalData?: Record<string, unknown>): void {
    if (typeof window === "undefined" || !window.fbq) {
        console.warn(`[Meta Pixel] fbq not initialized when tracking: ${pageName}`)
        return
    }

    try {
        window.fbq("track", `${pageName}`, {
            page_title: pageName,
            page_path: typeof window !== "undefined" ? window.location.pathname : "",
            ...additionalData,
        })
    } catch (error) {
        console.error(`[Meta Pixel] Error tracking page view: ${pageName}`, error)
    }
}

/**
 * Track a lead event (used for form submissions)
 * Includes comprehensive form data and page context
 */
export function trackLead(data?: Record<string, unknown>): void {
    if (typeof window === "undefined" || !window.fbq) {
        console.warn("[Meta Pixel] fbq not initialized when tracking lead")
        return
    }

    try {
        const leadData = {
            timestamp: new Date().toISOString(),
            page_path: typeof window !== "undefined" ? window.location.pathname : "",
            ...data,
        }
        window.fbq("track", "Lead", leadData)
    } catch (error) {
        console.error("[Meta Pixel] Error tracking lead", error)
    }
}

/**
 * Track contact form submission with detailed form data
 * Specialized lead tracking for contact forms with page context
 */
export function trackContactFormSubmission(formData: {
    name?: string
    email?: string
    phone?: string
    service?: string
    message?: string
    pageName?: string
}): void {
    if (typeof window === "undefined" || !window.fbq) {
        console.warn("[Meta Pixel] fbq not initialized when tracking contact form")
        return
    }

    try {
        const submissionData = {
            event_type: "contact_form_submission",
            page_name: formData.pageName || "ContactPage",
            form_fields: {
                has_name: !!formData.name,
                has_email: !!formData.email,
                has_phone: !!formData.phone,
                has_service: !!formData.service,
                has_message: !!formData.message,
                message_length: formData.message?.length || 0,
                service_selected: formData.service || "not_selected",
            },
            timestamp: new Date().toISOString(),
        }

        // Track as Lead event for Facebook conversions
        window.fbq("track", "Lead", submissionData)

        window.fbq("track", "Contact", {
            page_name: formData.pageName || "ContactPage",
            email: formData.email,
            phone: formData.phone,
            service: formData.service,
            timestamp: new Date().toISOString(),
        })
    } catch (error) {
        console.error("[Meta Pixel] Error tracking contact form submission", error)
    }
}

/**
 * Track a custom event
 * @param eventName - Name of the custom event
 * @param data - Optional data to include with the event
 */
export function trackCustomEvent(eventName: string, data?: Record<string, unknown>): void {
    if (typeof window === "undefined" || !window.fbq) {
        console.warn(`[Meta Pixel] fbq not initialized when tracking: ${eventName}`)
        return
    }

    try {
        window.fbq("track", eventName, {
            timestamp: new Date().toISOString(),
            ...data,
        })
    } catch (error) {
        console.error(`[Meta Pixel] Error tracking event: ${eventName}`, error)
    }
}

/**
 * Conversation API event tracking
 * Used for WhatsApp Business API or Messenger integration
 */
export function trackConversationEvent(
    eventType: "message_sent" | "inquiry" | "callback_request",
    data?: Record<string, unknown>,
): void {
    if (typeof window === "undefined" || !window.fbq) {
        console.warn("[Meta Pixel] fbq not initialized when tracking conversation event")
        return
    }

    try {
        const conversationData = {
            event_type: eventType,
            timestamp: new Date().toISOString(),
            ...data,
        }
        window.fbq("track", "Contact", conversationData)
    } catch (error) {
        console.error("[Meta Pixel] Error tracking conversation event", error)
    }
}
