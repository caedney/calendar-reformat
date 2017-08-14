(function($) {

    var $html = $('html'),
        $calendar = $html.find('.section_menu .rgMasterTable');

    function calendarList($calendar) {

        var $oldCal = $calendar,
            $newCal = $('<div />', {
                'class': 'newCalendar'
            }),
            calRows = $oldCal.find('tbody tr'),
            events = {},
            tags = ['time', 'day', 'date', 'month', 'year'];

        // Create list item
        function createHTML(ev) {
            return '<li><span class="start-time">' + ev.startDate + '</span><span class="event">' + ev.calEvent + '</span><span class="end-time">' + ev.endDate + '</span></li>'
        }

        // Returns reformatted date
        function splitDate(date) {
            var newDate = date.split(' '),
                $newDiv = $('<div />'),
                k = /\d/.test(newDate[0]) ? 0 : 1;
            for (var j = 0; j < newDate.length; j++) {
                var $newTag = $('<span />', {
                    'class': tags[j + k],
                    'html': newDate[j] + ' '
                });
                $newDiv.append($newTag);
            }
            return $newDiv.html();
        }

        function createEvent(i, eventLink, start, end) {
            var newDate = start.split(' '),
                k = /\d/.test(newDate[0]) ? 1 : 0,
                date = newDate[1 + k] + '-' + newDate[2 + k];

            //Check if object exists
            if (!events.hasOwnProperty(date)) {
                events[date] = {};
                var $newList = $('<ul />', {
                    'class': 'events-list ' + date
                });
                $newCal.append($newList);
            }

            events[date]['event-' + (i + 1)] = {
                'startDate': splitDate(start),
                'calEvent': eventLink,
                'endDate': splitDate(end)
            };

            var $newLi = createHTML(events[date]['event-' + (i + 1)]);
            $newCal.find('ul.' + date).append($newLi);

        }

        // Retrieves data from Calendar
        for (var i = 0; i < calRows.length; i++) {
            var $this = calRows[i],
                eventLink = $.trim($($this).find('td:nth-child(1)').html()),
                start = $.trim($($this).find('td:nth-child(2)').html()),
                end = $.trim($($this).find('td:nth-child(3)').html());
            //Create the new layout
            createEvent(i, eventLink, start, end);
        }

        $oldCal.hide().before($newCal);

    }

    calendarList($calendar);

}(jQuery));
