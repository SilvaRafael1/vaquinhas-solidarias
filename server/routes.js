import express from "express"
import vaquinhaController from "./controller/vaquinha.controller.js"

const router = express.Router()

router.get("/vaquinhas", vaquinhaController.getAll)
router.post("/vaquinhas", vaquinhaController.insert)

export default router;