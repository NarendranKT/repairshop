import { Customer } from '@/entity/Customers';
import { initializeDatabase } from '@/utils/database.connection';

export const getCustomer = async (id: string) => {
  await initializeDatabase();
  // $ Method 1
  //> const customers = await Customer.query(
  //>   `SELECT * FROM customers WHERE id = ${id}`
  //> );

  // $ Method 2
  //> const customers = await Customer.findOne({
  //>   where: {
  //>     id,
  //>   },
  //> });

  // $ Method 3
  const customers = await Customer.findBy({ id });
  return customers;
};
