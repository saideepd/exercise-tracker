const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

const createUser = (input, done) => {
    if (input === undefined || input === null) {
        console.log(`Invalid input for username ${input}`);
        done(null, {
            error: "Invalid input"
        });
        return {
            error: "Invalid input"
        };
    }

    let userObject = User({
        username: input
    });
    console.log(userObject);

    User.create(userObject, (createUserError, createdUser) => {
        if (createUserError) {
            // console.log(createUserError);
            createUserError.message = createUserError.toString().includes("duplicate") ?
                "User already exists" : "Error creating user";
            done(null, createUserError);
            return {
                error: createUserError
            };
        }
        createdUser.message = "User created successfully";
        done(null, createdUser);
        return createdUser;
    });
};

const findUserById = (input, done) => {
    console.log(`findUserById Input: ${input}`);
    User.findById(input, (findUserError, userFound) => {
        if (findUserError) {
            console.log(`Error finding user by id: ${findUserError}`);
            done(null, {
                error: "Error finding user by id"
            });
            return (`Error finding user by id: ${findUserError}`);
        }
        console.log(`Result findUserById: ${userFound}`);
        done(null, userFound);
        return userFound;
    });
};

const findUserByUsername = (input, done) => {
    console.log(`findUserByUsername Input: ${input}`);
    User.findOne({
        username: {
            $eq: input
        }
    }, (findUserError, userFound) => {
        if (findUserError) {
            console.log(`Error finding user by username: ${findUserError}`);
            done(null, {
                error: "Error finding user by username"
            });
            return (`Error finding user by username: ${findUserError}`);
        }
        console.log(`findUserByUsername: ${userFound}`);
        done(null, userFound);
        return userFound;
    });
};


exports.UserModel = User;
exports.createUser = createUser;
exports.findUserById = findUserById;
exports.findUserByUsername = findUserByUsername;