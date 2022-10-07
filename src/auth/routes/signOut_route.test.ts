import prisma from "../../../prisma/client";
import supertest from "supertest";
import  appRouter  from "../../app"


beforeAll(() => {
    supertest(appRouter).post('/api/aut/registro').send({email:"testmail@gmail.com", password:"testpassword1"})
})


describe('signout route tests', () => {
    test('signOut route typed wrong should throw a 404 http status code', () => {
        supertest(appRouter).post('/api/aut/egresor').expect(404, {
            "error":'la ruta no existe'
        })
    })

    test("shouldn't be allowed to access a protected if the user was signed out", () => {
        supertest(appRouter).get('/api/mexico/estados').expect(403, {
            "error":"no se ha podido autenticar al usuario"
        })
    })

    test("shouldn't be allowed to sign out again if the user is not signed in", () => {
        supertest(appRouter).post('/api/aut/egreso').expect(403, {
            "error":"no se ha podido autenticar al usuario"
        })
    })

})


afterAll(async() => {
    await prisma.usuarios.deleteMany()
}) 