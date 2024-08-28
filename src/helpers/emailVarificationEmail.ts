import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
        email: string,
        username: string,
        verifyCode: string,
    ): Promise<ApiResponse>{
    try {
        const mailSent = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Feedback App | Verification Code',
            react: VerificationEmail({username, otp: verifyCode}),
          });
          
        return {success: true, message: "Verification email sent successfully"}
    } catch (emaiError) {
        console.log("Error sending verification email", emaiError)
        return {success: false, message: "Failed to send verification email"}
    }
}
