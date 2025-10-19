# MercadoPago PIX Integration Documentation

## Overview

This document describes the MercadoPago PIX payment integration for the SurpriseMe platform. The integration provides Brazilian users with the ability to pay using PIX, Brazil's instant payment method.

## Architecture

### Payment Provider Selection Strategy

The system automatically selects the payment provider based on user location:

- **Brazil (BR)**: MercadoPago with PIX
- **Other countries**: Stripe with credit card

This is determined by the `/api/location/geo` endpoint which detects the user's country code.

### Components

#### Backend API Endpoints

1. **`/server/api/mercadopago/checkout.post.ts`**
   - Creates PIX payment preferences
   - Returns QR code and payment data
   - Validates user authentication and website ownership
   - Handles MercadoPago API errors

2. **`/server/api/mercadopago/payment-status.get.ts`**
   - Polls payment status
   - Used by frontend to check if payment was approved
   - Returns current payment state

3. **`/server/api/mercadopago/webhook.post.ts`**
   - Receives payment notifications from MercadoPago
   - Activates websites on successful payment
   - Handles payment failures and cancellations
   - Implements idempotency to prevent duplicate processing

#### Frontend Components

1. **`/components/PixPaymentModal.vue`**
   - Displays PIX QR code
   - Shows payment instructions
   - Polls payment status every 3 seconds
   - Handles payment success/failure states
   - Copies PIX code to clipboard

2. **`/pages/create.vue`** (modified)
   - Determines payment provider based on country
   - Integrates both Stripe and MercadoPago flows
   - Opens appropriate payment modal

## Payment Flow

### PIX Payment Process

```
1. User submits website creation form
   ↓
2. Backend creates website in database (inactive state)
   ↓
3. System detects user is from Brazil
   ↓
4. Frontend calls /api/mercadopago/checkout
   ↓
5. Backend creates PIX payment with MercadoPago API
   ↓
6. Frontend displays PixPaymentModal with QR code
   ↓
7. User scans QR code or copies PIX code
   ↓
8. User completes payment in their bank app
   ↓
9. MercadoPago sends webhook notification
   ↓
10. Backend webhook activates website
    ↓
11. Frontend polling detects approved status
    ↓
12. User is redirected to success page
```

### Status Polling

The frontend polls the payment status every 3 seconds after the QR code is displayed:

- **approved**: Payment successful → redirect to success page
- **pending/in_process**: Keep polling
- **rejected/cancelled**: Show error message

Polling stops when:
- Payment is approved
- Payment is rejected/cancelled
- User closes the modal
- Component is unmounted

## Configuration

### Environment Variables

Add these to your `.env` file:

```env
# MercadoPago Credentials
NUXT_MERCADOPAGO_ACCESS_TOKEN=TEST-xxxx-your-access-token
NUXT_MERCADOPAGO_PK=TEST-xxxx-your-public-key

# For production, use production credentials:
# NUXT_MERCADOPAGO_ACCESS_TOKEN=APP-xxxx
# NUXT_MERCADOPAGO_PK=APP-xxxx
```

### Runtime Configuration

The configuration is set in `/nuxt.config.ts`:

```typescript
mercadopago: {
  accessToken: process.env.NUXT_MERCADOPAGO_ACCESS_TOKEN,
  publicKey: process.env.NUXT_MERCADOPAGO_PK,
}
```

## Pricing

Prices are defined in BRL (Brazilian Real) in `/server/api/mercadopago/checkout.post.ts`:

```typescript
const PLAN_PRICES = {
  Basic: 20.0,    // R$ 20.00
  Premium: 35.0,  // R$ 35.00
};
```

**Note**: Adjust these prices based on your business requirements and exchange rates.

## Webhook Setup

### MercadoPago Configuration

1. Go to MercadoPago Developer Dashboard
2. Navigate to Your Application → Webhooks
3. Add webhook URL: `https://yourdomain.com/api/mercadopago/webhook`
4. Select events: `payment`

### Webhook Security

The webhook handler:
- Validates payment data structure
- Implements idempotency (prevents duplicate processing)
- Verifies website ownership
- Uses the same service functions as Stripe for consistency

### Testing Webhooks Locally

Use ngrok or similar tools to expose your local server:

```bash
ngrok http 3000
```

Then configure the webhook URL in MercadoPago dashboard:
```
https://your-ngrok-url.ngrok.io/api/mercadopago/webhook
```

## Error Handling

### Payment Creation Errors

The checkout endpoint handles:
- Invalid user authentication
- Missing website data
- MercadoPago API failures
- Network timeouts

All errors are logged and return user-friendly messages.

### Webhook Errors

The webhook handler:
- Logs all errors but returns success to prevent retries
- Only throws errors for validation issues (400)
- Gracefully handles missing metadata

## Testing

### Test Flow with MercadoPago Test Account

1. Use test credentials (TEST-xxx)
2. Create a website through the normal flow
3. When payment modal appears, use MercadoPago test PIX codes
4. Monitor webhook logs for payment confirmation

### MercadoPago Test Users

Create test users in MercadoPago dashboard to simulate:
- Test payer (buyer)
- Test collector (seller)

### Test Payment Status Transitions

```bash
# Check payment status manually
curl -X GET "http://localhost:3000/api/mercadopago/payment-status?paymentId=PAYMENT_ID"
```

## Database Schema

No changes required to existing schema. The integration uses:
- `Website.active` - set to true when payment approved
- `Website.plan` - stores selected plan (Basic/Premium)
- Existing user email for authentication

## Monitoring and Logging

### Important Logs

Payment creation:
```
Creating MercadoPago PIX payment: { websiteId, plan, amount, email }
PIX payment created: {paymentId} for website: {websiteId}
```

Webhook processing:
```
MercadoPago webhook received: { type, action, id }
Processing MercadoPago payment: {paymentId} - Status: {status}
Website {websiteId} activated successfully (Payment: {paymentId})
```

### Error Logs

```
MercadoPago checkout error: {error details}
Payment status check error: {error details}
MercadoPago webhook processing error: {error details}
```

## Security Considerations

1. **Authentication**: All endpoints verify user authentication via cookies
2. **Ownership**: Website ownership is verified before processing payments
3. **Idempotency**: Webhook events are tracked to prevent duplicate processing
4. **Input Validation**: Zod schemas validate all inputs
5. **Metadata**: Payment metadata includes website_id, user_email, and plan

## Migration from Stripe-Only

The integration maintains backward compatibility:
- Existing Stripe flow unchanged
- New MercadoPago flow runs parallel
- Both use the same database services
- Both activate websites via `updateWebsiteSuccess()`

## Frontend Internationalization

PIX payment strings are available in both English and Portuguese:
- `payment.pix.title`
- `payment.pix.scanQrCode`
- `payment.pix.howToPay`
- etc.

## Troubleshooting

### Payment Not Activating Website

1. Check webhook is being received:
   ```bash
   # Check server logs for webhook messages
   tail -f logs/app.log | grep "MercadoPago webhook"
   ```

2. Verify payment status:
   ```bash
   curl "http://localhost:3000/api/mercadopago/payment-status?paymentId=YOUR_PAYMENT_ID"
   ```

3. Check database:
   ```sql
   SELECT id, active, plan FROM "Website" WHERE id = YOUR_WEBSITE_ID;
   ```

### QR Code Not Displaying

1. Check MercadoPago credentials are correct
2. Verify API response includes `qr_code_base64`
3. Check browser console for errors
4. Verify MercadoPago SDK version compatibility

### Polling Not Working

1. Check payment ID is being passed correctly
2. Verify `/api/mercadopago/payment-status` endpoint is accessible
3. Check browser network tab for polling requests
4. Verify polling interval is not being cleared prematurely

## Production Checklist

Before going live:

- [ ] Replace TEST credentials with production credentials
- [ ] Configure production webhook URL in MercadoPago
- [ ] Test full payment flow with real PIX payment
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Configure proper logging
- [ ] Review and adjust pricing
- [ ] Test webhook reliability
- [ ] Verify SSL certificate is valid
- [ ] Set up payment reconciliation process
- [ ] Document customer support procedures

## Additional Resources

- [MercadoPago API Documentation](https://www.mercadopago.com.br/developers/en/docs)
- [PIX Payment Guide](https://www.mercadopago.com.br/developers/en/docs/checkout-api/integration-configuration/pix)
- [Webhook Configuration](https://www.mercadopago.com.br/developers/en/docs/your-integrations/notifications/webhooks)
- [MercadoPago SDK NPM](https://www.npmjs.com/package/mercadopago)

## Support

For issues related to:
- **MercadoPago API**: Contact MercadoPago support
- **Integration code**: Review this documentation or check server logs
- **Payment disputes**: Use MercadoPago dashboard

## Version History

- **v1.0.0** (2025-10-16): Initial MercadoPago PIX integration
  - PIX payment creation
  - QR code display
  - Payment status polling
  - Webhook handler
  - Multi-provider support
