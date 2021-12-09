const User = require('./user')



// must contain at least one digit
// must contain at least one lowercase character
// must contain at least one uppercase character
// must contain at least one special character
// must contain at least 8 of the mentioned characters

let user = new User('brenoelfwow@gmail.com', 'B@by123baby!', 'root');
user.registerUser();

