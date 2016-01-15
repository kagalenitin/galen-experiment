/**
 * Created by nkagale on 1/15/16.
 */
this.LoginPage = function(driver){
  GalenPages.extendPage(this, driver, "Define the objects for Login Page of testapp", {
      loginBlock: "css: #login-page>h2",

    },{
      username:     "css: .form-control[name=\"login.username\"]",
      password:     "css: .form-control[name=\"login.password\"]",
      loginButton:  "css: .btn.btn-lg.btn-primary.button-login",
      cancelButton: "css: .btn btn-lg btn-default button-cancel",
      errorMessage: "id: #login-error-message",

      load: function(){
          return this.waitForIt("30s");
      },

      incorrectUserLogin: function(username, password){
          this.username.typeText(username);
          this.password.typeText(password);
          this.loginButton.click();
      },
  })
};