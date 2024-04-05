import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"

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

    const {fullName, username, email, password} = req.body
    console.table([fullName, username, email, password]);

    if(
        [fullName, email, username, password].some((field) => field?.trim() === "")
    )
    {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = User.find({
        $or: [{ username }, { email }]
    })

    if(existedUser)
    {
        throw ApiError(409, "username or email already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

} )

export {registerUser}