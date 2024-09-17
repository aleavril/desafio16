import supertest from "supertest";
import envConfig from "../src/config/env.config.js";
import { expect } from "chai";

const requester = supertest(`http://localhost:${envConfig.PORT}`);

describe("Endpoint de carrito", () => {
    let cookieUser;
    let cartIdUser;
    let productIdUser
    before(async () => {
        
        const loginUser = {
            email: "usuariotest@gmail.com",
            password: "12345",
        };
        
        const { _body, headers } = await requester.post("/api/session/login").send(loginUser);
        cartIdUser = _body.payload.cart;

        const cookieResult = headers["set-cookie"][0];
        cookieUser = {
            name: cookieResult.split("=")[0],
            value: cookieResult.split("=")[1],
        };

        
        const { _body: _bodyProduct } = await requester.get("/api/products/")
        productIdUser = _bodyProduct.products.docs[0]._id;
    })
    
    
    it("[GET] /api/carts/:cid - Este endpoint retorna un carrito", async () => {

        const { status, _body, ok } = await requester.get("/api/carts/${cartIdUser}").set("Cookie", [`${cookieUser.name}=${cookieUser.value}`]);
        
        expect(status).to.be.equal(200);
        expect(ok).to.be.equal(true);
        expect(_body.status).to.be.equal("success");
        expect(_body.payload._id).to.be.equal(cartIdUser);
        expect(_body.payload.products).to.be.an("array");

    });

    it("[POST] /api/carts/:cid/product/:pid - Este endpoint agrega un producto al carrito", async () => {

        const { status, _body, ok } = await requester.post("/api/carts/${cartIdUser}/product/${productIdUser}").set("Cookie", [`${cookieUser.name}=${cookieUser.value}`]);

        expect(status).to.be.equal(200);
    });
});
