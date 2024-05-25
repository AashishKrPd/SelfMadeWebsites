
function scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
}

// Add New Subject Row 
function AddNewSub() {
    let subjectRow = document.querySelector(".subjects")

    let num = subjectRow.childNodes.length - 2;
    let type;

    if (num % 2 == 0) {
        type = "type1";
    }
    else {
        type = "type2";
    }

    var newDiv = document.createElement('div');
    newDiv.innerHTML = `<div class="sub">Sub ${num}</div>
    <div class="marks-group">
        <div>Marks</div>
        <input class="marks" type="number">
    </div>
    <div class="cred-group">
        <div>Credits</div>
        <input class="credits" type="Number">
    </div>
    <button tabindex="-1" class="cls btn" title="Remove this Row" onclick="DelThisSub(event)"></button>`

    newDiv.classList.add('subject', 'row', `${type}`)
    subjectRow.appendChild(newDiv)
    scrollToBottom();
}

// Update Subjects Name
function updateSubs() {
    let allSubs = document.querySelectorAll(".sub");
    console.log(allSubs);

    for (var i = 0; i < allSubs.length; i++) {
        allSubs[i].textContent = `Sub ${i + 1}`;

        let row = allSubs[i].parentNode.classList;
        if (i % 2 == 0) {
            row.remove("type1");
            row.add("type2");
        }
        else {
            row.remove("type2");
            row.add("type1");
        }
    }
}

// Delete Subjects
function DelThisSub(event) {
    var parentDiv = event.target.parentElement;
    parentDiv.remove();

    updateSubs();
}

// Number + Credits to Grade Pooints
function toGrade(num, c) {
    if (c == 1) {
        num *= 2;
    }
    if (num == 100) {
        return 10;
    }
    else if (num < 50) {
        return 0;
    }
    else {
        return Math.floor(num / 10) + 1;
    }

}

// Calculation Part
function CGPA() {
    let allSubjects = document.querySelectorAll(".subject");
    let totalMarks = 0
    let totalCredits = 0
    let creditMarks = 0

    allSubjects.forEach(subject => {
        let Marks = parseFloat(subject.querySelector(".marks").value)
        let Credits = parseFloat(subject.querySelector(".credits").value)

        if (!isNaN(Marks) && !isNaN(Credits)) {
            creditMarks += Credits * toGrade(Marks, Credits);
            totalMarks += Marks
            totalCredits += Credits
        }
    });

    let cgpa = (creditMarks / totalCredits);
    console.log(cgpa)
    console.log(cgpa.toFixed(5))

    // display part 
    let CGPA = document.querySelector(".cgpa")
    CGPA.innerText = `${cgpa.toFixed(5)}`

    console.log("Total Marks:", totalMarks);
    console.log("Total Credits:", totalCredits);
    console.log("Total Credits Marks:", creditMarks);
    console.log("CGPA:", cgpa.toFixed(5));
}

// Keyboard Event Handling Part 
document.addEventListener('keydown', function (event) {
    var focusedElement = document.activeElement;
    if (event.key === '+') {
        AddNewSub();
        event.preventDefault();
    }
    if (event.key === '-') {
        let cl = focusedElement.parentNode;

        if (cl.className == "cred-group" || cl.className == "marks-group") {
            cl = cl.parentNode.lastChild;
        }
        else {
            cl = cl.lastChild;
        }
        cl.parentNode.remove();
        updateSubs();

        event.preventDefault();
    }
    if (event.key === 'Enter') {
        CGPA();
        event.preventDefault();
        // }
    }
});

// focus on 1st input element 
document.addEventListener('DOMContentLoaded', function () {
    var firstInput = document.querySelector('input');
    firstInput.focus();

});

// default Subject 
AddNewSub();
AddNewSub();
AddNewSub();
AddNewSub();
AddNewSub();
