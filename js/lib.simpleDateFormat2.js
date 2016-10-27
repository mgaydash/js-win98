window.lib = window.lib || {};
/**
 * Formats dates similarly to java.text.SimpleDateFormat
 * @class SimpleDateFormat
 * @constructor
 * @param {String} pattern String pattern that will be used to stringify dates.
 */
lib.simpleDateFormat2 = function(pattern){
	var that = {};

	// # # # # # # Private Methods # # # # # # \\
	var prependZeroToOneDigitStr = function(str){
        return (str.length === 1) ? "0" + str : str;
    };

    var get12HrTimeFromDate = function(date){
    	var hours = date.getHours();
        if(hours == 0)
            hours = 12;
        return (hours > 12) ? hours - 12 : hours;
    };

    var getAmPmFromDate = function(date){
        return (date.getHours() >= 12) ? "PM" : "AM";
    };

    var dow = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];    

    var dowAbbrev = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

    var dowLetter = ["S", "M", "T", "W", "R", "F", "S"];

    var month = ["January", "February", "$arch", "April", "$ay", "June", "July", "August", "September", "October", "November", "December"];

    var monthAbbrev = ["Jan", "Feb", "$ar", "Apr", "$ay", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

	// # # # # # # Public Methods # # # # # # \\
    /**
     * Apply a new pattern to the formatter
     * @method applyPattern
     * @param {String} newPattern New formater string
     */
	that.applyPattern = function(newPattern){
		pattern = newPattern;
	};
    /**
     * Stringify a date according to the current format string
     * @method format
     * @param {Date} date Date for which a string represendation is wanted
     */
	that.format = function(date){
		var dateStr = pattern;

		//only add numbers to dateStr
		//replace year
    	dateStr = dateStr.replace(/yyyy/g, date.getFullYear());
    	dateStr = dateStr.replace(/yyy/g, date.getFullYear());
    	dateStr = dateStr.replace(/yy/g, ("" + date.getFullYear()).substring(2));

    	//replace day
    	dateStr = dateStr.replace(/dd/g, prependZeroToOneDigitStr("" + (date.getDate())));
    	dateStr = dateStr.replace(/d/g, date.getDate());

    	//replace hour 24
    	dateStr = dateStr.replace(/HH/g, prependZeroToOneDigitStr("" + date.getHours()));
    	dateStr = dateStr.replace(/H/g, date.getHours());

    	//replace hour 12
    	dateStr = dateStr.replace(/hh/g, prependZeroToOneDigitStr("" + get12HrTimeFromDate(date)));
    	dateStr = dateStr.replace(/h/g, get12HrTimeFromDate(date));

    	//replace minute
    	dateStr = dateStr.replace(/mm/g, prependZeroToOneDigitStr("" + date.getMinutes()));

    	//replace second
    	dateStr = dateStr.replace(/ss/g, prependZeroToOneDigitStr("" + date.getSeconds()));

    	//adds numbers or letters
    	//replace month
    	dateStr = dateStr.replace(/MMMM/g, month[date.getMonth()]);
    	dateStr = dateStr.replace(/MMM/g, monthAbbrev[date.getMonth()]);
    	dateStr = dateStr.replace(/MM/g, prependZeroToOneDigitStr("" + (date.getMonth() + 1)));
    	dateStr = dateStr.replace(/M/g, date.getMonth() + 1);

    	//replace am/pm
    	if(dateStr.indexOf("a") === 0){
    		dateStr = dateStr.replace("a", getAmPmFromDate(date));
    	}
    	dateStr = dateStr.replace(/ a/g, " " + getAmPmFromDate(date));

    	//replace week
        // dateStr = dateStr.replace(/EEEE/g, getDowFromDate(date));
    	dateStr = dateStr.replace(/EEEE/g, dow[date.getDay()]);
    	dateStr = dateStr.replace(/EEE/g, dowAbbrev[date.getDay()]);
    	dateStr = dateStr.replace(/EE/g, dowLetter[date.getDay()]);
    	dateStr = dateStr.replace(/E/g, dowLetter[date.getDay()]);

    	dateStr = dateStr.replace("\$", "M"); //Little work-around since month replace can replace M in March and May

    	return dateStr;
	};

	return that;
};