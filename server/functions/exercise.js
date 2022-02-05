const mongoose = require('mongoose');
const user = require('./user');


const exerciseSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user.UserModel
    }
});


const Exercise = mongoose.model('Exercise', exerciseSchema);

const addExercise = (input, done) => {
    if (input === undefined || input === null) {
        console.log(`Invalid input for Exercise`);
        done(null, {
            error: `Invalid input for Exercise`
        });
        return {
            error: `Invalid input for Exercise`
        };
    }

    console.log(`Input to addExercise: ${JSON.stringify(input)}, id: ${input._id}`);

    // Find the user's username by calling findUserById() from User function
    let findUser = user.findUserById(input._id, (req, res, next) => {
        console.log(`findUser in Exercise: ${res}`);

        // Form an exercise object to pss to create()
        // Only using username from FindUserById response
        // rest all the data is used from user input
        let exerciseObject = Exercise({
            username: res.username,
            description: input.description,
            duration: input.duration,
            date: input.date,
            userId: input._id
        });

        console.log(`ExerciseObject: ${exerciseObject}`);

        // Create the exercise record in DB
        Exercise.create(exerciseObject, (createExerciseError, createdExercise) => {
            // In case of Error, return error message
            if (createExerciseError) {
                console.log(`Error creating exercise record: ${createExerciseError}`);
                done(null, {
                    error: "Error adding exercise"
                });
                return {
                    error: "Error adding exercise"
                };
            }
            // Else return response
            console.log(`Exercise logged successfully: ${createdExercise}`);
            done(null, createdExercise);
            return createdExercise;
        });
    });
}

const getExerciseLog = (input, done) => {
    let logInput = JSON.stringify(input);
    console.log(`Exercise Log Input: ${logInput}`);

    let { userId, from, to, limit } = JSON.parse(logInput);
    console.log(`Exercise Log Input Values: ${userId}, ${from}, ${to}, ${limit}`);

    // Find Exercise logs for user by querying using UserId
    Exercise.find({
        userId: { $eq: userId }
    }, (logFindError, logFound) => {
        if (logFindError) {
            console.log(`Error finding exercise logs for user: ${logFindError}`);
            done(null, {
                error: "Error finding exercise logs for user"
            });
            return {
                error: "Error finding exercise logs for user"
            };
        }

        console.log(`Successfully found exercise logs for user: ${logFound}`);

        let log = [];
        logFound.map((item) => {
            log.push({
                description: item.description,
                duration: item.duration,
                date: item.date.toDateString()
            });
        });

        // console.log(`ResponseLog: ${JSON.stringify(log)}`);

        let logResponseObject = {
            _id: logFound[0].userId,
            username: logFound[0].username,
            from: new Date(from).toDateString(),
            to: new Date(to).toDateString(),
            count: logFound.length,
            log
        };
        done(null, logResponseObject);
        return logResponseObject;
    });
}

exports.ExerciseModel = Exercise;
exports.addExercise = addExercise;
exports.getExerciseLog = getExerciseLog;