# Specyfikacja projektu - Aplikacja do zarządzania obowiązkami domowymi

### i. Wymagania funkcjonalne

- Zaznaczenie wykonania obowiązku - System umozliwia uzytkownikom znajdującym się w grupie domowej wyszukanie obowiazkow na dany dzień oraz zaznczenie wykonania obowiązku domowego zapisując w historii obowiązku osobę która go wykonała, mozliwa do pozniejszego podglądu.

- Dodawanie obowiązku domowego - System pozwala uzytkownikom znajdującym się w grupie domowej dodawanie nowych jednorazowych oraz cyklicznych obowiazkow domowych. Kazdy obowiazek posiada swoją nazwę, opcjonalny opis, datę rozpoczęcia oraz cykliczność obowiazku (w jaki dzień tygodnia nalezy go wykonac).

- Stworzenie nowej grupy domowej - System oferuje mozliwość utworzenia nowej grupy domowej słuzacej do współdzielenia kalendarza obowiązków domowych pomiędzy domownikami.

- Dołączenie do grupy domowej - System umozliwia dołączenie do grupy domowej poprzez przepisanie kodu zaproszenia z telefonu osoby która juz jest w docelowej grupie domowej.

### ii. Wymagania pozafunkcjonalne

- System musi zapewniać szybką odpowiedź na zapytania uzytkownikow (czas odpowiedzi < 500ms dla standardowych operacji CRUD)

- System musi zapewniać integralność danych poprzez zastosowanie transakcji bazodanowych.

### iii. Krótki opis projektu.

Aplikacja do zarządzania obowiązkami domowymi to aplikacja na systemy operacyjne smartfonów iOS oraz Android zbudowana w oparciu o React Native Expo umozliwiajaca uzytkownikom tworzenie wspólnych kalendarzy obowiązków domowych.

### iv. Potencjalni odbiorcy systemu

- studenci potrzebujący przypomnienia zeby umyć podłogę - aplikacja zapisuje historię wykonywania obowiązków domowych uniemoliwiajac leniwym studentom stosowanie taktyki "ale ja sprzątałem ostatni" w celu wymigania się od dbania o miejsce zamieszkania

- rodzice uczący dzieci sumienności - aplikacja dodaje warstwę gamifikacyjną do wykonywania obowiązków domowych umozliwiajaca pilnownie kalendarza obowiązków domowych bez ciągłego przypominania dzieciom aby posprzątały

### v. Korzyści biznesowe

- zapisywanie historii wykonywania obowiązków domowych, co pozwala na monitorowanie postępów i identyfikowanie obszarów wymagających poprawy

- ułatwienie organizacji obowiązków domowych, co może prowadzić do lepszej współpracy i harmonii wśród domowników
