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
const banks = await client.getBanks();
console.log(banks);
```
