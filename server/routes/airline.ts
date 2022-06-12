import express from "express";
import {
  showAirlines,
  postAirline,
  updateAirline,
  deleteAirlines,
  likeAirline,
} from "../controller/Airline/airlineController";
import { auth } from "../middleware/auth";

const router = express.Router();

router.get("/", showAirlines);
router.post("/", auth,postAirline);
router.patch("/:id", auth, updateAirline);
router.delete("/:id", auth, deleteAirlines);
router.patch("/:id/likeAirline", auth, likeAirline);

export default router;
