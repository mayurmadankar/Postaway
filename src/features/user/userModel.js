export default class userModel {
  constructor(id, userName, userEmail, userPassword) {
    (this.id = id),
      (this.userName = userName),
      (this.userEmail = userEmail),
      (this.userPassword = userPassword);
  }
  //function to register
  signupUser(userName, userEmail, userPassword) {
    const existingUser = users.find(
      (user) =>
        user.userEmail === userEmail && user.userPassword === userPassword
    );
    if (existingUser) {
      return null; //
    }
    const newUser = new userModel(
      users.length + 1,
      userName,
      userEmail,
      userPassword
    );
    users.push(newUser);
    return newUser;
  }
  // Function to log in a user
  signinUser(userEmail, userPassword) {
    const user = users.find(
      (user) =>
        user.userEmail === userEmail && user.userPassword === userPassword
    );
    return user ? user : null; // Return user if found, otherwise return null
  }
  getAllUsers() {
    return users;
  }
}
let users = [
  {
    id: 1,
    userName: "Mafia",
    userEmail: "mafiaop312@gmail.com",
    userPassword: "Password1"
  },
  {
    id: 2,
    userName: "king",
    userEmail: "kingkhan@gmail.com",
    userPassword: "Password2"
  }
];
