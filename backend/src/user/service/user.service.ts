import { createHmac } from "crypto";
import { prismaClient } from "../../config/db";
import { PartialUserDto, UserDto } from "./dto";
import { LoginDto } from "./dto/auth.dto";
import JWT from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../../constants/values";
import { inputValidationCallback } from "../../utils/validator";
import { prismaErrorHandler } from "../../utils/prismaErrorHandler";

async function createUser(dto: UserDto) {
    return prismaErrorHandler(async () =>
        inputValidationCallback(UserDto, dto, async () => {
            const hashedPassword = _getHashedPassword(dto.password);
            return Promise.resolve(
                prismaClient.user.create({
                    data: {
                        ...dto,
                        password: hashedPassword,
                    },
                })
            );
        })
    );
}

function updateUser(id: string, dto: PartialUserDto) {
    return prismaClient.user.update({
        where: {
            id,
        },
        data: {
            ...dto,
        },
    });
}

function deleteUser(id: string) {
    return prismaClient.user.delete({
        where: {
            id,
        },
    });
}

async function loginUser(dto: LoginDto) {
    const { email, password } = dto;
    const user = await _findByEmail(email);

    if (!user || user.password !== _getHashedPassword(password)) {
        throw new Error("Invalid Email or Password");
    }
    return _getTokenObject({ id: user.id, email: user.email });
}

function _findByEmail(email: string) {
    return prismaClient.user.findUnique({
        where: {
            email,
        },
    });
}

async function _getTokenObject(payload: { id: string; email: string }) {
    const token = JWT.sign({ ...payload }, JWT_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRY_TIME });
    return {
        id: payload.id,
        token,
        message: "Logged In successfully",
    };
}

// async function sendCookie(res: Response, payload: Object) {
//     const token = await _signToken(payload);
//     const cookieOptions = {
//       expires: new Date(new Date().getTime() + 30 * 1000),
//       // sameSite: 'strict',
//       httpOnly: true,
//     };
//     if (this.config.get('Environment') != 'DEV') cookieOptions['secure'] = true;
//     res.cookie('token', token, cookieOptions);
//     return {
//       token,
//       message: 'Logged In successfully',
//     };
//   }

function _getHashedPassword(password: string) {
    return createHmac("sha256", password).digest("hex");
}

export default { createUser, updateUser, deleteUser, loginUser };
