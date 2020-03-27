const server = require("../api/server")
const request = require("supertest")
const db = require("../database/dbConfig")

beforeAll(async () => {
    await db("users").truncate()
})

describe("auth-router.js",  () => {
     describe("[POST] /api/auth/register", () => {
        it("posts successfully", () => {
           return request(server).post("/api/auth/register")
            .send({username: "salut", password: "habib"})
            .expect(201)
            
        })
    })
    
    describe("[POST] /api/auth/login", async () => {
        // it("logs in w/ right credentials", () => {
        //     return request(server).post("/api/auth/login")
        //     .send({username: "salut", password: "habib"})
        //     .expect(200)
        // }) 
        it("returns 401 w/out right credentials", () => {
            return request(server).post("/api/auth/login")
            .send({username: "froopi", password: "132523"})
            .expect(401)
        }) 
        it("returns you shall not pass w/out right credentials", () => {
            return request(server).post("/api/auth/login")
            .send({username: "bropaz", password: "zaiojxezf"})
            .expect({ you: "shall not pass!" })
        })
    })
    
})

describe("jokes-router.js", () => {
    describe("[GET] /api/jokes", () => {
        it("returns a 401 w/out right auth", () => {
            return request(server).get("/api/jokes")
            .expect(401)
        })
        it("returns 'you shall not pass' w/out right auth", () => {
            return request(server).get("/api/jokes")
            .expect({you: "shall not pass!"})
        })
        // it("gets all jokes with authorization", () => {
        //     return request(server).get("/api/jokes")
        //     .set('Authorization', token)
        //     .expect(200)
        // })
    })
})