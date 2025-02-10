import { getCustomer, getCustomers } from '@/lib/queries/getCustomer';
import { initializeDatabase } from '@/utils/database.connection';

export const getAllCustomers = async () => {
  try {
    await initializeDatabase();
    const customers = await getCustomers();
    if (!customers) {
      return new Response('No customers found', { status: 404 });
    }
    return customers;
  } catch (error) {
    console.error(error);
  }
};

export const getCustomerById = async (id: string) => {
  try {
    await initializeDatabase();
    const customer = await getCustomer(id);
    if (!customer) {
      return new Response('Customer not found', { status: 404 });
    }
    return customer;
  } catch (error) {
    console.error(error);
  }
};
