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

describe('municipios route tests', () => {
    test('if the state does not exists should throw 404', () => {
        supertest(appRouter).get('/api/mexico/municipios/sonor1').set('Cookie',token).expect(404)
    })

    test('should be ok if the state  exists it will send the all the towns', () => {
        supertest(appRouter).get('/api/mexico/municipios/sonora').set('Cookie',token).expect(200)  
    })

    test("shouldn't be allowed to access the route if the user is not logged in",() => {
        supertest(appRouter).get('/api/mexico/municipios/').expect(403)  
    })

})

afterAll(async() => {
    await prisma.usuarios.deleteMany()
})