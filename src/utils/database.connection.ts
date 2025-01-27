import AppDataSource from '../data-source';

export const initializeDatabase = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log('Database connected successfully!');
    }
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};
