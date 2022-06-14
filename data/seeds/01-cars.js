// STRETCH
exports.seed = function(knex){
    return knex('cars').truncate()
        .then(()=>{
            return knex('cars').insert([
                {
                    vin: "1111111111111111",
                    make: "Made",
                    model: "Ascent",
                    mileage: 100,
                    title: "Car",
                    transmission: "Gas"
                },
                {
                    vin: "2222222222222222",
                    make: "Gone",
                    model: "Descent",
                    mileage: 1200,
                    title: "Car",
                    transmission: "Diesel"
                }
            ])
        })
}