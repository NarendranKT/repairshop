import { Ticket } from '@/entity/Tickets';
import { initializeDatabase } from '@/utils/database.connection';

export const getTicket = async (id: string) => {
  await initializeDatabase();
  // $ Method 1
  //> const ticket = await Customer.query(
  //>   `SELECT * FROM customers WHERE id = ${id}`
  //> );

  // $ Method 2
  const ticket = await Ticket.findOne({
    where: {
      id,
    },
  });

  // $ Method 3
  //> const ticket = await Ticket.findBy({ id });

  return ticket;
};

export const getTickets = async () => {
  await initializeDatabase();
  // $ Method 1
  //> const customers = await Customer.query(
  //>   `SELECT * FROM customers`
  //> );

  // $ Method 3
  const tickets = await Ticket.find();
  return tickets;
};
