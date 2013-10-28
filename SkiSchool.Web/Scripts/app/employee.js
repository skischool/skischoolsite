function EmployeeViewModel() {

    var self = this;

    var employeeId = function () {
        var url = document.URL;
        var start = url.lastIndexOf("/") + 1;
        var end = url.length;
        var id = url.substring(start, end).replace('#', '');

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
    self.genderName = ko.observable();
    self.genderDescription = ko.observable();
    self.employeeTitleDesc = ko.observable();
    self.employeeTitleName = ko.observable();
    self.employeeTitleId = ko.observable();
    self.employeeTypeDesc = ko.observable();
    self.employeeTypeName = ko.observable();
    self.employeeTypeId = ko.observable();
    self.shiftTypeId = ko.computed(function () {

        var typeId = 0;
        var empTitleId = self.employeeTitleId();

        if (empTitleId === 5) {
            typeId = 6;
        } else if (empTitleId === 6) {
            typeId = 7;
        } else if (empTitleId === 7) {
            typeId = 8;
        } else if (empTitleId === 10) {
            typeId = 9
        }

        return typeId;
    });

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

        $.ajax({
            type: 'PUT',
            url: '../../api/schedules?scheduleId=' + data.id,
            data: scheduleToAdd,
            dataType: 'json'
        }).done(function (d) {

            self.availableSchedules.remove(function (item) {
                return item.id === d.Id;
            });

            self.availableSchedules.remove(function (item) {
                return item.scheduleDate === d.Date;
            });

            self.schedules.push({
                id: d.Id,
                scheduleDate: d.Date,
                date: moment(d.Date).format('dddd, MMMM Do YYYY'),
                seasonId: d.SeasonId,
                employeeId: d.EmployeeId,
                start: moment(d.Start).format('h:mm a'),
                end: moment(d.End).format('h:mm a')
            });

            //self.schedules.sort(function (schedule1, schedule2) {
            //    return schedule2.scheduleDate - schedule1.scheduleDate;
            //});

            self.schedules.sort(function (left, right) {
                return left.scheduleDate == right.scheduleDate ? 0 : (left.scheduleDate < right.scheduleDate ? -1 : 1)
            })
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
                scheduleDate: d.Date,
                date: moment(d.Date).format('dddd, MMMM Do YYYY'),
                start: moment(d.Start).format('h:mm a'),
                end: moment(d.End).format('h:mm a')
            });
        });
    };

    self.filterAvailableSchedule = function (data, event) {

        var selectedMonth = event.target.id;
        var availableEmployeeShiftsUrl = selectedMonth === "0" ?
            '../../api/schedules?shiftType=' + self.shiftTypeId() + '&employeeId=' + employeeId() + '&month=' :
            '../../api/schedules?shiftType=' + self.shiftTypeId() + '&employeeId=' + employeeId() + '&month=' + selectedMonth;

        

        $('#available-loading').show();
        $(':button').attr("disabled", "disabled");

        $.getJSON(availableEmployeeShiftsUrl, function (data) {

            self.availableSchedules.removeAll();

            $.each(data, function (key, val) {
                self.availableSchedules.push({
                    id: val.Id,
                    seasonId: val.SeasonId,
                    scheduleDate: val.Date,
                    date: moment(val.Date).format('dddd, MMMM Do YYYY'),
                    start: moment(val.Start).format('h:mm a'),
                    end: moment(val.End).format('h:mm a'),
                    typeId: val.TypeId
                });
            });
        }).done(function () {
            $('#available-loading').hide();
            $(':button').removeAttr("disabled");
        });
    };

        // Loads the selected employee shifts
    $.getJSON('../../api/schedules?employeeId=' + employeeId(), function (data) {

            $('#selected-loading').show();
            $('#schedule-alerts').hide();
            $(':button').attr("disabled", "disabled");

            $.each(data, function (key, val) {
                self.schedules.push({
                    id: val.Id,
                    seasonId: val.SeasonId,
                    scheduleDate: val.Date,
                    date: moment(val.Date).format('dddd, MMMM Do YYYY'),
                    start: moment(val.Start).format('h:mm a'),
                    end: moment(val.End).format('h:mm a'),
                    employeeId: val.EmployeeId
                });
            });
        }).done(function () {
            $('#selected-loading').hide();
            $('#schedule-alerts').show();
            $(':button').removeAttr("disabled");
        });

        $('#employee-loading').show();
        $('#personal-loading').show();

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
            self.genderId(data.Person.Gender.Id);
            self.genderName(data.Person.Gender.Name);
            self.genderDescription(data.Person.Gender.Description);
            self.employeeTitleDesc(data.EmployeeTitle.Description);
            self.employeeTitleName(data.EmployeeTitle.Name);
            self.employeeTitleId(data.EmployeeTitle.Id);
            self.employeeTypeDesc(data.EmployeeType.Description);
            self.employeeTypeName(data.EmployeeType.Name);
            self.employeeTypeId(data.EmployeeType.Id);
    }).done(function () {

        $('#employee-loading').hide();
        $('#personal-loading').hide();

        // Loads the available employee shifts
        var availableEmployeeShiftsUrl = '../../api/schedules?shiftType=' + self.shiftTypeId() + '&employeeId=' + employeeId() + '&month=';
        $(':button').attr("disabled", "disabled");

        $.getJSON(availableEmployeeShiftsUrl, function (data) {
            $.each(data, function (key, val) {
                self.availableSchedules.push({
                    id: val.Id,
                    seasonId: val.SeasonId,
                    scheduleDate: val.Date,
                    date: moment(val.Date).format('dddd, MMMM Do YYYY'),
                    start: moment(val.Start).format('h:mm a'),
                    end: moment(val.End).format('h:mm a'),
                    typeId: val.TypeId
                });
            });
        }).done(function () {
            $('#available-loading').hide();
            $(':button').removeAttr("disabled");
        });
    });
}

$(document).ready(

    ko.applyBindings(new EmployeeViewModel())
);
