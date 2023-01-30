import { prisma } from "@/config";
import dayjs from "dayjs";

async function findTicketTypes() {
    return prisma.ticketType.findMany();
}

async function getTicketsByUser(enrollmentId: number){
    const result = prisma.ticket.findMany({
        where:{
            enrollmentId: enrollmentId
        }
    })
    console.log(result)
    return result
}

async function getTicketType(ticketTypeId: number){
    return prisma.ticketType.findFirst({
        where:{
            id: ticketTypeId
        }
    })
}

async function postNewTicket(enrollmentId: number, ticketTypeId: number){
    return prisma.ticket.create({
        data: {
            ticketTypeId: ticketTypeId,
            enrollmentId: enrollmentId,
            status: 'RESERVED',
            updatedAt: String(dayjs().toDate().toISOString())
        }
    })
}

const ticketsRepository = {
    findTicketTypes,
    getTicketsByUser,
    postNewTicket,
    getTicketType
};

export default ticketsRepository;