const { app, Comptes } = require('../app');
const request = require('supertest');

describe('POST /enregistrer', () => {
    it.each([
        { name: 'A', password: 'azerty' },
        { name: 'A2', password: 'azer' },
        { password: 'Azerty', password: 'azerty' },
        { name: 'Azerty', name: 'azerty' },
        // { password: 'Azerty', name: 'azerty' }, // peu importe l'ordre // le test verra bien qu'il y a un attribut "name" et un attribut "password" 
        { name: 123, password: 123 },
        { name: 123, password: 'azerty' },
        { name: 'Azerty', password: 123 },
        { name: 'A', password: 'azerty' },
        { name: "PasdeMotpasse" },
        { name: "PasdeMotpasse", password: "" },
        { password: "PasdeName" },
        { password: "PasdeName", name: "" },
    ])("should refuse %p without inserting it.", async (invalidObject) => {
        const idDebut = Comptes.id;

        const res = await request(app)
        .post('/enregistrer')
        .send(invalidObject)
        expect(400);

        const idFin = Comptes.id;

        expect(idDebut).toBe(idFin);
    })
})
