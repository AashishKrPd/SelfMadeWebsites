function calcSum(op) {
    let box1 = document.getElementById("sub1").value;
    let box2 = document.getElementById("sub2").value;
    let res;
    if (op == "+") {
        res = Number(box1) + Number(box2);
    }
    if (op == "-") {
        res = Number(box1) - Number(box2);
    }
    if (op == "*") {
        res = Number(box1) * Number(box2);
    }
    if (op == "/") {
        res = Number(box1) / Number(box2);
    }
    if (op == "%") {
        res = Number(box1) % Number(box2);
    }
    // document.getElementById("out").value = res;
    document.getElementById("out").innerText = res;
}
