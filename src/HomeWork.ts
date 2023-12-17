class School {
    directions: Direction[] = [];

    addDirection(direction: Direction): void {
        this.directions.push(direction);
    }
}

class Direction {
    levels: Level[] = [];

    get name(): string {
        return this._name;
    }

    constructor(private _name: string) {}

    addLevel(level: Level): void {
        this.levels.push(level);
    }
}

class Level {
    groups: Group[] = [];

    constructor(private _name: string, private _program: string) {}

    get name(): string {
        return this._name;
    }

    get program(): string {
        return this._program;
    }

    addGroup(group: Group): void {
        this.groups.push(group);
    }
}

class Group {
    private _students: Student[] = [];

    get students(): Student[] {
        return this._students;
    }

    constructor(public directionName: string, public levelName: string) {}

    addStudent(student: Student): void {
        this._students.push(student);
    }

    showPerformance(): Student[] {
        const sortedStudents = this.students.sort(
            (a, b) => b.getPerformanceRating() - a.getPerformanceRating()
        );

        return sortedStudents;
    }
}

class Student {
    grades: Record<string, number> = {};
    attendance: boolean[] = [];

    constructor(public firstName: string, public lastName: string, public birthYear: number) {}

    get fullName(): string {
        return `${this.lastName} ${this.firstName}`;
    }

    set fullName(value: string) {
        [this.lastName, this.firstName] = value.split(" ");
    }

    get age(): number {
        return new Date().getFullYear() - this.birthYear;
    }

    setGrade(subject: string, grade: number): void {
        this.grades[subject] = grade;
    }

    markAttendance(present: boolean): void {
        this.attendance.push(present);
    }

    getPerformanceRating(): number {
        const gradeValues = Object.values(this.grades);

        if (gradeValues.length === 0) return 0;

        const averageGrade =
            gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;

        const attendancePercentage =
            (this.attendance.filter((present) => present).length /
                this.attendance.length) *
            100;

        return (averageGrade + attendancePercentage) / 2;
    }
}


const school = new School();
const mathDirection = new Direction('Math');
const mathLevel = new Level('Math Level', 'Math Program');
const mathGroup = new Group('Math', 'Math Level');
const student1 = new Student('John', 'Doe', 2000);
const student2 = new Student('Jane', 'Smith', 2001);

mathGroup.addStudent(student1);
mathGroup.addStudent(student2);
mathLevel.addGroup(mathGroup);
mathDirection.addLevel(mathLevel);
school.addDirection(mathDirection);

// Выводим информацию на консоль
console.log('School Directions:');
school.directions.forEach((direction) => {
    console.log(`- Direction: ${direction.name}`);
    direction.levels.forEach((level) => {
        console.log(`  - Level: ${level.name}, Program: ${level.program}`);
        level.groups.forEach((group) => {
            console.log(`    - Group: ${group.directionName} - ${group.levelName}`);
            group.students.forEach((student) => {
                console.log(`      - Student: ${student.fullName}, Age: ${student.age}`);
                console.log(`        - Grades: ${JSON.stringify(student.grades)}`);
                console.log(`        - Attendance: ${JSON.stringify(student.attendance)}`);
                console.log(`        - Performance Rating: ${student.getPerformanceRating()}`);
            });
        });
    });
});

console.log('\nGroup Performance:');
const sortedStudents = mathGroup.showPerformance();
sortedStudents.forEach((student) => {
    console.log(`- Student: ${student.fullName}, Performance Rating: ${student.getPerformanceRating()}`);
});