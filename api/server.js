const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose
    .connect(`mongodb+srv://<username>:<password>@cluster0.0iaovkx.mongodb.net/teagan_site?retryWrites=true&w=majority
    `, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("connected to DB"))
    .catch((error) => console.log(error));


// const User = require('./models/User');
const Review = require('./models/Review');

app.get('/reviews', async (req, res) => {
    const reviews = await Review.find();
    res.json(reviews);
});

app.get('/reviews/approved', async (req, res) => {
    const reviews = await Review.find({ approved: true });
    res.json(reviews);
});


app.post('/reviews/add', async (req, res) => {
    const review = new Review({
        reviewText: req.body.reviewText,
        firstName: req.body.firstName,
        lastInitial: req.body.lastInitial,
        city: req.body.city,
        email: req.body.email,
        approved: req.body.approved ?? false,
    })

    review.save()
    res.json(review)
});




app.listen(3001, () => console.log('server connected on port 3001'))
