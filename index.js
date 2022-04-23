/* Your Code Here */
const createEmployeeRecord = function (employee) {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    };
};
const createEmployeeRecords = function (roster) {
    return roster.map(createEmployeeRecord);
};
function createTimeInEvent(timeStamp) {
    this.timeInEvents.push(
        {
            type: 'TimeIn',
            hour: parseInt(timeStamp.slice(11)),
            date: timeStamp.slice(0, 10)
        }
    );
    return this;
};
const createTimeOutEvent = function (timeStamp) {
    this.timeOutEvents.push(
        {
            type: 'TimeOut',
            hour: parseInt(timeStamp.slice(11)),
            date: timeStamp.slice(0,10)
        }
    );
    return this;
};
const hoursWorkedOnDate = function (date) {
    return (this.timeOutEvents.find(punch => {
        return punch.date === date;
    }).hour-
    this.timeInEvents.find(punch => {
        return punch.date === date;
    }).hour)/100;
};
const wagesEarnedOnDate = function (date) {
    return hoursWorkedOnDate.call(this, date)*this.payPerHour;
};
const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    });

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0); // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable;
};
const findEmployeeByFirstName = function (rosterRec, firstName) {
    return rosterRec.find(emplRec => {
        return emplRec.firstName === firstName;
    });
};
const calculatePayroll = function (rosterRec) {
     return rosterRec.reduce(function(memo,rec){
         return memo + allWagesFor.call(rec)
     },0);
}