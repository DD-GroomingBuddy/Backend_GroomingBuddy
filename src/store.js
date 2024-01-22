let data = {
    radnici: [
        {
            id: '1',
            ime: 'Ivan',
            prezime: 'Horvat',
            godiste: '2000',
            role: 'zaposlenik'
        },
        {
            id: '2',
            ime: 'Zvonko',
            prezime:'Zvono',
            godiste:'1989',
            role: 'zaposlenik'
        },
    ],
    korisnici: [
        {
            id: '100',
            ime: 'Ratko',
            prezime: 'Rok',
            godiste: '1999',
            broj_telefona: '0921729657',
        },
    ],
    cjenik: [
        {
            id: '20',
            tretman: 'Šišanje',
        },
        {
            id: '21',
            tretman: 'Češljanje',
        },
        {
            id: '23',
            tretman: 'Čiščenje ušiju',
        },
    ],
    ocjena: [
        {
            id: '200',
            ocjena: '5',
        },
    ],
};

data.rezervacija = [
    {
        id: '300',
        datum: '21-12-2023',
        vrijeme: '21:00',
        korisnik: data.korisnici[0],
        broj_tretman: '5',
        ocjena: data.ocjena[0],
    },
];



export default data;