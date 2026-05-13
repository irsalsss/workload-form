## Prerequisites

- Node.js 18+
- pnpm

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm dev
```

App runs at `http://localhost:5173`.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm dev` | Start dev server with HMR |
| `npm build` | Type-check and build for production |
| `npm preview` | Preview production build locally |
| `npm lint` | Run ESLint |

## Project Structure

```
src/
├── components/
│   ├── WorkloadForm.tsx   # Main form with workload allocation table
│   ├── Select.tsx         # Reusable select dropdown
│   └── Notification.tsx   # Toast notification component
├── consts/
│   └── workload.ts        # Static workload data
├── hooks/
│   └── useNotification.ts # Notification state hook
├── types/
│   └── workload.ts        # TypeScript types
└── App.tsx                # Root component with year selection
```
