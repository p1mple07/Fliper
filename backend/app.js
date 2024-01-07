const express  = require('express')
const mongoose = require('mongoose')
const Password = require('./models/password')
const bcrypt = require('bcrypt');
const saltRounds = 10; // Adjust the number of salt rounds based on your security requirements
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());


const dburi = 'mongodb+srv://shobyy:siangsters@cluster0.3ipmwxk.mongodb.net/website?retryWrites=true&w=majority';
mongoose.connect(dburi)
    .then((result)=>{
        console.log('connected to the database');
        app.listen(5000);
    })
    .catch((err)=>{
        console.log(err);
    })

app.get('/login',(req,res) =>{
    const user =  new Password({
        username : 'shashwat',
        hash_pass : 'test'
    })
    user.save()
     .then((result)=>{
        res.send(result)
     })
     .catch((err)=>{
        console.log(err);
     });
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
