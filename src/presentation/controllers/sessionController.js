import UserManager from '../../domain/managers/userManager.js';
import RoleManager from '../../domain/managers/roleManager.js'
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
        await manager.updateUser(user.id, {lastLogin: new Date()})
    
        const accessToken = await generateToken(user);
    
        res.cookie('accessToken', accessToken, {
            maxAge: 60*60*1000,
            httpOnly: true
        }).status(200).send({ message: 'Login success!', accessToken })
    } catch (e) {
        next(e)
    }
};

export const current = async  (req, res, next) => {
    try {
        res.status(200).send({ status: 'Success', payload: req.user });
    } catch (e) {
        next(e)
    }
};

export const signup = async (req, res, next) => {
    try {
        const uManager = new UserManager();
        const rManager = new RoleManager()

        if (!req.body.password) {
          return res.status(401).send({ message: 'You must provide a password.'})
        }

        let userRole = ''

        const existingRole = await rManager.getRoles(10, 1, {name: 'user'})

        if (existingRole.roles.length > 0) {
          userRole = existingRole.roles[0].id;
        } else {
          const newRole = await rManager.addRole({
            name: 'user',
            permissions: ['getUser', 'getTicket'],
          });
        
          userRole = newRole.role.id;
        }

        const dto = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          age: req.body.age,
          email: req.body.email,
          password: await createHash(req.body.password, 10),
          role: {_id: userRole},
        }
        
        const user = await uManager.addUser(dto);
    
        res.status(201).send({ status: 'success', user, message: 'User created.' });
    } catch (e) {
        next(e)
    }
};

export const logout = async(req, res, next) => {
  try{
    const user = req.user

    const manager = new UserManager();
    await manager.updateUser(user.id, {lastLogin: new Date()})

    res.status(200).send({ message: 'logout success!' }).clearCookie('accessToken');
  } catch (e) {
    next(e);
  }
};

export const renderResetPasswordPage = async (req, res, next) => {
    try {
      const email = req.user.email
      const token = req.query.token

      const protocol = req.protocol;
      const host = req.get('host');
      const url = `${protocol}://${host}`
      
      const manager = new UserManager();
      const data = await manager.renderResetPasswordPage(url, token, email);
        
      res.render('resetPasswordTemplate', data);
    } catch (e) {
      next(e);
    };
  };
  
  export const resetPassword = async (req, res, next) => {
    try {
      const newPassword = req.body.newPassword
      const confirmPassword = req.body.confirmPassword

      if (newPassword != confirmPassword) {
        return res.status(401).send({ message: 'invalid password.'})
      }

      const user = req.user

      const password = await createHash(newPassword, 10)
  
      const manager = new UserManager();
      await manager.resetPassword(user.email, password);
    
      res.send({ status: 'success', message: 'Password changed successfully' });
    } catch (e) {
      next(e);
    };
  };
  
  export const requestReset = async (req, res, next) => {
    try {
      const { email } = req.body;

      const protocol = req.protocol;
      const host = req.get('host');
      const url = `${protocol}://${host}`
      
      const manager = new UserManager();
      const user = await manager.requestReset(email, url);
  
      res.send({ status: 'success', message: `We send the instructions to your mailbox: ${user}` });
    } catch (e) {
      next(e);
    };
  };