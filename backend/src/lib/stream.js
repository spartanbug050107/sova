import {StreamChat} from 'stream-chat'
import dotenv from 'dotenv'
dotenv.config()

const apiKey = process.env.STREAM_API_KEY
const apiSecret = process.env.STREAM_API_SECRET

if(!apiKey || !apiSecret) {
    console.log("Stream api key or secret is missing")
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const createStreamUser = async (userData) => {
    try {
        await streamClient.upsertUsers([userData]);
        return userData
    } catch (error) {
        console.log('Error occure', error)
    }
}

export const genStreamToken = (userId) => {
    try {
        const userIdStr = userId.toString();
        return streamClient.createToken(userIdStr)
    } catch (error) {
        console.log("Error in genStreamToken", error)
    }
}