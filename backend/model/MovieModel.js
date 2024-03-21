import mongoose from "mongoose";

const movieSchema = mongoose.Schema(
{
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    parkingAmount:{
        type:Number,
        required:true
    },
    amount: {
        type: Number,
        required: true,
    },
    bookedSeats: {
        type:[Number],
        default:[]
    },
    bookedSlots:{
        type:[Number],
        deafult:[]
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    }
},
{
    timestamps: true
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
