import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

if (!process.env.TURSO_DATABASE_URL) throw new Error('DATABASE_URL is not set');

export default defineConfig({
	schema: './src/lib/server/db/schema.js',
	out: './drizzle',
	dbCredentials: {
		url: process.env.TURSO_DATABASE_URL,
		authToken: process.env.TURSO_AUTH_TOKEN
	},
	verbose: true,
	strict: true,
	dialect: 'turso'
});
