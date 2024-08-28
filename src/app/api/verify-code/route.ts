import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const usernameQuerySchema = z.object({
    username: usernameValidation,
})

export async function POST(request: Request){

    await dbConnect()

    try {
        const {identifier, code} = await request.json()
        const decodedIdentifier = decodeURIComponent(identifier)

        const user = await UserModel.findOne({
            $or: [
                { username : decodedIdentifier },
                { email : decodedIdentifier }
            ]
        })

        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "User not fount"
                }, {status: 404}
            )
        }

        const isCodeValid = user.verifyCode === code
        const isCodeNotExpired = new Date(user.verifyCodeExiry) > new Date()

        if (isCodeValid && isCodeNotExpired) {
            user.isVerified = true
            await user.save()

            return Response.json(
                {
                    success: true,
                    message: "Account Verified Successfully"
                }, {status: 200}
            )

        } else if (!isCodeNotExpired) {
            return Response.json(
                {
                    success: false,
                    message: "Verification code has expired, Again sign up to get new"
                }, {status: 400}
            )

        } else {
            return Response.json(
                {
                    success: false,
                    message: "incorrect verification code"
                }, {status: 400}
            )
        }

    } catch (error) {
        console.error("Error verifying user", error)
        return Response.json(
            {
                success: false,
                message: "Error verifying user"
            }, {status: 500}
        )
    }
}