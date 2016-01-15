/**
 * Created by nkagale on 1/15/16.
 */
this.LandingPage = function(driver){
  GalenPages.extendPage(this, driver, "Define the objects for Landing Page of testapp", {
      logo:             "id: header-logo",
      homeOption:       "css: .middle-wrapper>ul>li:first-child>a",
      myNotesOption:    "css: .middle-wrapper>ul>li:nth-child(2)>a",
      aboutOption:      "css: .middle-wrapper>ul>li:nth-child(3)>a",
      contactOption:    "css: .middle-wrapper>ul>li:last-child>a",
      loginButton:      "css: .btn.btn-lg.btn-primary.button-login",

      load: function(){
        return this.waitForIt("30s");
      }
  });
};