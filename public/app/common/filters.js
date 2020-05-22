'use strict';

loanerLaptopSurverApp.filter('durations', function () {
    return function (duration) {
        switch (duration) {
            case 1:
                return "Half Hour";
            case 2:
                return "1 Hour";
            case 3:
                return "Half Day";
            case 4:
                return "Full Day";
        }
    }
});

loanerLaptopSurverApp.filter('days', function () {
    return function (day) {
        switch (day) {
            case 'S':
                return "Saturday";
            case 'Su':
                return "Sunday";
            case 'F':
                return "Friday";
            case 'TH':
                return "Thursday";
            case 'W':
                return "Wednesday";
            case 'T':
                return "Tuesday";
            case 'M':
                return "Monday";

        }
    }
});

loanerLaptopSurverApp.filter('isArray', function () {
    return function (input) {
        return angular.isArray(input);
    };
});

loanerLaptopSurverApp.filter('listArray', function () {
    return function (input) {
        if(!!input){
            return input.toString();
        } else {
            return "";
        }
    };
});

loanerLaptopSurverApp.filter('toDate', function () {
    return function (input) {
        if(!!input && input.length > 0){

            return input.slice(0,2)+ "/" + input.slice(2,4)+ "/" + input.slice(4,8);
        }
        return "";
    };
});

loanerLaptopSurverApp.filter('toPhone', function () {
    return function (input) {
        if(!!input && input.length > 0){

            return input.slice(0,3)+ "." + input.slice(3,6)+ "." + input.slice(6,11);
        }
        return "";
    };
});

loanerLaptopSurverApp.filter('percentage', function ($filter) {
    return function (input) {
        return $filter('number')((input * 100), 2) + '%';
    };
});

loanerLaptopSurverApp.filter('check', function() {
    return function (input) {
        if(!!input) return '*';
        return '-';
    };
});

loanerLaptopSurverApp.filter('wordCount', function() {
    return function (input) {
        var regex = /\s+/gi;
        if(!!input){
            return input.trim().replace(regex, ' ').split(' ').length;
        }
        else {
            return 0;
        }
    };
});

loanerLaptopSurverApp.filter('toYearRange', function() {
    return function (rangeCode) {
        switch (rangeCode) {
            case 'lessThan1':
                return "Less than 1 year";
            case 'between!and2':
                return "1-2 years";
            case 'between2and3':
                return "2-3 years";
            case 'between3and4':
                return "3-4 years";
            case 'moreThan4':
                return "More than 4 years";
        }
    }
});

loanerLaptopSurverApp.filter('decodeEssay', function() {
    return function (essay) {
                return decodeURIComponent(essay);
        }
});
