import express from "express";
import data from "./store.js";

const app = express();
const port = process.env.port || 3000;

app.use(express.json());

app.get('/radnici', (req, res) => {
    res.json(data.radnici);
  });
  
  // Ruta za prikaz svih korisnika
  app.get('/korisnici', (req, res) => {
    res.json(data.korisnici);
  });
  
  // Ruta za prikaz cjenika
  app.get('/cjenik', (req, res) => {
    res.json(data.cjenik);
  });
  
  // Ruta za prikaz svih ocjena
  app.get('/ocjena', (req, res) => {
    res.json(data.ocjena);
  });
  
  // Ruta za prikaz rezervacija
  app.get('/rezervacije', (req, res) => {
    res.json(data.rezervacija);
  });
  
  // Dodavanje nove rezervacije
  app.post('/rezervacije', (req, res) => {
    const novaRezervacija = {
      id: '301', // generiranje novog ID-a
      datum: req.body.datum,
      vrijeme: req.body.vrijeme,
      korisnik: req.body.korisnik,
      broj_tretman: req.body.broj_tretman,
      ocjena: req.body.ocjena,
    };
  
    data.rezervacija.push(novaRezervacija);
    res.status(201).json(novaRezervacija);
  });
  
  // Ruta za brisanje rezervacije po ID-u
  app.delete('/rezervacije/:id', (req, res) => {
    const { id } = req.params;
    const index = data.rezervacija.findIndex((rezervacija) => rezervacija.id === id);
  
    if (index !== -1) {
      const deletedReservation = data.rezervacija.splice(index, 1);
      res.json(deletedReservation);
    } else {
      res.status(404).json({ message: 'Rezervacija nije pronađena.' });
    }
  });


app.listen(port, () => {
  console.log(`Servis radi na portu ${port}`);
});