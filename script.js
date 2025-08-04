document.querySelector("form").addEventListener("submit", getData); // add event listener

let recordArr = JSON.parse(localStorage.getItem("records")) || [];   // load record if it not then show empty
displayRecord(recordArr); // display it by defalut on loading

function getData(e) {   // get data from form
    e.preventDefault();
    // 1. get all data 
    let doctorName = document.querySelector("#name").value;
    let doctorId = document.querySelector("#docID").value;
    let specialization = document.querySelector("#dept").value;
    let experience = document.querySelector("#exp").value;
    let email = document.querySelector("#email").value;
    let mobile = document.querySelector("#mbl").value;
    let role;

    if (experience < 0 || mobile.length !== 10) {
        alert("Please enter valid experience and a 10-digit mobile number.");
        return;
    }

    if (experience == 0) role = "Intern";
    else if (experience >= 1 && experience <= 3) role = "Junior Resident";
    else if (experience >= 4 && experience <= 6) role = "Senior Resident";
    else if (experience >= 7 && experience <= 10) role = "Consultant";
    else if (experience > 10) role = "Head of Department";
    else role = "Unknown";


    // 2. make object of record
    let recordObj = { doctorName, doctorId, specialization, experience, email, mobile, role };
    console.log(recordObj);

    // 3. push object of record in array of record
    recordArr.push(recordObj);
    // 4. save array locally
    localStorage.setItem("records", JSON.stringify(recordArr));
    displayRecord(recordArr);

    document.querySelector("form").reset();
}

function displayRecord(record) {
    document.querySelector("tbody").innerText = ""; // it prevent from repertion

    // 1. apply for each to traverse in array
    record.forEach((ele, i) => {
        let row = document.createElement("tr");
        // 2. now create element and fill each in a row 
        let td1 = document.createElement("td");
        td1.innerText = ele.doctorName;

        let td2 = document.createElement("td");
        td2.innerText = ele.doctorId;

        let td3 = document.createElement("td");
        td3.innerText = ele.specialization;

        let td4 = document.createElement("td");
        td4.innerText = ele.experience;

        let td5 = document.createElement("td");
        td5.innerText = ele.email;

        let td6 = document.createElement("td");
        td6.innerText = ele.mobile;

        let td7 = document.createElement("td");
        td7.innerText = ele.role;

        let td8 = document.createElement("td");
        let delBtn = document.createElement("button"); // this line we do extra because ->  it's likely due to the fact that you're not appending the delete button inside a <td>, but rather the button directly as a column, which breaks the table's structure. This causes the last column's border to appear missing or broken.
        delBtn.innerText = "Delete";
        delBtn.className = "delete-btn";
        delBtn.addEventListener("click", function () {
            recordArr.splice(i, 1);
            localStorage.setItem("records", JSON.stringify(recordArr));
            displayRecord(recordArr);
        });

        td8.appendChild(delBtn); // put button inside td

        // 4. uppend in row and then append row in table body 
        row.append(td1, td2, td3, td4, td5, td6, td7, td8);
        document.querySelector("tbody").append(row);

    })
}

function download() {
    let csv = "Name,Doctor ID,Specialization,Experience in years,Email address,Mobile Number,Role\n";

    recordArr.forEach((ele) => {
        csv += `${ele.doctorName},${ele.doctorId},${ele.specialization},${ele.experience},${ele.email},${ele.mobile},${ele.role}\n`;
    });
    // Create a blob and download
    let blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    let link = document.createElement("a");
    link.setAttribute("href", URL.createObjectURL(blob));
    link.setAttribute("download", "doctorsList.csv");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
