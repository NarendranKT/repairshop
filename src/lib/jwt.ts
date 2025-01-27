import jwt, { JwtPayload } from 'jsonwebtoken';

interface ISignOption {
  expiresIn: string | number;
}

const DEFAULT_SIGN_OPTION = {
  expiresIn: '1h',
};

export const generateJwtAccessToken = (
  payload: JwtPayload,
  option: ISignOption = DEFAULT_SIGN_OPTION
) => {
  const secretKey = process.env.JWT_ACCESS_SECRET_KEY;
  const token = jwt.sign(payload, secretKey!, option);
  return token;
};

export const verifyJwt = (token: string) => {
  try {
    const secretKey = process.env.JWT_ACCESS_SECRET_KEY;
    const payload = jwt.verify(token, secretKey!) as JwtPayload;
    return payload;
  } catch (error) {
    console.error(error);
    return null;
  }
};
