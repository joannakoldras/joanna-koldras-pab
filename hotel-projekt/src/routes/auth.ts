import { Router } from "express";
import { EmployeeModel } from "../schemas/employees.schema";
import crypto = require('crypto');
import jwt = require('jsonwebtoken');
import { JWT_SECRET } from "../config/app.config";
export const authRouter = Router();

authRouter.post('/login', async (req, res) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const password = req.body.password;

    // select * from employees where name = $1 and surname = $2
    const employee = await EmployeeModel.findOne({ name: name, surname: surname });

    if (!employee) {
        return res.status(401).send('User data or password incorrect');
    }
    //wygenerowanie hash dla hasla podanego przy logoowaniu
    const passwordHash = crypto.pbkdf2Sync(password, 'SECR3T',
        1000, 64, `sha512`).toString(`hex`);
    //porownanie wygenerowanego hash z zapisanym w bazie
    if (passwordHash !== employee.passwordHash) {
        return res.status(401).send('User data or password incorrect');
    }
    //wygenerowanie tokenu jwt 
    const token = jwt.sign(
        { name: name, surname: surname },
        JWT_SECRET,
        { expiresIn: '5m' },
    );

    res.json({ token: token });

});


authRouter.get('/verify', (req, res) => {
    const tokenHeader = req.headers.authorization;
    const token = tokenHeader.replace('Bearer ', '');

    const tokenPayload = verifyToken(token);

    res.send(tokenPayload);
});

export function authGuard(req, res, next) {
    try {
        //wyciagniecie header z tokenem
        const tokenHeader = req.headers.authorization;
        //usuwamy prefix 'Bearer '
        const token = tokenHeader?.replace('Bearer ', '');
        //weryfikacja tokenu
        const tokenPayload = verifyToken(token);
        //przejdz do kolejnego hendlera
        next();
        //jesli blad - zwroci 401
    } catch (err) {
        res.status(401).json({ msg: err.message });
    }
}

function verifyToken(token: string) {
    const payload = jwt.verify(token, JWT_SECRET);
    return payload;
}
