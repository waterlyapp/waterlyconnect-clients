# WaterlyConnect NodeJS Client

## Installation

```
yarn add @waterly/waterlyconnect-nodejs-client
```

## Usage

```typescript
import { TagDatum, WaterlyConnectApiClient } from "@waterly/waterlyconnect-nodejs-client";

// Note that timestamps must be in *seconds* since the epoch, not milliseconds
const data: TagDatum[] = [
  { name: "MyTagName", value: "123.42", last_change_timestamp: Math.floor(new Date().getTime() / 1000) },
];

const api = new WaterlyConnectApiClient("https://app.dev.waterlyapp.com/connect/submit", "abcxyz", {
  type: "My SCADA",
  id: "waterclick-assigned-identifier",
});

api
  .submitData(data)
  .then(() => console.log("Successfully submitted data!"))
  .catch((err) => console.err("An error occurred", err.message));

```
