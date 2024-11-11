// PULL UP METHOD (ПІДНЯТТЯ МЕТОДУ)
// До рефакторингу
class Order {
    constructor(public amount: number, public taxRate: number) {}
}

class OnlineOrder extends Order {
    calculateDiscount(): number {
        let discount = this.amount * 0.1; // 10% базова знижка
        if (this.amount > 500) {
            discount += this.amount * 0.05; // додаткова знижка 5% для великих замовлень
        }
        return discount;
    }

    calculateTotal(): number {
        const discount = this.calculateDiscount();
        const tax = this.amount * this.taxRate;
        return this.amount - discount + tax;
    }

    processOrder(): void {
        console.log("Processing online order");
    }
}

class InStoreOrder extends Order {
    calculateDiscount(): number {
        let discount = this.amount * 0.08; // 8% базова знижка
        if (this.amount > 300) {
            discount += this.amount * 0.03; // додаткова знижка 3% для великих замовлень
        }
        return discount;
    }

    calculateTotal(): number {
        const discount = this.calculateDiscount();
        const tax = this.amount * this.taxRate;
        return this.amount - discount + tax;
    }

    processOrder(): void {
        console.log("Processing in-store order");
    }
}

// Використання
const onlineOrder = new OnlineOrder(600, 0.2);
console.log(onlineOrder.calculateTotal()); // Розрахунок з урахуванням знижки і податку

const inStoreOrder = new InStoreOrder(400, 0.15);
console.log(inStoreOrder.calculateTotal()); // Розрахунок з урахуванням знижки і податку

// Після рефакторингу 
class Order {
    constructor(
        public amount: number,
        public taxRate: number,
        private baseDiscountRate: number,
        private extraDiscountThreshold: number,
        private extraDiscountRate: number
    ) {}

    calculateDiscount(): number {
        let discount = this.amount * this.baseDiscountRate;
        if (this.amount > this.extraDiscountThreshold) {
            discount += this.amount * this.extraDiscountRate;
        }
        return discount;
    }

    calculateTotal(): number {
        const discount = this.calculateDiscount();
        const tax = this.amount * this.taxRate;
        return this.amount - discount + tax;
    }
}

class OnlineOrder extends Order {
    constructor(amount: number, taxRate: number) {
        super(amount, taxRate, 0.1, 500, 0.05); // параметри знижки для онлайн замовлення
    }

    processOrder(): void {
        console.log("Processing online order");
    }
}

class InStoreOrder extends Order {
    constructor(amount: number, taxRate: number) {
        super(amount, taxRate, 0.08, 300, 0.03); // параметри знижки для замовлення в магазині
    }

    processOrder(): void {
        console.log("Processing in-store order");
    }
}

// Використання
const onlineOrder = new OnlineOrder(600, 0.2);
console.log(onlineOrder.calculateTotal()); // Розрахунок з урахуванням знижки і податку

const inStoreOrder = new InStoreOrder(400, 0.15);
console.log(inStoreOrder.calculateTotal()); // Розрахунок з урахуванням знижки і податку


// REMOVE SETTING METHOD (ВИДАЛЕННЯ СЕТЕРА)
// До рефакторингу 
class Order {
    private _orderId: string;
    private _customerId: string;
    private _createdAt: Date;
    private _status: string;

    constructor(orderId: string, customerId: string, createdAt: Date, status: string) {
        this._orderId = orderId;
        this._customerId = customerId;
        this._createdAt = createdAt;
        this._status = status;
    }

    // Getter та Setter для orderId
    get orderId(): string {
        return this._orderId;
    }

    set orderId(newOrderId: string) {
        this._orderId = newOrderId;
    }

    // Getter та Setter для customerId
    get customerId(): string {
        return this._customerId;
    }

    set customerId(newCustomerId: string) {
        this._customerId = newCustomerId;
    }

    // Getter та Setter для createdAt
    get createdAt(): Date {
        return this._createdAt;
    }

    set createdAt(newCreatedAt: Date) {
        this._createdAt = newCreatedAt;
    }

    // Getter та Setter для status
    get status(): string {
        return this._status;
    }

    set status(newStatus: string) {
        this._status = newStatus;
    }
}

// Використання
const order = new Order("ORD123", "CUST456", new Date("2024-11-01"), "Pending");
order.orderId = "ORD789"; // Можна змінити `orderId`, що небажано
order.customerId = "CUST789"; // Можна змінити `customerId`, що небажано
order.createdAt = new Date("2024-11-02"); // Можна змінити `createdAt`, що небажано
order.status = "Shipped"; // Зміна `status` допускається
console.log(order);

// Після рефакторингу 
class Order {
    private readonly _orderId: string;
    private readonly _customerId: string;
    private readonly _createdAt: Date;
    private _status: string;

    constructor(orderId: string, customerId: string, createdAt: Date, status: string) {
        this._orderId = orderId;
        this._customerId = customerId;
        this._createdAt = createdAt;
        this._status = status;
    }

    // Getter для orderId (тільки читання)
    get orderId(): string {
        return this._orderId;
    }

    // Getter для customerId (тільки читання)
    get customerId(): string {
        return this._customerId;
    }

    // Getter для createdAt (тільки читання)
    get createdAt(): Date {
        return this._createdAt;
    }

    // Getter та Setter для status (можна змінювати)
    get status(): string {
        return this._status;
    }

    set status(newStatus: string) {
        this._status = newStatus;
    }
}

// Використання
const order = new Order("ORD123", "CUST456", new Date("2024-11-01"), "Pending");
// order.orderId = "ORD789"; // Помилка: `orderId` не можна змінити після створення
// order.customerId = "CUST789"; // Помилка: `customerId` не можна змінити після створення
// order.createdAt = new Date("2024-11-02"); // Помилка: `createdAt` не можна змінити після створення
order.status = "Shipped"; // Зміна `status` допускається
console.log(order);

// MOVE FIELD (ПЕРЕМІЩЕННЯ ПОЛЯ)
// До рефакторингу 

class Address {
    private _address: string;

    constructor(address: string) {
        this._address = address;
    }

    get address(): string {
        return this._address;
    }

    set address(value: string) {
        this._address = value;
    }
}

class PhoneNumber {
    private _phoneNumber: string;

    constructor(phoneNumber: string) {
        this._phoneNumber = phoneNumber;
    }

    get phoneNumber(): string {
        return this._phoneNumber;
    }

    set phoneNumber(value: string) {
        this._phoneNumber = value;
    }
}

class UserProfile {
    private _username: string;
    private _age: number;
    private _address: Address;
    private _phoneNumber: PhoneNumber;

    constructor(username: string, age: number, address: Address, phoneNumber: PhoneNumber) {
        this._username = username;
        this._age = age;
        this._address = address;
        this._phoneNumber = phoneNumber;
    }

    // Getter і Setter для address
    get address(): string {
        return this._address.address;
    }

    set address(value: string) {
        this._address.address = value;
    }

    get phoneNumber(): string {
        return this._phoneNumber.phoneNumber;
    }

    set phoneNumber(value: string) {
        this._phoneNumber.phoneNumber = value;
    }
}

class UserService {
    private _userProfile: UserProfile;

    constructor(userProfile: UserProfile) {
        this._userProfile = userProfile;
    }

    updateAddress(newAddress: string) {
        this._userProfile.address = newAddress;
    }

    updatePhoneNumber(newPhoneNumber: string) {
        this._userProfile.phoneNumber = newPhoneNumber;
    }
}

// Використання
const address = new Address('123 Street');
const phoneNumber = new PhoneNumber('123-456-789');
const userProfile = new UserProfile('Alice', 30, address, phoneNumber);
const userService = new UserService(userProfile);
userService.updateAddress('456 Avenue');
userService.updatePhoneNumber('987-654-321');


// Після рефакторингу

class UserProfile {
    constructor(
        private _username: string,
        private _age: number,
        private _address: string,
        private _phoneNumber: string
    ) {}

    // Getter і Setter для address
    get address(): string {
        return this._address;
    }

    set address(value: string) {
        this._address = value;
    }

    // Getter і Setter для phoneNumber
    get phoneNumber(): string {
        return this._phoneNumber;
    }

    set phoneNumber(value: string) {
        this._phoneNumber = value;
    }
}

class UserService {
    constructor(private _userProfile: UserProfile) {}

    updateAddress(newAddress: string) {
        this._userProfile.address = newAddress;
    }

    updatePhoneNumber(newPhoneNumber: string) {
        this._userProfile.phoneNumber = newPhoneNumber;
    }
}

// Використання
const userProfile = new UserProfile('Alice', 30, '123 Street', '123-456-789');
const userService = new UserService(userProfile);
userService.updateAddress('456 Avenue');
userService.updatePhoneNumber('987-654-321');
