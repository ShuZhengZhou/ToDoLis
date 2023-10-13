"use strict";
//------------------------ Defining MongoDb Connection
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
//import uri from "./uri";
//const url = ``;
var uri = "mongodb+srv://szhoubf:Zh20000815@cluster0.sh1tefq.mongodb.net/?retryWrites=true&w=majority";
mongoose_1.default
    .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(function () {
    console.log("Connected to the database ");
})
    .catch(function (err) {
    console.error("Error connecting to the database. n".concat(err));
});
//-------------------------
//import Incident from './public/src/model';
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var PORT = 3000;
//---------------For input new incident--------------------
var body_parser_1 = __importDefault(require("body-parser"));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
//---------------------------------------------------------
var incidents_1 = __importDefault(require("./public/src/routes/incidents"));
app.use(express_1.default.static("public"));
app.use(express_1.default.json());
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.use("/", incidents_1.default);
app.listen(PORT, function () {
    console.log("server started");
    console.log("Listening to Port ".concat(PORT));
});
