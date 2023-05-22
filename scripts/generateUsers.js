
import DB from '../src/database'
import UsersBD from '../src/models/users'
import bcryptjs from 'bcryptjs';

async function generateUsers() {
    const users = [
        {
            firstName: 'Cesticom',
            lastName: 'cesticom',
            userName: 'adminCesticom',
            email: "cesticom@demo.com",
            password: "cesticom123",
            identDocument: 'j-985476125766',
            phoneNumber: '+582934559682',
            address: {
                street: "Av. Panamericana",
                city: "Cumana",
                state: "Sucre"
            },
            deleted: false,
            roleName: 'manager',
            licenses: '',
            company: 'cesticom',
        },
        {
            firstName: 'condo_admin',
            lastName: 'condo_admin',
            userName: 'condo_admin',
            email: "condo_admin@demo.com",
            password: "condo_admin123",
            identDocument: 'j-985476125767',
            phoneNumber: '+582934559683',
            address: {
                street: "Av. Panamericana",
                city: "Cumana",
                state: "Sucre"
            },
            deleted: false,
            roleName: 'administrator',
            licenses: '',
            company: 'cesticom',
        },
    ];

    const salt = await bcryptjs.genSalt(10);

    users.forEach( async user => {
        user.password = await bcryptjs.hash(user.password, salt);
    });

    try {
        await DB.connection;

        const count = await UsersBD.estimatedDocumentCount();
        if (count > 0) return;

        await UsersBD.insertMany(users)
        process.exit()
    } catch (error) {
        console.error(error)
    }

}

export default generateUsers;