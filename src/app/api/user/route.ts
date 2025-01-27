import AppDataSource from '@/data-source';
import { User } from '@/entity/User';
import { initializeDatabase } from '@/utils/database.connection';
import * as bcrypt from 'bcrypt';

interface RequestBody {
  name: string;
  email: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    await initializeDatabase();
    const body: RequestBody = await req.json();
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { email: body.email } });
    if (user) {
      throw new Error('User already registered');
    }
    const newUser = new User();
    newUser.name = body.name;
    newUser.email = body.email;
    newUser.password = await bcrypt.hash(body.password, 10);
    await userRepo.save(newUser);
    const { password, ...userWithoutPassword } = newUser;
    return new Response(JSON.stringify(userWithoutPassword));
  } catch (error) {
    console.error(error);
  }
}

// module.exports = { Post };
