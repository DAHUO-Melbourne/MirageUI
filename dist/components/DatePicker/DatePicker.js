import React, { useRef, useState, useEffect } from 'react';
import classNames from 'classnames';
var DatePicker = function (_a) {
    var onSelect = _a.onSelect, title = _a.title, required = _a.required, selectedDate = _a.selectedDate, _b = _a.placeholder, placeholder = _b === void 0 ? 'yyyy-mm-dd' : _b;
    var dropdownRef = useRef(null);
    var _c = useState(false), dropdownOpened = _c[0], setSDropdownOpened = _c[1];
    var inputClasses = classNames('mintafy-textinput');
    var inputRef = useRef(null);
    var _d = useState((new Date).getFullYear()), currentYear = _d[0], setCurrentYear = _d[1];
    var _e = useState((new Date).getMonth() + 1), currentMonth = _e[0], setCurrentMonth = _e[1];
    var handleClick = function () {
        setSDropdownOpened(!dropdownOpened);
    };
    useEffect(function () {
        if (inputRef.current === document.activeElement) {
            setSDropdownOpened(true);
            return;
        }
    }, [inputRef.current, document.activeElement]);
    useEffect(function () {
        var _a;
        if (document.getElementsByClassName('date-picker-wrapper').length === 0) {
            return;
        }
        var el = document.getElementsByClassName('date-picker-wrapper');
        (_a = el[0]) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function (e) {
            var selectedTd = e.target;
            if (!selectedTd.innerText) {
                return;
            }
            if (selectedTd.tagName === 'TD') {
                // 确保选中的是TD元素
                // @ts-ignore
                if (parseInt(selectedTd.getAttribute('data-date')) < 1) {
                    // 选中的是前一个月的日期
                    if (currentMonth > 1) {
                        onSelect("".concat(currentYear, "-").concat(currentMonth - 1, "-").concat(selectedTd.innerText));
                    }
                    else {
                        // 选中的是去年的日期
                        onSelect("".concat(currentYear - 1, "-").concat(12, "-").concat(selectedTd.innerText));
                    }
                }
                else {
                    // @ts-ignore
                    if ((parseInt(selectedTd.getAttribute('data-date'))) > parseInt(selectedTd.innerText)) {
                        // 选中的是后一个月的日期
                        if (currentMonth < 12) {
                            onSelect("".concat(currentYear, "-").concat(currentMonth + 1, "-").concat(selectedTd.innerText));
                        }
                        else {
                            // 选中的是后一年的日期
                            onSelect("".concat(currentYear + 1, "-").concat(1, "-").concat(selectedTd.innerText));
                        }
                    }
                    else {
                        onSelect("".concat(currentYear, "-").concat(currentMonth, "-").concat(selectedTd.innerText));
                    }
                }
                setSDropdownOpened(false);
            }
        });
        return function () {
            var _a;
            (_a = el[0]) === null || _a === void 0 ? void 0 : _a.removeEventListener('click', function (e) {
                var selectedTd = e.target;
                if (!selectedTd.innerText) {
                    return;
                }
                if (selectedTd.tagName === 'TD') {
                    // 确保选中的是TD元素
                    // @ts-ignore
                    if (parseInt(selectedTd.getAttribute('data-date')) < 1) {
                        // 选中的是前一个月的日期
                        if (currentMonth > 1) {
                            onSelect("".concat(currentYear, "-").concat(currentMonth - 1, "-").concat(selectedTd.innerText));
                        }
                        else {
                            // 选中的是去年的日期
                            onSelect("".concat(currentYear - 1, "-").concat(12, "-").concat(selectedTd.innerText));
                        }
                    }
                    else {
                        // @ts-ignore
                        if ((parseInt(selectedTd.getAttribute('data-date'))) > parseInt(selectedTd.innerText)) {
                            // 选中的是后一个月的日期
                            if (currentMonth < 12) {
                                onSelect("".concat(currentYear, "-").concat(currentMonth + 1, "-").concat(selectedTd.innerText));
                            }
                            else {
                                // 选中的是后一年的日期
                                onSelect("".concat(currentYear + 1, "-").concat(1, "-").concat(selectedTd.innerText));
                            }
                        }
                        else {
                            onSelect("".concat(currentYear, "-").concat(currentMonth, "-").concat(selectedTd.innerText));
                        }
                    }
                    setSDropdownOpened(false);
                }
            });
        };
    }, [currentYear, currentMonth]);
    var datePicker = function () {
        var datepicker = {};
        datepicker.getMonthDate = function (year, month) {
            var ret = [];
            if (!year || !month) {
                var today = new Date();
                year = today.getFullYear();
                month = today.getMonth() + 1;
            }
            var firstDay = new Date(year, month - 1, 1);
            var firstDayWeekDay = firstDay.getDay();
            if (firstDayWeekDay === 0) {
                firstDayWeekDay = 7;
            }
            year = firstDay.getFullYear();
            month = firstDay.getMonth() + 1;
            var lastDayOfLastMonth = new Date(year, month - 1, 0);
            var lastDateOfLastMonth = lastDayOfLastMonth.getDate();
            var preMonthDayCount = firstDayWeekDay - 1;
            var lastDay = new Date(year, month, 0);
            var lastDate = lastDay.getDate();
            for (var i = 0; i < 7 * 6; i++) {
                var date = i + 1 - preMonthDayCount;
                var showDate = date;
                var thisMonth = month;
                if (date <= 0) {
                    thisMonth = month - 1;
                    showDate = lastDateOfLastMonth + date;
                }
                else if (date > lastDate) {
                    thisMonth = month + 1;
                    showDate = showDate - lastDate;
                }
                ;
                if (thisMonth === 0) {
                    thisMonth = 12;
                }
                ;
                if (thisMonth === 13) {
                    thisMonth = 1;
                }
                ;
                ret.push({
                    month: thisMonth,
                    date: date,
                    showDate: showDate,
                });
            }
            return {
                year: year,
                month: month,
                days: ret,
            };
        };
        return datepicker;
    };
    var renderDatePicker = function () {
        var datepicker = datePicker();
        var monthData;
        var $wrapper;
        datepicker.buildUi = function (year, month) {
            monthData = datepicker.getMonthDate(year, month);
            setCurrentYear(monthData.year);
            setCurrentMonth(monthData.month);
            var html = '<div class="ui-datepicker-header">' +
                '<a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>' +
                '<a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>' +
                '<div><a href="#" class="ui-datepicker-btn ui-datepicker-prev-year-btn">&lt;</a><a href="#" class="ui-datepicker-btn ui-datepicker-next-year-btn">&gt;</a><span class="datepicker-curr-month">' + monthData.year + '-' + monthData.month + '</span></div>' +
                '</div>' +
                '<div class="ui-datepicker-body">' +
                '<table>' +
                '<thead>' +
                '<tr>' +
                '<th>Mon</th>' +
                '<th>Tue</th>' +
                '<th>Wed</th>' +
                '<th>Thu</th>' +
                '<th>Fri</th>' +
                '<th>Sat</th>' +
                '<th>Sun</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>';
            for (var i = 0; i < monthData.days.length; i++) {
                var date = monthData.days[i];
                if (i % 7 === 0) {
                    html += '<tr>';
                }
                html += '<td countValue="' + date.date + '" data-date="' + date.date + '">' + date.showDate + '</td>';
                if (i % 7 === 6) {
                    html += '</tr>';
                }
            }
            html += '</tbody>' +
                '</table>' +
                '</div>';
            return html;
        };
        datepicker.render = function (direction, yearDirection) {
            var year;
            var month;
            if (monthData) {
                year = monthData.year;
                month = monthData.month;
            }
            if (direction === 'prev' && yearDirection) {
                year--;
                month = 1;
            }
            else if (direction === 'next' && yearDirection) {
                year++;
                month = 1;
            }
            if (direction === 'prev' && !yearDirection) {
                if (month === 1) {
                    year--;
                    month = 12;
                }
                else {
                    month--;
                }
            }
            ;
            if (direction === 'next' && !yearDirection)
                month++;
            var html = datepicker.buildUi(year, month);
            $wrapper = document.querySelector('.ui-datepicker-wrapper');
            if (!$wrapper) {
                $wrapper = document.createElement('div');
                $wrapper.className = 'ui-datepicker-wrapper';
            }
            $wrapper.innerHTML = html;
            if (document.querySelector('.dropdown-wrapper') === null) {
                return;
            }
            // @ts-ignore
            document.querySelector('.dropdown-wrapper').appendChild($wrapper);
        };
        datepicker.init = function (input) {
            datepicker.render();
            var $input = document.querySelector(input);
            var isOpen = false;
            $input.addEventListener('click', function () {
                if (isOpen) {
                    $wrapper.classList.remove('ui-datepicker-wrapper-show');
                    isOpen = false;
                }
                else {
                    $wrapper.classList.add('ui-datepicker-wrapper-show');
                    var left = $input.offsetLeft;
                    var top_1 = $input.offsetTop;
                    var height = $input.offsetHeight;
                    $wrapper.style.top = top_1 + height + 2 + 'px';
                    $wrapper.style.left = left + 'px';
                    isOpen = true;
                }
            }, false);
            $wrapper.addEventListener('click', function (e) {
                e.preventDefault();
                var $target = e.target;
                if (!$target.classList.contains('ui-datepicker-btn')) {
                    return false;
                }
                if ($target.classList.contains('ui-datepicker-prev-btn')) {
                    datepicker.render('prev');
                }
                else if ($target.classList.contains('ui-datepicker-next-btn')) {
                    datepicker.render('next');
                }
                else if ($target.classList.contains('ui-datepicker-prev-year-btn')) {
                    datepicker.render('prev', true);
                }
                else if ($target.classList.contains('ui-datepicker-next-year-btn')) {
                    datepicker.render('next', true);
                }
            }, false);
            $wrapper.addEventListener('click', function (e) {
                e.preventDefault();
                var $target = e.target;
                if ($target.tagName.toLocaleLowerCase() !== 'td') {
                    return false;
                }
                var date = new Date(monthData.year, monthData.month - 1, $target.dataset.date);
                $input.value = format(date);
                $wrapper.classList.remove('ui-datepicker-wrapper-show');
                isOpen = false;
            }, false);
        };
        function format(date) {
            var ret = '';
            var padding = function (num) {
                if (num <= 9) {
                    return '0' + num;
                }
                return num;
            };
            ret += date.getFullYear() + '-';
            ret += padding(date.getMonth() + 1) + '-';
            ret += padding(date.getDate());
            return ret;
        }
        return datepicker;
    };
    useEffect(function () {
        if (!dropdownOpened) {
            return;
        }
        var datePicker = renderDatePicker();
        datePicker.init('.mintafy-textinput');
    }, [dropdownOpened]);
    return (React.createElement("div", { className: 'date-picker-wrapper' },
        React.createElement("div", null,
            title ? title : '',
            required ? React.createElement("span", { className: 'required-icon' }, "*") : ''),
        React.createElement("div", { className: 'full-width', onClick: handleClick },
            React.createElement("input", { value: selectedDate, onChange: function () { }, className: inputClasses, ref: inputRef, placeholder: placeholder })),
        dropdownOpened && (React.createElement("div", { className: 'dropdown-wrapper', ref: dropdownRef }))));
};
export default DatePicker;
