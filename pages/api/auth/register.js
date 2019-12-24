import { User } from '../../../model';

export default async (req, res) => {
    if(req.method !== 'POST') {
        res.state(405).end();
        return;
    }
    console.log(res)
    
    const { email, password, passwordConfirmation } = req.body;

    if (password !== passwordConfirmation) {
        res.statusCode = 400;
        res.end(JSON.stringify({ status: 'error', message: 'Password do not match' }));
        return;
    }


    try {
        const user = await User.create({ email, password });
        res.end(JSON.stringify({ status: 'success', message: 'User added' }));
    } catch (error) {
        res.statusCode = 500;
        let message = 'Unexpected error';
        if (error.name === "SequelizeUniqueConstraintError") {
            message = 'User already exists';
        }
        res.end(JSON.stringify({ status: 'error', message }));
    }
}