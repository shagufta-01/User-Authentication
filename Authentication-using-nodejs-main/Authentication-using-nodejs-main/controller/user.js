const SignupDetails = require('../model/user'); 
const {getuser,setuser}=require('../jwttokens/generatetokens')
const jwt = require('jsonwebtoken');
const secret = "this is secret key";

function handleHomepage(req, res) {
    res.render('homepage');  
}

function handleSignup(req, res) {
    const { password, email, username } = req.body;

    SignupDetails.create({ password, email, username })
        .then(() => {
            res.redirect('/'); 
        })
        .catch((error) => {
            res.status(500).send("Error creating user: " + error.message);
        });
}

async function handlelogin(req, res) {
    try {
        const { email, password } = req.body;

        const user = await SignupDetails.findOne({ email: email });

        if (user) {
            if (user.password === password) {
                console.log("Login successful");

                const token = setuser(user)
                res.cookie("user1",token)
                
                const newThought = await UsersData.create({
                    userId: user.username,
                    thought: 'This is a new thought'
                });
                console.log(newThought);
                res.render('logged',{user})
                
                


            } else {
                res.render('homepage', { error: "Invalid password" });
            }
        } else {
            res.render('homepage', { error: "Invalid email" });
        }
    } catch (err) {
        console.error("Error occurred:", err);
        res.render('homepage', { error: "Error occurred: " + err.message });
    }
}






module.exports = {
    handleHomepage,
    handleSignup,
};
