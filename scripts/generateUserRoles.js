import DB from '../src/database'
import RolesDB from '../src/models/userRoles'

/* const today = moment().tz('America/Caracas').format('YYYY-MM-DD'); */


async function generateRoles() {
        const roles = [
            {
                name: 'manager',
                description: 'This is the cesticom administrator sistem.'
            },
            {
                name: 'administrator',
                description: 'This is a registered user on the website, who has a free subscription only for 3 days or one plan.'
            },
            {
                name: 'lessor',
                description: 'This is the owner of a building or apartment.'
            },
            {
                name: 'leaseholder',
                description: 'This is a arrendatary of a building or apartment'
            },
        ]

        try {
            await DB.connection;

            const count = await RolesDB.estimatedDocumentCount();
            if (count > 0) return;

            await RolesDB.insertMany(roles);
            process.exit();
        } catch (error) {
            console.error(error);
        }
    };

    export default generateRoles;