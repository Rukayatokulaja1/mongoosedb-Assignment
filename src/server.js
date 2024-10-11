const express = require("express");
// This imports the express library
const app = express();
// This renames express to be called as per convention
app.use(express.json());
//This line tells express that we will send data to and from via json rather than xml

require("dotenv").config();
// This line imports and runs dotenv in one line
require("./db/connection");

const Book = require("./db/models/bookmodel")
app.post("/addBook", async (req,res) => {
    try {
        const result = await Book.create(
            {
                title: req.body.title,
                author: req.body.author,
                genre: req.body.genre
            }
        )
        console.log(result);
        const responseMessage = {
            message: `Book ${req.body.title} has been added to the database`
        }
        res.status(201);
        res.json(responseMessage)
    } catch (error) {
        console.log(error);
        const responseMessage = {
            message: `Book ${req.body.title} was not added`,
            DBresponse: error
        }
        res.status(418)
        res.json(responseMessage)
    }
}
)

app.get("/listBooks",
    async function listBooks(req,res) {
        try {
            const output = await Book.find({})
            res.status(200).json(output)
        } catch (error) {
            console.log(error);
            const responseMessage = {
                message: `Unable to find book list`
            }
            res.status(500).json(responseMessage)
        }
    }
)

app.post("/addBook", async (req,res) => {
    try {
        const result = await Book.create(
            {
                title: req.body.title,
                author: req.body.author,
                genre: req.body.genre
            }
        )
        console.log(result);
        const responseMessage = {
            message: `Book ${req.body.title} has been added to the database`
        }
        res.status(201);
        res.json(responseMessage)
    } catch (error) {
        console.log(error);
        const responseMessage = {
            message: `Book ${req.body.title} was not added`,
            DBresponse: error
        }
        res.status(418)
        res.json(responseMessage)
    }
}
)

 
app.get("/getSingleBook", async function getSingleBook(req,res) {
   try {
    const output= await Book.findOne({title:req.body.title})
    console.log(output);
    if (output != null)
   {res.status(200).json(output)}
    else{
        res.status(404).send("not found")
    }
    
   } catch (error) {
    console.log(error);
    res.status(500).json(error
    )
    
    
   }
 
    
});


app.get('/books', async (req, res) => {
    try {
        const books = await Book.find();  
        res.json(books);
    } catch (err) {
        res.status(5001).json({ message: err.message });
    }
});


 
    // await Book.findOne({title: `My Journey`}). express();
  
    // const express = require(`express`)
    // const app = express();
    // const port = 5001;

// const books = [
//     {id: 1, title: `My Journey`, author: `Rukayat Okulaja`},
//     {id: 2, title: `The Surface of Life`, author: `Rukayat Okulaja`},
//     {id: 3, title: `Destination`, author: `Rukayat Okulaja`}
// ];

// app.get(`/books`,(req, res) => {
//     res.json(books);

// app.get(`/books/:id`, (req, res) => )ds

// });


app.put("/updateAuthor", async function updateAuthor(req,res) {
    try {
       const result = await Book.updateOne(
          {title: req.body.title},
        { author: req.body.author}
       );
       res.json(result);
    } catch (err) {
        res.status(400).json({message: err.message})
    }
    }
);

app.put("/updateGenre", async function updateGenre(req,res) {
    try {
        const result = await Book.updateOne(
         {title: req.body.title},
         {genre: req.body.genre}
        );
        res.json(result);
     } catch (err) {
         res.status(400).json({message: err.message})
     }
     }
 );
 


app.delete("/deleteBook", async function deleteBook(req,res) {
    try {
        const result = await Book.deleteOne({
            title:req.body.title
        
        })
        if (result.deletedCount > 0) {
            res.status(200).send('Book deleted successfully');
        } else {
            res.status(404).send('Book not found');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
        
        
    }
})

app.get("/health", (req,res) => {res.send("API is healthy")})
// health route to verify server is running

app.listen(5001, () => {console.log("server is listening on port 5001")});
// This is the listener which is the heart of the server