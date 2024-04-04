import {asyncHandler} from "../utils/asyncHandler.js"

const registerUser = asyncHandler( async (req, res) => {
    // get the User data from frontend
    // validation - non empty
    // check if the User already exist or not: username, email
    // check for images, check for avatars
    // upload them on cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from the response
    // check for user creation
    // return res
} )

export {registerUser}