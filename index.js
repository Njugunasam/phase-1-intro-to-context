// Your code here
function createEmployeeRecord(firstName, familyName, title, payPerHour) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: [],
    };
}

function createEmployeeRecords(employeeData) {
    return employeeData.map(data => createEmployeeRecord(...data));
}

function createTimeInEvent(employee, dateStamp) {
    const [date, time] = dateStamp.split(' ');
    employee.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(time, 10),
    });
    return employee;
}

function createTimeOutEvent(employee, dateStamp) {
    const [date, time] = dateStamp.split(' ');
    employee.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: parseInt(time, 10),
    });
    return employee;
}

function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);

    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
}

function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((total, date) => {
        return total + wagesEarnedOnDate(employee, date);
    }, 0);
    return totalWages;
}

function calculatePayroll(employees) {
    return employees.reduce((totalPay, employee) => {
        return totalPay + allWagesFor(employee);
    }, 0);
}

// Example usage:
const employeeData = [
    ["John", "Doe", "Manager", 20],
    ["Jane", "Smith", "Assistant", 15],
];

const employees = createEmployeeRecords(employeeData);

createTimeInEvent(employees[0], "2023-10-28 0900");
createTimeOutEvent(employees[0], "2023-10-28 1700");

console.log(wagesEarnedOnDate(employees[0], "2023-10-28")); // Calculate wages for a specific date
console.log(allWagesFor(employees[0])); // Calculate total wages for the employee
console.log(calculatePayroll(employees)); // Calculate payroll for all employees

