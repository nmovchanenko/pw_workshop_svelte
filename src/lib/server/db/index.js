import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { env } from '$env/dynamic/private';

if (!env.TURSO_DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = createClient({
	url: env.TURSO_DATABASE_URL,
	authToken: env.TURSO_AUTH_TOKEN
});

export const db = drizzle({client});
