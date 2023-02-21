import React, {useRef, useState, useEffect} from 'react';
import classNames from 'classnames';

interface DatePickerProps {
  onSelect: (p: string) => void;
  title: string;
  required?: boolean;
  selectedDate: string;
  placeholder?: string;
}

const DatePicker = ({
  onSelect,
  title,
  required,
  selectedDate,
  placeholder = 'yyyy-mm-dd',
}: DatePickerProps) => {
  const dropdownRef = useRef(null);
  const [dropdownOpened, setSDropdownOpened] = useState(false);
  const inputClasses = classNames('seminal-textinput');
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentYear, setCurrentYear] = useState((new Date).getFullYear());
  const [currentMonth, setCurrentMonth] = useState((new Date).getMonth() + 1);

  const handleClick = () => {
    setSDropdownOpened(!dropdownOpened);
  };

  useEffect(() => {
    if (inputRef.current === document.activeElement) {
      setSDropdownOpened(true);
      return;
    }
  }, [inputRef.current, document.activeElement]);

  useEffect(() => {
    if (document.getElementsByClassName('date-picker-wrapper').length === 0) {
      return;
    }
    const el = document.getElementsByClassName('date-picker-wrapper');
    el[0]?.addEventListener('click', (e) => {
      const selectedTd = e.target as HTMLElement;
      if (!selectedTd.innerText) {
        return;
      }
      if (selectedTd.tagName === 'TD') {
        // 确保选中的是TD元素
        // @ts-ignore
        if (parseInt(selectedTd.getAttribute('data-date')) < 1) {
          // 选中的是前一个月的日期
          if (currentMonth > 1) {
            onSelect(`${currentYear}-${currentMonth - 1}-${selectedTd.innerText}`);
          } else {
            // 选中的是去年的日期
            onSelect(`${currentYear -1 }-${12}-${selectedTd.innerText}`);
          }
        } else {
          // @ts-ignore
          if ((parseInt(selectedTd.getAttribute('data-date'))) > parseInt(selectedTd.innerText)) {
          // 选中的是后一个月的日期
            if (currentMonth < 12) {
              onSelect(`${currentYear}-${currentMonth + 1}-${selectedTd.innerText}`);
            } else {
            // 选中的是后一年的日期
              onSelect(`${currentYear + 1}-${1}-${selectedTd.innerText}`);
            }
          } else {
            onSelect(`${currentYear}-${currentMonth}-${selectedTd.innerText}`);
          }
        }
        setSDropdownOpened(false);
      }
    });
    return () => {
      el[0]?.removeEventListener('click', (e) => {
        const selectedTd = e.target as HTMLElement;
        if (!selectedTd.innerText) {
          return;
        }
        if (selectedTd.tagName === 'TD') {
          // 确保选中的是TD元素
          // @ts-ignore
          if (parseInt(selectedTd.getAttribute('data-date')) < 1) {
            // 选中的是前一个月的日期
            if (currentMonth > 1) {
              onSelect(`${currentYear}-${currentMonth - 1}-${selectedTd.innerText}`);
            } else {
              // 选中的是去年的日期
              onSelect(`${currentYear -1 }-${12}-${selectedTd.innerText}`);
            }
          } else {
            // @ts-ignore
            if ((parseInt(selectedTd.getAttribute('data-date'))) > parseInt(selectedTd.innerText)) {
            // 选中的是后一个月的日期
              if (currentMonth < 12) {
                onSelect(`${currentYear}-${currentMonth + 1}-${selectedTd.innerText}`);
              } else {
              // 选中的是后一年的日期
                onSelect(`${currentYear + 1}-${1}-${selectedTd.innerText}`);
              }
            } else {
              onSelect(`${currentYear}-${currentMonth}-${selectedTd.innerText}`);
            }
          }
          setSDropdownOpened(false);
        }
      });
    };
  }, [currentYear, currentMonth]);

  const datePicker = () => {
    const datepicker: any = {};
    datepicker.getMonthDate = function(year: any, month: any) {
      const ret = [];
      if (!year || !month) {
        const today = new Date();
        year = today.getFullYear();
        month = today.getMonth() + 1;
      }
      const firstDay = new Date(year, month-1, 1);
      let firstDayWeekDay = firstDay.getDay();
      if (firstDayWeekDay === 0) {
        firstDayWeekDay = 7;
      }

      year = firstDay.getFullYear();
      month = firstDay.getMonth() + 1;

      const lastDayOfLastMonth = new Date(year, month-1, 0);
      const lastDateOfLastMonth = lastDayOfLastMonth.getDate();

      const preMonthDayCount = firstDayWeekDay - 1;
      const lastDay = new Date(year, month, 0);
      const lastDate = lastDay.getDate();

      for (let i=0; i<7*6; i++) {
        const date = i + 1 - preMonthDayCount;
        let showDate = date;
        let thisMonth = month;
        if (date <= 0) {
          thisMonth = month - 1;
          showDate = lastDateOfLastMonth + date;
        } else if (date > lastDate) {
          thisMonth = month + 1;
          showDate = showDate -lastDate;
        };
        if (thisMonth === 0) {
          thisMonth = 12;
        };
        if (thisMonth === 13) {
          thisMonth = 1;
        };
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

  const renderDatePicker = function() {
    const datepicker = datePicker();
    let monthData: any;
    let $wrapper: any;
    datepicker.buildUi = function(year: any, month: any) {
      monthData = datepicker.getMonthDate(year, month);
      setCurrentYear(monthData.year);
      setCurrentMonth(monthData.month);
      let html = '<div class="ui-datepicker-header">' +
                      '<a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>' +
                      '<a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>' +
                      '<span class="datepicker-curr-month">'+monthData.year+'-'+monthData.month+'</span>' +
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
      for (let i = 0; i < monthData.days.length; i++) {
        const date = monthData.days[i];
        if (i % 7 === 0) {
          html += '<tr>';
        }
        html += '<td countValue="'+date.date+'" data-date="'+date.date+'">' + date.showDate + '</td>';
        if (i % 7 === 6) {
          html += '</tr>';
        }
      }

      html+='</tbody>' +
                      '</table>'+
                  '</div>';
      return html;
    };

    datepicker.render = function(direction: any) {
      let year;
      let month;
      if (monthData) {
        year = monthData.year;
        month = monthData.month;
      }

      if (direction === 'prev') {
        if (month === 1) {
          year --;
          month = 12;
        } else {
          month--;
        }
      };
      if (direction === 'next') month++;

      const html = datepicker.buildUi(year, month);

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
    datepicker.init = function(input: any) {
      datepicker.render();
      const $input = document.querySelector(input);
      let isOpen=false;
      $input.addEventListener('click', function() {
        if (isOpen) {
          $wrapper.classList.remove('ui-datepicker-wrapper-show');
          isOpen = false;
        } else {
          $wrapper.classList.add('ui-datepicker-wrapper-show');
          const left = $input.offsetLeft;
          const top = $input.offsetTop;
          const height = $input.offsetHeight;
          $wrapper.style.top=top+height+2+'px';
          $wrapper.style.left=left+'px';
          isOpen=true;
        }
      }, false);
      $wrapper.addEventListener('click', function(e: any) {
        e.preventDefault();
        const $target = e.target;
        if (!$target.classList.contains('ui-datepicker-btn')) {
          return false;
        }

        if ($target.classList.contains('ui-datepicker-prev-btn')) {
          datepicker.render('prev');
        } else if ($target.classList.contains('ui-datepicker-next-btn')) {
          datepicker.render('next');
        }
      }, false);

      $wrapper.addEventListener('click', function(e: any) {
        e.preventDefault();
        const $target= e.target;
        if ($target.tagName.toLocaleLowerCase()!=='td') {
          return false;
        }
        const date=new Date(monthData.year, monthData.month-1, $target.dataset.date);
        $input.value = format(date);

        $wrapper.classList.remove('ui-datepicker-wrapper-show');
        isOpen=false;
      }, false);
    };
    function format(date: any) {
      let ret='';
      const padding = function(num: any) {
        if (num<=9) {
          return '0'+num;
        }
        return num;
      };

      ret += date.getFullYear()+'-';
      ret += padding(date.getMonth()+1)+'-';
      ret += padding(date.getDate());

      return ret;
    }
    return datepicker;
  };

  useEffect(() => {
    if (!dropdownOpened) {
      return;
    }
    const datePicker = renderDatePicker();
    datePicker.init('.seminal-textinput');
  }, [dropdownOpened]);

  return (
    <div className='date-picker-wrapper'>
      <div>
        {title ? title : ''}
        {required ? <span className='required-icon'>*</span> : ''}
      </div>
      <div className='full-width' onClick={handleClick}>
        <input
          value={selectedDate}
          onChange={() => {}}
          className={inputClasses}
          ref={inputRef}
          placeholder={placeholder}
        />
      </div>
      {dropdownOpened && (
        <div className='dropdown-wrapper' ref={dropdownRef} />
      )}
    </div>
  );
};

export default DatePicker;
