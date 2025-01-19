import { PASSWORD_RESET_REQUEST_TEMPLATE,
     PASSWORD_RESET_SUCCESS_TEMPLATE,
     VERIFICATION_EMAIL_TEMPLATE } from "./EmailTemplate.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async(email,veficationToken)=>{
    
    const recipient = [{email}]

    try{
       const response = await mailtrapClient.send(
        {
            from:sender,
            to:recipient,
            subject:"Verify your email",
            html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",veficationToken),
            category:"Email verification"
        }
       )
       console.log("Email sent successfully",response);
    }
    catch(error)
    {
      console.error("Error in sending emails",error);
      throw new Error(`Error in sending vefication email ${error}`);
    }
}

export const sendWelcomeEmail = async(email,name)=>{
    const recipient = [{email}]

    try{
     const response =   await mailtrapClient.send({
            from:sender,
            to:recipient,
            template_uuid: "0c0b85ad-cb0e-47c9-84bd-e01929abf6ce",
            template_variables: {
              name:name,
            }
        })

        console.log("Welcome email sent successfully",response);
    }
    catch(error)
    {
        console.error("Error in sending email",error);
        throw new Error(`Error in sending welcome email ${error}`);
    }
}

export const sendPasswordResetEmail = async(email,resetURL)=>{
    
    const recipient = [{email}];

    try{
        const response = await mailtrapClient.send(
            {
                from:sender,
                to:recipient,
                subject:"Reset your password",
                html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL),
                category:"Password Reset"
            }
        )
        console.log("Password reset email send successfully",response);
    }
    catch(error)
    {
        console.log("Error in sending password reset email",error);
       throw new Error(`Error in sending password reset email ${error}`);
    }
}

export const sendResetSuccessEmail = async(email)=>{
    
    const recipient = [{email}];

    try{
        const response = await mailtrapClient.send(
            {
                from:sender,
                to:recipient,
                subject:"Password reset successful",
                html:PASSWORD_RESET_SUCCESS_TEMPLATE,
                category:"Password reset"
            }
        );
        console.log("Password success email send successfully",response);
    }
    catch(error)
    {
        console.log("Error in sending success password email",error);
        
        throw new Error(`Error in sending success password email ${error}`);
    }
}