import { error, fail, redirect } from '@sveltejs/kit';
import * as api from '$lib/api.js';
import * as auth from '$lib/server/auth.js';

export const load = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/login');
	}
	return { user: event.locals.user };
};

/** @type {import('./$types').Actions} */
export const actions = {
	logout: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}
		await auth.invalidateSession(event.locals.session.id);
		auth.deleteSessionTokenCookie(event);

		return redirect(302, '/login');
	},

	save: async ({ cookies, locals, request }) => {
		if (!locals.user) error(401);

		const data = await request.formData();

		const user = {
			username: data.get('username'),
			email: data.get('email'),
			password: data.get('password'),
			image: data.get('image'),
			bio: data.get('bio')
		};

		const body = await api.put('user', { user }, locals.user.token);
		if (body.errors) return fail(400, body.errors);

		const value = btoa(JSON.stringify(body.user));
		cookies.set('jwt', value, { path: '/' });

		locals.user = body.user;
	}
};
