import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
	env:process.env.NODE_ENV,
	port: process.env.PORT,
	database_url: process.env.DATABASE_URL_LOCAL as string,


	accessToken: process.env.ACCESS_TOKEN as string,
	refreshToken: process.env.REFRESH_TOKEN as string,
	

	accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN ,
	refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
};

