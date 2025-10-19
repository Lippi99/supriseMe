<template>
  <UModal v-model="isModalOpen" :ui="{ width: 'max-w-2xl' }">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ $t('payment.pix.title') }}
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            @click="closeModal"
            :disabled="paymentStatus === 'approved'"
          />
        </div>
      </template>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-12">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-violet-600 mb-4"></div>
        <p class="text-gray-600 dark:text-gray-400">
          {{ $t('payment.pix.generating') }}
        </p>
      </div>

      <!-- QR Code Display -->
      <div v-else-if="pixData && paymentStatus !== 'approved'" class="space-y-6">
        <!-- Amount and Plan Info -->
        <div class="bg-violet-50 dark:bg-violet-900/20 rounded-lg p-4">
          <div class="flex justify-between items-center mb-2">
            <span class="text-gray-600 dark:text-gray-400">Plano:</span>
            <span class="font-semibold text-gray-900 dark:text-white">{{ plan }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600 dark:text-gray-400">Valor:</span>
            <span class="text-2xl font-bold text-violet-600 dark:text-violet-400">
              {{ formatCurrency(pixData.amount) }}
            </span>
          </div>
        </div>

        <!-- QR Code -->
        <div class="flex flex-col items-center space-y-4">
          <p class="text-center text-gray-700 dark:text-gray-300">
            {{ $t('payment.pix.scanQrCode') }}
          </p>

          <div class="bg-white p-4 rounded-lg shadow-lg">
            <img
              v-if="pixData.qrCodeBase64"
              :src="`data:image/png;base64,${pixData.qrCodeBase64}`"
              alt="QR Code PIX"
              class="w-64 h-64"
            />
          </div>

          <!-- Copy PIX Code Button -->
          <div class="w-full space-y-2">
            <p class="text-sm text-center text-gray-600 dark:text-gray-400">
              {{ $t('payment.pix.orCopyCode') }}
            </p>
            <UButton
              block
              color="violet"
              variant="outline"
              @click="copyPixCode"
              :icon="copied ? 'i-heroicons-check-20-solid' : 'i-heroicons-clipboard-document-20-solid'"
            >
              {{ copied ? $t('payment.pix.copied') : $t('payment.pix.copyCode') }}
            </UButton>
          </div>
        </div>

        <!-- Instructions -->
        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 space-y-2">
          <h4 class="font-semibold text-blue-900 dark:text-blue-200">
            {{ $t('payment.pix.howToPay') }}
          </h4>
          <ol class="list-decimal list-inside space-y-1 text-sm text-blue-800 dark:text-blue-300">
            <li>{{ $t('payment.pix.step1') }}</li>
            <li>{{ $t('payment.pix.step2') }}</li>
            <li>{{ $t('payment.pix.step3') }}</li>
          </ol>
        </div>

        <!-- Expiration Warning -->
        <div v-if="pixData.expirationDate" class="text-center text-sm text-gray-600 dark:text-gray-400">
          {{ $t('payment.pix.expiresAt') }}: {{ formatDate(pixData.expirationDate) }}
        </div>

        <!-- Payment Status Indicator -->
        <div class="flex items-center justify-center space-x-2 text-yellow-600 dark:text-yellow-400">
          <div class="animate-pulse h-3 w-3 bg-yellow-500 rounded-full"></div>
          <span class="text-sm">{{ $t('payment.pix.waitingPayment') }}</span>
        </div>
      </div>

      <!-- Success State -->
      <div v-else-if="paymentStatus === 'approved'" class="flex flex-col items-center justify-center py-12 space-y-4">
        <div class="h-20 w-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
          <UIcon name="i-heroicons-check-circle-20-solid" class="h-12 w-12 text-green-600" />
        </div>
        <h3 class="text-2xl font-bold text-green-600">
          {{ $t('payment.pix.paymentApproved') }}
        </h3>
        <p class="text-center text-gray-600 dark:text-gray-400">
          {{ $t('payment.pix.redirecting') }}
        </p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="flex flex-col items-center justify-center py-12 space-y-4">
        <div class="h-20 w-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
          <UIcon name="i-heroicons-x-circle-20-solid" class="h-12 w-12 text-red-600" />
        </div>
        <h3 class="text-2xl font-bold text-red-600">
          {{ $t('payment.pix.error') }}
        </h3>
        <p class="text-center text-gray-600 dark:text-gray-400">
          {{ error }}
        </p>
        <UButton @click="closeModal" color="gray">
          {{ $t('common.close') }}
        </UButton>
      </div>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps<{
  isOpen: boolean;
  websiteId: number;
  websiteGuid: string;
  plan: string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const { t } = useI18n();
const router = useRouter();
const toast = useToast();

const isModalOpen = ref(props.isOpen);
const isLoading = ref(false);
const pixData = ref<any>(null);
const paymentStatus = ref<string>('pending');
const error = ref<string | null>(null);
const copied = ref(false);
let pollingInterval: NodeJS.Timeout | null = null;

// Watch for prop changes
watch(() => props.isOpen, (newValue) => {
  isModalOpen.value = newValue;
  if (newValue) {
    createPixPayment();
  } else {
    stopPolling();
  }
});

async function createPixPayment() {
  isLoading.value = true;
  error.value = null;

  try {
    const { data, error: fetchError } = await useFetch('/api/mercadopago/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        websiteId: props.websiteId,
        websiteGuid: props.websiteGuid,
        plan: props.plan,
      }),
    });

    if (fetchError.value) {
      throw new Error(fetchError.value.message || 'Failed to create PIX payment');
    }

    pixData.value = data.value;

    // Start polling for payment status
    startPolling(pixData.value.paymentId);

    console.log('PIX payment created:', pixData.value);
  } catch (err: any) {
    console.error('PIX payment creation error:', err);
    error.value = err.message || 'Failed to create PIX payment';
    toast.add({
      title: 'Erro ao gerar PIX',
      description: error.value,
      color: 'red',
    });
  } finally {
    isLoading.value = false;
  }
}

function startPolling(paymentId: string) {
  // Poll every 3 seconds
  pollingInterval = setInterval(async () => {
    try {
      const { data } = await useFetch(`/api/mercadopago/payment-status?paymentId=${paymentId}`, {
        method: 'GET',
      });

      if (data.value?.status === 'approved') {
        paymentStatus.value = 'approved';
        stopPolling();

        toast.add({
          title: 'Pagamento aprovado!',
          description: 'Redirecionando...',
          color: 'green',
        });

        // Redirect to success page after 2 seconds
        setTimeout(() => {
          router.push(`/success/${props.websiteGuid}`);
        }, 2000);
      } else if (data.value?.status === 'rejected' || data.value?.status === 'cancelled') {
        paymentStatus.value = data.value.status;
        stopPolling();
        error.value = 'Payment was rejected or cancelled';

        toast.add({
          title: 'Pagamento não aprovado',
          description: 'O pagamento foi rejeitado ou cancelado.',
          color: 'red',
        });
      }
    } catch (err) {
      console.error('Error polling payment status:', err);
    }
  }, 3000);
}

function stopPolling() {
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
  }
}

async function copyPixCode() {
  if (pixData.value?.qrCode) {
    try {
      await navigator.clipboard.writeText(pixData.value.qrCode);
      copied.value = true;
      toast.add({
        title: 'Código copiado!',
        description: 'Cole no seu app de pagamento',
        color: 'green',
      });

      setTimeout(() => {
        copied.value = false;
      }, 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.add({
        title: 'Erro ao copiar',
        color: 'red',
      });
    }
  }
}

function closeModal() {
  if (paymentStatus.value !== 'approved') {
    stopPolling();
  }
  isModalOpen.value = false;
  emit('close');
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Cleanup on component unmount
onUnmounted(() => {
  stopPolling();
});
</script>
