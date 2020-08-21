const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Choice = require("inquirer/lib/objects/choice");
const { listenerCount } = require("process");

let employees = [];
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

teamMembers = () => {
   return inquirer.prompt (
            [
            {
                type: "list",
                name: "type",
                message: "Which type of employee are you entering information for?",
                choices: ["Manager","Employee","Engineer","Intern"]
            },
            {
                type: "input",
                name: "name",
                message: "Name: "
            },
            {
                type: "input",
                name: "id",
                message: "ID Number: "
            },
            {
                type: "input",
                name: "email",
                message: "Email: "
            },
            {
                type: "input",
                name: "officeNumber",
                message: "Office Number: ",
                when: function (answers) {
                    return answers.type === "Manager"
                }
            },
            {
                type: "input",
                name: "github",
                message: "GitHub Profile: ",
                when: function (answers) {
                    return answers.type === "Engineer"
                }
            },
            {
                type: "input",
                name: "school",
                message: "School: ",
                when: function (answers) {
                    return answers.type === "Intern"
                }
            },
            {
                type: "confirm",
                name: "loop",
                message: "Do you need to enter any more employees?"
            }
            
        ]
        
    )
    
}
generate = (answers) => {
    const objectEmployee = {
        type: `${answers.type}`,
        name: `${answers.name}`,
        id: `${answers.id}`,
        email: `${answers.email}`
    }
    if (answers.type === "Manager") {
       let manager = new Manager (answers.name, answers.id, answers.email, answers.officeNumber)
       employees.push(manager)
    }
    if (answers.type === "Engineer") {
        let engineer = new Engineer (answers.name, answers.id, answers.email, answers.github)
        employees.push(engineer)
    }
    if (answers.type === "Intern") {
        let intern = new Intern (answers.name, answers.id, answers.email, answers.school)
        employees.push(intern)
    }
    if (answers.type === "Employee") {
        let employee = new Employee (answers.name, answers.id, answers.email)
        employees.push(employee)
     }
}
// function render (template, answers) {
//     if (answers.type === "Engineer") {
//     const engineerHtml = 
//     `<div class="card employee-card">
//     <div class="card-header bg-caution text-white">
//         <h2 class="card-title">${template.name}</h2>
//         <h3 class="card-title"><i class="fas fa-glasses mr-2">${answers.type}</i></h3>
//     </div>
//     <div class="card-body shadow-sm p-3 mb-5 bg-white rounded">
//         <ul class="list-group">
//             <li class="list-group-item">${answers.id}</li>
//             <li class="list-group-item">Email: <a href="mailto:{{ email }}">${template.email}</a></li>
//             <li class="list-group-item">GitHub: <a href="https://github.com/{{ github }}" target="_blank" rel="noopener noreferrer">${template.github}</a></li>
//         </ul>
//     </div>
// </div>`
// return engineerHtml;
// array.push(engineerHtml);
//     }
//     if (answers.type === "Manager") {
//         const managerHtml =   `
//         div class="card employee-card">
//     <div class="card-header bg-caution text-white">
//         <h2 class="card-title">${template.name}</h2>
//         <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>${answers.type}</h3>
//     </div>
//     <div class="card-body shadow-sm p-3 mb-5 bg-white rounded">
//         <ul class="list-group">
//             <li class="list-group-item">${answers.id}</li>
//             <li class="list-group-item">Email: <a href="mailto:{{ email }}">${template.email}</a></li>
//             <li class="list-group-item">Office number: ${template.officeNumber}</li>
//         </ul>
//     </div>
// </div>
//         `
//         return managerHtml;
//         array.push(managerHtml);
//     }
//         if (answers.type === "Intern") {
//             const internHtml = `
//             <div class="card employee-card">
//     <div class="card-header bg-caution text-white">
//         <h2 class="card-title">${template.name}</h2>
//         <h3 class="card-title"><i class="fas fa-user-graduate mr-2"></i>${answers.type}</h3>
//     </div>
//     <div class="card-body shadow-sm p-3 mb-5 bg-white rounded">
//         <ul class="list-group">
//             <li class="list-group-item">${answers.id}</li>
//             <li class="list-group-item">Email: <a href="mailto:{{ email }}">${template.email}</a></li>
//             <li class="list-group-item">School: ${template.school}</li>
//         </ul>
//     </div>
// </div>
//             `
//             return internHtml;
//             array.push(internHtml);
//         }
//     }

write = (temp) => {
    fs.writeFile(outputPath, temp, function(err) {

        if (err) {
          return console.log(err);
        }
      
        console.log("Success!");
      
      });
      
}

teamMembers().then(function (answers) {
    generate(answers)
    
    write(render(employees));
    console.log(render(employees))
})


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
