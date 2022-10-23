function byId(id) {
    return document.getElementById(id);
}

function roundNum(value, decimalPoints) {
    let num = Math.round(value * Math.pow(10, decimalPoints)) / Math.pow(10, decimalPoints);
    return num % 1 === 0 && (num += ".0"), num;
}

function convertToPercentString(val) {
    return this.roundNum(val * 100, 1) + "%";
}

//metric - height in cm and weight in kg
function getBMI(height, weight, isImperial) {
    weight = parseInt(weight);
    if (isImperial) {
        weight /= 2.205;
        let arr = height.split("'");
        let ft = parseInt(arr[0]);
        let inches = parseInt(arr[1]);
        height = (inches + ft * 12) * 2.54;
    } else {
        height = parseInt(height);
    }

    let bmi = weight / Math.pow((height / 100), 2);
    return roundNum(bmi, 1);
}

function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }
}

function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function () {
        console.log('Async: Copying to clipboard was successful!');
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });
}