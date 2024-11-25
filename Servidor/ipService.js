//Ip API
const axios = require('axios');

const getPublicIp = async () => {
    try {
        const response = await axios.get('https://api.ipify.org?format=json');
        return response.data.ip;
    } catch (error) {
        console.error('Error obteniendo la IP pública: ', error);
        throw error;
    }
};

// Función para obtener la información de geolocalización según la IP
const getIpInfo = async () => {
    try {
        // Obtiene la IP pública
        const ip = await getPublicIp();
        const response = await axios.get(`http://ip-api.com/json/${ip}`);
        return response.data;
    } catch (error) {
        console.error('Error obteniendo la información de la IP: ', error);
        throw error;
    }
};

module.exports = { getIpInfo };

// Ejemplo de uso
getIpInfo().then(data => console.log(data)).catch(error => console.error(error));

