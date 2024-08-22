import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs"
import { sendVerificationEmail } from "@/helpers/emailVarificationEmail";

export async function POST(request: Request){
    await dbConnect()
    try {
        const {username, email, password} = await request.json()
        
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        })

        if (existingUserVerifiedByUsername) {
            return Response.json({
                success: false,
                message: "Username is already taken"
            }, {status: 400})
        }
        

        const existingUserbyEmail = await UserModel.findOne({
            email,
            isVerified: true
        })

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()

        if (existingUserbyEmail) {
            if (existingUserbyEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "User already exist with this email"
                }, {status: 400})
            } else {
                const hashedPassword = await bcrypt.hash(password, 10)
                existingUserbyEmail.password = hashedPassword
                existingUserbyEmail.verifyCode = verifyCode
                existingUserbyEmail.verifyCodeExiry = new Date(Date.now() + 3600000)

                await existingUserbyEmail.save()
            }

        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode: verifyCode,
                verifyCodeExiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: []
            })

            await newUser.save()
        }

        //Send Varification email
        const emailResponse = await sendVerificationEmail(email, username, verifyCode)

        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message
            }, {status: 500})
        }

        return Response.json({
            success: true,
            message: "Verify your email"
        }, {status: 201})

    } catch (error) {
        console.error("api/sign-up/route/line-82: ", error)
        return Response.json(
            {
                success: false,
                message: "Error registering user"
            }, { status: 500 }
        )
    }
}