users = [];

function addUser(username, password){
    users[username] = password;
}

module.exports = {
    users,
    addUser,
}