class Lecturer {
    constructor(
      public name: string,
      public surname: string,
      public position: string,
      public company: string,
      public experience: number,
      public courses: string[],
      public contacts: string
    ) {}
  }
  
  class Area {
    levels: Level[] = [];
  
    constructor(public name: string) {}
  
    addLevel(level: Level): void {
      this.levels.push(level);
    }
  
    removeLevel(level: Level): void {
      const index = this.levels.indexOf(level);
      if (index !== -1) {
        this.levels.splice(index, 1);
      }
    }
  }
  
  class Level {
    groups: Group[] = [];
  
    constructor(public name: string, public description: string) {}
  
    addGroup(group: Group): void {
      this.groups.push(group);
    }
  
    removeGroup(group: Group): void {
      const index = this.groups.indexOf(group);
      if (index !== -1) {
        this.groups.splice(index, 1);
      }
    }
  }
  
  class Group {
    students: Student[] = [];
  
    constructor(
      public directionName: string,
      public levelName: string,
      public status: string
    ) {}
  
    showPerformance(): Student[] {
      const sortedStudents = this.students.sort((a, b) => b.getPerformanceRating() - a.getPerformanceRating());
      return sortedStudents;
    }
  }
  
  class Student {
    grades: Record<string, number> = {};
    visits: boolean[] = [];
  
    constructor(public firstName: string, public lastName: string, public birthYear: number) {}
  
    get fullName(): string {
      return `${this.lastName} ${this.firstName}`;
    }
  
    set fullName(value: string) {
      [this.lastName, this.firstName] = value.split(' ');
    }
  
    get age(): number {
      return new Date().getFullYear() - this.birthYear;
    }
  
    getPerformanceRating(): number {
      const gradeValues = Object.values(this.grades);
  
      if (!gradeValues.length) return 0;
  
      const averageGrade = gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;
      const attendancePercentage =
        (this.visits.filter((present) => present).length / this.visits.length) * 100;
  
      return (averageGrade + attendancePercentage) / 2;
    }
  }
  
  class School {
    private areas: Area[] = [];
    private lecturers: Lecturer[] = [];
  
    addArea(area: Area): void {
      this.areas.push(area);
    }
  
    removeArea(area: Area): void {
      const index = this.areas.indexOf(area);
      if (index !== -1) {
        this.areas.splice(index, 1);
      }
    }
  
    addLecturer(lecturer: Lecturer): void {
      this.lecturers.push(lecturer);
    }
  
    removeLecturer(lecturer: Lecturer): void {
      const index = this.lecturers.indexOf(lecturer);
      if (index !== -1) {
        this.lecturers.splice(index, 1);
      }
    }
  }
  
  const mathArea = new Area('Mathematics');
  const algebraLevel = new Level('Algebra', 'Basic algebra concepts');
  const algebraGroup = new Group('Math', 'Algebra', 'Active');
  const student1 = new Student('John', 'Doe', 1990);
  const student2 = new Student('Jane', 'Smith', 1992);
  
  algebraGroup.students.push(student1, student2);
  algebraLevel.groups.push(algebraGroup);
  mathArea.levels.push(algebraLevel);
  
  const mySchool = new School();
  mySchool.addArea(mathArea);
  
  console.log('Math Area:', mathArea);
  console.log('Algebra Level:', algebraLevel);
  