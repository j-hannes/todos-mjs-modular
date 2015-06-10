Feature: Adding a todo item

  Background:
    Given I visit the application

  Scenario: Entering a new todo
    When I enter "buy some milk"
    Then I should see "buy some milk"
