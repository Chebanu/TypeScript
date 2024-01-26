enum DomainArea
{
    IT = "IT",
    Finance = "Finance",
    Marketing = "Marketing"
}

class Company
{
    private name: string;
    private departmentList: Department[] = [];
    private NewEmployeesList: NewEmployee[] = [];
    private AllEmployeesList: Employee[] | NewEmployee[] = [];

    constructor ( name: string )
    {
        this.name = name;
    }

    addDepartment ( department: Department ): void
    {
        this.departmentList.push( department );
    }

    addNewEmployee ( employee: NewEmployee ): void
    {
        this.NewEmployeesList.push( employee );
    }

    getdepartmentList (): Department[]
    {
        return this.departmentList;
    }

    getNewEmployeesList (): NewEmployee[]
    {
        return this.NewEmployeesList;
    }

    getAllEmployeesList (): Employee[] | NewEmployee[]
    {
        let AllEmployeesList: Employee[] | NewEmployee[] = [...this.NewEmployeesList,];
        for ( let i of this.departmentList ) {
            AllEmployeesList = AllEmployeesList.concat( i.getdepartmentEmployeeList() );
        }
        return this.AllEmployeesList;
    }


}

class Department
{
    private name: string;
    private domainArea: DomainArea;
    private departmentEmployeeList: Employee[] = [];
    private debit: number = 0;
    private credit: number = 0;

    constructor ( name: string, domainArea: DomainArea )
    {
        this.name = name;
        this.domainArea = domainArea;
    }

    getdepartmentEmployeeList (): Employee[]
    {
        return this.departmentEmployeeList;
    }

    getDepartmentName (): string
    {
        return this.name;
    }

    getDomainArea (): DomainArea
    {
        return this.domainArea;
    }

    get budget (): number
    {
        return this.debit - this.credit;
    }

    calculateBalance (): number
    {
        return this.budget;
    }

    addEmployee ( employee: Employee | NewEmployee ): void
    {
        if ( employee instanceof Employee ) {
            this.departmentEmployeeList.push( employee );
            employee.setDepartment( this.name );
        }
        else {
            this.departmentEmployeeList.push( employee.toEmployee( 'Active', this.name ) );
        }
        this.credit += employee.getSalary();
    }



}
class AccountningDepartment extends Department
{
    private balance: number;

    constructor ()
    {
        super( 'Accounting', DomainArea.Finance );
        this.balance = 0;
    }

    takeOnBalance ( amount: Employee | Department ): void
    {
        if ( amount instanceof Employee ) {
            this.balance += amount.getSalary();
        }
        else {
            this.balance += amount.budget;
        }
    }

    withdrawFromBalance ( amount: Employee | Department ): void
    {
        if ( amount instanceof Employee ) {
            this.balance -= amount.getSalary();
        }
        else {
            this.balance -= amount.budget;
        }
    }

    paySalaries ( company: Company ): void
    {
        for ( const employee of company.getAllEmployeesList() ) {
            if ( employee instanceof Employee && employee.getStatus() === 'Active' ) {
                
            }
        }

    }
}

class NewEmployee
{
    private name: string;
    private lastName: string;
    private salary: number;
    private bankDetails: string;

    constructor ( name: string, lastName: string, salary: number, bankDetails: string )
    {
        this.name = name;
        this.lastName = lastName;
        this.salary = salary;
        this.bankDetails = bankDetails;

    }

    getSalary ()
    {
        return this.salary;
    }
    toEmployee ( status: "Active" | "Inactive" | "OnUnpaidLeave", department: string ): Employee
    {
        return new Employee( this.name, this.lastName, this.salary, this.bankDetails, status, department );
    }
}

class Employee extends NewEmployee
{
    private status: "Active" | "Inactive" | "OnUnpaidLeave";
    private department: string;

    constructor ( name: string, lastName: string, salary: number, bankDetails: string, status: "Active" | "Inactive" | "OnUnpaidLeave", department: string )
    {
        super( name, lastName, salary, bankDetails );
        this.status = status;
        this.department = department;
    }

    getStatus (): "Active" | "Inactive" | "OnUnpaidLeave"
    {
        return this.status;
    }

    getDepartment (): string
    {
        return this.department;
    }

    setDepartment ( department: string )
    {
        return department;
    };
}