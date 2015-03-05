'use strict';

describe('Directive: roleShow', function () {

  // load the directive's module
  beforeEach(module('gestionContactApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<role-show></role-show>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the roleShow directive');
  }));
});
