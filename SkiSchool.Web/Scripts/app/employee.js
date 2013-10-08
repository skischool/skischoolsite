function EmployeeViewModel() {

    var self = this;

    var employeeId = function () {
        var url = document.URL;
        var start = url.lastIndexOf("/") + 1;
        var end = url.length;
        var id = url.substring(start, end);

        return id;
    };

    self.clientToken = ko.observable();
    self.current = ko.observable();
    self.id = ko.observable();
    self.isLocal = ko.observable();
    self.loginId = ko.observable();
    self.rosterId = ko.observable();
    self.personId = ko.observable();
    self.firstName = ko.observable();
    self.lastName = ko.observable();
    self.middleName = ko.observable();
    self.dateOfBirth = ko.observable();
    self.genderId = ko.observable();
    self.employeeTitleDesc = ko.observable();
    self.employeeTitleName = ko.observable();
    self.employeeTitleId = ko.observable();
    self.employeeTypeDesc = ko.observable();
    self.employeeTypeName = ko.observable();
    self.employeeTypeId = ko.observable();

    self.schedules = ko.observableArray([]);
    self.availableSchedules = ko.observableArray([]);

    self.addScheduleItem = function (data, event) {

        var scheduleToAdd = {
            EmployeeId: employeeId(),
            Date: data.date,
            SeasonId: data.seasonId,
            Id: data.id,
            Start: data.start,
            End: data.end
        };

        // $('button[value="' + data.id + '"]').attr('disabled', 'disabled')

        $.ajax({
            type: 'PUT',
            url: '../../api/schedules?scheduleId=' + data.id,
            data: scheduleToAdd,
            dataType: 'json'
        }).done(function (d) {

            self.availableSchedules.remove(function (item) {
                return item.id === d.Id;
            });

            self.schedules.push({
                id: d.Id,
                date: moment(d.Date).format('YYYY-MM-DD'),
                seasonId: d.SeasonId,
                employeeId: d.EmployeeId,
                start: moment(d.Start).format('HH:mm'),
                end: moment(d.End).format('HH:mm')
            });
        });
    };
    self.removeScheduleItem = function (data, event) {
        var scheduleToRemove = {
            EmployeeId: null,
            Date: data.date,
            SeasonId: data.seasonId,
            Id: data.id,
            Start: data.start,
            End: data.end
        };

        // $('button[value="' + data.id + '"]').attr('disabled', 'disabled')

        $.ajax({
            type: 'PUT',
            url: '../../api/schedules?scheduleId=' + data.id,
            data: scheduleToRemove,
            dataType: 'json'
        }).done(function (d) {
            self.schedules.remove(function (item) {
                return item.id === d.Id;
            });

            self.availableSchedules.push({
                id: d.Id,
                seasonId: d.SeasonId,
                date: moment(d.Date).format('YYYY-MM-DD'),
                start: moment(d.Start).format('HH:mm'),
                end: moment(d.End).format('HH:mm')
            });
        });
    };

    

    // Loads the selected employee shifts
    $.getJSON('../../api/schedules?employeeId=1', function (data) {
        $.each(data, function (key, val) {
            self.schedules.push({
                id: val.Id,
                seasonId: val.SeasonId,
                date: moment(val.Date).format('YYYY-MM-DD'),
                start: moment(val.Start).format('HH:mm'),
                end: moment(val.End).format('HH:mm'),
                employeeId: val.EmployeeId
            });
        });
    });

    // Loads the available employee shifts
    $.getJSON('../../api/schedules?employeeId=', function (data) {
        $.each(data, function (key, val) {
            self.availableSchedules.push({
                id: val.Id,
                seasonId: val.SeasonId,
                date: moment(val.Date).format('YYYY-MM-DD'),
                start: moment(val.Start).format('HH:mm'),
                end: moment(val.End).format('HH:mm'),
                typeId: val.TypeId
            });
        });
    });


    $.getJSON('../../api/employees?loginId=&id=' + employeeId(), function (data) {
        self.clientToken(data.ClientToken);
        self.current(data.Current === true ? 'Yes' : 'No');
        self.id(data.Id);
        self.isLocal(data.IsLocal === true ? 'Yes' : 'No');
        self.loginId(data.LoginId);
        self.rosterId(data.RosterId);
        self.personId(data.Person.Id);
        self.firstName(data.Person.FirstName);
        self.lastName(data.Person.LastName);
        self.middleName(data.Person.MiddleName);
        self.dateOfBirth(moment(data.Person.DateOfBirth).format('YYYY-MM-DD'));
        self.genderId(data.Person.GenderId);
        self.employeeTitleDesc(data.EmployeeTitle.Description);
        self.employeeTitleName(data.EmployeeTitle.Name);
        self.employeeTitleId(data.EmployeeTitle.Id);
        self.employeeTypeDesc(data.EmployeeType.Description);
        self.employeeTypeName(data.EmployeeType.Name);
        self.employeeTypeId(data.EmployeeType.Id);
    });

}

$(document).ready(
    ko.applyBindings(new EmployeeViewModel())
);
