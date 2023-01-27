import ticketsRepository from "@/repositories/tickets-repository";
import { notFoundError } from "@/errors";
import { exclude } from "@/utils/prisma-utils";

async function getTicketTypes(){
    const tickets = await ticketsRepository.findTicketTypes();

    if (!tickets) throw notFoundError();

    return tickets;
}

const ticketsService = {
    getTicketTypes
}

export default ticketsService;