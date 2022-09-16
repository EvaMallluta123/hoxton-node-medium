import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(cors());
app.use(express.json());

const prisma = new PrismaClient();

const port = 8080;
app.get(`/posts`, async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.send(posts);
  } catch (error) {
    //@ts-ignore
    res.status(400).send({ error: error.message });
  }
});

app.get(`/posts/:id`, async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(req.params.id) },
      include: { categories: true },
    });
    if (post) {
      res.send(post);
    } else {
      res.status(404).send({ error: "post not found" });
    }
  } catch (error) {
    //@ts-ignored
    res.status(400).send({ error: error.message });
  }
});

app.delete(`/posts/:id`, async (req, res) => {
  try {
    const posts = await prisma.post.delete({where:{id:Number(req.params.id)}});
    res.send(posts);
  } catch (error) {
    //@ts-ignore
    res.status(400).send({ error: error.message });
  }
});

app.get(`/category`, async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.send(categories);
  } catch (error) {
    //@ts-ignore
    res.status(400).send({ error: error.message });
  }
});

app.get(`/category/:id`, async (req, res) => {
  try {
    const category = await prisma.post.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (category) {
      res.send(category);
    } else {
      res.status(404).send({ error: "category not found" });
    }
  } catch (error) {
    //@ts-ignored
    res.status(400).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`App running: http://localhost:${port}`);
});
