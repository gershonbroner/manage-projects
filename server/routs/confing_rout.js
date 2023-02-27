const usersR = require('./users');
const projectsR =require('./projects');
exports.routesInit = (app) =>{
    app.use("/users",usersR);
    app.use("/projects",projectsR);
}
