import db from "../src/db.js";

const korisniciCollection = db.collection("Korisnici");

export const getAllKorisnici = async (req, res) => {
    try {
       const korisnici = await korisniciCollection.find().toArray();
       res.json(korisnici);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

export const korisniciMethods = {
    getAllKorisnici
}