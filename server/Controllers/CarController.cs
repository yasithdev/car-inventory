using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using System.Collections.Generic;
using System.Linq;
using coding.Models;
using System;
using System.IO;
using Newtonsoft.Json;

namespace coding.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("MyPolicy")]
    public class CarController : ControllerBase
    {
        private readonly CarContext _context;
        private string _path = Path.Combine(Environment.CurrentDirectory, "data.json");
        private void AddCarsToContext(){
            _context.Cars.Add(new Car { Manufacturer = "Ford",Make="Mustang",Model="GT",Year=2015 });
            _context.Cars.Add(new Car { Manufacturer = "Chevrolet",Make="Corvette",Model="Z06",Year=2017 });
            _context.Cars.Add(new Car { Manufacturer = "Dodge",Make="Challenger",Model="Hellcat",Year=2016 });
            _context.SaveChanges();
        }
        private void WriteToJSONfile(){
            
            try{
                // Create a file to write to.
                using (StreamWriter file = System.IO.File.CreateText(_path)) 
                {
                    JsonSerializer serializer = new JsonSerializer();
                    //saves cars preserving the order (ID) of cars
                    serializer.Serialize(file, _context.Cars.OrderBy(s => s.Id).ToList());
                }
            }catch(Exception e){
                Console.WriteLine("Exception information: {0}", e);
            }
        }
        private List<Car> ReadFromJSONfile(){
            try{
                List<Car> carsList;
                using (StreamReader file = System.IO.File.OpenText(_path))
                {
                    JsonSerializer serializer = new JsonSerializer();
                    carsList = (List<Car>)serializer.Deserialize(file, typeof(List<Car>));
                }
                foreach (Car c in carsList) {
                    _context.Cars.Add(new Car { Id =c.Id,Manufacturer = c.Manufacturer,Make=c.Make,Model=c.Model,Year=c.Year });
                }
                _context.SaveChanges();
            }catch(Exception e){
                Console.WriteLine("Exception information: {0}", e);
                //In case ofan exception, 3 cars still wold be added to the _context
                // AddCarsToContext();
            }
            return _context.Cars.ToList();
        }

        public CarController(CarContext context)
        {
            _context = context;

            if (_context.Cars.Count() == 0)
            {
                if (!System.IO.File.Exists(_path)) 
                {
                    AddCarsToContext();
                    WriteToJSONfile();
                }
                else{
                    Console.WriteLine("\n\ndata file exist\n\n");
                    ReadFromJSONfile();
                }
            }
        }  
        //localhost:5000/api/car
        //Get all cars
        [HttpGet]
        public ActionResult<List<Car>> GetAll()
        {
            WriteToJSONfile();
            //returns the list of cars preserving the order (ID) of cars
            return _context.Cars.OrderBy(s => s.Id).ToList();
        }

        //Get one car given the ID
        [HttpGet("{id}", Name = "GetCar")]
        public ActionResult<Car> GetById(long id)
        {
            var item = _context.Cars.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }   

        //localhost:5000/api/car
        //Create Car
        [HttpPost]
        public IActionResult Create(Car car)
        {
            if(car.Id == 0){
                car.Id=1;
            }
            var item = _context.Cars.Find(car.Id);
            while(item!=null){
                car.Id = car.Id+1;
                item = _context.Cars.Find(car.Id);
            }
            _context.Cars.Add(car);
            _context.SaveChanges();
            WriteToJSONfile();
            return CreatedAtRoute("GetCar", new { id = car.Id }, car);
        }  

        //localhost:5000/api/car/{id}
        //Edit Method
        [HttpPut("{id}")]
        public IActionResult Update(long id, Car item)
        {
            var car = _context.Cars.Find(id);
            if (car == null)
            {
                return NotFound();
            }
            //send in raw-json body
            car.Manufacturer = item.Manufacturer;
            car.Make = item.Make;
            car.Model = item.Model;
            car.Year = item.Year;

            _context.Cars.Update(car);
            _context.SaveChanges();
            WriteToJSONfile();
            return NoContent();
        }
        //localhost:5000/api/car/{id}
        //Delete Method
        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            var car = _context.Cars.Find(id);
            if (car == null)
            {
                return NotFound();
            }

            _context.Cars.Remove(car);
            _context.SaveChanges();
            WriteToJSONfile();
            return NoContent();
        }
    }


}
