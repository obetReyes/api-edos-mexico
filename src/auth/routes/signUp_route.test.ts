import prisma from "../../../prisma/client";
import supertest from "supertest";
import  appRouter  from "../../app"


//aut routes e2e testing
beforeAll(async() => {
    await prisma.usuarios.deleteMany()
})

describe('signup route tests', () => {
    
    test('signup route typed wrong should throw an 404 http status code', async() => {
        await supertest(appRouter).post('/api/aut/registra').send({email:"testmail@gmail.com", password:"testpassword1"}).expect(404, {
            "error":'la ruta no existe'
        })
    })
    test('signup', () => {
        supertest(appRouter).post('/api/aut/registro').send({email:"testmail@gmail.com", password:"testpassword1"}).expect(200, {
            "data": {
                info: "nuevo usuario registrado"
            }
        })
    })

    test('failed signup should return  409 because the user is already signed up', () => {
        supertest(appRouter).post('/api/aut/registro').send({email:"testmail@gmail.com", password:"testpassword1"}).expect(409)
    })

    test('signup test with no body should throw a 422 status code with the error message',async() => {
        await supertest(appRouter).post('/api/aut/registro').expect(422,{
            "error": [
                "el email es necesario",
                "la contraseña es  necesaria"
            ]
        })
    });

    test('signup test without the password', async() => {
        await supertest(appRouter).post('/api/aut/registro').send({email:"test@gmail.com", password:""}).expect(422,{
            "error": [
                "la contraseña es  necesaria",
                "la contraseña no puede ser tan corta",
                "la contraseña debe tener 6 caracteres con numeros y letras"
            ]
        })
    });
    test('signup test without the email', async() => {
        await supertest(appRouter).post('/api/aut/registro').send({email:"", password:"testpassword1"}).expect(422,{
            "error": [
                "el email es necesario",
                "el email es muy corto",
            ]
        })
    });
})

