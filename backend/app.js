const express  = require('express')
const mongoose = require('mongoose')
const Password = require('./models/password')
const bcrypt = require('bcrypt');
const socket = require('socket.io');
const saltRounds = 10; // Adjust the number of salt rounds based on your security requirements
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
// const server = http.createServer(app);
// const io = socketIo(server, { path: '/message' });


const dburi = 'mongodb+srv://shobyy:siangsters@cluster0.3ipmwxk.mongodb.net/website?retryWrites=true&w=majority';
mongoose.connect(dburi)
    .then((result)=>{
        console.log('connected to the database');
        app.listen(5000);
    })
    .catch((err)=>{
        console.log(err);
    })

app.get('/message',async (req,res) =>{
    try {
        // Query MongoDB to get all usernames
        const usernames = await Password.find({}, 'username');
        const usernameArray = usernames.map(user => user.username);
        res.json(usernameArray);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})
app.use(express.urlencoded({extended:true}))

app.post('/signUp', async (req, res) => {
    
    const data = req.body;
    console.log(data);
    try {

        // Check if the user already exists
        const existingUser = await Password.findOne({ username: data.username }).exec();

        if (existingUser === null) {
            // Hash the password
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);

            // Create a new user with the hashed password
            const newUser = new Password({
                username: data.username,
                hash_pass: hashedPassword
            });

            // Save the user to the database
            const result = await newUser.save();
            console.log(result);

            res.status(200).json({ message: 'User created successfully', user: result });
        } else {
            res.status(409).json({ message: 'Username already exists' });
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.post('/login', async (req, res) => {
    
    const data = req.body;
    console.log(data);
    try {
        // Check if the user already exists
        const existingUser = await Password.findOne({ username: data.username }).exec();

        if (existingUser !== null) {
            // Hash the password
            const passwordMatch = await bcrypt.compare(data.password, existingUser.hash_pass);

            if (passwordMatch) {
                res.status(200).json({ message: 'User Login successful', user: existingUser });
            } else {
                res.status(401).json({ message: 'Password is incorrect' });
            }

        } else {
            res.status(409).json({ message: 'Username does not exist' });
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});