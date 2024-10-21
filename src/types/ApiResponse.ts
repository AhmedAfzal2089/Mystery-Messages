import {Message} from "@/Models/User"

export interface ApiResponse{
    success:boolean;
    message:string;
    isAcceptingMessage?: boolean
    messages?: Array<Message> // the user will send only message which is optional 
}