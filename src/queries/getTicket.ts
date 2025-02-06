import { Ticket } from '@/entity/Tickets';
import { initializeDatabase } from '@/utils/database.connection';

export const getTicket = async (id: string) => {
  await initializeDatabase();
  // $ Method 1
  //> const customers = await Customer.query(
  //>   `SELECT * FROM customers WHERE id = ${id}`
  //> );

  // $ Method 2
  //> const customers = await Ticket.findOne({
  //>   where: {
  //>     id,
  //>   },
  //> });

  // $ Method 3
  const ticket = await Ticket.findBy({ id });
  return ticket;
};
