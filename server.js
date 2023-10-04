"use strict";
//------------------------ Defining MongoDb Connection
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var url = "mongodb+srv://szhoubf:Zh20000815@cluster0.sh1tefq.mongodb.net/?retryWrites=true&w=majority";
var connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose_1.default.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, }).then(function () { console.log('Connected to the database '); }).catch(function (err) { console.error("Error connecting to the database. n".concat(err)); });
//-------------------------
var model_1 = __importDefault(require("./public/src/model"));
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var PORT = 3000;
//---------------For input new incident--------------------
var body_parser_1 = __importDefault(require("body-parser"));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
//---------------------------------------------------------
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/incidents', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var incidents;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, model_1.default.find()];
                case 1:
                    incidents = _a.sent();
                    res.send({ incidents: incidents });
                    return [2 /*return*/];
            }
        });
    });
});
app.post('/createIncident', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var incidentData, newIncident;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    incidentData = req.body;
                    newIncident = new model_1.default(incidentData);
                    return [4 /*yield*/, newIncident.save()];
                case 1:
                    _a.sent();
                    res.sendStatus(200);
                    return [2 /*return*/];
            }
        });
    });
});
app.delete('/deleteIncident/:id', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var incidentId, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('delete operation called');
                    incidentId = req.params.id;
                    console.log(incidentId);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, model_1.default.findByIdAndDelete(incidentId)];
                case 2:
                    _a.sent();
                    res.sendStatus(200);
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.error("Error deleting incident. ".concat(err_1));
                    res.sendStatus(500);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
});
app.put('/updateIncident/:id', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var incidentId, newStatus, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('update operation called');
                    incidentId = req.params.id;
                    newStatus = req.body.newStatus;
                    console.log(incidentId);
                    console.log(newStatus);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, model_1.default.findByIdAndUpdate(incidentId, { status: newStatus })];
                case 2:
                    _a.sent();
                    res.sendStatus(200);
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    //console.error(`Error updating incident. ${err}`);
                    res.sendStatus(500);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
});
app.listen(PORT, function () {
    console.log('server started');
    console.log("Listening to Port ".concat(PORT));
});
