const dotenv =require('dotenv');
const variaveisAmbiente = dotenv.config();

const {parsed: env} = variaveisAmbiente;


module.exports = env;