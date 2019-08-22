exports.up = function(knex) {
  return knex.schema
    .createTable('departments', tbl => {
      tbl.increments();
      tbl.string('department_name').notNullable();
      tbl.string('department_info');
    })

    .createTable('positions', tbl => {
      tbl.increments();
      tbl.string('position_name').notNullable();
      tbl.string('position_description');
    })

    .createTable('users', tbl => {
      tbl.increments();
      tbl
        .string('username', 128)
        .notNullable()
        .unique();
      tbl.string('password', 128).notNullable();
      tbl
        .integer('department_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('departments')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl
        .integer('position_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('positions')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('positions')
    .dropTableIfExists('departments');
};
