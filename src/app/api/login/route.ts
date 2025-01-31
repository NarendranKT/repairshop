import { User } from '@/entity/User';
import { generateJwtAccessToken } from '@/lib/jwt';
import { initializeDatabase } from '@/utils/database.connection';
import * as bcrypt from 'bcrypt';

interface RequestBody {
  email: string;
  password: string;
}

export const POST = async (req: Request) => {
  await initializeDatabase();
  const body: RequestBody = await req.json();
  const user = await User.findOne({
    where: {
      email: body.email,
    },
  });
  const userPassword = user?.password ?? '';
  const isPasswordValid = await bcrypt.compare(body.password, userPassword);
  if (user && isPasswordValid) {
    const { password, ...userWithoutPassword } = user;
    const accessToken = generateJwtAccessToken({ id: user.id });
    const result = {
      ...userWithoutPassword,
      accessToken,
    };
    console.log('---------------------------------------------------');
    console.log('API result : ', result);
    console.log('---------------------------------------------------');
    return new Response(JSON.stringify(result));
  } else new Response(JSON.stringify(null));
};

// module.exports = {
//   POST,
// };
