
import request from "supertest";
import server from "../index.js";

describe("Operaciones CRUD de cafes", () => {
    
    it("GET /cafes devuelve un status code 200 y el tipo de dato recibido es un array con más de un objecto",async()=>{
        const response=await request(server).get("/cafes").send();
        const cafes=response.body;
        const status=response.statusCode;

        expect(status).toBe(200);
        expect(cafes.length).toBeGreaterThanOrEqual(1)
    })

    it("Se obtiene status code 404 al intentar eliminar un café con id inexistente",async()=>{
        const response=await request(server).delete("/cafes/8").set('Authorization', 'Bearer test-token').send();
        const status =response.statusCode;
        
        expect(status).toBe(404)
    })

    it("POST /cafes agrega un nuevo café y devuelve código 201",async()=>{
        const id = Math.floor(Math.random() * 999);
        const testCafe={id,'nombre':'Frappucino'};

        const response=await request(server).post("/cafes").send(testCafe);
        
        const status=response.statusCode;
        const productos=response.body;
        
        expect(productos).toContainEqual(testCafe)
        expect(status).toBe(201)
    })

    it("PUT /cafes/id devuelve status code 400 al actualizar un id en los parámetros diferente al id del payload",async()=>{
        const testCafe={'id':2,'nombre':'Latte'};
        const id=3;
        const response=await request(server).put(`/cafes/${id}`).send(testCafe);

        const status=response.statusCode;

        expect(status).toBe(400);
    })
});