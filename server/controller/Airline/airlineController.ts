import mongoose from 'mongoose'
import type { Request, Response } from 'express'

import Airline from '../../models/airline'

export const showAirlines = async (req: Request, res: Response) => {
  try {
    const airlines = await Airline.find()
    res.status(200).json({ message: 'Found', airlines: airlines })
  } catch (error: any) {
    res.status(404).json({ message: error.message })
  }
}

export const postAirline = async (req: Request, res: Response) => {
  const airline = req.body
  const newAirline = new Airline(airline)
  try {
    await newAirline.save()
    res.status(201).json({ message: 'Added Successfully', airline: newAirline })
  } catch (error: any) {
    res.status(409).json({ message: error.message })
  }
}

export const updateAirline = async (req: Request, res: Response) => {
  const id = req.params.id
  const airline = req.body.airline
  console.log(airline)
  if (mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('Airline is not found')

  try {
    const updatedAirline = await Airline.findByIdAndUpdate(id, airline, {
      new: true,
    })
    res.status(202).json({ message: 'Updated Succesfully', airline: updatedAirline })
  } catch (error: any) {
    res.status(409).json({ message: error.message })
  }
}

export const deleteAirlines = async (req: Request, res: Response) => {
  const id = req.params.id
  if (mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('Airline is not found')

  try {
    await Airline.findByIdAndRemove(id)
    res.status(203).json({ message: 'Deleted Successfully' })
  } catch (error: any) {
    res.status(411).json({ message: error.message })
  }
}

export const likeAirline = async (req: Request, res: Response) => {
  const { id } = req.params
  const userId = req.params.userId
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('Airline is not found')
  try {
    const airline = await Airline.findById(id)
    const isPresent = airline.likes.findIndex((id: string) => id === String(userId))
    if (isPresent === -1) {
      airline.likes.push(userId)
    } else {
      airline.likes = airline.likes.filter((id: string) => id !== String(userId))
    }
    const updatedAirline = await Airline.findByIdAndUpdate(id, airline, {
      new: true,
    })
    res.status(202).json({ message: 'Liked', airline: updatedAirline })
  } catch (error: any) {
    console.log(error)
    res.status(409).json({ message: error.message })
  }
}
