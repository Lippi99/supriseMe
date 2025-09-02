declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const router = useRouter()
  
  if (!config.public.googleAnalyticsId) {
    return
  }

  useHead({
    script: [
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${config.public.googleAnalyticsId}`,
        async: true
      }
    ]
  })

  if (import.meta.client) {
    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }
    
    window.gtag = gtag
    
    gtag('js', new Date())
    gtag('config', config.public.googleAnalyticsId, {
      page_title: document.title,
      page_location: window.location.href
    })

    // Track page views on route change
    router.afterEach((to) => {
      gtag('config', config.public.googleAnalyticsId, {
        page_path: to.fullPath,
        page_title: document.title,
        page_location: window.location.href
      })
    })
  }

  // Make gtag available globally
  return {
    provide: {
      gtag: (import.meta.client && window.gtag) ? window.gtag : () => {}
    }
  }
})