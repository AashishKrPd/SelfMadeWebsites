let S = {
    "Engineering Mathematics - III": 3,
    "Electrical Circuits and Network Analysis": 3,
    "Signals and Systems": 3,
    "Electronic Circuits - I": 3,
    "Electromagnetic Theory": 3,
    "Analog Communication": 3,
    "Circuits and Networks Lab": 2,
    "Electronic Circuits - I Lab ": 2
};
// let S = {"Eng": 3, "Hindi": 4};
// let Sub = ["Eng", "Hindi"];
let Sub = Object.keys(S);

let cont = document.querySelector(".container");

for (let i = 0; i < Sub.length; i++) {
    let sub = Sub[i];
    let cred = S[Sub[i]];

    let l = document.createElement("div");
    l.className = "subject";
    l.innerHTML = `<label for="sub${i}">${sub} × ${S[Sub[i]]} : </label><input type="number" id="sub${i}">`
    cont.appendChild(l);
}


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

function calcGpa() {
    let s = 0;
    let TC = 0;
    let sc = 0;

    for (let i = 0; i < Sub.length; i++) {
        C = S[Sub[i]]
        val = Number(document.getElementById(`sub${i}`).value)
        sc += toGrade(val, C) * C;
        s += val;
        TC += C;
    }

    console.log(`Total Marks: ${s}`);
    console.log(`Total Credits: ${TC}`);
    console.log(`Total (Grade Marks × Credits): ${sc}`);
    console.log(`GPA: ${sc / TC}`);
    document.getElementById("out").innerText = `Marks: ${s} GPA: ${sc / TC}`;
}
