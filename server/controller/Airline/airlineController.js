import Airline from "../../models/airline.js";

export const showAirlines = async (req, res)=>{
    try {
      const airlines = await Airline.find();
      res.status(200).json(airlines);
    } catch (error){
      res.status(404).json({message: error.message});
    }
}
