import Movie from "../model/MovieModel.js";
import { v2 as cloudinary } from 'cloudinary';

const createMovie = async (req, res) => {
    try {
        const { name, location, parkingAmount, amount, bookedSeats, bookedSlots, date,time } = req.body;
        let { image } = req.body;

        if (image) {
            const uploadedResponse = await cloudinary.uploader.upload(image);
            image = uploadedResponse.secure_url;
        }

        const newMovie = await Movie.create({
            name,
            image,
            location,
            parkingAmount,
            amount,
            bookedSeats: bookedSeats || [],
            bookedSlots: bookedSlots || [],
            date: date,
            time:time
        });
        res.status(201).json(newMovie);
    } catch (error) {
        console.error(`Error in creating movie: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();

        if (movies.length === 0) {
            return res.status(404).json({ message: "No Movies found" });
        }
        
        res.status(200).json(movies);
    } catch (error) {
        console.error(`Error in getting movies: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

const getMovieById = async (req, res) => {
    try {
        const movieId = req.params.id;
        const movie = await Movie.findById(movieId);

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        res.status(200).json(movie);
    } catch (error) {
        console.error(`Error in getting movie by ID: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};
const updateMovie = async (req, res) => {
    try {
        const movieId = req.params.id;
        const { name, location, parkingAmount, amount, bookedSeats, bookedSlots, date, image } = req.body;

        // Check if the movie exists
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        // Update movie properties
        if (name) movie.name = name;
        if (location) movie.location = location;
        if (parkingAmount) movie.parkingAmount = parkingAmount;
        if (amount) movie.amount = amount;
        if (bookedSeats) movie.bookedSeats = [...new Set([...movie.bookedSeats, ...bookedSeats])];
        if (bookedSlots) movie.bookedSlots = [...new Set([...movie.bookedSlots, ...bookedSlots])];
        if (date) movie.date = date;
        if (image) movie.image = image;

        // Save the updated movie
        await movie.save();

        res.status(200).json({ message: "Movie updated successfully", updatedMovie: movie });
    } catch (error) {
        console.error(`Error in updating movie: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

export { createMovie, getMovieById, getMovies,updateMovie };
