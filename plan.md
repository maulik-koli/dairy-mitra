---
name: Dairy Mitra Implementation Plan
overview: A complete, agent-ready implementation plan for Dairy Mitra — a Next.js milk-vendor assistant that turns Gujarati/Gujlish voice and text instructions into structured subscription cards and WhatsApp-ready messages, calling Gemma 4 on Kaggle via ngrok, with a local mock mode so UI work is unblocked.
todos:
  - id: scaffold-next
    content: Scaffold Next.js 15 + Tailwind + Framer Motion + fonts + design tokens
    status: pending
  - id: data-matching-types
    content: Add customers seed, matching rules, zod types, mock Gemma 4
    status: pending
  - id: api-routes
    content: Implement /api/extract, /api/customers, /api/health with mock/live switch
    status: pending
  - id: pages-ui
    content: Build landing, workspace (with Web Speech API voice recording), customers pages
    status: pending
  - id: kaggle-contract
    content: Add kaggle/ stubs for Gemma 4 FastAPI server, extract prompt, .env.example, README demo script
    status: pending
  - id: qa-build
    content: Verify 4 demo chips + voice capture + npm run build
    status: pending
isProject: false
---

# Dairy Mitra — Full Implementation Plan (Agent Brief)

**Hand this entire document to the coding agent.** Build everything described here end-to-end. Do not invent extra features (no real auth, payments, GPS, WhatsApp Business API, or backend speech servers). Prefer working demo polish over architecture sprawl.

**Assumptions (locked):**

- New repo / empty repo named `dairy-mitra`. Scaffold from scratch.
- Coding agent builds the **Next.js web app** in this repo, plus a `kaggle/` folder with notebook + Gemma 4 prompt stubs and the exact API contract.
- Live inference = **Gemma 4** running on Kaggle GPU exposed via **FastAPI + ngrok**. App talks to that URL via `GEMMA_API_URL`.
- Local/dev without GPU = **mock extractor** returning deterministic JSON for demo phrases so UI always works seamlessly.
- Voice input = **Web Speech API (`webkitSpeechRecognition`)** client-side voice capture in the browser converting speech directly into the input field.

---

## 1. Product Summary

**Dairy Mitra** (“dairy friend”) helps local milk vendors (doodhwala) turn informal Gujarati / Gujlish spoken or written instructions into:

1. A structured, editable customer/subscription card
2. A Gujarati WhatsApp-ready confirmation message

**Primary user:** The local vendor (not the household customer).

**Core pipeline:**

```mermaid
flowchart LR
  Voice[Browser Mic / Web Speech API] --> Input[Vendor text input]
  Input --> Match[Name match vs seeded customers]
  Match -->|unknown change or pause| Reject[Clear rejection UI]
  Match -->|new or known customer| API[POST /api/extract]
  API --> Gemma[Gemma 4 via ngrok or mock]
  Gemma --> Card[Structured card]
  Gemma --> WA[WhatsApp message draft]
  Card --> Edit[Vendor edits then confirms]
  WA --> Edit



Create with:
  npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack --yes  



  dairy-mitra/
├── README.md
├── .env.example
├── .gitignore
├── package.json
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── public/
│   └── images/                 # hero dairy atmosphere
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                 # Landing (brand hero)
│   │   ├── globals.css
│   │   ├── workspace/
│   │   │   └── page.tsx             # Main capture + result
│   │   ├── customers/
│   │   │   └── page.tsx             # Seeded customer list
│   │   └── api/
│   │       ├── extract/route.ts     # Proxies to Gemma 4 or mock
│   │       ├── customers/route.ts   # GET seeded customers
│   │       └── health/route.ts      # Checks GEMMA_API_URL /health
│   ├── components/
│   │   ├── layout/
│   │   │   ├── SiteHeader.tsx
│   │   │   └── SiteFooter.tsx
│   │   ├── landing/
│   │   │   └── Hero.tsx
│   │   ├── workspace/
│   │   │   ├── InstructionForm.tsx  # Includes 🎤 Browser Web Speech Mic Button
│   │   │   ├── ExampleChips.tsx
│   │   │   ├── ResultCard.tsx
│   │   │   ├── WhatsAppDraft.tsx
│   │   │   └── RejectBanner.tsx
│   │   └── customers/
│   │       └── CustomerTable.tsx
│   ├── lib/
│   │   ├── customers.ts             # Seeded data
│   │   ├── matching.ts              # Name match rules
│   │   ├── types.ts                 # Shared types + zod schemas
│   │   ├── gemma-client.ts          # Call remote Gemma 4 /extract
│   │   ├── mock-gemma.ts            # Deterministic demo responses
│   │   └── whatsapp-templates.ts    # Fallback templates if model omits message
└── kaggle/
    ├── README.md                    # How to run Gemma 4 + FastAPI + ngrok
    ├── dairy_mitra_extract.ipynb    # Stub notebook: load Gemma 4, FastAPI, ngrok
    └── prompts/
        └── extract_system.txt       # Gemma 4 system prompt text








4. Design System
Brand Name: Dairy Mitra must read as the hero-level signal (large display typography).

Visual direction:

Atmosphere: Cool morning dairy — milk white, soft sage leaf, deep ink.

CSS variables in globals.css:

  :root {
  --bg: #f7faf8;
  --bg-elevated: #ffffff;
  --ink: #14201a;
  --muted: #5b6b62;
  --sage: #3f6f5b;
  --sage-deep: #2a4d3f;
  --foam: #e8f0eb;
  --line: #d5e2da;
  --warn: #9a3412;
  --ok: #166534;
  --radius: 1rem;
}


Background: Soft vertical gradient foam → bg with subtle milk-ripple SVG accent.

Landing hero: Full-bleed dairy atmosphere image (morning milk cans / delivery setup).

Motion (Framer Motion): Hero wordmark fade/rise, result card spring-in after extraction, microphone record animation.

Typography: Fraunces for display headlines; Figtree for body/forms.



5. Pages & Components
5.1 / — Landing
Full-bleed hero with brand Dairy Mitra.

Headline: “Your doodhwala’s voice ledger, structured.”

Subtitle: "Turn informal Gujarati voice notes into clean subscription orders and ready-to-send WhatsApp confirmations using Gemma 4."

CTAs: Primary Open Workspace → /workspace; Secondary View Customers → /customers.

5.2 /workspace — Main Product Screen
InstructionForm: Textarea + prominent 🎤 Tap to Speak button (uses browser Web Speech API webkitSpeechRecognition for Gujarati/Gujlish speech-to-text).

ExampleChips: Pre-fills sample Gujarati/Gujlish sentences on click.

Outcomes:

RejectBanner for unknown pause/change commands.

ResultCard with editable extracted fields (Customer, Action, Quantity, Product, Rate, Status).

WhatsAppDraft with editable Gujarati text + 1-Click WhatsApp Share link (wa.me/?text=...).

5.3 /customers — Seeded State Credibility
Simple list/table of active subscriptions (Bhavinbhai, Ramaben, Patel Saheb).

Purpose: Gives context to the matching rules and proves the system understands existing vs. new customers.

6. Hardcoded Data & Matching Rules
6.1 Seeded Customers (src/lib/customers.ts)


export const CUSTOMERS = [
  {
    id: "c1",
    name: "Bhavinbhai",
    nameAliases: ["bhavinbhai", "bhavin bhai", "ભાવિનભાઈ", "ભાવિન ભાઈ"],
    product: "Buffalo Milk",
    quantityLiters: 2,
    frequency: "daily",
    ratePerLiter: 75,
    billing: "monthly",
    status: "active",
  },
  {
    id: "c2",
    name: "Ramaben",
    nameAliases: ["ramaben", "rama ben", "રમાબેન"],
    product: "Cow Milk",
    quantityLiters: 1,
    frequency: "daily",
    ratePerLiter: 60,
    billing: "monthly",
    status: "active",
  },
  {
    id: "c3",
    name: "Patel Saheb",
    nameAliases: ["patel saheb", "patel", "પટેલ સાહેબ", "પટેલ"],
    product: "Cow Milk",
    quantityLiters: 1,
    frequency: "daily",
    ratePerLiter: 60,
    billing: "monthly",
    status: "active",
  },
] as const;



6.2 Matching Algorithm (src/lib/matching.ts)Normalize input text (lowercase, strip extra whitespace, keep Gujarati script intact).Check if any seeded customer name/alias appears in the text.If text expresses a pause/change/cancel command for a customer NOT in the seeded list $\rightarrow$ Return UNKNOWN_CUSTOMER rejection.If valid match or a clear new subscription $\rightarrow$ Forward to /api/extract for Gemma 4 extraction.7. Types & JSON Contract (src/lib/types.ts)Shared schema with Gemma 4 output:



export type Intent =
  | "new_subscription"
  | "pause"
  | "quantity_change"
  | "cancel";

export type ExtractSuccess = {
  ok: true;
  intent: Intent;
  confidence: number; // 0..1
  customer: {
    name: string;
    matchedCustomerId: string | null;
  };
  fields: {
    product?: string | null;
    quantityLiters?: number | null;
    oldQuantityLiters?: number | null;
    frequency?: "daily" | "alternate" | "one_time" | null;
    startDate?: string | null;
    effectiveDate?: string | null;
    pauseDates?: string[] | null;
    reason?: string | null;
    ratePerLiter?: number | null;
    billing?: "monthly" | "daily_cash" | null;
    status?: string | null;
  };
  whatsappMessageGu: string; // Gujarati confirmation
  notes?: string | null;
};

export type ExtractFailure = {
  ok: false;
  code: "UNKNOWN_CUSTOMER" | "INVALID_INPUT" | "MODEL_ERROR";
  message: string;
};

export type ExtractResponse = ExtractSuccess | ExtractFailure;


8. APIs8.1 POST /api/extractAccepts { text: string }.Runs matching rules.If USE_MOCK_GEMMA=true $\rightarrow$ Calls mockExtract().Else $\rightarrow$ Forwards payload to ${GEMMA_API_URL}/extract (Gemma 4 model running on Kaggle GPU).8.2 GET /api/customersReturns the seeded CUSTOMERS array.8.3 GET /api/healthPings ${GEMMA_API_URL}/health to verify Kaggle GPU connectivity.9. Mock Gemma 4 (src/lib/mock-gemma.ts)Deterministic responses for offline testing:


Input (approx)IntentResultભાવિનભાઈ ને આજથી 2 લીટર ભેંસનું દૂધ ચાલુ કર્યું, મહિને bill આપશે.new_subscriptionBhavinbhai card + WA messageકાલે રમાબેનને દૂધ બંધ રાખજો, એ ગામડે જાય છે.pauseRamaben pause tomorrowપટેલ સાહેબનું 1 લીટરથી 1.5 લીટર કરી નાખો આજથી.quantity_changePatel quantity 1 $\rightarrow$ 1.5Lકાલે સુરેશને દૂધ બંધRejectionUNKNOWN_CUSTOMER10. Kaggle Gemma 4 Python Contract (kaggle/)Gemma 4 System Prompt (kaggle/prompts/extract_system.txt):PlaintextYou are Dairy Mitra, an AI extraction assistant powered by Google DeepMind's Gemma 4.
Your task is to parse informal Gujarati or Gujlish voice transcriptions from local milk vendors into a strictly formatted JSON object matching the ExtractSuccess schema.

RULES:
1. Parse entities: customer name, product type, quantity (liters), frequency, dates, rate, and billing.
2. Identify the core intent: new_subscription, pause, quantity_change, or cancel.
3. Match against known customers if provided.
4. Output ONLY valid JSON adhering strictly to the schema. Do not include markdown code block syntax like ```json ... ```.
5. Always generate a polite, clear Gujarati WhatsApp message in whatsappMessageGu.
Kaggle Python FastAPI Server Snippet (kaggle/dairy_mitra_extract.ipynb):Python# Runs on Kaggle GPU (T4/P100)
from fastapi import FastAPI
from pydantic import BaseModel
from pyngrok import ngrok
import uvicorn

app = FastAPI()

class ExtractReq(BaseModel):
    text: str

@app.get("/health")
def health():
    return {"status": "ok", "model": "Gemma 4"}

@app.post("/extract")
def extract(req: ExtractReq):
    # Pass prompt + req.text to Gemma 4
    # Return structured JSON matching ExtractSuccess
    return {
        "ok": True,
        "intent": "new_subscription",
        "confidence": 0.98,
        "customer": {"name": "Bhavinbhai", "matchedCustomerId": "c1"},
        "fields": {
            "product": "Buffalo Milk",
            "quantityLiters": 2,
            "billing": "monthly",
            "ratePerLiter": 75
        },
        "whatsappMessageGu": "નમસ્તે ભાવિનભાઈ, તમારું 2 લિટર ભેંસના દૂધનું સેવિંગ આજથી ચાલુ કરી દીધું છે. - Dairy Mitra"
    }

# Expose server via ngrok tunnel
ngrok.set_auth_token("YOUR_NGROK_TOKEN")
public_url = ngrok.connect(8000)
print(f"🚀 GEMMA 4 LIVE API URL: {public_url}")

# Serve app
config = uvicorn.Config(app, host="0.0.0.0", port=8000)
server = uvicorn.Server(config)
await server.serve()
11. Env Setup (.env.example)USE_MOCK_GEMMA=true
GEMMA_API_URL=
# Example when live: [https://xxxx.ngrok-free.app](https://xxxx.ngrok-free.app)
12. Explicit Non-Goals (do NOT build)NextAuth / Login screens / User rolesDatabase (Prisma/Postgres/MongoDB)Real WhatsApp Business API sendingExternal backend speech-to-text servers (Whisper/Assembly)Monthly bill calculation engineMaps / GPS / Route planning13. Definition of Donenpm run dev serves landing page and working workspace in mock mode.Web Speech API microphone button transcribes Gujarati/Gujlish speech in browser.All 4 demo chips and mock routes work seamlessly.Kaggle Gemma 4 FastAPI contract is documented and testable via GEMMA_API_URL.npm run build passes with zero TypeScript errors.
