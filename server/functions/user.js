const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true }
});

const User = mongoose.model('User', userSchema);

const createUser = (input, done) => {
    if (input === undefined || input === null) {
        console.log(`Invalid input for username ${input}`);
        done(null, { error: "Invalid input" });
        return { error: "Invalid input" };
    }
    
    let userObject = User({ username: input });
    console.log(userObject);

    User.create(userObject, (createUserError, createdUser) => {
        if (createUserError) {
            // console.log(createUserError);
            createUserError.message = createUserError.toString().includes("duplicate") ?
                                        "User already exists" : "Error creating user";
            done(null, createUserError);
            return { error: createUserError };
        }
        createdUser.message = "User created successfully";
        done(null, createdUser);
        return createdUser;
    });
};


exports.UserModel = User;
exports.createUser = createUser;