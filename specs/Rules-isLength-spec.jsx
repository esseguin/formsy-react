var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Formsy = require('./../src/main.js');

describe('Rules: isLength', function() {
  var TestInput, isValid, form, input;

  beforeEach(function() {
    isValid = jasmine.createSpy('valid');

    TestInput = React.createClass({
      mixins: [Formsy.Mixin],
      updateValue: function (event) {
        this.setValue(event.target.value);
      },
      render: function () {
        if (this.isValid()) {
          isValid();
        }
        return <input value={this.getValue()} onChange={this.updateValue}/>
      }
    });
  });

  afterEach(function() {
    TestInput = isValid = isInvalid = form = null;
  });

  describe('isLength:3', function() {

    beforeEach(function() {
      form = TestUtils.renderIntoDocument(
        <Formsy.Form>
          <TestInput name="foo" validations="isLength:3"/>
        </Formsy.Form>
      );

      input = TestUtils.findRenderedDOMComponentWithTag(form, 'INPUT');
    });

    it('should fail with a string too small', function () {
      expect(isValid).not.toHaveBeenCalled();
      TestUtils.Simulate.change(input, {target: {value: 'hi'}});
      expect(isValid).not.toHaveBeenCalled();
    });

    it('should fail with a string too long', function () {
      expect(isValid).not.toHaveBeenCalled();
      TestUtils.Simulate.change(input, {target: {value: 'foo bar'}});
      expect(isValid).not.toHaveBeenCalled();
    });

    it('should pass with the right length', function () {
      expect(isValid).not.toHaveBeenCalled();
      TestUtils.Simulate.change(input, {target: {value: 'sup'}});
      expect(isValid).toHaveBeenCalled();
    });

    it('should fail with an undefined', function () {
      expect(isValid).not.toHaveBeenCalled();
      TestUtils.Simulate.change(input, {target: {value: undefined}});
      expect(isValid).not.toHaveBeenCalled();
    });

    it('should fail with null', function () {
      expect(isValid).not.toHaveBeenCalled();
      TestUtils.Simulate.change(input, {target: {value: null}});
      expect(isValid).not.toHaveBeenCalled();
    });

    it('should fail with a number', function () {
      expect(isValid).not.toHaveBeenCalled();
      TestUtils.Simulate.change(input, {target: {value: 123}});
      expect(isValid).not.toHaveBeenCalled();
    });

  });

  describe('isLength:0', function() {

    beforeEach(function() {
      form = TestUtils.renderIntoDocument(
        <Formsy.Form>
          <TestInput name="foo" validations="isLength:0"/>
        </Formsy.Form>
      );

      input = TestUtils.findRenderedDOMComponentWithTag(form, 'INPUT');
    });

    it('should fail with a string too long', function () {
      expect(isValid).not.toHaveBeenCalled();
      TestUtils.Simulate.change(input, {target: {value: 'foo bar'}});
      expect(isValid).not.toHaveBeenCalled();
    });

    it('should pass with empty string', function () {
      expect(isValid).not.toHaveBeenCalled();
      TestUtils.Simulate.change(input, {target: {value: ''}});
      expect(isValid).toHaveBeenCalled();
    });

    it('should fail with undefined', function () {
      expect(isValid).not.toHaveBeenCalled();
      TestUtils.Simulate.change(input, {target: {value: undefined}});
      expect(isValid).not.toHaveBeenCalled();
    });

    it('should fail with null', function () {
      expect(isValid).not.toHaveBeenCalled();
      TestUtils.Simulate.change(input, {target: {value: null}});
      expect(isValid).not.toHaveBeenCalled();
    });

    it('should fail with a number', function () {
      expect(isValid).not.toHaveBeenCalled();
      TestUtils.Simulate.change(input, {target: {value: 123}});
      expect(isValid).not.toHaveBeenCalled();
    });

  });

});
