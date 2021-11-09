import express from "express";
import {showAirlines} from '../controller/Airline/airlineController.js'
const router = express.Router();

router.get('/', showAirlines)

export default router