import mongoose from "mongoose";
import Airline from "../../models/airline";

export const showAirlines = async (req, res) => {
  try {
    const airlines = await Airline.find();
    res.status(200).json({ message: "Found", airlines: airlines });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postAirline = async (req, res) => {
  const airline = req.body;
  const newAirline = new Airline(airline);
  try {
    await newAirline.save();
    res
      .status(201)
      .json({ message: "Added Successfully", airline: newAirline });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateAirline = async (req, res) => {
  const id = req.params.id;
  const airline = req.body.airline;
  console.log(airline);
  if (mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Airline is not found");

  try {
    updatedAirline = await Airline.findByIdAndUpdate(_id, airline, {
      new: true,
    });
    res
      .status(202)
      .json({ message: "Updated Succesfully", airline: updatedAirline });
  } catch (error) {
    res.status(409).jason({ message: error.message });
  }
};

export const deleteAirlines = async (req, res) => {
  const id = req.params.id;
  if (mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Airline is not found");

  try {
    deletedAirline = await Airline.findByIdAndRemove(_id);

    res.status(203).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(411).jason({ message: error.message });
  }
};

export const likeAirline = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Airline is not found");
  try {
    const airline = await Airline.findById(id);
    const isPresent = airline.likes.findIndex((id) => id === String(userId));
    if (isPresent === -1) {
      airline.likes.push(userId);
    } else {
      airline.likes = airline.likes.filter((id) => id !== String(userId));
    }
    const updatedAirline = await Airline.findByIdAndUpdate(id, airline, {
      new: true,
    });
    res.status(202).json({ message: "Liked", airline: updatedAirline });
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};
