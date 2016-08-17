(function(exports){

  function describe(description, blockToCheck) {
    printDescribeHeader(description);
    blockToCheck();
    printDescribeFooter();
  }

  function it(description, blockToCheck) {
    printItHeader();
    try {
      blockToCheck();
      printDescription(true, description);
    }
    catch (error) {
      printDescription(false, description);
      printErrorStack(error.stack);
    }
    finally {
      printItFooter();
    }
  }

  function isTrue(assertionToCheck) {
    if (!assertionToCheck) {
      throw new Error(formatErrorMessage("false", "true"));
    }
  }
  function isFalse(assertionToCheck) {
    if (assertionToCheck) {
      throw new Error(formatErrorMessage("true", "false"));
    }
  }
  function isEqual(got, expected) {
    if (got !== expected) {
      throw new Error(formatErrorMessage(got, expected));
    }
  }

  function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
  }

  function formatErrorMessage(got, expected) {
    return "Received: " + escapeHtml(got) + '\n' +
           "        Expected: " + escapeHtml(expected);
  }

  function printDescription(didPass, description) {
    if (didPass) {
      document.write('<p class="text-success"> <span class="glyphicon glyphicon-ok" aria-hidden="true"></span> ' +
                    description + '</p>');
    } else {
      document.write('<p class="text-danger"> <span class="glyphicon glyphicon-remove" aria-hidden="true"></span> ' +
                    description + '</p>');
    }
  }

  function printErrorStack(stack) {
    document.write('<pre class="text-warning"> ' + stack + '</pre>');
  }

  function printDescribeHeader(description) {
    document.write('<div class="text-left container" ><h3 class="text-primary">' + description + '</h3>');
  }

  function printDescribeFooter() {
    document.write('</div><hr>');
  }

  function printItHeader() {
    document.write('<div class="container">');
  }

  function printItFooter() {
    document.write('</div>');
  }

  exports.describe = describe;
  exports.it = it;
  exports.assert = {
    isTrue: isTrue,
    isFalse: isFalse,
    isEqual: isEqual
  };

})(this);