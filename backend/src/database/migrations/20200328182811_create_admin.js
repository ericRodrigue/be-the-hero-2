exports.up = function(knex) {
    return knex.schema.createTable('admin', function(table){
        table.increments();
        table.string('login').notNullable();
        table.string('pass').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.droptTable('admin');
};
