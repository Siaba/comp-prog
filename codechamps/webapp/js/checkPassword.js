          	function checkPassword() {
          		var getPassword = document.getElementById("password");
          		var getRePassword = document.getElementById("password_reentered");
          		var password1 = getPassword.value;
          		var password2 = getRePassword.value;
          		var text = "";
              if (password1.match(/\s/g)) {
                text = "* Please enter a password without whitespace characters.";
                text = text.fontcolor("red");
              document.getElementById("firstPasswordWrong").innerHTML = text;
        }
          		//password1 = password1.replace(/\s+/g, '');
          		//password2 = password2.replace(/\s+/g, '');

          		if (password2.length == 0) {
				text = "* Please enter a password.";
          		text = text.fontcolor("red");
         		document.getElementById("passwordWrong").innerHTML = text;
				}

          		else if (password1 != password2) {
          			text = "* Passwords do not match. Please Retype.";
          			text = text.fontcolor("red");
         			document.getElementById("passwordWrong").innerHTML = text;
          		}
          		else {
         			document.getElementById("passwordWrong").innerHTML = text;
         		}
          	}
