import prisma from "../../../prisma/client";
import supertest from "supertest";
import  appRouter  from "../../app"


beforeAll(() => {
    supertest(appRouter).post('/api/aut/registro').send({email:"testmail@gmail.com", password:"testpassword1"})
})

describe('signin route tests' ,() => {

    test('signIn route typed wrong should throw an 404 http status code', () => {
        supertest(appRouter).post('/api/aut/ingresa').send({email:"testmail@gmail.com", password:"testpassword1"}).expect(404, {
            "error":'la ruta no existe'
        })
    })
    
    test('signIn', () => {
        supertest(appRouter).post('/api/aut/ingreso').send({email:"testmail@gmail.com", password:"testpassword1"}).expect(200, {
            "data": {
                info: "el usuario ha iniciado sesion"
            }
        })
    })
    test('failed signIn should return  409 because the user does not exists', () => {
        supertest(appRouter).post('/api/aut/ingreso').send({email:"testmail1@gmail.com", password:"testpassword1"}).expect(401)
    })

    test('signIn test with no body should throw a 422 status code with the error message',() => {
        supertest(appRouter).post('/api/aut/ingreso').expect(422,{
            "error": [
                "el email es necesario",
                "la contraseña es  necesaria"
            ]
        })
    });

    test('signin test without the password', () => {
        supertest(appRouter).post('/api/aut/ingreso').send({email:"test@gmail.com", password:""}).expect(422,{
            "error": [
                "la contraseña es  necesaria",
                "la contraseña no puede ser tan corta",
                "la contraseña debe tener 6 caracteres con numeros y letras"
            ]
        })
    });
    test('signin test without the email', () => {
        supertest(appRouter).post('/api/aut/ingreso').send({email:"", password:"testpassword1"}).expect(422,{
            "error": [
                "el email es necesario",
                "el email es muy corto",
            ]
        })
    });
    
})
afterAll(async() => {
    await prisma.usuarios.deleteMany()
})