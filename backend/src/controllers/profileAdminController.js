const connection = require('../database/connect');

module.exports = {
    async index(request, response){
        const {page = 1} = request.query;

        const [count] = await connection('ongs').count();
        const ongs = await connection('ongs').limit(5).offset((page - 1) * 5).select('*');

        response.header('X-Total-Count', count['count(*)']);
        return response.json(ongs);
    },
    async delete(request, response){
        const {id} = request.params;

        const ong = await connection('ongs').where('id', id).select('*');

        if(!ong){
            return response.status(401).json({error: 'Operation not permited.'});
        }

        await connection('ongs').where('id', id).delete();

        return response.status(204).send();
    }
}