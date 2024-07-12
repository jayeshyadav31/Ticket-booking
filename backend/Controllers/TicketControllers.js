import express from "express"
import Ticket from "../model/TicketModel.js"
import User from "../model/UserModel.js"

const createTicket=async(req,res)=>{
    try {
        const {name,movieId,seats,parkingSlots,location,image,totalAmount,date,time}=req.body
        const user=await User.findById(req.user._id);
        
        if(!user){
            res.status(404).json({"error":"user Not Found"})
            return 
        }
        if(user._id.toString()!==req.user._id.toString()){
            return res.status(401).json({error:"UnAuthroized to create post "});
        }
       
        const ticket=await Ticket.create({
            name,
            ticketBy:req.user._id,
            movieId,
            seats,
            parkingSlots,
            location,
            totalAmount,
            image,
            date  ,
            time
        })
        res.status(200).json(ticket);
    } catch (error) {
        console.log(`error in the create ticket ${error.message}`);
        res.status(500).json({"Error":error.message})
    }
}
const getTicket=async(req,res)=>{
  try {
      const ticketId=req.params.id
      const ticket=await Ticket.findOne({_id:ticketId});
      if(!ticket){
          res.status(404).json({"error":"ticket not found"})
          return 
      }
      res.status(200).json(ticket);
  } catch (error) {
    console.log(`error in the Get ticket ${error.message}`);
        res.status(500).json({"Error":error.message})
  }
}
const getTickets = async (req, res) => {
    try {
        console.log("at getTickets");
        const userId = req.params.userId;
        // console.log("User ID:", userId);
        
        const tickets = await Ticket.find({ ticketBy: userId });
        console.log(tickets);
        if (tickets.length === 0) {
            return res.status(404).json("No tickets found for the user.");
        }
       return res.status(200).json(tickets);
    } catch (error) {
        console.error("Error fetching tickets:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const updateTicketStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Check if the ticket exists
        const ticket = await Ticket.findById(id);
        if (!ticket) {
            return res.status(404).json({ error: "Ticket not found" });
        }

        // Update the ticket status
        ticket.status = status;
        await ticket.save();

        res.status(200).json({ data: ticket });
    } catch (error) {
        console.error("Error updating ticket status:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export  {createTicket,getTicket,getTickets,updateTicketStatus}