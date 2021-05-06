const app =require('../../src/app');
const request =require('supertest');

describe('get and change products', ()=>{
    it('should receive all products when acess route /products',async () => {
        const res = await request(app).get('/products');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('docs','page','productInfo');
    });
    it('should create a new product', async () =>{
        const res = await request(app).post('/products')
        .send({
            "title": "novo produto 1",
            "description": "Esse é um novo produto",
            "url":"http://localhost:3000/products"
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id','title','description', 'url');
    });
    it('should receive a detailed product that was created in the previous test', async () =>{
        const res = await request(app).get('/products/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id','title','description', 'url');
        expect(res.body.title).toEqual("novo produto 1");
    });
    it('should receive the number of altered products', async () =>{
        const res = await request(app).put('/products/1')
        .send({
            "id":1,
            "title": "novo produto 1",
            "description": "Esse é um novo produto",
            "url":"http://localhost:3000/products"
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toContain(1);
    });
    it('should receive the number of deleted products', async () =>{
        const res = await request(app).del('/products/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(1)
    });
});