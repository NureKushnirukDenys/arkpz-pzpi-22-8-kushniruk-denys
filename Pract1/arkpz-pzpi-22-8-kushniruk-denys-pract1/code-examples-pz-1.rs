// Рекомендація 1 - використання snake_case
// Поганий приклад - використано скорочення 
fn calc(x: i32) -> i32 {
    x * 2
}
// Гарний приклад - зрозуміла назва
fn calculate_double(value: i32) -> i32 {
    value * 2
}

// Рекомендація 2 - дотримання структури коду
// Поганий приклад - без модульної структури
fn process_data(data: Vec<i32>) -> i32 {
    let mut result = 0;
    for i in data {
        result += i * 2;
    }
    result
}
// Гарний приклад - організація через модулі
mod data_processing {
    pub fn process(data: Vec<i32>) -> i32 {
        let mut result = 0;
        for i in data {
            result += double(i);
        }
        result
    }

    fn double(value: i32) -> i32 {
        value * 2
    }
}

// Рекомендація 3 - Принципи рефакторингу
// Поганий приклад - велика функція
fn process_data(data: Vec<i32>) -> i32 {
    let mut result = 0;
    for i in data {
        result += i * 2;
    }
    result
}
// Гарний приклад - розділення на менші функції
fn process_data(data: Vec<i32>) -> i32 {
    data.into_iter().map(double).sum()
}

fn double(value: i32) -> i32 {
    value * 2
}

// Рекомендація 4 - Дублювання коду
// Поганий приклад - дублювання логіки
fn calculate_area_rectangle(width: i32, height: i32) -> i32 {
    width * height
}

fn calculate_area_square(side: i32) -> i32 {
    side * side
}
// Гарний приклад - узагальнення логіки
fn calculate_area<T: Shape>(shape: T) -> i32 {
    shape.area()
}

trait Shape {
    fn area(&self) -> i32;
}

struct Rectangle {
    width: i32,
    height: i32,
}

impl Shape for Rectangle {
    fn area(&self) -> i32 {
        self.width * self.height
    }
}

struct Square {
    side: i32,
}

impl Shape for Square {
    fn area(&self) -> i32 {
        self.side * self.side
    }
}

// Рекомендація 5 - Оптимізація продуктивності 
// Поганий приклад - зайва копія вектора
fn sum_vector(data: Vec<i32>) -> i32 {
    data.iter().sum()
}
// Гарний приклад - передача посилання на вектор
fn sum_vector(data: &Vec<i32>) -> i32 {
    data.iter().sum()
}

// Рекомендація 6 - Обробка помилок 
// Поганий приклад - використання panic! для обробки помилок
fn open_file(path: &str) -> String {
    if path.is_empty() {
        panic!("Path is empty");
    }
    // Умова відкрити файл...
    String::from("file content")
}
// Гарний приклад - використання Result для обробки помилок
fn open_file(path: &str) -> Result<String, String> {
    if path.is_empty() {
        return Err(String::from("Path is empty"));
    }
    // Спроба відкрити файл...
    Ok(String::from("file content"))
}

// Рекомендація 7 - Дотримання парадигм ООП
// Поганий приклад - відсутність інкапсуляції, без методів
struct Car {
    make: String,
    model: String,
    year: u32,
}

fn print_car_info(car: Car) {
    println!("Car: {} {} {}", car.make, car.model, car.year);
}

let car = Car {
    make: String::from("Toyota"),
    model: String::from("Corolla"),
    year: 2022,
};
print_car_info(car);
// Гарний приклад - інкапсуляція через методи структури
struct Car {
    make: String,
    model: String,
    year: u32,
}

impl Car {
    fn new(make: &str, model: &str, year: u32) -> Self {
        Car {
            make: make.to_string(),
            model: model.to_string(),
            year,
        }
    }

    fn print_info(&self) {
        println!("Car: {} {} {}", self.make, self.model, self.year);
    }
}

let car = Car::new("Toyota", "Corolla", 2022);
car.print_info();

// Рекомендація 8 - Дотримання парадигм ФП
// Поганий приклад - використання циклів замість функціональних ітераторів
fn sum_even_numbers(numbers: Vec<i32>) -> i32 {
    let mut sum = 0;
    for i in numbers {
        if i % 2 == 0 {
            sum += i;
        }
    }
    sum
}
// Гарний приклад - використання ітераторів для функціональної обробки
fn sum_even_numbers(numbers: Vec<i32>) -> i32 {
    numbers.into_iter()
           .filter(|&x| x % 2 == 0)
           .sum()
}

// Рекомендація 9 - Тестування коду 
// Поганий приклад - Відсутність тестів
fn add(x: i32, y: i32) -> i32 {
    x + y
}

fn main() {
    println!("Sum: {}", add(2, 3));
}
// Гарний приклад - написання тестів для функції
fn add(x: i32, y: i32) -> i32 {
    x + y
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_add() {
        assert_eq!(add(2, 3), 5);
        assert_eq!(add(-1, 1), 0);
    }
}

fn main() {
    println!("Sum: {}", add(2, 3));
}

// рекомендація 10 - документування коду 
// Поганий приклад - відсутність документації
fn add(x: i32, y: i32) -> i32 {
    x + y
}
// Гарний приклад - використання документаційних коментарів
/// Додає два числа і повертає результат.
///
/// # Приклад
/// ```
/// let result = add(2, 3);
/// assert_eq!(result, 5);
/// ```
fn add(x: i32, y: i32) -> i32 {
    x + y
}