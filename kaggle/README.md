# Dairy Mitra Kaggle Contract

This folder defines the expected live interface for Gemma 4 running on Kaggle GPU and exposed through FastAPI plus ngrok.

## Expected endpoints

- `GET /health`
- `POST /extract`

## Request

```json
{
  "text": "પટેલ સાહેબનું 1 લિટરથી 1.5 લિટર કરી નાખો આજથી."
}
```

## Response shape

Return JSON matching the app's `ExtractSuccess` schema exactly.

## Run outline

1. Start a Kaggle notebook with GPU enabled.
2. Install `fastapi`, `uvicorn`, `pyngrok`, and the Gemma 4 runtime you prefer.
3. Load the prompt from `prompts/extract_system.txt`.
4. Serve FastAPI on port `8000`.
5. Expose the notebook with ngrok and copy the public URL into `GEMMA_API_URL`.

## Demo flow

1. Set `USE_MOCK_GEMMA=false` in `.env.local`
2. Set `GEMMA_API_URL=https://...ngrok-free.app`
3. Run `npm run dev`
4. Visit `/api/health` to confirm connectivity
5. Use `/workspace` and submit a Gujarati instruction
