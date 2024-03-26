import mongoose from "mongoose";

const ticketSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    ticketBy:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User",
        required:true,
    },
    movieId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Movie",
        required:true,
    },
    seats:{
        type:[Number],
        required:true,
        validate: [
            {
                validator: function (seats) {
                    return seats.length > 0; // Check if at least one seat is selected
                },
                message: "At least one seat is required.",
            },
            {
                validator: async function (seats) {
                    // Check if any existing ticket for the same movie has the same seats
                    const existingTicket = await this.constructor.findOne({
                        _id: { $ne: this._id }, // Exclude the current ticket from the search
                        movieId: this.movieId, // Check for the same movie
                        seats: { $in: seats },
                    });

                    return !existingTicket; // Returns true if no ticket with the same seats for the same movie is found
                },
                message: "Seats must be unique for the same movie.",
            },
        ],
    },
    parkingSlots:{
        type:[Number],
        
    },
    location:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
    totalAmount:{
        type:Number,
        required:true,
    },
    status:{
        type:Boolean,
        default:true
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
})
const Ticket=mongoose.model("Ticket",ticketSchema);
export default Ticket;