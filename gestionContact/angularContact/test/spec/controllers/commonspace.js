'use strict';

describe('Controller: CommonSpaceCtrl', function () {

  // load the controller's module
  beforeEach(module('gestionContactApp'));

  var CommonSpaceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CommonSpaceCtrl = $controller('CommonSpaceCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
