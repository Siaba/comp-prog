        function checkFirstEmail() {
          var getEmail = document.getElementById("oldMail");
          var eMail = getEmail.value;
          eMail = eMail.replace(/\s+/g, '');
          var At = 0;
          var text = "";
      for (var i = 0; i < eMail.length; i++) {
        if(eMail.charAt(i) == "@") {
          At = 1;
        }
      }
      if (!eMail.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) && eMail.length != 0) {
        text = "* Email is not valid. Please retype.";
              text = text.fontcolor("red");
            document.getElementById("originalEmailWrong").innerHTML = text;
      }
      else {
        document.getElementById("originalEmailWrong").innerHTML = text;
      }
        }

          function checkEmail() {
            var getEmail = document.getElementById("mail");
            var getReEmail = document.getElementById("reMail");
            var email1 = getEmail.value;
        var email2 = getReEmail.value;
        var text = "";
        email1 = email1.replace(/\s+/g, '');
        email2 = email2.replace(/\s+/g, '');
            if (email1 != email2) {
              text = "* Emails do not match. Please retype.";
              text = text.fontcolor("red");
            document.getElementById("emailWrong").innerHTML = text;
            }
            else {
              document.getElementById("emailWrong").innerHTML = text;
            }
          }

        function checkNewEmailFirst() {
          var getEmail = document.getElementById("theMail");
          var eMail = getEmail.value;
          eMail = eMail.replace(/\s+/g, '');
          var At = 0;
          var text = "";
      for (var i = 0; i < eMail.length; i++) {
        if(eMail.charAt(i) == "@") {
          At = 1;
        }
      }
      if (!eMail.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) && eMail.length != 0) {
        text = "* Email is not valid. Please retype.";
              text = text.fontcolor("red");
            document.getElementById("originalEmailWrong").innerHTML = text;
      }
      else {
        document.getElementById("originalEmailWrong").innerHTML = text;
      }
        }

          function checkOldPassword() {
            var oldPassword = document.getElementById("old_password").value;
            var newPassword = document.getElementById("new_password").value;
            var text = "";
            if (oldPassword.length == 0 && newPassword.length > 0) {
                text = "* Please enter your old password.";
                text = text.fontcolor("red");
                document.getElementById("oldPasswordWrong").innerHTML = text;
            }
            else {
                document.getElementById("oldPasswordWrong").innerHTML = text;
            }
          }

            function checkFirstPassword() {
              var getPassword = document.getElementById("new_password");
              var password = getPassword.value;
              var capital = 0;
              var number = 0;
              var text = "";
              var whiteSpace = /\s/g;
              if (password.match(/\s/g)) {
                text = "* Please enter a password without whitespace characters.";
                text = text.fontcolor("red");
              document.getElementById("firstPasswordWrong").innerHTML = text;
        }
              else if (password.length == 0) {
                text = "* Please enter a password.";
                text = text.fontcolor("red");
              document.getElementById("firstPasswordWrong").innerHTML = text;
              }
              else if (password.length < 6) {
                text = "* Please enter a password containing at least 6 characters, 1 capital letter and 1 number.";
                text = text.fontcolor("red");
              document.getElementById("firstPasswordWrong").innerHTML = text;
              }
              else if(!password.match((/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/))) {
                text = "* Please enter a password containing at least 1 capital letter and 1 number.";
                text = text.fontcolor("red");
              document.getElementById("firstPasswordWrong").innerHTML = text;
              }
              else {
                document.getElementById("firstPasswordWrong").innerHTML = text;
              }
            }

          function validAge() {
            var getAge = document.getElementById("userAge");
            var age = getAge.value;
            var text = "";
            if(age < 0 || age > 110) {
              text = "* Please enter your real age.";
              text = text.fontcolor("red");
              document.getElementById("ageWrong").innerHTML = text;
            }
            else if(age =='') {
              text = "* Please enter an age.";
              text = text.fontcolor("red");
              document.getElementById("ageWrong").innerHTML = text;
            }
            else if(isNaN(age)) {
              text = "* Please enter your age as a number.";
              text = text.fontcolor("red");
              document.getElementById("ageWrong").innerHTML = text;
            }
            else {
              document.getElementById("ageWrong").innerHTML = text;
            }
          }

          function validUsername() {
            var getUsername = document.getElementById("oldUsername");
            var userName = getUsername.value;
            var newUsername = document.getElementById("newUsername").value;
            var usernameRegexpression = /^[a-zA-Z0-9]+$/;
            var text = "";
            if (userName.length == 0 || newUsername.length > 0) {
              text = "* Please enter your old username.";
              text = text.fontcolor("red");
              document.getElementById("usernameWrong").innerHTML = text;
            }
            else if (userName.length < 6) {
              text = "* Please enter a username containing at least 6 characters.";
              text = text.fontcolor("red");
              document.getElementById("usernameWrong").innerHTML = text;
            }
            else if (!userName.match(usernameRegexpression)) {
              text = "* Illegal character(s) detected. Please use only letters and numbers for your username.";
              text = text.fontcolor("red");
              document.getElementById("usernameWrong").innerHTML = text;
            }
            else {
              document.getElementById("usernameWrong").innerHTML = text;
            }
          }

          function validUsernameNew() {
            var getUsername = document.getElementById("newUsername");
            var newUserName = getUsername.value;
            var usernameRegexpression = /^[a-zA-Z0-9]+$/;
            var text = "";
            if (newUserName.length == 0) {
              text = "* Please enter a new username.";
              text = text.fontcolor("red");
              document.getElementById("newUsernameWrong").innerHTML = text;
            }
            else if (newUserName.length < 6) {
              text = "* Please enter a new username containing at least 6 characters.";
              text = text.fontcolor("red");
              document.getElementById("newUsernameWrong").innerHTML = text;
            }
            else if (!newUserName.match(usernameRegexpression)) {
              text = "* Illegal character(s) detected. Please use only letters and numbers for your username.";
              text = text.fontcolor("red");
              document.getElementById("newUsernameWrong").innerHTML = text;
            }
            else {
              document.getElementById("newUsernameWrong").innerHTML = text;
            }
          }

          function firstNameWrong() {
            var getFirstName = document.getElementById("firstName");
            var firstName = getFirstName.value;
            var firstName = firstName.replace(/\s+/g, '');
            var text = "";
            if (firstName.length == 0) {
              text = "* Please enter a first name.";
              text = text.fontcolor("red");
              document.getElementById("firstNameWrong").innerHTML = text;
            }
            else {
              document.getElementById("firstNameWrong").innerHTML = text;
            }
          }

          function lastNameWrong() {
            var getLastName = document.getElementById("lastName");
            var lastName = getLastName.value;
            var lastName = lastName.replace(/\s+/g, '');
            var text = "";
            if (lastName.length == 0) {
              text = "* Please enter a last name.";
              text = text.fontcolor("red");
              document.getElementById("lastNameWrong").innerHTML = text;
            }
            else {
              document.getElementById("lastNameWrong").innerHTML = text;
            }
          }

      /*function checkBeforeSubmission() {
         var getFirstName = document.getElementById("firstName");
         getFirstName = getFirstName.value.replace(/\s+/g, '');
         var getLastName = document.getElementById("lastName");
         getLastName = getLastName.value.replace(/\s+/g, '');
         var getUsername = document.getElementById("username");
         getUsername = getUsername.value.replace(/\s+/g, '');
         var getEmail = document.getElementById("mail");
         getEmail = getEmail.value.replace(/\s+/g, '');
         var getReEmail = document.getElementById("reMail");
         getReEmail = getReEmail.value.replace(/\s+/g, '');
         var getPassword = document.getElementById("password");
         getPassword = getPassword.value.replace(/\s+/g, '');
         var getRePassword = document.getElementById("password_reentered");
         getRePassword = getRePassword.value.replace(/\s+/g, '');
         var getAge = document.getElementById("userAge");
         getAge = getAge.value.replace(/\s+/g, '');
         var hasErrors = 0;
         if (getFirstName.length == 0 || getLastName.length == 0 || getUsername.length == 0 || getEmail == 0 || getReEmail == 0 || getPassword == 0 || getRePassword == 0) {
          firstNameWrong();
          lastNameWrong();
          validUsername();
          checkFirstEmail();
          checkEmail();
          checkFirstPassword();
          checkPassword();
          validAge();
          hasErrors = 1;
         }
         if (hasErrors > 0) {
          return false;
         }
         else {
          return true;
         }
      }*/

function hiddenValue() {
var optionSelected = document.getElementById("changeWhat").selectedIndex;
if (optionSelected == 0) {
  document.getElementById("oldUsername").type = "text";
  document.getElementById("oldUsernameLabel").className = '';
  document.getElementById("newUsername").type="text";
  document.getElementById("newUsernameLabel").className = '';
  document.getElementById("usernameWrong").innerHTML = '';
  document.getElementById("newUsernameWrong").innerHTML = '';
  document.getElementById("old_password").type="hidden";
  document.getElementById("oldPasswordLabel").className= 'hidden';
  document.getElementById("new_password").type="hidden";
  document.getElementById("newPasswordLabel").className='hidden';
  document.getElementById("new_password_reentered").type="hidden";
  document.getElementById("reNewPasswordLabel").className='hidden';
  document.getElementById("oldMail").type="hidden";
  document.getElementById("oldMailLabel").className='hidden';
  document.getElementById("theMail").type="hidden";
  document.getElementById("mailLabel").className='hidden';
  document.getElementById("reMail").type="hidden";
  document.getElementById("reMailLabel").className='hidden';

}
if (optionSelected == 1) {
  document.getElementById("oldUsername").type="hidden";
  document.getElementById("oldUsernameLabel").className = 'hidden';
  document.getElementById("newUsername").type="hidden";
  document.getElementById("newUsernameLabel").className = 'hidden';
  document.getElementById("old_password").type="password";
  document.getElementById("oldPasswordLabel").className= '';
  document.getElementById("new_password").type="password";
  document.getElementById("newPasswordLabel").className='';
  document.getElementById("new_password_reentered").type="password";
  document.getElementById("reNewPasswordLabel").className='';
  document.getElementById("oldPasswordWrong").innerHTML = '';
  document.getElementById("newPasswordWrong").innerHTML = '';
  document.getElementById("passwordWrong").innerHTML = '';
  document.getElementById("oldMail").type="hidden";
  document.getElementById("oldMailLabel").className='hidden';
  document.getElementById("theMail").type="hidden";
  document.getElementById("mailLabel").className='hidden';
  document.getElementById("reMail").type="hidden";
  document.getElementById("reMailLabel").className='hidden';

}
if (optionSelected == 2) {
  document.getElementById("oldUsername").type="hidden";
  document.getElementById("oldUsernameLabel").className = 'hidden';
  document.getElementById("newUsername").type="hidden";
  document.getElementById("newUsernameLabel").className = 'hidden';
  document.getElementById("old_password").type="hidden";
  document.getElementById("oldPasswordLabel").className= 'hidden';
  document.getElementById("new_password").type="hidden";
  document.getElementById("newPasswordLabel").className='hidden';
  document.getElementById("new_password_reentered").type="hidden";
  document.getElementById("reNewPasswordLabel").className='hidden';
  document.getElementById("oldMail").type="email";
  document.getElementById("oldMailLabel").className='';
  document.getElementById("theMail").type="email";
  document.getElementById("mailLabel").className='';
  document.getElementById("reMail").type="email";
  document.getElementById("reMailLabel").className='';

}
if (optionSelected == 3) {
  document.getElementById("oldMail").type="hidden";
  document.getElementById("oldMailLabel").className='hidden';
  document.getElementById("theMail").type="hidden";
  document.getElementById("mailLabel").className='hidden';
  document.getElementById("reMail").type="hidden";
  document.getElementById("reMailLabel").className='hidden';
  document.getElementById("oldUsername").type = "text";
  document.getElementById("oldUsernameLabel").className = '';
  document.getElementById("newUsername").type="text";
  document.getElementById("newUsernameLabel").className = '';
  document.getElementById("usernameWrong").innerHTML = '';
  document.getElementById("newUsernameWrong").innerHTML = '';
  document.getElementById("old_password").type="password";
  document.getElementById("oldPasswordLabel").className= '';
  document.getElementById("new_password").type="password";
  document.getElementById("newPasswordLabel").className='';
  document.getElementById("new_password_reentered").type="password";
  document.getElementById("reNewPasswordLabel").className='';
  document.getElementById("oldPasswordWrong").innerHTML = '';
  document.getElementById("newPasswordWrong").innerHTML = '';
  document.getElementById("passwordWrong").innerHTML = '';

}
if (optionSelected == 4) {
  document.getElementById("oldUsername").type = "text";
  document.getElementById("oldUsernameLabel").className = '';
  document.getElementById("newUsername").type="text";
  document.getElementById("newUsernameLabel").className = '';
  document.getElementById("usernameWrong").innerHTML = '';
  document.getElementById("newUsernameWrong").innerHTML = '';
  document.getElementById("old_password").type="password";
  document.getElementById("oldPasswordLabel").className= '';
  document.getElementById("new_password").type="password";
  document.getElementById("newPasswordLabel").className='';
  document.getElementById("new_password_reentered").type="password";
  document.getElementById("reNewPasswordLabel").className='';
  document.getElementById("oldPasswordWrong").innerHTML = '';
  document.getElementById("newPasswordWrong").innerHTML = '';
  document.getElementById("passwordWrong").innerHTML = '';
  document.getElementById("oldMail").type="email";
  document.getElementById("oldMailLabel").className='';
  document.getElementById("theMail").type="email";
  document.getElementById("mailLabel").className='';
  document.getElementById("reMail").type="email";
  document.getElementById("reMailLabel").className='';

}
}