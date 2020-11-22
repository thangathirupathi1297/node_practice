const express =require('express')
const router= express.Router()
// middleware for validation 

const Joi=require('joi')

const books=[
    {
        id:1,
        name:'jungle book'
    },
    {
        id:2,
        name:"adventure of tintin"
    },
    {
        id:3,
        name:"lion king"
    }
    
]


router.get('/',(req,res)=>res.send(books)); //listing books using get methods

//-----------------------------------------------------------------
//find book using get method specified id

router.get('/:id',(req,res)=> {
    const book = books.find(b =>b.id === parseInt(req.params.id))
    if(!book) res.status(404).send("error 404 page not found");
    res.send(book)
    return;
}) ;
//-------------------------------------------------------------------

// add new book using post method

router.post('/',(req,res)=>{

//valitation
// validation using joi middleware
const schema={
    name:Joi.string().min(4).required()
};
const result =Joi.validate(req.body,schema);

if(result.error)
{
    res.status(400).send(result.error.details[0].message);
    return;
}
// manual method ----------------------------


// if(!req.body.name || req.body.name.length < 3){
//     res.status(400).send("bad request")
//     return;
// }

//------------------------------------------
// validation using joi middleware

    const book={
        id:books.length +1,
        name:req.body.name
    };
    books.push(book)
    res.send(books)
    

});
//added new book using post method----------------------------------------------------------------------------------------------------------------

//update using put method------------------

router.put('/:id',(req,res)=>{
// look up the book by id
const book = books.find(b =>b.id === parseInt(req.params.id))

//if book not found return 404
if(!book)
 {
     res.status(404).send("error 404 page not found");
     return;
 }


// validate the new book
const schema={
    name:Joi.string().min(4).required()
};
const result =Joi.validate(req.body,schema);
// if valitation fail error 400 -bad request 
if(result.error)
{
    res.status(400).send(result.error.details[0].message);
    return;
}

// update the book 
book.name=req.body.name;


//return updated books 
res.send(books)
return;
});


///delete book using delete method
router.delete('/:id',(req,res)=>{
    const book = books.find(b =>b.id === parseInt(req.params.id))
    if(!book)
    {
        res.status(404).send("error 404 page not found")
        return;
    }
    const index= books.indexOf(book)
    books.splice(index,1)
    
    res.send(books)
});

module.exports = router