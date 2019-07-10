/*********************************************************************************
* WEB422 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic
Policy.
* No part of this assignment has been copied manually or electronically from any
other source
* (including web sites) or distributed to other students.
*
* Name: ___Siyi Yuan_____ Student ID: ___152110177___ Date: ___May-15-2019_________
*
*
********************************************************************************/

$(document).ready(function() {
    // = $(function(){
    console.log('JQuery working');

    $('#teams-menu').on('click', function(event) {
        event.preventDefault();

        $.ajax({
            url: 'https://siyi-web422-assignment.herokuapp.com/teams',
            type: 'GET',
            contentType: 'application/json'
        })
            .done(function(data) {
                $('.well').empty();
                $('.well').append('<h3>Teams</h3>');
                $('.well').append('<pre></pre>');
                $('pre').html(prettyPrintJson.toHtml(data));
            })
            .fail(function(err) {
                console.log('error: ' + err.statusText);
            });
    });

    $('#employees-menu').on('click', function(event) {
        event.preventDefault();

        $.ajax({
            url: 'https://siyi-web422-assignment.herokuapp.com/employees',
            type: 'GET',
            contentType: 'application/json'
        })
            .done(function(data) {
                $('.well').empty();
                $('.well').append('<h3>Employees</h3>');
                $('.well').append('<pre></pre>');
                $('pre').html(prettyPrintJson.toHtml(data));
            })
            .fail(function(err) {
                console.log('error: ' + err.statusText);
            });
    });

    $('#projects-menu').on('click', function(event) {
        event.preventDefault();

        $.ajax({
            url: 'https://siyi-web422-assignment.herokuapp.com/projects',
            type: 'GET',
            contentType: 'application/json'
        })
            .done(function(data) {
                $('.well').empty();
                $('.well').append('<h3>Projects</h3>');
                $('.well').append('<pre></pre>');
                $('pre').html(prettyPrintJson.toHtml(data));
            })
            .fail(function(err) {
                console.log('error: ' + err.statusText);
            });
    });

    $('#positions-menu').on('click', function(event) {
        event.preventDefault();

        $.ajax({
            url: 'https://siyi-web422-assignment.herokuapp.com/positions',
            type: 'GET',
            contentType: 'application/json'
        })
            .done(function(data) {
                $('.well').empty();
                $('.well').append('<h3>Positions</h3>');
                $('.well').append('<pre></pre>');
                $('pre').html(prettyPrintJson.toHtml(data));
            })
            .fail(function(err) {
                console.log('error: ' + err.statusText);
            });
    });
});
