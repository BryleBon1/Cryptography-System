let resultText = '';

function encrypt() {
  var plaintext = document.getElementById("plaintext").value || '';
  var file = document.getElementById("fileInput").files[0];
  var shift = parseInt(document.getElementById("shift").value);

  if (file) {
    var reader = new FileReader();

    reader.onload = function (event) {
      var fileText = event.target.result;
      var combinedText = plaintext + fileText;
      var ciphertext = applyCaesarCipher(combinedText, shift);

      setResultText(ciphertext);
    };

    reader.readAsText(file);
  } else {
    var ciphertext = applyCaesarCipher(plaintext, shift);
    setResultText(ciphertext);
  }
}

function decrypt() {
  var ciphertext = document.getElementById("plaintext").value || '';
  var file = document.getElementById("fileInput").files[0];
  var shift = parseInt(document.getElementById("shift").value);

  if (file) {
    var reader = new FileReader();

    reader.onload = function (event) {
      var fileText = event.target.result;
      var combinedText = ciphertext + fileText;
      var plaintext = applyCaesarCipher(combinedText, -shift);

      setResultText(plaintext);
    };

    reader.readAsText(file);
  } else {
    var plaintext = applyCaesarCipher(ciphertext, -shift);
    setResultText(plaintext);
  }
}

function applyCaesarCipher(text, shift) {
  var result = "";

  for (var i = 0; i < text.length; i++) {
    var charCode = text.charCodeAt(i);

    if (charCode >= 48 && charCode <= 57) { // Digits 0-9
      result += String.fromCharCode(((charCode - 48 + shift) % 10) + 48);
    } else if (charCode >= 65 && charCode <= 90) { // Uppercase letters
      result += String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
    } else if (charCode >= 97 && charCode <= 122) { // Lowercase letters
      result += String.fromCharCode(((charCode - 97 + shift) % 26) + 97);
    } else {
      result += text.charAt(i);
    }
  }

  return result;
}

function setResultText(text) {
  resultText = text;
  document.getElementById("result").value = resultText;
}

function saveResult() {
  if (resultText) {
    var element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(resultText));
    element.setAttribute("download", "result.txt");

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
}

function clearFields() {
  document.getElementById("plaintext").value = "";
  document.getElementById("fileInput").value = "";
  document.getElementById("shift").value = "";
  document.getElementById("result").value = "";
}
