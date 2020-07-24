"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var app = express_1["default"]();
var PORT = process.env.PORT || 5000;
// handler.use(express.static(path.resolve(__dirname, "../../build")));
// handler.get("/", function (req, res) {
//   res.sendFile(path.resolve(__dirname, "../../build", "index.html"));
// });
app.use(express_1["default"].static('./build'));
app.use('*', function (req, res) {
    res.sendFile('./build/index.html');
});
app.listen(PORT, function () { return console.log("hosting @" + PORT); });
