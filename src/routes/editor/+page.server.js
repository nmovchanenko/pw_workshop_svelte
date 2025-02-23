import { error, fail, redirect } from '@sveltejs/kit';
import * as api from '$lib/api.js';

/** @type {import('./$types').PageServerLoad} */
export const load = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/demo/lucia/login');
	}
	return { user: event.locals.user };
};

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ locals, request }) => {
		if (!locals.user) error(401);

		const data = await request.formData();

		const result = await api.post(
			'articles',
			{
				article: {
					title: data.get('title'),
					description: data.get('description'),
					body: data.get('body'),
					tagList: data.getAll('tag')
				}
			},
			locals.user.token
		);

		if (result.errors) return fail(400, result);

		redirect(303, `/article/${result.article.slug}`);
	}
};
