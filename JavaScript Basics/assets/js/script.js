class CustomMatch{
    result;
    constructor(number){
        this.result = number;
    };

    plusOne(num1){
        this.result += num1;
        return this;
    };

    minusOne(num2){
        this.result -= num2;
        return this;
    };

    divideOne(num3){
        if(num3 === 0) return "Cannot divide by zero";
        else{ 
            this.result /= num3;
            return this;
        }
    };

    multiplyOne(num4){
        this.result *= num4;
        return this;
    };


};


const result = new CustomMatch(50).plusOne(6).minusOne(30).multiplyOne(3).divideOne(2);

console.log(result.result);


// task 2

var arr = [12, 5, 8, 130, 44];

function SortdetArray(arr){
    for (i = 0; i < arr.length; i++) {
        for(m = 1; m < arr.length; m++){
            if(arr[m-1] < arr[m]){
                var temp = arr[m - 1];
                arr[m - 1] = arr[m];
                arr[m] = temp;
            }
        }
    }
    console.log(arr);
}

SortdetArray(arr);


// task 3

function StrLettersSum(str){
    var arr = [];
    var st = str.split(" ");
    for (i = 0; i < st.length; i++){
        arr.push(st[i].length);
    }
    console.log(arr);
}

StrLettersSum("Salam necesen");


// task 4

var student = {
    id: 0,
    names: "",
    surname: "",
    age: 0,
    grade: []
};

const universityGroup = {
    groupName: "PA202",
    students: [],

    addStudent(student){
        if(student !== null && !this.students.find(s => s.id === student.id) && student.id > 0){
            this.students.push(student);
            return 'Student added successfully';
        }
        else return 'Error: Student is null or already exists in the group';
    },

    removeStudent(studentId){
        var id = this.students.findIndex(student => student.id === studentId);
        if(id !== -1){
            this.students.splice(id, 1);
            return `Student with ID ${studentId} removed successfully`;
        }
        else return `Student with ID ${studentId} not found`;
    },

    getStudentById(studentId){
        var student = this.students.find(student => student.id === studentId);
        if(student === undefined) return `Student with ID ${studentId} not found`;
        else return student;
    },

    getGradeAverage(studentId){
        var student = this.students.find(student => student.id === studentId);
        if(student === undefined) return `Student with ID ${studentId} not found`;
        else{
            var sum = student.grade.reduce((total, grade) => total + grade, 0);
            var average = sum / student.grade.length;
            return `Average grade for student ${student.names} ${student.surname} is: ${average}`;
        }   
    },

    addGrade(studentId, grade){
        var student = this.students.find(student => student.id === studentId);
        if(student === undefined) return `Student with ID ${studentId} not found`;
        else{
            student.grade.push(grade);
            return `Grade ${grade} added for student ${student.names} ${student.surname}`;
        }
    },


}


//---------------

var student1 ={id: 1, names: "Abdul", surname: "Huseynov", age: 20, grade: [90, 95, 85, 92, 62]};
var student2 = {id: 2, names: "Ali", surname: "Huseynov", age: 22, grade: [80, 85, 90,56, 78]};
var student3 = {id: 3, names: "Veli", surname: "Huseynov", age: 21, grade: [85, 90, 95, 88, 92]};

//---------------

universityGroup.addStudent(student1);
universityGroup.addStudent(student2);
universityGroup.addStudent(student3);

console.log("-------------------");

universityGroup.removeStudent(2);

console.log("-------------------");

console.log(universityGroup.students);

console.log("-------------------");

console.log(universityGroup.getStudentById(0));

console.log("-------------------");

console.log(universityGroup.getGradeAverage(1));

console.log("-------------------");

console.log(universityGroup.addGrade(1, 33));