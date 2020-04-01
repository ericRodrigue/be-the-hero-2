const connection = require('../database/connect');

module.exports = {
    async create(request, reponse){
        const {login, pass} = request.body;

        const admin = await connection('admin').where('login', login).where('pass', pass).select('*').first();

        if(!admin){
            return reponse.status(400).json({error: 'No admin found with this LOGIN and PASS'});
        }

        return reponse.json(admin);
    }
}