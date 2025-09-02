export const useAnalytics = () => {
  const { $gtag } = useNuxtApp()
  const config = useRuntimeConfig()

  const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
    if (!config.public.googleAnalyticsId || !$gtag) {
      return
    }
    
    $gtag('event', eventName, parameters)
  }

  const trackPageView = (pagePath?: string, pageTitle?: string) => {
    if (!config.public.googleAnalyticsId || !$gtag) {
      return
    }

    $gtag('config', config.public.googleAnalyticsId, {
      page_path: pagePath || useRoute().fullPath,
      page_title: pageTitle || document.title,
      page_location: window.location.href
    })
  }

  const trackConversion = (conversionId: string, parameters?: Record<string, any>) => {
    if (!config.public.googleAnalyticsId || !$gtag) {
      return
    }

    $gtag('event', 'conversion', {
      send_to: conversionId,
      ...parameters
    })
  }

  return {
    trackEvent,
    trackPageView,
    trackConversion
  }
}