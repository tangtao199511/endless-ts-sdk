# Browser Extension

This folder contains a simple Chrome extension that demonstrates how to use the Endless TypeScript SDK.

## Build

Run the following command from the repository root to compile the TypeScript sources:

```bash
pnpm run build:extension
```

The compiled files will be placed in `extension/dist`.

## Load the extension

1. Open `chrome://extensions` in your browser.
2. Enable **Developer mode**.
3. Click **Load unpacked** and select this `extension` directory.
4. The popup allows you to create an account and submit transactions on the local network.
