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
            userId: input._id,
            username: res.username,
            date: input.date,
            duration: input.duration,
            description: input.description
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

    // Setting fromDate = 0 which takes default date as 1970-01-01
    // And toDate = 10000000000000 which takes default date as 2286-11-20 if no input provided 
    let { userId, from: fromDate = 0, to: toDate = 10000000000000, limit } = JSON.parse(logInput);
    console.log(`Exercise Log Input Values: ${userId}, ${fromDate}, ${toDate}, ${limit}`);

    // Default values if undefined, blank or no input provided
    fromDate = ((fromDate === "" || fromDate === "undefined") ? new Date(0).toISOString().split('T')[0] : fromDate);
    toDate = ((toDate === "" || toDate === "undefined") ? new Date(10000000000000).toISOString().split('T')[0] : toDate);
    limit = ((limit === "" || limit === "undefined" || limit === undefined) ? Number.MAX_SAFE_INTEGER : limit);

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

        // Return blank object if there are no logs found for user
        if (Object.keys(logFound).length === 0) {
            console.log(`No logs found for user ${userId}: ${JSON.stringify(logFound)}`);
            done(null, {});
            return {};
        }

        console.log(`Successfully found exercise logs for user: ${logFound}`);


        // Filter the logs between fromDate & toDate
        // Then sort the logs by ascending order of log date
        // Finally just pick & push the required properties to log[]
        let log = [];
        // logFound
        //     // .sort((firstDate, secondDate) => new Date(firstDate.date) - new Date(secondDate.date))
        //     .filter(exerciseLog => exerciseLog.date.toISOString() > new Date(fromDate).toISOString())
        //     .filter(exerciseLog => exerciseLog.date.toISOString() < new Date(toDate).toISOString())
        logFound
            // .slice(0, limit)
            .map((item) => {
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
            count: log.length,
            log
        };
        done(null, logResponseObject);
        return logResponseObject;
    }).sort({ date: 'asc' })
        .gte('date', new Date(fromDate).toISOString())
        .lte('date', new Date(toDate).toISOString())
        .limit(+limit);
}

exports.ExerciseModel = Exercise;
exports.addExercise = addExercise;
exports.getExerciseLog = getExerciseLog;