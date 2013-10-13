var routes = routes || {};

routes.employeeSchedulesByEmployeeId = '../../api/schedules?employeeId={employeeId}';
routes.employeeByEmployeeId = '../../api/employees?loginId=&id={employeeId}';
routes.availableSchedulesByType = '../../api/schedules?shiftType={shiftTypeId}';
routes.selectedSchedulesByEmployeeId = '../../api/schedules?employeeId={employeeId}';
routes.updateScheduleByScheduleId = '../../api/schedules?scheduleId={scheduleId}';
routes.logOffAccount = '/Account/LogOff';
