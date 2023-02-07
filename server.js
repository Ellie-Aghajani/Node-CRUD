const express = require('express');
const app = express();
const Joi = require('joi');
const port = process.env.PORT|| 2017;

app.use(express.json());

const courses = [
    {id:1, name: 'course1'}, 
    {id:2, name: 'course2'},
    {id:3, name: 'course3'},
    {id:4, name: 'course4'}
]


app.get('/', (req, res) =>{
    res.send('This is homepage');
})

app.get('/api/courses', (req, res) =>{
    res.send([1,2,3]);
});

app.post('/api/courses', (req, res) =>{
    // const schema = {
    //     name: Joi.string().min(3).required()
    // };
    // const result = Joi.validate(req.body, schema);
    // if (result.error) {
    //     res.status(400).send(result.error.details[0].message);
    //     return;
    // }
    const {error} = validateCourse(req.body);
    
    if (error) return res.status(400).send(result.error.details[0].message);
    
    //
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});



app.get('/api/courses/:id', (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Not Found');
    
    res.send(course);
});

app.put('api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Not Found');
 
    const {error} = validateCourse(req.body);
    
    if (error) return res.status(400).send(result.error.details[0].message);

    course.name = req.body.name;
    res.send(course);


});
function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Not Found');
    //delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

app.listen(port, ()=>{
    console.log(`App is listening on port ${port} 😎👌`);
});