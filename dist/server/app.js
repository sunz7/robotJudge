"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const compression = require("compression");
const express = require("express");
const path = require("path");
const feed_1 = require("./routes/feed");
const login_1 = require("./routes/login");
const protected_1 = require("./routes/protected");
const public_1 = require("./routes/public");
const user_1 = require("./routes/user");
const app = express();
exports.app = app;
app.disable("x-powered-by");
app.use(body_parser_1.json());
app.use(compression());
app.use(body_parser_1.urlencoded({ extended: true }));
// api routes
app.use("/api/secure", protected_1.protectedRouter);
app.use("/api/login", login_1.loginRouter);
app.use("/api/public", public_1.publicRouter);
app.use("/api/feed", feed_1.feedRouter);
app.use("/api/user", user_1.userRouter);
if (app.get("env") === "production") {
    // in production mode run application from dist folder
    app.use(express.static(path.join(__dirname, "/../client")));
}
// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error("Not Found");
    next(err);
});
// production error handler
// no stacktrace leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {},
        message: err.message,
    });
});
//# sourceMappingURL=/Users/zhisun/workspace/robotJudge/angular2-express-starter/dist/server/app.js.map