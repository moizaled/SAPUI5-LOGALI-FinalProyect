// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel',
    "sap/m/MessageToast",
    "sap/m/MessageBox"
],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageToast, MessageBox) {

        "use strict";

        function _onObjectMatched(oEvent) {

        }

        return Controller.extend("logaligroup11.Employees1.controller.createEmployee", {


            onInit: function () {

                //                var finalProjectModel1 = this.getView().getModel("finalProjectModel");

                this._wizard = this.byId("CreateEmployeeWizard");
                this._oNavContainer = this.byId("wizardNavContainer");
                this._oWizardContentPage = this.byId("wizardContentPage");

                this._wizard = this.byId("CreateEmployeeWizard");

                var model = new JSONModel();

                model.setData({

                    FirstNameState: "Error",
                    LastNameState: "Error",
                    EmployeeDNI: "Error",
                    EmployeeCIF: "Error",
                    visibilityenl: false, // Name Label
                    visibilityeni: false, // Name Input
                    visibilityelnl: false, // Last Name Label
                    visibilityelni: false, // Last Name Input
                    visibilityednil: false, // DNI Label
                    visibilityednii: false, // DNI Input
                    visibilityecifl: false, // CIF Label
                    visibilityecifi: false, // CFI Input
                    visibilityesgl: false,  // Gross Salary Label
                    visibilityesgi: false,  // Gross Salary Input
                    EmployeeSalary: 15000,  // Gross Salary By Default
                    EmployeeMinSalary: 12000, // Gross Salary Minimum
                    EmployeeMaxSalary: 24000, // Gross Salary Maximum
                    stepEmployee: 1000,      // Step By default
                    visibilityeedsl: false,    // Daily Salary Label
                    visibilityeedsi: false,    // Daily Salary Input
                    EmployeeDailySalary: 400,  // Default Value for the box
                    incorporateDateState: "Error",

                });

                this.getView().setModel(model, "finalProjectModel1");
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                //               oRouter.getRoute("RoutecreateEmployee").attachPatternMatched(_onObjectMatched, this);

                //  this.model = new JSONModel();

            },

            dataInfoValidation: function (oEvent) {

                this.getView().getModel("finalProjectModel1").refresh();

                var lv_error = " "; // For instance is not valid!
                var lv_date_validity = " "; // Date Validity

                var type_employee = this.getView().getModel("finalProjectModel1").getProperty("/Type");                       // Type of Employee
                var name_employee = this.getView().getModel("finalProjectModel1").getProperty("/FirstName");                  // First Name of the Employee
                var lastname_employee = this.getView().getModel("finalProjectModel1").getProperty("/LastName");               // Last Name of the employee
                var dni_employee = this.getView().getModel("finalProjectModel1").getProperty("/dni");                         // DNI of the Employee
                var cfi_employee = this.getView().getModel("finalProjectModel1").getProperty("/cif");                         // CIF of the Employee
                var Salary_employee = this.getView().getModel("finalProjectModel1").getProperty("/EmployeeSalary");           // Employee Salary
                var DailySalary_employee = this.getView().getModel("finalProjectModel1").getProperty("/EmployeeDailySalary"); // Employee Daily Salary

                var incorporateDate_employee = this.getView().getModel("finalProjectModel1").getProperty("/incorporateDate"); // Incorporate Date

                var incorporateDate_state = this.getView().getModel("finalProjectModel1").getProperty("/incorporateDateState"); // Incorporate Date

                // Generic validations independent of type of employee...This is for Name, Last Name and Incorporate Date....

                if (name_employee === "" || name_employee === undefined) {

                    lv_error = "X";
                    this.getView().getModel("finalProjectModel1").setProperty("/FirstNameState", "Error");

                } else {
                    this.getView().getModel("finalProjectModel1").setProperty("/FirstNameState", "None");
                }

                if (lastname_employee === "" || lastname_employee === undefined) {

                    lv_error = "X";
                    this.getView().getModel("finalProjectModel1").setProperty("/LastNameState", "Error");


                } else {

                    this.getView().getModel("finalProjectModel1").setProperty("/LastNameState", "None");

                }

                //datePicker
                //__picker0

                if (oEvent.getSource().getId().includes("picker") ) {
                    if ((!oEvent.getSource().isValidValue() && oEvent.getSource().getValue() != "") || (oEvent.getSource().isValidValue() && oEvent.getSource().getValue() === "")) {
                        //                    lv_error = "X";
                        this.getView().getModel("finalProjectModel1").setProperty("/incorporateDateState", "Error");
                    } else {
                        lv_date_validity = "X";
                        this.getView().getModel("finalProjectModel1").setProperty("/incorporateDateState", "None");
                    }
                } else if (incorporateDate_state === "None") {

                    lv_date_validity = "X";

                }

                // Validations per type of employee...

                if (type_employee === "0") {

                    //    if () {

                    //     }
                    //     var dni = oEvent.getParameter("value");

                    var number;
                    var letter;
                    var letterList;
                    var regularExp = /^\d{8}[a-zA-Z]$/;
                    //Se comprueba que el formato es válido
                    if (regularExp.test(dni_employee) === true) {
                        //Número
                        number = dni_employee.substr(0, dni_employee.length - 1);
                        //Letra
                        letter = dni_employee.substr(dni_employee.length - 1, 1);
                        number = number % 23;
                        letterList = "TRWAGMYFPDXBNJZSQVHLCKET";
                        letterList = letterList.substring(number, number + 1);
                        if (letterList !== letter.toUpperCase()) {

                            lv_error = "X";
                            this.getView().getModel("finalProjectModel1").setProperty("/EmployeeDNI", "Error");
                            //Error
                        } else {
                            //Correcto
                            this.getView().getModel("finalProjectModel1").setProperty("/EmployeeDNI", "None");
                        }
                    } else {

                        lv_error = "X";
                        this.getView().getModel("finalProjectModel1").setProperty("/EmployeeDNI", "Error");
                        //Error
                    }



                } else if (type_employee === "1") {


                    if (cfi_employee === "" || cfi_employee === undefined) {
                        lv_error = "X";
                        this.getView().getModel("finalProjectModel1").setProperty("/EmployeeCIF", "Error");

                    } else {
                        this.getView().getModel("finalProjectModel1").setProperty("/EmployeeCIF", "None");
                    }


                } else if (type_employee === "2") {


                    var number;
                    var letter;
                    var letterList;
                    var regularExp = /^\d{8}[a-zA-Z]$/;
                    //Se comprueba que el formato es válido
                    if (regularExp.test(dni_employee) === true) {
                        //Número
                        number = dni_employee.substr(0, dni_employee.length - 1);
                        //Letra
                        letter = dni_employee.substr(dni_employee.length - 1, 1);
                        number = number % 23;
                        letterList = "TRWAGMYFPDXBNJZSQVHLCKET";
                        letterList = letterList.substring(number, number + 1);
                        if (letterList !== letter.toUpperCase()) {

                            lv_error = "X";
                            this.getView().getModel("finalProjectModel1").setProperty("/EmployeeDNI", "Error");
                            //Error
                        } else {
                            //Correcto
                            this.getView().getModel("finalProjectModel1").setProperty("/EmployeeDNI", "None");
                        }
                    } else {

                        lv_error = "X";
                        this.getView().getModel("finalProjectModel1").setProperty("/EmployeeDNI", "Error");
                        //Error
                    }

                }

                if (lv_error !== "X" && lv_date_validity === "X") {
                    this._wizard.validateStep(this.byId("EmployeeDataStep"));
                } else {
                    this._wizard.invalidateStep(this.byId("EmployeeDataStep"));
                }

            },


            onbtnInter: function (oEvent) {

                this.getView().getModel("finalProjectModel1").setProperty("/Type", "0");

                this.getView().getModel("finalProjectModel1").setProperty("/visibilityenl", true);
                this.getView().getModel("finalProjectModel1").setProperty("/visibilityeni", true);
                this.getView().getModel("finalProjectModel1").setProperty("/visibilityelnl", true);
                this.getView().getModel("finalProjectModel1").setProperty("/visibilityelni", true);
                this.getView().getModel("finalProjectModel1").setProperty("/visibilityednil", true);
                this.getView().getModel("finalProjectModel1").setProperty("/visibilityednii", true);
                this.getView().getModel("finalProjectModel1").setProperty("/visibilityecifl", false);
                this.getView().getModel("finalProjectModel1").setProperty("/visibilityecifi", false);
                this.getView().getModel("finalProjectModel1").setProperty("/visibilityesgl", true);
                this.getView().getModel("finalProjectModel1").setProperty("/visibilityesgi", true);
                this.getView().getModel("finalProjectModel1").setProperty("/EmployeeMinSalary", 12000);
                this.getView().getModel("finalProjectModel1").setProperty("/EmployeeMaxSalary", 80000);
                this.getView().getModel("finalProjectModel1").setProperty("/EmployeeSalary", 24000);

                this.getView().getModel("finalProjectModel1").setProperty("/stepEmployee", 1000);
                //stepEmployee
                this.getView().getModel("finalProjectModel1").setProperty("/visibilityeedsl", false);
                this.getView().getModel("finalProjectModel1").setProperty("/visibilityeedsi", false);

                this.getView().getModel("finalProjectModel1").setProperty("/cif", "");
                this.getView().getModel("finalProjectModel1").setProperty("/EmployeeCIF", "Error");


                //               this.getView().getModel("finalProjectModel1").refresh();

                if (this._wizard.getCurrentStep().includes("EmployeeTypeStep")) {
                    this._wizard.nextStep();
                }

            },

            onbtnSelf: function (oEvent) {

                this.getView().getModel("finalProjectModel1").setProperty("/Type", "1");

                this.getView().getModel("finalProjectModel1").setProperty("/visibilityenl", true);
                this.getView().getModel("finalProjectModel1").setProperty("/visibilityeni", true);
                this.getView().getModel("finalProjectModel1").setProperty("/visibilityelnl", true);
                this.getView().getModel("finalProjectModel1").setProperty("/visibilityelni", true);
                this.getView().getModel("finalProjectModel1").setProperty("/visibilityednil", false);
                this.getView().getModel("finalProjectModel1").setProperty("/visibilityednii", false);
                this.getView().getModel("finalProjectModel1").setProperty("/visibilityecifl", true);
                this.getView().getModel("finalProjectModel1").setProperty("/visibilityecifi", true);
                this.getView().getModel("finalProjectModel1").setProperty("/visibilityesgl", false);
                this.getView().getModel("finalProjectModel1").setProperty("/visibilityesgi", false);
                //        this.getView().getModel("finalProjectModel1").setProperty("/EmployeeSalary", 24000);
                //        this.getView().getModel("finalProjectModel1").setProperty("/EmployeeMinSalary", 12000);
                //        this.getView().getModel("finalProjectModel1").setProperty("/EmployeeMaxSalary", 80000);
                this.getView().getModel("finalProjectModel1").setProperty("/visibilityeedsl", true);
                this.getView().getModel("finalProjectModel1").setProperty("/visibilityeedsi", true);

                this.getView().getModel("finalProjectModel1").setProperty("/dni", "");
                this.getView().getModel("finalProjectModel1").setProperty("/EmployeeDNI", "Error");


                //               this.getView().getModel("finalProjectModel1").refresh();

                if (this._wizard.getCurrentStep().includes("EmployeeTypeStep")) {
                    this._wizard.nextStep();
                }
                //                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                //               oRouter.navTo("RoutecreateEmployee");

            },

            onbtnManage: function (oEvent) {

                this.getView().getModel("finalProjectModel1").setProperty("/Type", "2");

                this.getView().getModel("finalProjectModel1").setProperty("/visibilityenl", true);
                this.getView().getModel("finalProjectModel1").setProperty("/visibilityeni", true);
                this.getView().getModel("finalProjectModel1").setProperty("/visibilityelnl", true);
                this.getView().getModel("finalProjectModel1").setProperty("/visibilityelni", true);
                this.getView().getModel("finalProjectModel1").setProperty("/visibilityednil", true);
                this.getView().getModel("finalProjectModel1").setProperty("/visibilityednii", true);
                this.getView().getModel("finalProjectModel1").setProperty("/visibilityecifl", false);
                this.getView().getModel("finalProjectModel1").setProperty("/visibilityecifi", false);
                this.getView().getModel("finalProjectModel1").setProperty("/visibilityesgl", true);
                this.getView().getModel("finalProjectModel1").setProperty("/visibilityesgi", true);
                this.getView().getModel("finalProjectModel1").setProperty("/EmployeeMinSalary", 50000);
                this.getView().getModel("finalProjectModel1").setProperty("/EmployeeMaxSalary", 200000);
                this.getView().getModel("finalProjectModel1").setProperty("/EmployeeSalary", 70000);

                //             this.getView().getModel("finalProjectModel1").setProperty("/stepEmployee", 10000);
                this.getView().getModel("finalProjectModel1").setProperty("/visibilityeedsl", false);
                this.getView().getModel("finalProjectModel1").setProperty("/visibilityeedsi", false);

                this.getView().getModel("finalProjectModel1").setProperty("/cif", "");
                this.getView().getModel("finalProjectModel1").setProperty("/EmployeeCIF", "Error");

                //               this.getView().getModel("finalProjectModel1").refresh();

                if (this._wizard.getCurrentStep().includes("EmployeeTypeStep")) {
                    this._wizard.nextStep();
                }

            },

            wizardCompletedHandler: function () {

                var lv_files = "";
                var oUploadCollection = this.byId("uploadCollection");

                for (var i = 0; i < oUploadCollection.getItems().length; i++) {
                    lv_files = lv_files + " " + oUploadCollection.getItems()[i].getFileName();
                }

                this.getView().getModel("finalProjectModel1").setProperty("/Files", lv_files);

                this._oNavContainer.to(this.byId("wizardReviewPage"));

            },

            editStepOne: function () {
                this._handleNavigationToStep(0);
            },

            editStepTwo: function () {
                this._handleNavigationToStep(1);
            },

            editStepThree: function () {
                this._handleNavigationToStep(2);
            },

            backToWizardContent: function () {
                this._oNavContainer.backToPage(this._oWizardContentPage.getId());
            },

            _handleNavigationToStep: function (iStepNumber) {

                //                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                //                oRouter.navTo("RoutecreateEmployee");

                var fnAfterNavigate = function () {

                    this._wizard.goToStep(this._wizard.getSteps()[iStepNumber]);
                    this._oNavContainer.detachAfterNavigate(fnAfterNavigate);


                    //                   var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    //                   oRouter.navTo("RoutecreateEmployee");

                }.bind(this);

                this._oNavContainer.attachAfterNavigate(fnAfterNavigate);

                //                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                //                oRouter.navTo("RoutecreateEmployee");
                this.backToWizardContent();


            },

            discardProgress: function () {
                /*
                                //               this._wizard.discardProgress(this.byId("EmployeeTypeStep"));
                
                                var clearContent = function (content) {
                                    for (var i = 0; i < content.length; i++) {
                                        if (content[i].setValue) {
                                            content[i].setValue("");
                                        }
                
                                        if (content[i].getContent) {
                                            clearContent(content[i].getContent());
                                        }
                                    }
                                };
                
                                this.getView().getModel("finalProjectModel1").setProperty("/FirstNameState", "Error");
                                this.getView().getModel("finalProjectModel1").setProperty("/LastNameState", "Error");
                                this.getView().getModel("finalProjectModel1").setProperty("/EmployeeDNI", "Error");
                                this.getView().getModel("finalProjectModel1").setProperty("/EmployeeCIF", "Error");
                                this.getView().getModel("finalProjectModel1").setProperty("/incorporateDateState", "Error");
                
                                this._wizard.invalidateStep(this.byId("EmployeeTypeStep"));
                
                                //               clearContent(this._wizard.getSteps());
                
                                */

            },


            _handleMessageBoxOpen: function (sMessage, sMessageBoxType, save) {

                MessageBox[sMessageBoxType](sMessage, {

                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],

                    onClose: function (oAction) {

                        if (oAction === MessageBox.Action.YES) {

                            if (save === "") {

                                var oUploadCollection = this.byId("uploadCollection");

                                this.getView().getModel("finalProjectModel1").setProperty("/FirstNameState", "Error");
                                this.getView().getModel("finalProjectModel1").setProperty("/FirstName", "");
                                this.getView().getModel("finalProjectModel1").setProperty("/LastNameState", "Error");
                                this.getView().getModel("finalProjectModel1").setProperty("/LastName", "");
                                this.getView().getModel("finalProjectModel1").setProperty("/EmployeeDNI", "Error");
                                this.getView().getModel("finalProjectModel1").setProperty("/dni", "");
                                this.getView().getModel("finalProjectModel1").setProperty("/EmployeeCIF", "Error");
                                this.getView().getModel("finalProjectModel1").setProperty("/cif", "");
                                this.getView().getModel("finalProjectModel1").setProperty("/incorporateDateState", "Error");
                                this.getView().getModel("finalProjectModel1").setProperty("/incorporateDate", null);
                                this.getView().getModel("finalProjectModel1").setProperty("/Comments", "");

                                oUploadCollection.removeAllItems();

                                this._wizard.discardProgress(this.byId("EmployeeTypeStep"));
                                this._wizard.discardProgress(this.byId("EmployeeDataStep"));
                                //                            this._wizard.discardProgress(this.byId("EmployeeOptionalInfoStep"));

                                this._wizard.invalidateStep(this.byId("EmployeeTypeStep"));

                                //                            this._wizard.invalidateStep(this.byId("EmployeeDataStep"));

                                //      FirstName

                                this._handleNavigationToStep(0);

                                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                                oRouter.navTo("RouteMain", true);

                            } else {

                                var key = "";
                                var lv_salary;
                                var dni1 = this.getView().getModel("finalProjectModel1").getProperty("/dni");
                                var cf1 = this.getView().getModel("finalProjectModel1").getProperty("/cif");

                                var lv_Type = this.getView().getModel("finalProjectModel1").getProperty("/Type");
                                var lv_FirstName = this.getView().getModel("finalProjectModel1").getProperty("/FirstName");
                                var lv_LastName = this.getView().getModel("finalProjectModel1").getProperty("/LastName");

                                if (lv_Type == "0" || lv_Type == "2") {
                                    key = "dni";
                                    lv_salary = this.getView().getModel("finalProjectModel1").getProperty("/EmployeeSalary");
                                } else {
                                    key = "cif";
                                    lv_salary = this.getView().getModel("finalProjectModel1").getProperty("/EmployeeDailySalary");
                                }

                                var lv_Dni = this.getView().getModel("finalProjectModel1").getProperty("/" + key);
                                //      var lv_Dni = this.getView().getModel("finalProjectModel1").getProperty("/dni");
                                var lv_CreationDate = this.getView().getModel("finalProjectModel1").getProperty("/incorporateDate");

                                var lv_Comments = this.getView().getModel("finalProjectModel1").getProperty("/Comments");


                                var body = {

                                    SapId: this.getOwnerComponent().SapId,
                                    Type: lv_Type,
                                    FirstName: lv_FirstName,
                                    LastName: lv_LastName,
                                    Dni: lv_Dni,
                                    CreationDate: lv_CreationDate,
                                    Comments: lv_Comments,
                                    UserToSalary: [{
                                        Ammount: parseFloat(lv_salary).toString(),
                                        Comments: lv_Comments,
                                        Waers: "EUR"
                                    }]

                                }

                                this.getView().getModel("finalProjectModel").create("/Users", body, {

                                    success: function (data) {

                                        var lv_id = data.EmployeeId;

                                        this._idemployee = data.EmployeeId;

                                        var oUploadCollection = this.byId("uploadCollection");

                                        var text1 = this.getView().getModel("i18n").getResourceBundle().getText("MssgSaveEmployee");

                                        sap.m.MessageToast.show(text1);

                                        this.getView().getModel("finalProjectModel1").setProperty("/FirstNameState", "Error");
                                        this.getView().getModel("finalProjectModel1").setProperty("/FirstName", "");
                                        this.getView().getModel("finalProjectModel1").setProperty("/LastNameState", "Error");
                                        this.getView().getModel("finalProjectModel1").setProperty("/LastName", "");
                                        this.getView().getModel("finalProjectModel1").setProperty("/EmployeeDNI", "Error");
                                        this.getView().getModel("finalProjectModel1").setProperty("/dni", "");
                                        this.getView().getModel("finalProjectModel1").setProperty("/EmployeeCIF", "Error");
                                        this.getView().getModel("finalProjectModel1").setProperty("/cif", "");
                                        this.getView().getModel("finalProjectModel1").setProperty("/incorporateDateState", "Error");
                                        this.getView().getModel("finalProjectModel1").setProperty("/incorporateDate", null);
                                        this.getView().getModel("finalProjectModel1").setProperty("/Comments", "");
                                        /*
                                                                                var oCustomerHeaderToken = new UploadCollectionParameter({
                                                                                    name: "x-csrf-token",
                                                                                    value: this.getView().getModel("finalProjectModel").getSecurityToken()
                                                                                });
                                        
                                                                                oUploadCollection.addHeaderParameter(oCustomerHeaderToken);
                                        
                                                                                */

                                        oUploadCollection.upload();

                                        oUploadCollection.removeAllItems();

                                        this._wizard.discardProgress(this.byId("EmployeeTypeStep"));
                                        this._wizard.discardProgress(this.byId("EmployeeDataStep"));
                                        //                            this._wizard.discardProgress(this.byId("EmployeeOptionalInfoStep"));

                                        this._wizard.invalidateStep(this.byId("EmployeeTypeStep"));

                                        //                            this._wizard.invalidateStep(this.byId("EmployeeDataStep"));

                                        //      FirstName
                                        this._handleNavigationToStep(0);

                                        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

                                        oRouter.navTo("RouteMain", true);

                                    }.bind(this),

                                    error: function (e) {

                                        sap.m.MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("saveEmployeeError"));

                                    }.bind(this)

                                });

                            }

                            //                            this._wizard.discardProgress(this._wizard.getSteps()[0]);
                        }
                    }.bind(this)
                });
            },

            handleWizardCancel: function () {

                var text = this.getView().getModel("i18n").getResourceBundle().getText("CancelEmployee");
                this._handleMessageBoxOpen(text, "warning", "");
            },

            handleWizardSubmit: function () {

                var text = this.getView().getModel("i18n").getResourceBundle().getText("CreateEmployeeQuestion");
                this._handleMessageBoxOpen(text, "confirm", "X");
            },

            onFileBeforeUpload: function (oEvent) {

                let filename = oEvent.getParameter("fileName");
                //                let objContext = oEvent.getSource().getBindingContext("odataNorthwind").getObject();
                let oCustomerHeaderSlug = new sap.m.UploadCollectionParameter({

                    name: "slug",
                    value: this.getOwnerComponent().SapId + ";" + this._idemployee + ";" + filename
                });

                oEvent.getParameters().addHeaderParameter(oCustomerHeaderSlug);

                //               let oUploadCollection = oEvent.getSource();

                // Header Toker CSRF - Cross-Site RequestForgery

                //       objContext.OrderID + ";" + objContext.EmployeeID + ";" this.getOwnerComponent().SapId + ";" + filename;

            },

            onFileChange: function (oEvent) {

                let oUploadCollection = oEvent.getSource();

                // Header Toker CSRF - Cross-Site RequestForgery
                let oCustomerHeaderToken = new sap.m.UploadCollectionParameter({

                    name: "x-csrf-token",
                    value: this.getView().getModel("finalProjectModel").getSecurityToken()
                });

                oUploadCollection.addHeaderParameter(oCustomerHeaderToken);

            }

        });
    });