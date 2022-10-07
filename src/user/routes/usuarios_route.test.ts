import prisma from "../../../prisma/client";
import supertest from "supertest";
import appRouter from "../../app"




let token:any
beforeAll(() => {
     supertest(appRouter).post('/api/aut/registro').send({email:"testmail@gmail.com", password:"testpassword1"})
    .then(res =>{
        token=res.headers['set-cookie'][0]
    })
})

describe('usuarios route tests', () => {

    test('if the route is wrong should throw 404', () => {
   supertest(appRouter).get('/api/usuarios/usuario1').set('Cookie',token).expect(404)
    })

    test('should be ok in the route is right it will send the email user', () => {
        supertest(appRouter).get('/api/usuarios/usuario').set('Cookie',token).expect(200, {
            data:{
                email:'testmail@gmail.com'
            }
        })  
    })
})
afterAll(async() => {
    await prisma.usuarios.deleteMany()
})    