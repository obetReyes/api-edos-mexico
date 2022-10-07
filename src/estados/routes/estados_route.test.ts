import prisma from "../../../prisma/client";
import supertest from "supertest";
import appRouter from "../../app"




let token:any
    beforeAll(() => {
        supertest(appRouter).post('/api/aut/registro').send({email:"testmail@gmail.com", password:"testpassword1"})
        .then(res =>{
            token=res.headers['set-cookie'][0]
            console.log(token)
        })
    })

describe('estados route tests', () => {
    test('if the state route is wrong should throw 404', () => {
        supertest(appRouter).get('/api/mexico/estados1').set('Cookie',token).expect(404)
    })

    test('should be ok in the route is right', () => {
        supertest(appRouter).get('/api/mexico/estados').set('Cookie',token).expect(200)  
    })

    test("shouldn't be allowed to access the route if the user is not logged in",() => {
        supertest(appRouter).get('/api/mexico/estados/').expect(403)  
    })
})

afterAll(async() => {
    await prisma.usuarios.deleteMany()
})