// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    'sap/ui/model/json/JSONModel',
    "sap/ui/core/routing/History",
],
    function (Controller, Filter, FilterOperator, ODataModel, MessageToast, MessageBox, JSONModel,History) {

        function _onObjectMatched(oEvent) {

            this.getView().byId("emplist").getBinding("items").refresh();
            var splitApp = this.getView().byId("splitappid");
            splitApp.to(this.getView().byId("detailtitlepageid"));

        }

        return Controller.extend("logaligroup11.Employees1.controller.viewEmployee", {

            onBeforeRendering: function () {

                this.getView().byId("emplist").getBinding("items").refresh();
                var splitApp = this.getView().byId("splitappid");
                splitApp.to(this.getView().byId("detailtitlepageid"));

            },
            onInit: function () {

                this.byId("idTimeline").setCustomGrouping(function (oDate) {
                    return {
                        key: oDate.getFullYear(),
                        title: oDate.getFullYear(),
                        date: oDate
                    };
                });

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("RouteshowEmployee").attachPatternMatched(_onObjectMatched, this);


            },

            onSearch: function (oEvent) {

                // Build Filter

                var aFilter = [];
                var sQuery = oEvent.getParameter("query");

                if (sQuery) {
                    // @ts-ignore
                    aFilter.push(new Filter("FirstName", FilterOperator.Contains, sQuery));
                    //                   aFilter.push(new Filter("Dni", FilterOperator.Contains, sQuery));
                }

                //Filter binding Over the list

                const Olist = this.byId("emplist");
                const oBinding = Olist.getBinding("items");
                // @ts-ignore

                oBinding.filter(aFilter);
                /*
                                aFilter = [];
                
                
                                if (sQuery) {
                                    // @ts-ignore
                                    aFilter.push(new Filter("Dni", FilterOperator.Contains, sQuery));
                                    //                   aFilter.push(new Filter("Dni", FilterOperator.Contains, sQuery));
                                }
                
                                oBinding.filter(aFilter);
                
                                */

            },

            onDetailEmployee: function (oEvent) {

                var oEmployeeid = oEvent.getSource().getBindingContext("finalProjectModel").getObject().EmployeeId;

                var osapid = oEvent.getSource().getBindingContext("finalProjectModel").getObject().SapId;

                //     var Employeeid = oEmployee.EmployeeId;

                var splitApp = this.getView().byId("splitappid");

                var detailpageid = this.getView().byId("detailpageid");

                detailpageid.bindElement({
                    path: "/Users(EmployeeId='" + oEmployeeid + "',SapId='" + osapid + "')",
                    model: "finalProjectModel"
                });

                var oModel = new ODataModel("TimelineOData.Timeline/", true);
                this.getView().byId("uploadCollection").bindAggregation("items", {

                    path: "finalProjectModel>/Users(EmployeeId='" + oEmployeeid + "',SapId='" + osapid + "')" + "/UserToAttachment"
                    ,
                    template: new sap.m.UploadCollectionItem({
                        documentId: "{finalProjectModel>AttId}",
                        visibleEdit: false,
                        fileName: "{finalProjectModel>DocName}"

                    }).attachPress(this.downloadFile)

                });

                splitApp.to(this.getView().byId("detailpageid"));

                //      splitApp.to(this.getView().byId("employeepageid"));

            },

            onFileBeforeUpload: function (oEvent) {

                let filename = oEvent.getParameter("fileName");
                let objContext = oEvent.getSource().getBindingContext("finalProjectModel").getObject();
                let oCustomerHeaderSlug = new sap.m.UploadCollectionParameter({

                    name: "slug",
                    value: objContext.SapId + ";" + objContext.EmployeeId + ";" + filename
                });

                oEvent.getParameters().addHeaderParameter(oCustomerHeaderSlug);

                //       objContext.OrderID + ";" + objContext.EmployeeID + ";" this.getOwnerComponent().SapId + ";" + filename;


            },

            onFileDeleted: function (oEvent) {

                var uploadCollection = oEvent.getSource();
                var sPath = oEvent.getParameter("item").getBindingContext("finalProjectModel").getPath();
                this.getView().getModel("finalProjectModel").remove(sPath, {

                    success: function () {
                        uploadCollection.getBinding("items").refresh();
                    },
                    error: function () {
                    }
                });

            },

            downloadFile: function (oEvent) {

                const sPath = oEvent.getSource().getBindingContext("finalProjectModel").getPath();
                window.open("/sap/opu/odata/sap/ZEMPLOYEES_SRV/" + sPath + "/$value");

            },

            onFileUploadComplete: function (oEvent) {

                oEvent.getSource().getBinding("items").refresh();

            },
            onFileChange: function (oEvent) {

                let oUploadCollection = oEvent.getSource();

                // Header Toker CSRF - Cross-Site RequestForgery
                let oCustomerHeaderToken = new sap.m.UploadCollectionParameter({

                    name: "x-csrf-token",
                    value: this.getView().getModel("finalProjectModel").getSecurityToken()
                });

                oUploadCollection.addHeaderParameter(oCustomerHeaderToken);

            },

            _handleMessageBoxEmployee: function (sMessage, sMessageBoxType, deleteemployee, EmployeeId, SapId) {

                var EmployeeId = EmployeeId;
                var SapId = SapId;
                var viewSearch = this.getView();
                var splitApp = viewSearch.byId("splitappid");

                MessageBox[sMessageBoxType](sMessage, {

                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],

                    onClose: function (oAction) {

                        if (oAction === MessageBox.Action.YES) {

                            if (deleteemployee === "") {



                            } else {

                                //                            var employeeId = this.getView().getBindingContext("finalProjectModel").getObject().EmployeeId;

                                //                            var SapId = this.getView().getBindingContext("finalProjectModel").getObject().SapId;

                                viewSearch.getModel("finalProjectModel").remove("/Users(EmployeeId='" + EmployeeId + "',SapId='" + SapId + "')", {

                                    success: function (data) {

                                        var oResourceBundle = viewSearch.getModel("i18n").getResourceBundle();
                                        var text = oResourceBundle.getText("odataDeleteOK") + "( " + EmployeeId + " )";
                                        sap.m.MessageToast.show(text);
                                        viewSearch.byId("emplist").getBinding("items").refresh();

                                        //                viewSearch.byId("uploadCollection").removeAllItems();
                                        //                viewSearch.byId("idTimeline").removeAllContent();

                                        //              viewSearch.byId("uploadCollection").getBinding("items").refresh();

                                        splitApp.to(viewSearch.byId("detailtitlepageid"));

                                    }.bind(this),

                                    error: function (e) {

                                        sap.m.MessageToast.show(oResourceBundle.getText("odataDeleteOK"));

                                    }.bind(this)

                                });

                            }


                        }

                    }

                });

            },

            downEmployee: function (oEvent) {

                var employee = oEvent.getSource().getBindingContext("finalProjectModel").getObject();
                var text = this.getView().getModel("i18n").getResourceBundle().getText("deleteEmployee");
                this._handleMessageBoxEmployee(text, "confirm", "X", employee.EmployeeId, employee.SapId);

            },


            riseEmployee: function (oEvent) {

                // Get Selected Controller..

                var model = new JSONModel();


                model.setData({

                    SalaryEmployee: 0,
                    SalaryEmployeeStatus: "Error",
                    SalaryDateValue: null,
                    SalaryDateValueStatus: "Error",
                    EmployeeComments: ""

                });

                this.getView().setModel(model, "finalProjectModel1");

                var iconPressed = oEvent.getSource();

                // context from the model..

                var oContext = iconPressed.getBindingContext("finalProjectModel");

                this._EmployeeId = oContext.getObject().EmployeeId;
                this._SapId = oContext.getObject().SapId;
                this._detailView = this.getView();

                if (!this._oDialogEmployees) {

                    this._oDialogEmployees = sap.ui.xmlfragment("logaligroup11.Employees1.fragment.DialogRiseEmployee", this);
                    this.getView().addDependent(this._oDialogEmployees);

                }

                //Dialog Binding to the context to have access to the data selected item

                //                this._oDialogEmployees.bindElement("finalProjectModel>" + oContext.getPath());
                this._oDialogEmployees.open();

            },

            onAcceptRise: function (oEvent) {

                var SalaryEmployeeStatus = this.getView().getModel("finalProjectModel1").getProperty("/SalaryEmployeeStatus");

                var SalaryDateValueStatus = this.getView().getModel("finalProjectModel1").getProperty("/SalaryDateValueStatus");

                if (SalaryEmployeeStatus === "None" && SalaryDateValueStatus === "None") {

                    var lv_CreationDate = this.getView().getModel("finalProjectModel1").getProperty("/SalaryDateValue");
                    var lv_Comments = this.getView().getModel("finalProjectModel1").getProperty("/EmployeeComments");
                    var lv_salary = this.getView().getModel("finalProjectModel1").getProperty("/SalaryEmployee");

                    var body = {

                        SapId: this._SapId,
                        EmployeeId: this._EmployeeId,
                        CreationDate: lv_CreationDate,
                        Ammount: parseFloat(lv_salary).toString(),
                        Waers: "EUR",
                        Comments: lv_Comments

                    }

                    this.getView().getModel("finalProjectModel").create("/Salaries", body, {

                        success: function (data) {

                            this.getView().byId("idTimeline").getBinding("content").refresh();
                            sap.m.MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("raiseSalaryEmployeeSuccess"));
                            this._oDialogEmployees.close();

                        }.bind(this),

                        error: function (e) {

                            sap.m.MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("raiseSalaryEmployeeError"));

                            this._oDialogEmployees.close();

                        }.bind(this)

                    });

                } else {

                    sap.m.MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("completeSalaryData"));

                }

            },

            onCancelRise: function (oEvent) {

                this._oDialogEmployees.close();

            },

            dataDialogValidation: function (oEvent) {

                var salary = parseInt(this.getView().getModel("finalProjectModel1").getProperty("/SalaryEmployee"));
                var comments = this.getView().getModel("finalProjectModel1").getProperty("/SalaryEmployee");

                if (isNaN(salary)) {
                    this.getView().getModel("finalProjectModel1").setProperty("/SalaryEmployeeStatus", "Error");
                } else {
                    this.getView().getModel("finalProjectModel1").setProperty("/SalaryEmployeeStatus", "None");
                }

                if (oEvent.getSource().getId().includes("picker")) {

                    if ((!oEvent.getSource().isValidValue() && oEvent.getSource().getValue() != "") || (oEvent.getSource().isValidValue() && oEvent.getSource().getValue() === "")) {
                        //                    lv_error = "X";
                        this.getView().getModel("finalProjectModel1").setProperty("/SalaryDateValueStatus", "Error");
                    } else {
                        this.getView().getModel("finalProjectModel1").setProperty("/SalaryDateValueStatus", "None");
                    }

                }

            },

            onBack: function (oEvent) {
                var oHistory = History.getInstance();
                var sPreviewHash = oHistory.getPreviousHash();

                if (sPreviewHash !== undefined) {
                    window.history.go(-1);
                } else {
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("RouteMain", true);
                }

            }
            /*
                */

        });

    });