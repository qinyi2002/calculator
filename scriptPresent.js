// Used to toggle the menu on small screens when clicking on the menu button
function myFunction() {
    var x = document.getElementById("nav");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Auto change the rate %

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function calcRate() {
    var initialBalance = parseFloat(document.getElementById("initialBalance").value);
    var withdraw = parseFloat(document.getElementById("withdraw").value);
    var rate;

    if (initialBalance > 0 && withdraw > 0) {
        document.getElementById("withdrawRate").style.display = 'block';
        rate = withdraw / initialBalance * 100;
        rate = rate.toFixed(2); // making the number have 2 decimal places
        rate = rate.toString() + " %";
        document.getElementById("rate").value = rate;
    } else {
        document.getElementById("rate").value = "N/A";
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// check condition and getting ready to calc average annual rate

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function checkYear() {
    var startYear = parseFloat(document.getElementById("startYear").value);
    var savingLast = parseFloat(document.getElementById("savingLast").value);
    var maxYear;

    if (startYear >= 1926 && startYear <= 2020 && savingLast >= 1 && savingLast <= 50) {
        maxYear = 2020 - savingLast + 1;
        document.getElementById("startYear").max = maxYear;
        calcAnnual(maxYear);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Auto change the average annual return %

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function calcAnnual(maxYear) {
    var startYear = parseFloat(document.getElementById("startYear").value);
    var savingLast = parseFloat(document.getElementById("savingLast").value);
    var average = 0;

    // S&P 500 rate
    var iraAnnualRate = [0.1162, 0.3749, 0.4361, -0.0842, 
        -0.2490, -0.4334, -0.0819, 0.5399, -0.0144, 0.4767, 0.3392, -0.3503, 0.3112, -0.0041, 
        -0.0978, -0.1159, 0.2034, 0.2590, 0.1975, 0.3644, -0.0807, 0.0571, 0.0550, 0.1879,
        0.3171, 0.2402, 0.1837, -0.0099, 0.5262, 0.3156, 0.0656, -0.1078, 0.4336, 0.1196,
        0.0047, 0.2689, -0.0873, 0.2280, 0.1648, 0.1245, -0.1006, 0.2398, 0.1106, -0.0850,
        0.0401, 0.1431, 0.1898, -0.1469, -0.2647, 0.3723, 0.2393, -0.0716, 0.0657, 0.1861,
        0.3250, -0.0492, 0.2155, 0.2256, 0.0627, 0.3173, 0.1867, 0.0525, 0.1661, 0.3169, 
        -0.0311, 0.3047, 0.0762, 0.1008, 0.0132, 0.3758, 0.2296, 0.3336, 0.2858, 0.2104, 
        -0.091, -0.1189, -0.2210, 0.2868, 0.1088, 0.0491, 0.1579, 0.0549, -0.37, 0.2646,
        0.1506, 0.0211, 0.16, 0.3239, 0.1369, 0.0138, 0.1196, 0.2183, -0.0438, 0.3149,
        0.1840
    ];

    if (startYear <= maxYear) {
        var startIndex = startingIndex(startYear);

        for (var i = startIndex; i < (startIndex + savingLast); i++) {
            average = average + iraAnnualRate[i];

            if (i == (startIndex + savingLast - 1)) {
                average = (average / savingLast * 100).toFixed(2);
            }
        }
        document.getElementById("averageAnnualReturn").value = average.toString() + " %";
    } else {
        document.getElementById("averageAnnualReturn").value = "N/A";
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Find the index for the starting year

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function startingIndex(startYear) {
    var yearArray = [1926, 1927, 1928, 1929,
        1930, 1931, 1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939,
        1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949,
        1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959,
        1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969,
        1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979,
        1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989,
        1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,
        2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009,
        2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
        2020
    ];

    var startYearIndex;

    for (var i = 0; i < yearArray.length; i++) {
        if (startYear == yearArray[i]) {
            startYearIndex = i;
        }
    }

    return startYearIndex;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Make the x-axis array for plotting later

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function makeAgeArray(retireAge, savingLast) {
    var ageArray = [];

    for (var i = 0; i <= savingLast; i++) {
        ageArray[i] = retireAge + i;
    }
    return ageArray;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Does the calculation

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function calculations() {
    var balance = parseFloat(document.getElementById("initialBalance").value); // initial balance amount
    var withdraw = parseFloat(document.getElementById("withdraw").value); // annual withdraw amount
    var inflationPercentage = parseFloat(document.getElementById("inflationPercentage").value); // inflation rate
    var savingLast = parseFloat(document.getElementById("savingLast").value); // length of saving, year
    var retireAge = parseFloat(document.getElementById("retireAge").value); // age for retiring
    var startYear = parseFloat(document.getElementById("startYear").value); // starting year for investment

    inflation = inflationPercentage / 100;

    // S&P 500 rate
    var iraAnnualRate = [0.1162, 0.3749, 0.4361, -0.0842, 
        -0.2490, -0.4334, -0.0819, 0.5399, -0.0144, 0.4767, 0.3392, -0.3503, 0.3112, -0.0041, 
        -0.0978, -0.1159, 0.2034, 0.2590, 0.1975, 0.3644, -0.0807, 0.0571, 0.0550, 0.1879,
        0.3171, 0.2402, 0.1837, -0.0099, 0.5262, 0.3156, 0.0656, -0.1078, 0.4336, 0.1196,
        0.0047, 0.2689, -0.0873, 0.2280, 0.1648, 0.1245, -0.1006, 0.2398, 0.1106, -0.0850,
        0.0401, 0.1431, 0.1898, -0.1469, -0.2647, 0.3723, 0.2393, -0.0716, 0.0657, 0.1861,
        0.3250, -0.0492, 0.2155, 0.2256, 0.0627, 0.3173, 0.1867, 0.0525, 0.1661, 0.3169, 
        -0.0311, 0.3047, 0.0762, 0.1008, 0.0132, 0.3758, 0.2296, 0.3336, 0.2858, 0.2104, 
        -0.091, -0.1189, -0.2210, 0.2868, 0.1088, 0.0491, 0.1579, 0.0549, -0.37, 0.2646,
        0.1506, 0.0211, 0.16, 0.3239, 0.1369, 0.0138, 0.1196, 0.2183, -0.0438, 0.3149,
        0.1840
    ];

    // RMD rating startig at 72 yrs old
    var RMD = [25.6, 24.7, 23.8, 22.9, 22.0, 21.2, 20.3, 19.5, 18.7,
        17.9, 17.1, 16.3, 15.5, 14.8, 14.1, 13.4, 12.7, 12.0, 11.4,
        10.8, 10.2, 9.6, 9.1, 8.6, 8.1, 7.6, 7.1, 6.7, 6.3,
        5.9, 5.5, 5.2, 4.9, 4.5, 4.2, 3.9, 3.7, 3.4, 3.1,
        2.9, 2.6, 2.4, 2.1, 1.9, 1.9, 1.9, 1.9, 1.9, 1.9, 1.9, 1.9, 1.9, 1.9, 1.9
    ];

    // gives the starting index so we know what data to grab
    var startYearIndex = startingIndex(startYear);

    // getting the age array for plotting (x axis)
    var ageArray = makeAgeArray(retireAge, savingLast);

    // assigning variables
    var balanceArray = [];
    var withdrawArray = [];
    var count = startYearIndex;
    var totalWithdraw = 0;
    var tempWithdraw = withdraw;

    var ageCount;
    var RMDAmount;
    var endBalance;
    var age = retireAge;

    /* 
    Calculating the Annual Withdraw
    */

    for (var i = 0; i <= savingLast; i++) {
        if (age >= 72) {
            ageCount = age - 72;
        }

        if (age < 72) {
            if (i == 0) {
                balanceArray[i] = balance;
            } else if (i == 1) {
                if (balanceArray[i - 1] > tempWithdraw) {
                    balanceArray[i] = (balanceArray[i - 1] - tempWithdraw) * (1 + iraAnnualRate[count]);
                    withdrawArray[i - 1] = tempWithdraw;
                    totalWithdraw = totalWithdraw + tempWithdraw;
                } else {
                    balanceArray[i] = 0;
                    withdrawArray[i - 1] = balanceArray[i - 1];
                    totalWithdraw = totalWithdraw + balanceArray[i - 1];
                }
                count++;
                age++;
            } else {
                tempWithdraw = tempWithdraw * (1 + inflation);

                if (balanceArray[i - 1] > tempWithdraw) {
                    balanceArray[i] = (balanceArray[i - 1] - tempWithdraw) * (1 + iraAnnualRate[count])
                    withdrawArray[i - 1] = tempWithdraw;
                    totalWithdraw = totalWithdraw + tempWithdraw;
                } else {
                    balanceArray[i] = 0;
                    withdrawArray[i - 1] = balanceArray[i - 1];
                    totalWithdraw = totalWithdraw + balanceArray[i - 1];
                }
                count++;
                age++;
            }
            // end of if (retireAge < 72)
        }

        // if retireAge is greater than or equal to 72
        else {
            if (i == 0) {
                balanceArray[i] = balance;
            } else if (i == 1) {
                RMDAmount = balanceArray[i - 1] / RMD[ageCount];

                if (tempWithdraw > RMDAmount) {
                    if (balanceArray[i - 1] > tempWithdraw) {
                        balanceArray[i] = (balanceArray[i - 1] - tempWithdraw) * (1 + iraAnnualRate[count])
                        withdrawArray[i - 1] = tempWithdraw;
                        totalWithdraw = totalWithdraw + tempWithdraw;
                    } else {
                        balanceArray[i] = 0;
                        withdrawArray[i - 1] = balanceArray[i - 1];
                        totalWithdraw = totalWithdraw + balanceArray[i - 1];
                    }
                } else {
                    if (balanceArray[i - 1] > RMDAmount) {
                        balanceArray[i] = (balanceArray[i - 1] - RMDAmount) * (1 + iraAnnualRate[count])
                        withdrawArray[i - 1] = RMDAmount;
                        totalWithdraw = totalWithdraw + RMDAmount;
                    } else {
                        balanceArray[i] = 0;
                        withdrawArray[i - 1] = balanceArray[i - 1];
                        totalWithdraw = totalWithdraw + balanceArray[i - 1];
                    }
                }
                count++;
                age++;
            } else {
                tempWithdraw = tempWithdraw * (1 + inflation)
                RMDAmount = balanceArray[i - 1] / RMD[ageCount];

                if (tempWithdraw > RMDAmount) {
                    if (balanceArray[i - 1] > tempWithdraw) {
                        balanceArray[i] = (balanceArray[i - 1] - tempWithdraw) * (1 + iraAnnualRate[count])
                        withdrawArray[i - 1] = tempWithdraw;
                        totalWithdraw = totalWithdraw + tempWithdraw;
                    } else {
                        balanceArray[i] = 0;
                        withdrawArray[i - 1] = balanceArray[i - 1];
                        totalWithdraw = totalWithdraw + balanceArray[i - 1];
                    }
                } else {
                    if (balanceArray[i - 1] > RMDAmount) {
                        balanceArray[i] = (balanceArray[i - 1] - RMDAmount) * (1 + iraAnnualRate[count])
                        withdrawArray[i - 1] = RMDAmount;
                        totalWithdraw = totalWithdraw + RMDAmount;
                    } else {
                        balanceArray[i] = 0;
                        withdrawArray[i - 1] = balanceArray[i - 1];
                        totalWithdraw = totalWithdraw + balanceArray[i - 1];
                    }
                }
                count++;
                age++;
            }
        }

        if (i == savingLast) {
            withdrawArray[i] = 0;
            totalWithdraw = totalWithdraw.toFixed(0);
            endBalance = balanceArray[i].toFixed(0);
        }

        // end of for (var i = 0; i <= savingLast; i++)
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /*
    Caculating the Modified Withdraw.
    If the ira is below 0 then we do not withdraw
    */

    var balanceArray2 = [];
    var withdrawArray2 = [];
    count = startYearIndex;
    var totalWithdraw2 = 0;
    tempWithdraw = withdraw;
    var endBalance2;
    age = retireAge;

    for (var i = 0; i <= savingLast; i++) {
        if (age >= 72) {
            ageCount = age - 72;
        }

        if (age < 72) {
            if (i == 0) {
                balanceArray2[i] = balance;
            } else if (i == 1) {
                if (balanceArray2[i - 1] > tempWithdraw) {
                    balanceArray2[i] = (balanceArray2[i - 1] - tempWithdraw) * (1 + iraAnnualRate[count]);
                    withdrawArray2[i - 1] = tempWithdraw;
                    totalWithdraw2 = totalWithdraw2 + tempWithdraw;
                } else {
                    balanceArray2[i] = 0;
                    withdrawArray2[i - 1] = balanceArray2[i - 1];
                    totalWithdraw2 = totalWithdraw2 + balanceArray2[i - 1];
                }
                count++;
                age++;
            } else {
                tempWithdraw = tempWithdraw * (1 + inflation);
                if (iraAnnualRate[count - 1] < 0) {
                    balanceArray2[i] = balanceArray2[i - 1] * (1 + iraAnnualRate[count])
                    withdrawArray2[i - 1] = 0;
                } else {
                    if (balanceArray2[i - 1] > tempWithdraw) {
                        balanceArray2[i] = (balanceArray2[i - 1] - tempWithdraw) * (1 + iraAnnualRate[count])
                        withdrawArray2[i - 1] = tempWithdraw;
                        totalWithdraw2 = totalWithdraw2 + tempWithdraw;
                    } else {
                        balanceArray2[i] = 0;
                        withdrawArray2[i - 1] = balanceArray2[i - 1];
                        totalWithdraw2 = totalWithdraw2 + balanceArray2[i - 1];
                    }
                }
                count++;
                age++;
            }
            // end of if (retireAge < 72)
        }

        // if retireAge is greater than or equal to 72
        else {
            if (i == 0) {
                balanceArray2[i] = balance;
            } else if (i == 1) {
                RMDAmount = balanceArray2[i - 1] / RMD[ageCount];

                if (tempWithdraw > RMDAmount) {
                    if (balanceArray2[i - 1] > tempWithdraw) {
                        balanceArray2[i] = (balanceArray2[i - 1] - tempWithdraw) * (1 + iraAnnualRate[count])
                        withdrawArray2[i - 1] = tempWithdraw;
                        totalWithdraw2 = totalWithdraw2 + tempWithdraw;
                    } else {
                        balanceArray2[i] = 0;
                        withdrawArray2[i - 1] = balanceArray2[i - 1];
                        totalWithdraw2 = totalWithdraw2 + balanceArray2[i - 1];
                    }
                } else {
                    if (balanceArray2[i - 1] > RMDAmount) {
                        balanceArray2[i] = (balanceArray2[i - 1] - RMDAmount) * (1 + iraAnnualRate[count])
                        withdrawArray2[i - 1] = RMDAmount;
                        totalWithdraw2 = totalWithdraw2 + RMDAmount;
                    } else {
                        balanceArray2[i] = 0;
                        withdrawArray2[i - 1] = balanceArray2[i - 1];
                        totalWithdraw2 = totalWithdraw2 + balanceArray2[i - 1];
                    }
                }
                count++;
                age++;
            } else {
                tempWithdraw = tempWithdraw * (1 + inflation)
                RMDAmount = balanceArray2[i - 1] / RMD[ageCount];

                if (iraAnnualRate[count - 1] < 0) {
                    if (balanceArray2[i - 1] > RMDAmount) {
                        balanceArray2[i] = (balanceArray2[i - 1] - RMDAmount) * (1 + iraAnnualRate[count])
                        withdrawArray2[i - 1] = RMDAmount;
                        totalWithdraw2 = totalWithdraw2 + RMDAmount;
                    } else {
                        balanceArray2[i] = 0;
                        withdrawArray2[i - 1] = balanceArray2[i - 1];
                        totalWithdraw2 = totalWithdraw2 + balanceArray2[i - 1];
                    }
                } else {
                    if (tempWithdraw > RMDAmount) {
                        if (balanceArray2[i - 1] > tempWithdraw) {
                            balanceArray2[i] = (balanceArray2[i - 1] - tempWithdraw) * (1 + iraAnnualRate[count])
                            withdrawArray2[i - 1] = tempWithdraw;
                            totalWithdraw2 = totalWithdraw2 + tempWithdraw;
                        } else {
                            balanceArray2[i] = 0;
                            withdrawArray2[i - 1] = balanceArray2[i - 1];
                            totalWithdraw2 = totalWithdraw2 + balanceArray2[i - 1];
                        }
                    } else {
                        if (balanceArray2[i - 1] > RMDAmount) {
                            balanceArray2[i] = (balanceArray2[i - 1] - RMDAmount) * (1 + iraAnnualRate[count])
                            withdrawArray2[i - 1] = RMDAmount;
                            totalWithdraw2 = totalWithdraw2 + RMDAmount;
                        } else {
                            balanceArray2[i] = 0;
                            withdrawArray2[i - 1] = balanceArray2[i - 1];
                            totalWithdraw2 = totalWithdraw2 + balanceArray2[i - 1];
                        }
                    }
                }
                count++;
                age++;
            }
        }


        if (i == savingLast) {
            withdrawArray2[i] = 0;
            totalWithdraw2 = totalWithdraw2.toFixed(0);
            endBalance2 = balanceArray2[i].toFixed(0);
        }
        // end of for (var i = 0; i <= savingLast; i++)
    }

    /*
    Make all the elements in the array whole numbers
    */
    for (var i = 0; i < balanceArray.length; i++) {
        balanceArray[i] = balanceArray[i].toFixed(0);
        withdrawArray[i] = withdrawArray[i].toFixed(0);
        balanceArray2[i] = balanceArray2[i].toFixed(0);
        withdrawArray2[i] = withdrawArray2[i].toFixed(0);
    }

    document.getElementById("eb1").value = endBalance;
    document.getElementById("tw1").value = totalWithdraw;
    document.getElementById("eb2").value = endBalance2;
    document.getElementById("tw2").value = totalWithdraw2;

    return [ageArray, balanceArray, withdrawArray, balanceArray2, withdrawArray2];
}

var ctx = document.getElementById('myChart').getContext("2d");
var chart1 = null;

var ctx2 = document.getElementById('myChart2').getContext("2d");
var chart2 = null;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Check to see if the input is valid, if yes then continue to the chart making

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.getElementById("check").addEventListener('click', () => {
    var balance = parseFloat(document.getElementById("initialBalance").value); // initial balance amount
    var withdraw = parseFloat(document.getElementById("withdraw").value); // annual withdraw amount
    var inflationPercentage = parseFloat(document.getElementById("inflationPercentage").value); // inflation rate
    var savingLast = parseFloat(document.getElementById("savingLast").value); // length of saving, year
    var retireAge = parseFloat(document.getElementById("retireAge").value); // age for retiring
    var startYear = parseFloat(document.getElementById("startYear").value); // starting year for investment

    var a = document.forms["iraForm"]["initialBalance"].value;
    var b = document.forms["iraForm"]["withdraw"].value;
    var c = document.forms["iraForm"]["inflationPercentage"].value;
    var d = document.forms["iraForm"]["savingLast"].value;
    var e = document.forms["iraForm"]["retireAge"].value;
    var f = document.forms["iraForm"]["startYear"].value;

    if (a == "" || b == "" || c == "" || d == "" || e == "" || f == "") {
        alert("Please Fill All Required Field");
    }


    if (balance >= 0 && balance <= 10000000 && withdraw >= 0 && withdraw <= 10000000 && inflationPercentage >= 0 &&
        inflationPercentage <= 100 && savingLast >= 1 && savingLast <= 50 && retireAge >= 60 && retireAge <= 72 &&
        startYear >= 1926 && startYear <= 2020 - savingLast + 1) {

        if (chart1 != null) {
            chart1.destroy();
        }

        if (chart2 != null) {
            chart2.destroy();
        }

        [ageArray, balanceArray, withdrawArray, balanceArray2, withdrawArray2] = calculations();

        var myData = {
            labels: ageArray,
            datasets: [{
                    data: balanceArray,
                    label: "IRA Balance",
                    borderColor: "rgb(62,149,205)",
                    backgroundColor: "rgb(62,149,205,0.1)",
                    borderWidth: 1,
                },
                {
                    data: withdrawArray,
                    label: "Annual Withdrawal",
                    borderColor: "rgb(60,186,159)",
                    backgroundColor: "rgb(60,186,159,0.1)",
                    borderWidth: 1,
                }
            ],
        }

        chart1 = new Chart(ctx, {
            type: 'bar',
            data: myData,

            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'With Annual Withdrawals',
                        font: {
                            size: 20
                        },
                        color: "black"
                    },
                },

                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "Age (yrs. old)",
                            size: 100,
                            font: {
                                size: 15,
                                style: "bold"
                            }
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: "Money ($)",
                            font: {
                                size: 15
                            }
                        }
                    }
                }
            }
        });

        var myData2 = {
            labels: ageArray,
            datasets: [{
                    data: balanceArray2,
                    label: "IRA Balance",
                    borderColor: "rgb(62,149,205)",
                    backgroundColor: "rgb(62,149,205,0.1)",
                    borderWidth: 1,
                },
                {
                    data: withdrawArray2,
                    label: "Opitmal Withdrawal",
                    borderColor: "rgb(60,186,159)",
                    backgroundColor: "rgb(60,186,159,0.1)",
                    borderWidth: 1,
                }
            ],
        }

        chart2 = new Chart(ctx2, {
            type: 'bar',
            data: myData2,

            options: {
                maintainAspectRatio: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Modified Withdrawal Strategy',
                        font: {
                            size: 20
                        },
                        color: "black"
                    },
                },

                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "Age (yrs. old)",
                            size: 100,
                            font: {
                                size: 15,
                                style: "bold"
                            }
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: "Money ($)",
                            font: {
                                size: 15
                            }
                        }
                    }
                }
            }
        });
        document.getElementById("annualResults").style.display = "block";
        document.getElementById("optimalResults").style.display = "block";
        document.getElementById("buttonContainer").style.display = "inline";
    }
});

function printChart() {
    var fname = document.getElementById("fname");
    var lname = document.getElementById("lname");
    var phoneNumber = document.getElementById("phone");

    fname.addEventListener('input', () => {
        fname.setCustomValidity('');
        fname.checkValidity();
    });

    fname.addEventListener('invalid', () => {
        if (fname.value === '') {
            fname.setCustomValidity('Enter first name!');
        }
    });

    lname.addEventListener('input', () => {
        lname.setCustomValidity('');
        lname.checkValidity();
    });

    lname.addEventListener('invalid', () => {
        if (lname.value === '') {
            lname.setCustomValidity('Enter last name!');
        }
    });

    phoneNumber.addEventListener('input', () => {
        phoneNumber.setCustomValidity('');
        phoneNumber.checkValidity();
    });

    phoneNumber.addEventListener('invalid', () => {
        if (phoneNumber.value === '') {
            phoneNumber.setCustomValidity('Enter phone number!');
        } else {
            phoneNumber.setCustomValidity('Enter phone number in this format: 123-456-7890');
        }
    });

    var phone = document.getElementById("phone").value

    if (phone[3] == "-" && phone[7] == "-" && phone.length == 12) {
        document.getElementById("printerModal").style.display = "none";
        window.print();
    }
}