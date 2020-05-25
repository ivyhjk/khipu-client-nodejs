# Khipu Client NodeJS

The goal of this bundle is provide a [NodeJS](https://nodejs.org) client for
[Khipu](https://khipu.com).

## Installation

with NPM:

```
npm install --save khipu-client
```

with Yarn:

```
yarn add khipu-client
```

## Usage

Generate a new client to make requests:

```typescript
import { Client } from 'khipu-cliet';

const client = new Client({
  receiverId: 'YOUR_RECEIVER_IDENTIFIER_HERE',
  secret: 'YOUR_SECRET_HERE'
});
```

### Get banks

```typescript
// ...
const response = await client.getBanks();
```

### Create a payment

```typescript
// ...
const response = await client.createPayment({
  subject: 'a payment',
  currency: 'CLP',
  amount: 1000,
  // ...
});
```

### Delete a payment

```typescript
// ...
const response = await client.deletePayment('the-payment-id');
```

### Confirm a payment

```typescript
// ...
const response = await client.confirmPayment('the-payment-id');
```

### Get a payment by notification token

```typescript
// ...
const response = await client.getPaymentByNotificationToken(
  'the-notification-token'
);
```

### Create a receiver

```typescript
// ...
const response = await client.createReceiver({
  admin_first_name: '...',
  admin_last_name: '...',
  admin_email: '...',
  country_code: '...',
  business_identifier: '...',
  business_category: '...',
  business_name: '...',
  business_phone: '...',
  business_address_line_1: '...',
  business_address_line_2: '...',
  business_address_line_3: '...',
  contact_full_name: '...',
  contact_job_title: '...',
  contact_email: '...',
  contact_phone: '...',
  // ...
});
```
