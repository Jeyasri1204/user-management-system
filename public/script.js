const API_URL = "/users";

let allUsers = [];

async function loadUsers(){

    const response = await fetch(API_URL);

    const users = await response.json();

    allUsers = users;

    displayUsers(users);
}

function displayUsers(users){

    const userList =
    document.getElementById("userList");

    userList.innerHTML = "";

    document.getElementById("totalUsers")
    .innerText =
    `👥 Total Users: ${users.length}`;

    users.forEach(user => {

        const firstLetter =
        user.name.charAt(0).toUpperCase();

        userList.innerHTML += `

        <div class="user-card">

            <div class="user-left">

                <div class="avatar">
                    ${firstLetter}
                </div>

                <div class="user-info">

                    <h3>${user.name}</h3>

                    <p>${user.email}</p>

                </div>

            </div>

            <div class="actions">

                <button
                class="edit-btn"
                onclick="editUser(
                '${user._id}',
                '${user.name}',
                '${user.email}'
                )">

                Edit

                </button>

                <button
                class="delete-btn"
                onclick="deleteUser('${user._id}')">

                Delete

                </button>

            </div>

        </div>

        `;
    });
}

async function saveUser(){

    const id =
    document.getElementById("userId").value;

    const name =
    document.getElementById("name").value;

    const email =
    document.getElementById("email").value;

    if(!name || !email){

        alert("Please enter Name and Email");
        return;
    }

    if(id){

        await fetch(`/users/${id}`,{

            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                name,
                email
            })

        });

        alert("✅ User Updated");

    }else{

        await fetch(API_URL,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                name,
                email
            })

        });

        alert("✅ User Added");
    }

    clearForm();

    loadUsers();
}

function editUser(id,name,email){

    document.getElementById("userId").value=id;

    document.getElementById("name").value=name;

    document.getElementById("email").value=email;
}

async function deleteUser(id){

    const ok =
    confirm("Are you sure you want to delete?");

    if(!ok) return;

    await fetch(`/users/${id}`,{
        method:"DELETE"
    });

    loadUsers();
}

function searchUser(){

    const text =
    document.getElementById("search")
    .value
    .toLowerCase();

    const filtered =
    allUsers.filter(user =>
        user.name
        .toLowerCase()
        .includes(text)
    );

    displayUsers(filtered);
}

function clearForm(){

    document.getElementById("userId").value="";
    document.getElementById("name").value="";
    document.getElementById("email").value="";
}

loadUsers();