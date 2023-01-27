import { getTicketsForUser, getTicketTypes } from "@/controllers/tickets-controller";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
    .get("/types", getTicketTypes)
    .get("/", getTicketsForUser)
    .post("/", )

export {ticketsRouter}