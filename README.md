# kalkulator_magazynowy

Aplikacja webowa typu SPA (Single Page Application) służąca do planowania zasobów ludzkich w logistyce. Pozwala na precyzyjne obliczenie zapotrzebowania na pracowników (FTE - Full Time Equivalent) w oparciu o wolumeny operacyjne oraz realne parametry wydajnościowe.

## 🌍 Jak udostępnić aplikację znajomym? (Vercel)

Aby aplikacja działała na telefonie innej osoby pod stałym linkiem, najlepiej wdrożyć ją na darmowy hosting **Vercel**. Ponieważ Twój kod jest już na GitHubie, zajmie to 2 minuty.

### Krok 1: Przygotowanie
1. Upewnij się, że wszystkie zmiany w StackBlitz/VS Code są wysłane na GitHub (**Commit & Push**).

### Krok 2: Wdrożenie na Vercel
1. Wejdź na stronę [vercel.com](https://vercel.com) i załóż darmowe konto (zaloguj się przez GitHub).
2. Kliknij przycisk **"Add New..."** -> **"Project"**.
3. Na liście "Import Git Repository" znajdź swoje repozytorium: `kalkulator_magazynowy` i kliknij **Import**.
4. W sekcji "Configure Project" znajdź pole **Environment Variables** (Zmienne Środowiskowe):
   * Wpisz **Key**: `API_KEY`
   * Wpisz **Value**: (Twój klucz z Google AI Studio, zaczynający się od `AIza...`)
   * Kliknij **Add**.
5. Kliknij przycisk **Deploy**.

### Krok 3: Gotowe!
Po chwili Vercel wygeneruje link (np. `kalkulator-magazynowy.vercel.app`).
* Wyślij ten link znajomemu.
* Aplikacja działa na każdym telefonie, bez logowania.

---

## 🚀 Jak uruchomić lokalnie / edytować?

### Opcja A: Masz edytor w chmurze (np. AI Studio, StackBlitz)
1. Otwórz projekt w StackBlitz.
2. W terminalu wpisz: `npm install` a potem `npm run dev`.
3. Jeśli wystąpią błędy z wersjami, usuń plik blokady: `rm package-lock.json` i spróbuj ponownie.

### Opcja B: Masz komputer z Node.js
1. Pobierz kod: `git clone ...`
2. Zainstaluj zależności: `npm install`
3. Uruchom: `npm run dev`

---

## 🚀 Główne Funkcjonalności

### 1. Zaawansowany Algorytm Obliczeniowy (Logistyka)
*   **Efektywny Czas Pracy:** Automatyczne odejmowanie przerw.
*   **Wskaźnik OEE:** Uwzględnienie % wydajności i zmęczenia.
*   **FTE:** Wyniki zaokrąglane w górę dla bezpieczeństwa operacyjnego.

### 2. Obsługa Procesów
*   Przyjęcie (Receiving)
*   Kompletacja (Picking)
*   Pakowanie (Packing)

### 3. Dashboard i AI
*   Wizualizacja graficzna wyników.
*   **Inteligentny Import:** Wklej treść maila, a AI uzupełni tabelę.
*   **Analityk AI:** Generowanie porad operacyjnych jednym kliknięciem.

---

## ⚙️ Technologia
*   React 19 + TypeScript
*   Vite
*   Tailwind CSS
*   Google Gemini API (via `@google/genai`)
