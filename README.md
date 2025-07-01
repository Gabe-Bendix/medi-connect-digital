# MediConnect Digital

A Next.js-powered web app that helps travelers with chronic conditions:

- **Quick Intro**  
  - **Medication Search**: An AI chat assistant suggests local equivalents for medications you’re used to at home, complete with a translated “flash-card” you can show pharmacies abroad.  
  - **Pharmacy Locator**: Finds the nearest open pharmacy to the address you’ve saved or “Use My Location.”  
  - **About & Info**: Learn the story behind the project and view the original LinkedIn announcement.

---

## How the Backend Works

### 1. Chat API (`/api/chat/route.ts`)

- **Endpoint**  
  - **POST** `/api/chat` expects a JSON body with:
    ```ts
    interface ChatRequest {
      message: string;          // user’s latest prompt
      history: {               // previous chat messages
        from: "user"|"assistant"|"system";
        text: string;
      }[];
      address: string;         // the saved address from Home
    }
    ```
- **System Prompt Injection**  
  - A rigid, multi-step “medical workflow” system prompt is prepended (it never leaks to the user).  
  - It uses the saved address to infer country & language for the translation flash-card.
- **OpenAI SDK**  
  - Instantiates `new OpenAI({ apiKey: process.env.OPENAI_API_KEY })`.  
  - Calls `openai.chat.completions.create({ model: "gpt-3.5-turbo", messages })`.  
  - Returns the assistant’s reply as JSON: `{ reply: string }`.
- **TypeScript Typing**  
  - **`ChatCompletionMessageParam`** is imported and used to cast the messages array so it matches the SDK’s signature.  
  - Strongly-typed `ChatMessage` and `ChatRequest` interfaces replace any usage of `any`.

---

### 2. Pharmacy Locator Logic

All executed in the browser (client-only):

1. **Load Saved Address**  
   - Reads from `localStorage.getItem("mediConnectAddress")`.
2. **Geocoding**  
   - Calls **Nominatim** (OpenStreetMap) to convert the address → latitude/longitude.
3. **Overpass API**  
   - Posts a query to Overpass to fetch nearby nodes/ways tagged `amenity=pharmacy` within a 5 km radius.
4. **Choose Nearest**  
   - Computes Haversine distance between the user’s coords and each result.  
   - Picks the closest, extracts `tags.name` and address parts.
5. **Map Rendering**  
   - **Dynamically imports** `react-leaflet` in a `useEffect` (so the server never loads Leaflet or touches `window`, avoiding SSR errors).  
   - Displays a `<MapContainer>` with two markers (“You are here” + pharmacy).  
   - A small “Info Box” under the map shows pharmacy name and address.

---

### 3. Environment & Deployment

- **Environment Variables**  
  - Create a `.env.local` in the project root containing:
    ```env
    OPENAI_API_KEY=sk-<your_key_here>
    ```
  - Vercel: Add the same key under **Settings → Environment Variables**.
- **Build & Deploy**  
  - Locally:  
    ```bash
    npm install
    npm run dev      # for development
    npm run build    # to catch any build or type errors
    ```
  - On Vercel: Push to `main` (or your production branch). Vercel auto-builds and serves the app.

---

*MediConnect Digital seamlessly bridges design, AI, and maps to give travelers with medical needs confidence abroad.*
