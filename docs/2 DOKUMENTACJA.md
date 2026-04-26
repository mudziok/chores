# Dokumentacja techniczna - Aplikacja do zarządzania obowiązkami domowymi

### i. Stos technologiczny

- Język programowania: TypeScript
- Framework: React Native Expo
- Baza danych: SQLite (lokalna) + ORM Prisma
- Backend: tRPC osadzone w aplikacji Next.js
- Autentykacja: Clerk

### ii. Dokumentacja

W repozytorium wyrózniamy trzy biblioteki w folderze `packages`:

- `api` - biblioteka zawierająca definicje endpointów API oraz logikę biznesową
- `db` - biblioteka zawierająca definicje modeli bazy danych oraz migracje
- `config` - biblioteka zawierająca konfigurację aplikacji

W folderze `apps` znajdują się dwie aplikacje:

- `expo` - aplikacja mobilna zbudowana w oparciu o React Native Expo
- `next` - aplikacja webowa zbudowana w oparciu o Next.js, służąca do wystawienia API systemu

Na kod źródłowy aplikacji mobilnej składają się trzy główne foldery:

- `components` - folder zawierający komponenty UI wykorzystywane w aplikacji
- `screens` - folder zawierający ekrany aplikacji
- `utils` - folder zawierający funkcje pomocnicze

Dostępne w `screens` ekrany to:

- `home.tsx` - ekran główny aplikacji, wyświetlający listę obowiązków domowych
- `newChore.tsx` - ekran dodawania nowego obowiązku domowego
- `chore.tsx` - ekran szczegółów obowiązku domowego, umożliwiający jego wykonanie
- `newHousehold.tsx` - ekran tworzenia nowej grupy domowej
- `joinHousehold.tsx` - ekran dołączania do istniejącej grupy domowej
- `shareHousehold.tsx` - ekran udostępniania kodu zaproszenia do grupy domowej
- `settings.tsx` - ekran ustawień aplikacji
- `signin.tsx` - ekran logowania do aplikacji
