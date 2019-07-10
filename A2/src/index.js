/*********************************************************************************
* WEB422 – Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic
Policy.
* No part of this assignment has been copied manually or electronically from any
other source
* (including web sites) or distributed to other students.
*
* Name: ___Siyi Yuan_____ Student ID: ___152110177___ Date: ___May-28-2019_________
*
*
********************************************************************************/

// Import jQuery, which will also expose $ on the global `window` Object.
import $ from './jquery-es';
// After jQuery is loaded, we can load the Bootstrap JS, which depends on jQuery.
import 'bootstrap';

// Place your imports for Moment.js and Lodash here...
import moment from 'moment';
import _ from 'lodash';

// The rest of your code can go here.  You're also welcome to split
// your code up into multiple files using ES modules and import/export.
let employeesModel = [];

$(document).ready(function() {
  function initializeEmployeesModel() {
    console.log('InitializeEmployeesModel()');

    $.ajax({
      url: 'https://siyi-web422-assignment.herokuapp.com/employees',
      type: 'GET',
      contentType: 'application/json'
    })
      .done(function(employees) {
        employeesModel = _.take(employees, 300);
        refreshEmployeeRows(employeesModel);
      })
      .fail(function(err) {
        console.log('error: ' + err.statusText);
        showGenericModal('Error', 'Unable to get Employees');
      });
  }

  function showGenericModal(title, message) {
    let modalTitle = $('.modal-title');
    let modalBody = $('.modal-body');

    modalTitle.empty();
    modalBody.empty();

    modalTitle.html(title);
    modalBody.html(message);
    $('#genericModal').modal('show');
  }

  let rowTemplate = _.template(
    '<% _.forEach(employees, function(employee) { %>' +
      '<div class="row body-row" data-id=<%- employee._id %>>' +
      '<div class="col-xs-4 body-column"><%- employee.FirstName %></div>' +
      '<div class="col-xs-4 body-column"><%- employee.LastName %></div>' +
      '<div class="col-xs-4 body-column"><%- employee.Position.PositionName %></div>' +
      '</div>' +
      '<% }); %>'
  );

  function refreshEmployeeRows(employees) {
    console.log('RefreshEmployeeRows()');
    let rows = rowTemplate({ employees: employees });
    let employeeTable = $('#employees-table');
    employeeTable.empty();
    employeeTable.append(rows);
  }

  function getFilteredEmployeesModel(filterString) {
    console.log('GetFilteredEmployeesModel()');
    let filterData = _.filter(employeesModel, function(employee) {
      if (
        employee.FirstName.toUpperCase().indexOf(filterString.toUpperCase()) !== -1 ||
        employee.LastName.toUpperCase().indexOf(filterString.toUpperCase()) !== -1 ||
        employee.Position.PositionName.toUpperCase().indexOf(filterString.toUpperCase()) !== -1
      ) {
        return true;
      }
      return false;
    });
    return filterData;
  }

  function getEmployeeModelById(id) {
    console.log('GetEmployeeModelById()');
    let findIdx = _.findIndex(employeesModel, function(employee) {
      return employee._id === id;
    });

    if (findIdx !== -1) return _.cloneDeep(employeesModel[findIdx]);

    return null;
  }

  initializeEmployeesModel();

  // wire the "keyup" event
  $('#employee-search').on('keyup', function() {
    console.log('$(#employee-search).on(keyup, function() {');
    let searchText = $('#employee-search').val();
    refreshEmployeeRows(getFilteredEmployeesModel(searchText));
  });

  $('.bootstrap-header-table').on('click', '.body-row', function() {
    console.log('$(.bootstrap-header-table).on(click, .body-row, function() {');

    let clickedEmpoyee = getEmployeeModelById($(this).attr('data-id'));
    $('body-row').data('data-id', clickedEmpoyee);

    let hireDateStr = moment(clickedEmpoyee.HireDate).format('LL');
    clickedEmpoyee.HireDate = hireDateStr;

    let modalTemp = _.template(
      '<strong>Address:</strong> <%- employee.AddressStreet %> <%- employee.AddressCity %> <%- employee.AddressState %> <%- employee.AddressZip %><br>' +
        '<strong>Phone Number:</strong> <%-employee.PhoneNum %><br>' +
        '<strong>Hire Date:</strong> <%- employee.HireDate %>'
    );

    showGenericModal(
      clickedEmpoyee.FirstName + ' ' + clickedEmpoyee.LastName,
      modalTemp({ employee: clickedEmpoyee })
    );
  });

  $(document).ready(function() {
    $('#employees-table').DataTable();
    $('.dataTables_length').addClass('bs-select');
  });
});
