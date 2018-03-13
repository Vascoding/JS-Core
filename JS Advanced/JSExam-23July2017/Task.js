class Task {
    constructor(title, deadline) {
        if (deadline < Date.now()) {
            throw new Error('Deadline should not be in the past!')
        }
        this.title = title
        this._deadline = deadline
        this.status = 'Open'
        this._isOverdue = this.isOverdue
    }

    get isOverdue() {
        return Date.now() >= this.deadline && this.status !== 'Complete'
    }

    static comparator(a, b) {
        let compareStatus = {
            'In Progress': 1,
            Open: 2,
            Complete: 3
        }

        let firstIndex = a.isOverdue && a.status !== 'Complete' ? 0 : compareStatus[a.status]
        let secondIndex = b.isOverdue && b.status !== 'Complete' ? 0 : compareStatus[b.status]


        if (firstIndex !== secondIndex) {
            return firstIndex - secondIndex
        }

        return a.deadline - b.deadline
    }

    get deadline() {
        return this._deadline
    }

    set deadline(deadline) {
        if (deadline <= Date.now()) {
            throw new Error('Deadline should not be in the past!')
        }
        this._deadline = deadline
    }

    toString() {
        let statusIcon
        if (this.status === 'Open') {
            statusIcon = '\u2731'
        }
        if (this.status === 'Complete') {
            statusIcon = '\u2714'
            return `[${statusIcon}] ${this.title}`
        }
        if (this.status === 'In Progress') {
            statusIcon = '\u219D'
        }
        if (this.isOverdue) {
            statusIcon = '\u26A0'
            return `[${statusIcon}] ${this.title} (overdue)`
        }
        return `[${statusIcon}] ${this.title} {(deadline: ${this.deadline})}`
    }
}

let date1 = new Date();
date1.setDate(date1.getDate() + 7); // Set date 7 days from now
let task1 = new Task('JS Homework', date1);
let date2 = new Date();
date2.setFullYear(date2.getFullYear() + 1); // Set date 1 year from now
let task2 = new Task('Start career', date2);
console.log(task1 + '\n' + task2);
let date3 = new Date();
date3.setDate(date3.getDate() + 3); // Set date 3 days from now
let task3 = new Task('football', date3);
// Create two tasks with deadline set to current time
let task4 = new Task('Task 4', new Date());
let task5 = new Task('Task 5', new Date());
task1.status = 'In Progress';
task3.status = 'In Progress';
task5.status = "Complete";
let tasks = [task1, task2, task3, task4, task5];
setTimeout(() => {
    tasks.sort(Task.comparator);
    console.log(tasks.join('\n'));
}, 1000); // Sort and print one second later


