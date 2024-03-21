import express from "express"
import ProtectRoute from "../middleware/ProtectRoutes.js"
import { createMovie, getMovieById, getMovies, updateMovie } from "../Controllers/MovieController.js"
const router=express.Router()

router.post('/create',ProtectRoute,createMovie);
router.get('/getMovies',ProtectRoute,getMovies);
router.get('/:id',ProtectRoute,getMovieById);
router.put('/update/:id',ProtectRoute,updateMovie)
export default router;