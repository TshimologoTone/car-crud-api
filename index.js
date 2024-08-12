import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

let carData = [
  {"color": "white", "make": "Volkswagen", "model": "Polo", "reg_number": "CL 61045"},
  {"color": "red", "make": "Toyota", "model": "Tazz", "reg_number": "CY 16875"},
  {"color": "orange", "make": "Nissan", "model": "Juke", "reg_number": "CK 32655"},
  {"color": "orange", "make": "Ford", "model": "EcoSport", "reg_number": "CL 11318"},
  {"color": "white", "make": "Nissan", "model": "Micra", "reg_number": "CJ 16103"},
  {"color": "orange", "make": "Nissan", "model": "Juke", "reg_number": "CL 42789"},
  {"color": "blue", "make": "Volkswagen", "model": "Jetta", "reg_number": "CA 46977"},
  {"color": "white", "make": "Volkswagen", "model": "Polo", "reg_number": "CY 25661"},
  {"color": "white", "make": "Nissan", "model": "Micra", "reg_number": "CY 35475"},
  {"color": "white", "make": "Toyota", "model": "Corolla", "reg_number": "CY 54886"},
  {"color": "white", "make": "Toyota", "model": "Hilux", "reg_number": "CJ 16455"},
  {"color": "orange", "make": "Toyota", "model": "Corolla", "reg_number": "CK 57166"},
  {"color": "orange", "make": "Ford", "model": "Fiesta", "reg_number": "CL 77790"},
  {"color": "blue", "make": "Nissan", "model": "Juke", "reg_number": "CY 98904"},
  {"color": "white", "make": "Ford", "model": "Ranger", "reg_number": "CF 75599"},
  {"color": "red", "make": "Toyota", "model": "Corolla", "reg_number": "CA 5510"},
  {"color": "blue", "make": "Ford", "model": "Focus", "reg_number": "CF 75586"},
  {"color": "orange", "make": "Toyota", "model": "Tazz", "reg_number": "CA 46137"},
  {"color": "orange", "make": "Ford", "model": "Ranger", "reg_number": "CK 22692"},
  {"color": "red", "make": "Toyota", "model": "Corolla", "reg_number": "CF 33543"},
  {"color": "red", "make": "Volkswagen", "model": "Touran", "reg_number": "CA 94890"},
  {"color": "orange", "make": "Toyota", "model": "Tazz", "reg_number": "CY 82252"},
  {"color": "blue", "make": "Toyota", "model": "Yaris", "reg_number": "CL 9538"},
  {"color": "white", "make": "Nissan", "model": "Juke", "reg_number": "CF 62002"},
  {"color": "orange", "make": "Ford", "model": "Fiesta", "reg_number": "CJ 67577"},
  {"color": "blue", "make": "Ford", "model": "Ranger", "reg_number": "CA 77852"},
  {"color": "orange", "make": "Toyota", "model": "Hilux", "reg_number": "CY 52435"},
  {"color": "blue", "make": "Toyota", "model": "Corolla", "reg_number": "CL 76173"},
  {"color": "red", "make": "Toyota", "model": "Tazz", "reg_number": "CL 38315"},
  {"color": "orange", "make": "Toyota", "model": "Corolla", "reg_number": "CK 41166"}
];

app.get('/', (req, res) => {
    res.send('Welcome to the Car API');
});

app.get('/api/mostPopularCar', (req, res) => {
    const makeCount = {};

    carData.forEach(car => {
        makeCount[car.make] = (makeCount[car.make] || 0) + 1;
    });

    const mostPopularMake = Object.keys(makeCount).reduce((a, b) => makeCount[a] > makeCount[b] ? a : b);

    res.json({ mostPopularMake });
});
app.get('/api/cars', (req, res) => {
  res.json(carData);
});


app.delete('/api/cars/:reg_number', (req, res) => {
    const regNumber = req.params.reg_number;
    carData = carData.filter(car => car.reg_number !== regNumber);
    res.json({ message: 'Car deleted successfully' });
});

app.put('/api/cars/:reg_number', (req, res) => {
    const regNumber = req.params.reg_number;
    const updatedCar = req.body;

    carData = carData.map(car => 
        car.reg_number === regNumber ? { ...car, ...updatedCar } : car
    );

    res.json({ message: 'Car updated successfully' });
});

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
