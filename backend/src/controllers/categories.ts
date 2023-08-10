import { Request, Response } from "express";
import Category from "../models/categories";

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const Categories = await Category.findAll()

    res.json({ data: Categories })
  } catch (error) {
    res.status(500).send({ error: 'Something went wrong.' })
  }
}

export const addCategory = async (req: Request, res: Response) => {
  const { title } = req.body

  try {
    if (!title) {
      return res.json({ error: 'The following fields must be present: title' })
    }

    await Category.create({
      title,
    })
    res.json({ message: 'Category created.' })
  } catch (error) {
    console.log('Cannot add Category: ', error)
    res.status(500).send({ error: 'Something went wrong.' })
  }
}