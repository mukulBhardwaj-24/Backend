import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import  {uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

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

    const existedUser = await User.find({
        $or: [{ username }, { email }]
    })

    if(!existedUser)
    {
        throw new ApiError(409, "username or email already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath)
    {
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    
    if(!avatar)
    {
        throw new ApiError(400, "Avatar file is required")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        username: username.toLowerCase(),
        email,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser)
    {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(200).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    )
} )

const loginUser = asyncHandler(async (req, res) => {
    // req body - data
    // username or email
    // find the user
    // check the password
    // access and refresh token
    // send the cookies
})

export {
    registerUser,
    loginUser
}