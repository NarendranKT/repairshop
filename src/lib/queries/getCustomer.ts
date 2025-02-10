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
  const customers = await Customer.findOneBy({ id });
  return customers;
};

export const getCustomers = async () => {
  await initializeDatabase();
  // $ Method 1
  //> const customers = await Customer.query(
  //>   `SELECT * FROM customers`
  //> );

  // $ Method 3
  const customers = await Customer.find();
  return customers;
};
