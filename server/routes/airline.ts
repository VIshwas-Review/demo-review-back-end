import express from "express";
import {
  showAirlines,
  postAirline,
  updateAirline,
  deleteAirlines,
  likeAirline,
} from "../controller/Airline/airlineController";

const router = express.Router();

router.get("/", showAirlines);
router.post("/", postAirline);
router.patch("/:id", updateAirline);
router.delete("/:id", deleteAirlines);
router.patch("/:id/likeAirline", likeAirline);

export default router;
