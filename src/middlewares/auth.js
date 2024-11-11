const adminAuth = (req, res, next) => {
    console.log("Admin authorization is being checked");

    const token = "xyz";
    const isAdminAuthorized = token === "xyz";

    if (!isAdminAuthorized) {
        res.status(401).send("The admin doesn't have proper access");
    } else {
        next();
    }
};

const userAuth = (req, res, next) => {
    console.log("User authorization is being checked");

    const token = "xyzbff";
    const isAdminAuthorized = token === "xyz";

    if (!isAdminAuthorized) {
        res.status(401).send("The user doesn't have proper access");
    } else {
        next();
    }
};

module.exports = { adminAuth, userAuth };