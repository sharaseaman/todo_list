var Pool = reqire('pg').Pool;

var config = {
    host:'localhost',
    port: 5432,
    database: 'tasks',
    max: 20,
}

var ourPool = new Pool(config);

module.exports = ourPool;
