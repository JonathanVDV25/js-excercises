const express = require('express');
const app = express();
app.use(express.json());

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Pet Box';
app.locals.pets = [
    { id: 'a1', name: 'Jessica', type: 'dog' },
    { id: 'b2', name: 'Marcus Aurelius', type: 'parakeet' },
    { id: 'c3', name: 'Craisins', type: 'cat' }
  ];

app.get('/api/v1/pets/:id', (request, response) => {
    const { id } = request.params;
    const pet = app.locals.pets.find(pet => pet.id === id);
    if(!pet){
        return response.sendStatus(404);
    }
    response.status(200).json(pet);
});

app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});

