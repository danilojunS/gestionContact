'use strict';

describe('Controller: BusinessAnalyticsSpaceCtrl', function () {

  // load the controller's module
  beforeEach(module('gestionContactApp'));

  var BusinessAnalyticsSpaceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BusinessAnalyticsSpaceCtrl = $controller('BusinessAnalyticsSpaceCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
