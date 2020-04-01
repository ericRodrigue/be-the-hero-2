const connection = require('../database/connect');

module.exports = {
    async create(request, response){
        const {login, pass} = request.body;

        const [id] = await connection('admin').insert({login, pass});

        return response.json({id});
    }
}