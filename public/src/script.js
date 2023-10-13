"use strict";
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
var DisplayedIncidentsList = [];
var mainSection = document.getElementById("Main");
var listSection = document.getElementById("List");
function fetchData() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, IncidentsList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("FetchData");
                    return [4 /*yield*/, fetch("/incidents")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    IncidentsList = data.incidents;
                    console.log(IncidentsList);
                    // Display the incidents data on the page
                    IncidentsList.forEach(function (incident) {
                        if (DisplayedIncidentsList.includes(incident._id)) {
                            return;
                        }
                        else {
                            DisplayedIncidentsList.push(incident._id);
                        }
                        var incidentDiv = document.createElement("div");
                        incidentDiv.setAttribute("id", "Incident_".concat(incident._id));
                        incidentDiv.innerHTML = "\n        <h3>".concat(incident.name, "</h3>\n        <p>Type: ").concat(incident.type, "</p>\n        <p>Context: ").concat(incident.context, "</p>\n        <p>Created At: ").concat(new Date(incident.CreatedAt).toLocaleString(), "</p>\n        <p>Deadline: ").concat(new Date(incident.Deadline).toLocaleString(), "</p>\n        <p>PIC: ").concat(incident.PIC, "</p>\n        <p id=\"Status_").concat(incident._id, "\">Status: ").concat(incident.status, "</p>\n        <button class=\"deleteBtn\" id=\"").concat(incident._id, "\" onclick=\"deleteIncident(id)\">Delete</button>\n        <div class=\"dropdown\">\n          <button class=\"dropbtn\" id=\"").concat(incident._id, "\">Change Status</button>\n          <div class=\"dropdown-content\">\n            <button class=\"updateBtn\" id=\"").concat(incident._id, ",New\" onclick=\"updateIncident(id)\">New</button>\n            <button class=\"updateBtn\" id=\"").concat(incident._id, ",Completed\" onclick=\"updateIncident(id)\">Completed</button>\n            <button class=\"updateBtn\" id=\"").concat(incident._id, ",In Progress\" onclick=\"updateIncident(id)\">In progress</button>\n          </div>\n        </div>\n      ");
                        listSection.appendChild(incidentDiv);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
// Add this function to your fetchData.js file
function submitForm() {
    return __awaiter(this, void 0, void 0, function () {
        var name, type, context, Deadline, PIC, errorMessage, incidentData, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = document.getElementById("name")
                        .value;
                    type = document.getElementById("type")
                        .value;
                    context = document.getElementById("context")
                        .value;
                    Deadline = (document.getElementById("deadline")).value;
                    PIC = document.getElementById("pic").value;
                    if (!name || !type || !Deadline || !PIC) {
                        errorMessage = document.getElementById("error-message");
                        errorMessage.textContent = "Please fill out all required fields";
                        errorMessage.style.color = "red";
                        return [2 /*return*/];
                    }
                    incidentData = {
                        name: name,
                        type: type,
                        context: context,
                        Deadline: Deadline,
                        PIC: PIC,
                    };
                    return [4 /*yield*/, fetch("/createIncident", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(incidentData),
                        })];
                case 1:
                    response = _a.sent();
                    if (response.status === 200) {
                        alert("Incident created successfully");
                    }
                    else {
                        alert("Error creating incident");
                    }
                    fetchData();
                    return [2 /*return*/];
            }
        });
    });
}
function deleteIncident(id) {
    return __awaiter(this, void 0, void 0, function () {
        var incidentId, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    incidentId = id;
                    return [4 /*yield*/, fetch("/deleteIncident/".concat(incidentId), {
                            method: "DELETE",
                        })];
                case 1:
                    response = _a.sent();
                    if (response.status === 200) {
                        alert("Incident deleted successfully");
                    }
                    else {
                        alert("Error deleting incident");
                    }
                    removeDivElementById("Incident_" + id);
                    return [2 /*return*/];
            }
        });
    });
}
function updateIncident(id) {
    return __awaiter(this, void 0, void 0, function () {
        var tempArr, incidentId, tgtStatus, response, DisplayedStatus;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tempArr = id.split(",");
                    incidentId = tempArr[0];
                    tgtStatus = tempArr[1];
                    return [4 /*yield*/, fetch("/updateIncident/".concat(incidentId), {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ newStatus: tgtStatus }),
                        })];
                case 1:
                    response = _a.sent();
                    if (response.status === 200) {
                        alert("Incident updated successfully");
                    }
                    else {
                        //alert('Error updating incident');
                    }
                    DisplayedStatus = document.getElementById("Status_".concat(incidentId));
                    DisplayedStatus.textContent = 'Status: ' + tgtStatus;
                    return [2 /*return*/];
            }
        });
    });
}
function refresh() {
    listSection.innerHTML = "";
    DisplayedIncidentsList = [];
    fetchData();
}
function removeDivElementById(id) {
    // Find the div element with the provided id
    var divElement = document.getElementById(id);
    // Check if the element exists
    if (divElement) {
        // Get the parent node of the div element
        var parentElement = divElement.parentNode;
        // Remove the div element from the parent node
        if (parentElement) {
            parentElement.removeChild(divElement);
        }
    }
}
document.addEventListener("DOMContentLoaded", fetchData);
