import UserManager from '../../domain/managers/userManager.js';
import { createHash, generateToken, isValidPassword } from '../../shared/index.js';

export const login = async  (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email && !password) {
    
            throw new Error('Empty Email or Password.');
        }
        
        const manager = new UserManager();
        const user = await manager.getUserByEmail(email);
        const isHashedPassword = await isValidPassword(password, user.password);
    
        if (!isHashedPassword) {
            return res.status(401).send({ message: 'Login failed, invalid password.'})
        }
    
        const accessToken = await generateToken(user);
    
        res.cookie('accessToken', accessToken, {
            maxAge: 60*60*1000,
            httpOnly: true
        }).send({ message: 'Login success!', accessToken })
    } catch (e) {
        next(e)
    }
};

export const current = async  (req, res) => {
    try {
        res.status(200).send({ status: 'Success', payload: req.user });
    } catch (e) {
        next(e)
    }
};

export const signup = async (req, res) => {
    try {
        const manager = new UserManager();

        const dto = {
          ...req.body,
          password: await createHash(req.body.password, 10)
        }
    
        const user = await manager.addUser(dto);
    
        res.status(201).send({ status: 'success', user, message: 'User created.' });
    } catch (e) {
        next(e)
    }
};

export const loginToPurchase = async  (email, password) => {
    if (!email && !password) {

        throw new Error('Empty Email or Password.');
    }
    
    const manager = new UserManager();
    const validUser = await manager.getUserByEmail(email);
    const isHashedPassword = await isValidPassword(password, validUser.password);

    if (!isHashedPassword) {
        return res.status(401).send({ message: 'Login failed, invalid password.'})
    }

    return
};