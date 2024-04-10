import JWT from "jsonwebtoken";
import { createHmac } from "crypto";

import { UserDto, LoginDto } from "./dto";
import { prismaClient } from "../../config/db";
import { JWT_SECRET_KEY } from "../../constants/values";
import { inputValidationCallback, getPrismaAppError } from "../../utils";

async function getUserById(id: string) {
    return prismaClient.user.findUnique({
        where: {
            id,
        },
    });
}
async function createUser(dto: UserDto) {
    return inputValidationCallback(UserDto, dto, async () => {
        const hashedPassword = _getHashedPassword(dto.password);
        return prismaClient.user
            .create({
                data: {
                    ...dto,
                    password: hashedPassword,
                },
            })
            .catch((error) => getPrismaAppError(error));
    });
}

async function loginUser(dto: LoginDto) {
    const { email, password } = dto;
    const user = await _findByEmail(email);

    if (!user || user.password !== _getHashedPassword(password)) {
        return new Error("Invalid Email or Password");
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

function _getHashedPassword(password: string) {
    return createHmac("sha256", password).digest("hex");
}

export default { createUser, loginUser, getUserById };
