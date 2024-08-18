import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";


export async function POST(request: Request) {
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user: User = session?.user as User

    if (!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: "Not Authenticated"
            }, {status: 401}
        )
    }

    const userId = user._id;
    const {acceptMessages} = await request.json()

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            {isAcceptingMessages: acceptMessages},
            {new: true}
        )

        if (!updatedUser) {
            return Response.json(
                {
                    success: false,
                    message: "Faild to update user status for accept messages"
                }, {status: 401}
            )
        }
        return Response.json(
            {
                success: true,
                message: "Messages acceptence status updated successfully",
                updatedUser
            }, {status: 200}
        )

    } catch (error) {
        console.log("Faild to update user status for accept messages");
        return Response.json(
            {
                success: false,
                message: "Faild to update user status for accept messages"
            }, {status: 500}
        )
        
    }

}


export async function GET(request : Request) {
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user: User = session?.user as User

    if (!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: "Not Authenticated"
            }, {status: 401}
        )
    }

    try {
        const userId = user._id;
    
        const foundedUser = await UserModel.findById(userId)
        if (!foundedUser) {
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                }, {status: 404}
            )
        }
    
        return Response.json(
            {
                success: true,
                isAcceptingMessages: foundedUser.isAcceptingMessages
            }, {status: 201}
        )
    } catch (error) {
        return Response.json(
            {
                success: false,
                message: "Error is getting messages accesptance status"
            }, {status: 500}
        )
    }
}
