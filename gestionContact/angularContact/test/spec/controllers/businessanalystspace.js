'use strict';

describe('Controller: BusinessAnalystSpaceCtrl', function () {

  // load the controller's module
  beforeEach(module('gestionContactApp'));

  var BusinessAnalystSpaceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BusinessAnalystSpaceCtrl = $controller('BusinessAnalystSpaceCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
