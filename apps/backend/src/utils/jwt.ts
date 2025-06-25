import jwt, { Secret} from 'jsonwebtoken';

const SECRET: Secret = process.env.JWT_SECRET || 'supersecretkey';

    export const generateToken = (employee: {
    id: number;
    email: string;
    designation: string;
    }): string => {
    return jwt.sign(
        {
        id: employee.id,
        email: employee.email,
        designation: employee.designation,
        },
        SECRET,
        { expiresIn: '1d' }
    );
    };

export const verifyToken = (token: string) => {
    if (!token) return null;
    return jwt.verify(token, SECRET);
};

module.exports = {
    generateToken,
    verifyToken
}
