# GroomingBuddy - README

## Podaci o projektu

- **Tim**: WA-250
- **Studenti**:
  - David Soldatić
  - Dino Lukić
- **Mentor**: doc. dr. sc. Nikola Tanković

## Linkovi

- **Stranica**: [GroomingBuddy]()
- **Dokumentacija**: [GroomingBuddy Dokumentacija](https://drive.google.com/file/d/1ktaN5UyF_jnTfcN8gS5WtQLE-Zg1bX2g/view?usp=share_link)
- **Prezentacija**: [GroomingBuddy Prezentacija](https://drive.google.com/file/d/1gF1_yov51qDc-yJQOK6VJV13B2eRMWBN/view?usp=share_link)

## Uvod

GroomingBuddy je dizajniran kako bi olakšao proces rezervacije termina za njegu kućnih ljubimaca putem interneta. Ovaj sustav eliminira neučinkovitost rezervacija putem telefona, nudeći korisnicima modernu i korisnički prijaznu platformu.

## Motivacija

Cilj GroomingBuddy-a je povezati salone za njegu kućnih ljubimaca i njihove klijente, pružajući jednostavno i učinkovito iskustvo rezervacije. Namijenjen je vlasnicima kućnih ljubimaca koji žele brzu i jednostavnu rezervaciju termina te salonima koji žele modernizirati svoje poslovanje.

## Značajke

- **Registracija i prijava korisnika**: Korisnici se mogu registrirati i prijaviti kako bi pristupili svojim profilima i koristili sve funkcionalnosti.
- **Pregled usluga**: Korisnici mogu pregledavati dostupne usluge, uključujući opise i cijene.
- **Rezervacija termina**: Korisnici mogu online rezervirati termine za njegu svojih kućnih ljubimaca.
- **Povijest rezervacija**: Korisnici mogu pregledavati povijest svojih prošlih i nadolazećih rezervacija.
- **Kontakt forma**: Korisnici mogu slati poruke salonima putem kontakt forme.

## Tehnologije

### Frontend

- Vue.js
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens)

### API Krajnje točke

#### Autentifikacija korisnika

- **POST** /api/auth/signup: Registracija novog korisnika.
- **POST** /api/auth/signin: Prijava korisnika.

#### Rezervacije

- **GET** /api/appointments: Dohvaćanje svih rezervacija.
- **POST** /api/appointments: Stvaranje nove rezervacije.
- **PUT** /api/appointments/:id: Ažuriranje postojeće rezervacije.
- **DELETE** /api/appointments/:id: Brisanje rezervacije.

#### Kontakt

- **POST** /api/contact: Slanje poruke putem kontakt forme.

## Instalacija na lokalno računalo

Kako biste instalirali projekt GroomingBuddy na svoje lokalno računalo, slijedite ove korake:

1. **Kreirajte mapu**:
   Kreirajte mapu u kojoj će projekt biti instaliran. Radi bolje preglednosti, preporučuje se da frontend i backend budu u istoj mapi.

```bash
mkdir GroomingBuddy
```

2. **Uđite u mapu:**
  Uđite u novokreiranu mapu.

``` bash
    cd GroomingBuddy
```

3. **Klonirajte repozitorij:**
Klonirajte kod sa GitHub repozitorija.

```bash
  git clone https://github.com/dsoldatic/Backend_GroomingBuddy
```

4. **Uđite u backend mapu:**
Nakon kloniranja, uđite u mapu Backend_GroomingBuddy, a zatim u mapu groomingbuddy.

```bash
  cd Backend_GroomingBuddy
  cd src
```

5. **Instalirajte node module:**
Instalirajte potrebne node module.

```bash
  npm install
```

6. **Pokrenite projekt:**
Nakon uspješne instalacije node modula, možete pokrenuti projekt.

```bash
  node index.js
```
**Projekt je sada uspješno instaliran i pokrenut.**


  
