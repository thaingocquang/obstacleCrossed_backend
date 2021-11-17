import express from "express"
import homeController from "../controllers/homeController"
import userController from "../controllers/userController"

let router = express.Router()

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage)
    router.get("/crud", homeController.getCRUD)
    router.post("/post-crud", homeController.postCRUD)
    router.get("/get-crud", homeController.displayGetCRUD)

    router.post("/api/login", userController.handleLogin)
    router.get("/api/get-all-users", userController.handleGetAllUsers)
    router.post("/api/create-new-user", userController.handleCreateNewUser)
    router.put("/api/edit-user", userController.handleEditUser)

    return app.use("/", router)
}

module.exports = initWebRoutes