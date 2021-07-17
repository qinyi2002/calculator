var ctx3 = document.getElementById('myChart3').getContext("2d");
var chart3 = null;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Auto change the withdrawal rate %

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function calcRate() {
    var initialBalance = parseFloat(document.getElementById("initialBalanceFuture").value);
    var withdraw = parseFloat(document.getElementById("withdrawFuture").value);
    var rate = "0.00 %";

    if (initialBalance > 0 && withdraw > 0) {
        rate = withdraw / initialBalance * 100;
        rate = rate.toFixed(2); // making the number have 2 decimal places
        rate = rate.toString() + " %";
        document.getElementById("rateFuture").value = rate;
    } else {
        document.getElementById("rateFuture").value = "N/A";
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Monte Carlo Simulation

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function monteCarloSimulation() {
    var initialBalance = parseFloat(document.getElementById("initialBalanceFuture").value); // initial balance amount
    var withdraw = parseFloat(document.getElementById("withdrawFuture").value); // annual withdraw amount
    var inflationPercentage = parseFloat(document.getElementById("inflationPercentageFuture").value); // inflation rate
    var savingLast = parseFloat(document.getElementById("savingLastFuture").value); // length of saving, year
    var retireAge = parseFloat(document.getElementById("retireAgeFuture").value); // age for retiring

    var stockPercentage = parseFloat(document.getElementById("stock").value); // stock percentage
    var bondPercentage = parseFloat(document.getElementById("bond").value); // bond percentage
    var cashPercentage = parseFloat(document.getElementById("cash").value); // cash percentage

    var simulate = 10000;

    var inflation = inflationPercentage / 100;
    var stock = stockPercentage / 100;
    var bond = bondPercentage / 100;
    var cash = cashPercentage / 100;

    // year Array
    var yearArray = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    ];

    // S&P 500 rate
    var iraAnnualRate = [0.4361, -0.0842, 
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

    var aaa = [0.0328, 0.0414, 
        0.0586, -0.0156, 0.1107, 0.0530, 0.1015, 0.0690, 0.0633, 0.0217, 0.0431, 0.0428,
        0.0493, 0.0193, 0.0271, 0.0342, 0.0309, 0.0348, 0.0261, 0.0046, 0.0346, 0.0462,
        0.0180, -0.0023, 0.0335, 0.0161, 0.0510, 0.0078, -0.0178, 0.0326, 0.0163, 0.0014,
        0.0641, 0.0379, 0.0586, 0.0336, 0.0364, 0.0256, -0.0070, -0.0045, 0.0432, -0.0218,
        0.0827, 0.1035, 0.0844, 0.0300, -0.0012, 0.0954, 0.1423, 0.0658, 0.0201, -0.0025,
        -0.0255, 0.0794, 0.2789, 0.0774, 0.1504, 0.2415, 0.2112, -0.0142, 0.1349, 0.1415,
        0.0764, 0.1395, 0.1053, 0.1538, -0.0313, 0.2008, 0.0418, 0.1032, 0.1069, -0.0289,
        0.0992, 0.1033, 0.1085, 0.1063, 0.0675, 0.0623, 0.0575, 0.0404, 0.0888, 0.0345,
        0.0711, 0.1389, 0.0624, -0.0398, 0.1142, 0.0233, 0.0324, 0.0863, -0.0062, 0.1263,
        0.0993];

    var tBill = [0.0428, 0.0316,
        0.0742, 0.1234, 0.1268, 0.0649, -0.0309, -0.0233, -0.0085, -0.0333, 0.0214, 0.0136,
        -0.0068, -0.0474, -0.0954, -0.0527, -0.0124, -0.0185, -0.0746, -0.1205, -0.0617, 0.0211,
        0.0012, -0.0588, -0.0054, 0.0107, 0.0063, 0.0201, 0.0109, -0.0011, -0.0093, 0.0235,
        0.0140, 0.0127, 0.0156, 0.0190, 0.0224, 0.0233, 0.0179, 0.0149, 0.0102, 0.0114,
        0.0052, 0.0004, 0.0077, 0.0080, -0.0290, -0.0309, -0.0073, -0.0116, -0.0041, -0.0107,
        -0.0186, 0.0334, 0.0422, 0.0523, 0.0501, 0.0380, 0.0400, 0.0204, 0.0249, 0.0313,
        0.0199, 0.0109, 0.0039, 0.0004, 0.0160, 0.0261, 0.0202, 0.0266, 0.0318, 0.0240,
        0.0236, 0.0055, 0.0002, -0.0123, -0.0127, -0.0024, 0.0145, 0.0146, -0.0238, 0.0051,
        -0.0148, -0.0301, -0.0194, -0.0139, -0.0156, -0.0007, -0.0093, -0.0117, -0.0049, -0.0072,
        -0.0110];

    // RMD rating startig at 72 yrs old
    var RMD = [25.6, 24.7, 23.8, 22.9, 22.0, 21.2, 20.3, 19.5, 18.7,
        17.9, 17.1, 16.3, 15.5, 14.8, 14.1, 13.4, 12.7, 12.0, 11.4,
        10.8, 10.2, 9.6, 9.1, 8.6, 8.1, 7.6, 7.1, 6.7, 6.3,
        5.9, 5.5, 5.2, 4.9, 4.5, 4.2, 3.9, 3.7, 3.4, 3.1,
        2.9, 2.6, 2.4, 2.1, 1.9, 1.9, 1.9, 1.9, 1.9, 1.9, 1.9, 1.9, 1.9, 1.9, 1.9
    ];

    // assigning variables
    var balanceArray = [];
    var tempWithdraw = withdraw;
    var ageCount;
    var RMDAmount;
    var age = retireAge;

    var percentageArray = [];
    var success = 0;
    var randomIndex;

    var successPercentage;
    var failPercentage;

    var rates;
    var randomAAA;
    var randomTBill;

    // annual withdrawal
    for (var k = 0; k < 50; k++) {
        success = 0;

        for (var t = 0; t < simulate; t++) {
            balanceArray = [];
            tempWithdraw = withdraw;
            age = retireAge;

            for (var i = 0; i <= k; i++) {
                randomIndex = Math.floor(Math.random() * 93); // index 0 to 94
                randomAAA = Math.floor(Math.random() * 93); // index 0 to 93
                randomTBill = Math.floor(Math.random() * 93); // index 0 to 93

                rates = 1 + stock * iraAnnualRate[randomIndex] + bond * aaa[randomAAA] + cash * tBill[randomTBill];

                if (age >= 72) {
                    ageCount = age - 72;
                }

                if (age < 72) {
                    if (i == 0) {
                        balanceArray[i] = (initialBalance - tempWithdraw) * rates;
                    } else {
                        tempWithdraw = tempWithdraw * (1 + inflation);
                        balanceArray[i] = (balanceArray[i - 1] - tempWithdraw) * rates;
                    }
                    // end of if (retireAge < 72)
                }

                // if retireAge is greater than or equal to 72
                else {
                    if (i == 0) {
                        RMDAmount = initialBalance / RMD[ageCount];

                        if (tempWithdraw > RMDAmount) {
                            balanceArray[i] = (initialBalance - tempWithdraw) * rates;
                        } else {
                            balanceArray[i] = (initialBalance - RMDAmount) * rates;
                        }
                    } else {
                        tempWithdraw = tempWithdraw * (1 + inflation);
                        RMDAmount = balanceArray[i - 1] / RMD[ageCount];

                        if (tempWithdraw > RMDAmount) {
                            balanceArray[i] = (balanceArray[i - 1] - tempWithdraw) * rates;
                        } else {
                            balanceArray[i] = (balanceArray[i - 1] - RMDAmount) * rates;
                        }
                    }
                }
                age++;
                // end of calculation 
            }
            if (balanceArray[k] > 0) {
                success++;
            }
        } // end of 1000 times

        successPercentage = success / simulate * 100;
        successPercentage = successPercentage.toFixed(0);
        percentageArray[k] = successPercentage;
    } // end of 50 times

    failPercentage = 100 - percentageArray[savingLast - 1];
    document.getElementById("result1").value = percentageArray[savingLast - 1].toString() + " %";
    document.getElementById("result2").value = failPercentage.toString() + " %";

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /*
    Caculating the Modified Withdraw.
    If the ira is below 0 then we do not withdraw
    */

    var balanceArray2 = [];
    var percentageArray2 = [];
    var previousIndex;

    for (var k = 0; k < 50; k++) {
        success = 0;
        fail = 0;

        for (var t = 0; t < simulate; t++) {
            balanceArray2 = [];
            tempWithdraw = withdraw;
            age = retireAge;

            for (var i = 0; i <= k; i++) {
                randomIndex = Math.floor(Math.random() * 93);
                randomAAA = Math.floor(Math.random() * 93); // index 0 to 93
                randomTBill = Math.floor(Math.random() * 93); // index 0 to 93

                rates = 1 + stock * iraAnnualRate[randomIndex] + bond * aaa[randomAAA] + cash * tBill[randomTBill];

                if (age >= 72) {
                    ageCount = age - 72;
                }

                if (age < 72) {
                    if (i == 0) {
                        balanceArray2[i] = (initialBalance - tempWithdraw) * rates;
                    } else {
                        tempWithdraw = tempWithdraw * (1 + inflation);
                        if (iraAnnualRate[previousIndex] < 0) {
                            balanceArray2[i] = balanceArray2[i - 1] * rates;
                        } else {
                            balanceArray2[i] = (balanceArray2[i - 1] - tempWithdraw) * rates;
                        }
                    }
                    // end of if (retireAge < 72)
                }

                // if retireAge is greater than or equal to 72
                else {
                    if (i == 0) {
                        RMDAmount = initialBalance / RMD[ageCount];

                        if (tempWithdraw > RMDAmount) {
                            balanceArray2[i] = (initialBalance - tempWithdraw) * rates;
                        } else {
                            balanceArray2[i] = (initialBalance - RMDAmount) * rates;
                        }
                    } else {
                        tempWithdraw = tempWithdraw * (1 + inflation)
                        RMDAmount = balanceArray2[i - 1] / RMD[ageCount];

                        if (iraAnnualRate[previousIndex] < 0) {
                            balanceArray2[i] = (balanceArray2[i - 1] - RMDAmount) * rates;
                        } else {
                            if (tempWithdraw > RMDAmount) {
                                balanceArray2[i] = (balanceArray2[i - 1] - tempWithdraw) * rates;
                            } else {
                                balanceArray2[i] = (balanceArray2[i - 1] - RMDAmount) * rates;
                            }
                        }
                    }
                }
                age++;
                previousIndex = randomIndex;
            } // end of calculation
            if (balanceArray2[k] > 0) {
                success++;
            }
        } // end of monte carlo simulation

        successPercentage = success / simulate * 100;
        successPercentage = successPercentage.toFixed(0);
        percentageArray2[k] = successPercentage;
    } // end of 50 times

    failPercentage = 100 - percentageArray2[savingLast - 1];
    document.getElementById("result3").value = percentageArray2[savingLast - 1].toString() + " %";
    document.getElementById("result4").value = failPercentage.toString() + " %";
    return [yearArray, percentageArray, percentageArray2];
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Check to see if the input is valid, if yes then continue to the chart making (Monte Carlo Simulation)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.getElementById("check2").addEventListener('click', () => {
    var balance = parseFloat(document.getElementById("initialBalanceFuture").value); // initial balance amount
    var withdraw = parseFloat(document.getElementById("withdrawFuture").value); // annual withdraw amount
    var inflationPercentage = parseFloat(document.getElementById("inflationPercentageFuture").value); // inflation rate
    var savingLast = parseFloat(document.getElementById("savingLastFuture").value); // length of saving, year
    var retireAge = parseFloat(document.getElementById("retireAgeFuture").value); // age for retiring
    
    var stockPercentage = parseFloat(document.getElementById("stock").value); // stock percentage
    var bondPercentage = parseFloat(document.getElementById("bond").value); // bond percentage
    var cashPercentage = parseFloat(document.getElementById("cash").value); // cash percentage

    var a = document.forms["montForm"]["initialBalanceFuture"].value;
    var b = document.forms["montForm"]["withdrawFuture"].value;
    var c = document.forms["montForm"]["inflationPercentageFuture"].value;
    var d = document.forms["montForm"]["savingLastFuture"].value;
    var e = document.forms["montForm"]["retireAgeFuture"].value;

    var f = document.forms["montForm"]["stock"].value;
    var g = document.forms["montForm"]["bond"].value;
    var h = document.forms["montForm"]["cash"].value;

    if (a == "" || b == "" || c == "" || d == "" || e == "" || f =="" || g == "" || h == "") {
        alert("Please Fill All Required Field");
    }
    else if (stockPercentage >= 0 && bondPercentage >= 0 && cashPercentage >= 0 && 
        stockPercentage <= 100 && bondPercentage <= 100 && cashPercentage <= 100) 
    {
        if ( stockPercentage <= 100) {
            document.getElementById("cash").max = 100 - stockPercentage;
            document.getElementById("bond").max = 100 - stockPercentage;
        }
        if ( stockPercentage + bondPercentage <= 100 ) {
            document.getElementById("cash").max = 100 - stockPercentage - bondPercentage;
        }
        else if ( stockPercentage + cashPercentage <= 100 ) {
            document.getElementById("bond").max = 100 - stockPercentage - cashPercentage;
        }
        if ( stockPercentage + bondPercentage + cashPercentage < 100) {
            alert("The percentag of saving for stock, bond, and cash should add up to 100%");
        }
    }

    if (balance >= 0 && balance <= 10000000 && withdraw >= 0 && withdraw <= 10000000 && inflationPercentage >= 0 &&
        inflationPercentage <= 100 && savingLast >= 1 && savingLast <= 50 && retireAge >= 60 && retireAge <= 72 && 
        (stockPercentage + bondPercentage + cashPercentage == 100) && 
        stockPercentage >= 0 && bondPercentage >= 0 && cashPercentage >= 0) {

        [yearArray, percentageArray, percentageArray2] = monteCarloSimulation();

        if (chart3 != null) {
            chart3.destroy();
        }

        var myData = {
            labels: yearArray,
            datasets: [{
                    data: percentageArray,
                    label: "Annual Withdrawal",
                    borderColor: "rgb(62,149,205)",
                    backgroundColor: "rgb(62,149,205,0.1)",
                    borderWidth: 1,
                    lineTension: 0.5,
                },
                {
                    data: percentageArray2,
                    label: "Modified Withdrawal",
                    borderColor: "rgb(60,186,159)",
                    backgroundColor: "rgb(60,186,159,0.1)",
                    borderWidth: 1,
                    lineTension: 0.5,
                },
            ],
        }

        chart3 = new Chart(ctx3, {
            type: 'line',
            data: myData,

            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Successful Rate Future Retirement Plan',
                        font: {
                            size: 20
                        },
                        color: "black"
                    },
                },
                elements: {
                    line: {
                        tension: 0 // disables bezier curves
                    }
                },
                scales: {

                    x: {
                        title: {
                            display: true,
                            text: "Years",
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
                            text: "Percentage %",
                            font: {
                                size: 15
                            }
                        },
                        beginAtZero: true,
                    }
                }
            }

        });

        //chart3.config.data = myData;   
        //chart3.update();

        document.getElementById("resultValues2").style.display = "block";
        document.getElementById("buttonContainer").style.display = "inline";
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Check to see if the input is valid, if yes then continue printing

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

    var phone = document.getElementById("phone").value;

    if (phone[3] == "-" && phone[7] == "-" && phone.length == 12 && fname.value != "" && lname.value != "") {
        document.getElementById("printerModal").style.display = "none";
        window.print();
    }
}