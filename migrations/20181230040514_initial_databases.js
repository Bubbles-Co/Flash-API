exports.up = function (knex, Promise) {
	return knex.schema.createTable('route_type', function (table) {
		table.uuid('id')
			.primary()
			.defaultTo(knex.raw('uuid_generate_v4()'));
		table.string('type').unique();
	}).then(() => {
		return knex.schema.createTable('grade', function (table) {
			table.uuid('id')
				.primary()
				.defaultTo(knex.raw('uuid_generate_v4()'));
			table.string('rating').unique();
			table.uuid('route_type_id').references('id').inTable('route_type');
		})
	}).then(() => {
		return knex.schema.createTable('finish', function (table) {
			table.uuid('id')
				.primary()
				.defaultTo(knex.raw('uuid_generate_v4()'));
			table.string('type').unique();
		})
	}).then(() => {
		return knex.schema.createTable('gyms', function (table) {
			table.uuid('id')
				.primary()
				.defaultTo(knex.raw('uuid_generate_v4()'));
			table.string('name').unique();
			table.string("address");
			table.string("city");
			table.string("state");
			table.string("zip").unique();
		})
	}).then(() => {
		return knex.schema.createTable('routes', function (table) {
			table.uuid('id')
				.primary()
				.defaultTo(knex.raw('uuid_generate_v4()'));
			table.uuid('finish_id').references('id').inTable('finish');
			table.uuid('grade_id').references('id').inTable('grade');
			table.uuid('route_type_id').references('id').inTable('route_type');
			table.unique(['finish_id', 'grade_id', 'route_type_id']);
		})
	}).then(() => {
		return knex.schema.createTable('users', function (table) {
			table.uuid('id')
				.primary()
				.defaultTo(knex.raw('uuid_generate_v4()'));
			table.string('name');
			table.string('email').unique();
			table.string("address");
			table.string("city");
			table.string("state");
			table.string("zip");
		})
	}).then(() => {
		return knex.schema.createTable('sessions', function (table) {
			table.uuid('id')
				.primary()
				.defaultTo(knex.raw('uuid_generate_v4()'));
			table.datetime('date', 6).defaultTo(knex.fn.now(6));
			table.uuid('user_id').references('id').inTable('users');
			table.uuid('gym_id').references('id').inTable('gyms');
		})
	}).then(() => {
		return knex.schema.createTable('session_routes', function (table) {
			table.uuid('id')
				.primary()
				.defaultTo(knex.raw('uuid_generate_v4()'));
			table.uuid('route_id').references('id').inTable('routes');
			table.uuid('session_id').references('id').inTable('sessions');
		})
	})
}

exports.down = function (knex, Promise) {
	return knex.schema.dropTable('session_routes')
		.then(() => {
			return knex.schema.dropTable('sessions')
		})
		.then(() => {
			return knex.schema.dropTable('routes')
		})
		.then(() => {
			return knex.schema.dropTable('gyms')
		})
		.then(() => {
			return knex.schema.dropTable('grade')
		})
		.then(() => {
			return knex.schema.dropTable('finish')
		})
		.then(() => {
			return knex.schema.dropTable('users')
		})
		.then(() => {
			return knex.schema.dropTable('route_type');
		})
}	