import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async getAll(req, res) {
    try {
      const vaquinhas = await prisma.vaquinha.findMany();
      return res.status(200).json({ vaquinhas: vaquinhas })
    } catch (error) {
      console.error({ error: error.message })
      res.status(500).json({ error: error.message })
    }
  },

  async insert(req, res) {
    try {
      const { name, desc, url, image } = req.body
      const vaquinha = await prisma.vaquinha.create({
        data: { name, desc, url, image }
      })
      return res.json({ vaquinha })
    } catch (error) {
      console.error({ error: error.message })
      res.status(500).json({ error: error.message })
    }
  }
}