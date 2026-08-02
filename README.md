# Dairy Mitra

Dairy Mitra is a Next.js demo for Gujarati and Gujlish milk-vendor instructions. It converts typed or spoken vendor notes into a structured subscription card and a WhatsApp-ready Gujarati confirmation.

## Stack

- Next.js App Router
- Tailwind CSS v4
- Framer Motion
- Zod
- Web Speech API for browser voice capture
- Mock extractor by default, with live Gemma 4 support via `GEMMA_API_URL`

## Local setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Copy `.env.example` into `.env.local`.

```env
USE_MOCK_GEMMA=true
GEMMA_API_URL=
```

If `USE_MOCK_GEMMA=false`, the app will call `${GEMMA_API_URL}/extract` and `${GEMMA_API_URL}/health`.

## Demo script

1. Open `/workspace`
2. Click one of the four demo phrases or use the browser mic
3. Review the extracted order card
4. Edit the Gujarati WhatsApp draft and share it using the generated link

## API routes

- `POST /api/extract`
- `GET /api/customers`
- `GET /api/health`

## Live Gemma contract

See [kaggle/README.md](kaggle/README.md) for the Kaggle notebook shape, FastAPI contract, and ngrok setup.
