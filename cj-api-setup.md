# Instrukcja uzyskania klucza API dla CJ Dropshipping

## Krok 1: Logowanie do panelu deweloperskiego
- Przejdź na stronę: https://developers.cjdropshipping.com/
- Kliknij **"Login"** w prawym górnym rogu
- Użyj danych logowania do swojego konta CJ Dropshipping

## Krok 2: Przejście do sekcji API
- Po zalogowaniu się, przejdź do **"API Management"** lub **"Developer Center"**
- Jeśli to Twoje pierwsze logowanie do panelu deweloperskiego, może być konieczna aktywacja konta deweloperskiego

## Krok 3: Uzyskanie klucza API
1. W panelu deweloperskim znajdź sekcję **"API Keys"** lub **"Authentication"**
2. Kliknij **"Generate API Key"** lub **"Create API Key"**
3. Możesz nadać nazwę kluczowi (np. "Nyx Dropshipping Integration")
4. Kliknij **"Generate"** lub **"Create"**

## Krok 4: Kopiowanie klucza API
- Po wygenerowaniu, skopiuj wartość **"API Key"** lub **"Token"**
- **UWAGA**: Klucz API jest wyświetlany tylko raz! Upewnij się, że skopiowałeś go natychmiast
- Nie udostępniaj klucza nikomu

## Krok 5: Konfiguracja w pliku .env
Otwórz plik `.env` w katalogu `/root/.openclaw/workspace/nyx-shop/` i uzupełnij:

```
CJ_API_KEY=skopiowany_klucz_API
```

Zastąp "skopiowany_klucz_API" wartością, którą skopiowałeś z panelu CJ.

## Krok 6: Testowanie połączenia
Po zapisaniu pliku `.env`, uruchom test:

```bash
cd /root/.openclaw/workspace/nyx-shop
npm run search
```

Powinieneś zobaczyć komunikat "✅ Real API" zamiast "🔶 Mock Mode".

## Uwagi
- Dostęp do API może wymagać aktywacji konta lub spełnienia określonych warunków
- Jeśli nie widzisz opcji API Keys, może być konieczne:
  - Ukończenie procesu weryfikacji konta
  - Utworzenie przynajmniej jednego zamówienia testowego
  - Kontakt z supportem CJ Dropshipping
- Niektóre funkcje API mogą wymagać dodatkowej aktywacji lub płatnego planu

## Ograniczenia rate limiting
- Darmowi użytkownicy mogą mieć ograniczenia (np. 1000 żądań dziennie)
- Limit 3 użytkowników na jeden adres IP
- Dla intensywnego użytkowania może być potrzebny płatny plan

## Bezpieczeństwo
- Przechowuj klucz API w bezpiecznym miejscu
- Nie udostępniaj go w publicznych repozytoriach
- Regularnie zmieniaj klucz API (co 3-6 miesięcy)
- Używaj oddzielnych kluczy dla środowisk testowych i produkcyjnych