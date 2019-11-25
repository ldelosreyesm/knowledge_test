Feature: Login and send messages
Send an email, logging in previously. Send with CC, BCC and to the same sender and verify. Discard the draft and delete the first message from the inbox

  Scenario: As a user, i want login on gmail with correct password
    Given the user is on gmail login page
    When the user fill the mail field and put correct password
    Then the user go to main page
    
  Scenario: As a user, i want open form for new email and send with basic fields
    When the user is on main page, make clic on compose
    Then the user fill the basic fields
    And send the mail
    
  Scenario: As a user, i want  open form for new email and send with CC and BCC fields
    When the user is on main page, make clic on compose
    Then fill the field CC and BCC
    And send the mail

  Scenario: As a user, i want open form for new email and self im self and verify
    When the user is on main page, make clic on compose
    Then fill the field to with "test.automation8412@gmail.com"
    And send the mail
    Then verify 

  Scenario: As a user, i want open form a ner email, and discard draft
    When the user is on main page, make clic on compose
    Then make click on discard draft 
    And delete the first top message on the inbox