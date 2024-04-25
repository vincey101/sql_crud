const express = require('express')
const User = require('./models/userModel')
const sequelize = require('./database')
const app = express()

//middlewear
app.use(express.json())


// Syncing models
sequelize.sync().then(() => {
    console.log("All models were synchronized successfully.");
}).catch(error => {
    console.log('Error occurred during synchronization:', error);
});


// get all users
app.get('/users', async (req,res) => {
    const users = await User.findAll();
    res.json(users)
})

// add a user
app.post('/register', async (req, res) => {
    const { name, email } = req.body;
    const newUser = await User.create({ name, email });
    res.json(newUser)

})


//update user

app.put('/users/:id', async (req,res) => {
    const { name, email } = req.body;
    const user = await User.findByPk(req.params.id);
    if (user) {
        user.name = name,
        user.email = email,
        await user.save();
        res.json(user)
    } else {
        res.status(404).send("User not found")
    }
})


//delete user by id

app.delete('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id)
    if (user) {
        await user.destroy();
        res.status(204).send("User deleted")

    } else {
        res.status(404).send("User not found")
    }
    
})

const port = 8080

app.listen(port, ()=>{
    console.log(`app is listening on port ${port}`);
})
