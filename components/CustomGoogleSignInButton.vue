<template>
  <div @click="handleSignIn">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
interface CredentialResponse {
  credential?: string;
  select_by?: string;
}

const emit = defineEmits<{
  success: [response: CredentialResponse]
  error: [error: any]
}>()

const config = useRuntimeConfig()

let isInitialized = false

async function initializeGoogleSignIn() {
  if (isInitialized || !process.client) return
  
  try {
    // Load Google Sign-In script if not already loaded
    if (!window.google) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = 'https://accounts.google.com/gsi/client'
        script.onload = resolve
        script.onerror = reject
        document.head.appendChild(script)
      })
    }

    if (!config.public.googleSignInClientId) {
      throw new Error('Google Sign-In Client ID is not configured')
    }

    // Initialize Google Sign-In
    window.google.accounts.id.initialize({
      client_id: config.public.googleSignInClientId,
      callback: handleCredentialResponse,
      auto_select: false,
      cancel_on_tap_outside: true,
      itp_support: true
    })
    
    isInitialized = true
  } catch (error) {
    console.error('Failed to initialize Google Sign-In:', error)
    emit('error', error)
  }
}

function handleCredentialResponse(response: CredentialResponse) {
  try {
    emit('success', response)
  } catch (error) {
    console.error('Error handling credential response:', error)
    emit('error', error)
  }
}

async function handleSignIn() {
  try {
    await initializeGoogleSignIn()
    
    if (!window.google || !window.google.accounts) {
      throw new Error('Google Sign-In not properly initialized')
    }

    // Use a more direct approach for the sign-in flow
    window.google.accounts.id.prompt((notification: any) => {
      if (notification.isNotDisplayed()) {
        console.warn('Google Sign-In prompt not displayed. This usually means:', 
          '\n1. The origin is not authorized in Google Cloud Console',
          '\n2. Add http://localhost:3001 to authorized origins',
          '\n3. Or the user has blocked popups')
        
        emit('error', { 
          message: 'Google Sign-In not available. Please check console for details.',
          details: 'Origin not authorized or popups blocked'
        })
      } else if (notification.isSkippedMoment()) {
        console.warn('Google Sign-In was skipped by user')
      }
    })
  } catch (error) {
    console.error('Google Sign-In error:', error)
    emit('error', error)
  }
}

// Initialize on mount
onMounted(() => {
  if (process.client) {
    initializeGoogleSignIn()
  }
})
</script>