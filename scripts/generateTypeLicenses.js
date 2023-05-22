import moment from 'moment-timezone'
import DB from '../src/database'
import Licenses from '../src/models/typeLicense'

/* const today = moment().tz('America/Caracas').format('YYYY-MM-DD'); */

const licenses = [
    {
        name: 'basic',
        price: 799,
        description: 'Use our condominium management system safely and efficiently to control all aspects of your condominium.',
        duration: 365,
        modules: ['1', '2', '3'],
    },
    {
        name: 'administrative',
        price: 1200,
        description: 'Use our condominium management system safely and efficiently, to control up to 2 condominiums at the same time. Do you have more real estate? No problem! You can add as many properties as you need for a special price for our clients.',
        duration: 365,
        modules: ['1', '2', '3', '4', '5'],
    },
    {
        name: 'condostart gold',
        price: 1500,
        description: 'You will be able to use the advanced Condostart condominium management system to direct all the management operations of up to 5 properties. You will have access to special offers for our clients and the latest technology options, which will make your day-to-day much calmer and safer in terms of your accounting records, messaging, security, collections and much more.',
        duration: 365,
        modules: ['1', '2', '3', '4', '5', '6', '7'],
    },
    {
        name: 'explorer',
        price: 0,
        description: 'Usa y prueba todas las características de nuestro sistema de forma completamente gratuita por 3 días, y dinos si no es el sistema de administración de condominios más eficiente que hayas probado!',
        duration: 365,
        modules: ['1', '2', '3', '4', '5', '6', '7'],
    },
]


    async function generateLicenses() {
        await DB.connection;
        await Licenses.insertMany(licenses)
        process.exit()
    }
    generateLicenses()