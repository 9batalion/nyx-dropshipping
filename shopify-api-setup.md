# Instrukcja uzyskania kluczy API dla Shopify

## Krok 1: Weryfikacja konta
- Sprawdź skrzynkę e-mail (nyxassistant.dropshipping@gmail.com)
- Kliknij link weryfikacyjny z wiadomości od Shopify
- Ustaw hasło i zakończ proces rejestracji

## Krok 2: Logowanie do panelu administracyjnego
- Przejdź na stronę: https://nyx-dropshipping-store.myshopify.com/admin
- Zaloguj się używając adresu e-mail i hasła, które ustawiłeś podczas rejestracji

## Krok 3: Tworzenie aplikacji deweloperskiej
1. W panelu administracyjnym przejdź do:
   **Settings (Ustawienia)** → **Apps and sales channels (Aplikacje i kanały sprzedaży)** → **Develop apps (Twórz aplikacje)**

2. Kliknij **"Create an app"** (Utwórz aplikację)

3. Wpisz nazwę aplikacji:
   - App name: "Nyx Dropshipping Integration"
   - Wybierz "Custom app" (Niestandardowa aplikacja)
   - Kliknij **"Create app"**

4. Na stronie aplikacji przejdź do sekcji **"Admin API"**

## Krok 4: Konfiguracja uprawnień
W sekcji "Admin API" przyznaj następujące uprawnienia:

- **Products, variants and collections** → Read and write
- **Orders, transactions and fulfillments** → Read and write  
- **Customers** → Read and write
- **Inventory** → Read and write
- **Locations** → Read and write
- **Metaobjects** → Read and write (opcjonalnie)

Kliknij **"Save"** na dole strony.

## Krok 5: Instalacja aplikacji
- Kliknij **"Install app"** w prawym górnym rogu
- Potwierdź instalację w oknie dialogowym

## Krok 6: Kopiowanie kluczy API
Po instalacji aplikacji zobaczysz:

- **API Key** - skopiuj ten klucz
- **API Secret Key** - skopiuj ten klucz
- **Access token** - skopiuj ten token (dla nowych aplikacji)

## Krok 7: Konfiguracja w pliku .env
Otwórz plik `.env` w katalogu `/root/.openclaw/workspace/nyx-shop/` i uzupełnij:

```
SHOPIFY_STORE_URL=nyx-dropshipping-store.myshopify.com
SHOPIFY_API_KEY=skopiowany_klucz_API
SHOPIFY_API_SECRET=skopiowany_sekret_API
SHOPIFY_ACCESS_TOKEN=skopiowany_token_dostępu
SHOPIFY_API_VERSION=2024-01
```

Zastąp placeholder'y skopiowanymi wartościami.

## Krok 8: Testowanie połączenia
Po zapisaniu pliku `.env`, uruchom ponownie serwer i sprawdź logi, czy połączenie działa:

```bash
cd /root/.openclaw/workspace/nyx-shop
npm run search
npm run integrate
```

## Uwagi
- Pamiętaj, że konto Shopify ma 14-dniowy okres próbny
- Wersja API (2024-01) powinna być aktualna - możesz użyć najnowszej dostępnej wersji
- Jeśli masz problemy z dostępem, upewnij się, że używasz konta właściciela (Owner) a nie сотрудника (Staff account)