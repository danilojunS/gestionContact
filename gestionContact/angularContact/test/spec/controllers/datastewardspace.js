'use strict';

describe('Controller: DataStewardSpaceCtrl', function () {

  // load the controller's module
  beforeEach(module('gestionContactApp'));

  var DataStewardSpaceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DataStewardSpaceCtrl = $controller('DataStewardSpaceCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
