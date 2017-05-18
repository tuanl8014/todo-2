var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var mongoose = require('mongoose');
require('sinon-mongoose');

var Todo = require('../models/todo.model');

describe('GET all todos', function(){
    it('should return all todos', done => {
        var TodoMock = sinon.mock(Todo);
        var expectedResult = {status: true, todo: []};
        TodoMock.expects('find').yields(null, expectedResult);
        Todo.find((err, result) =>  {
            TodoMock.verify();
            TodoMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });

    it('should return error', done => {
        var TodoMock = sinon.mock(Todo);
        var expectedResult = {status: false, error: 'Something went wrong'};
        TodoMock.expects('find').yields(expectedResult, null);
        Todo.find((err, result) => {
            TodoMock.verify();
            TodoMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });
});

describe('POST a new todo', function(){
    it('should create new todo', done => {
        var TodoMock = sinon.mock(new Todo({ todo: 'Save new todo from mock'}));
        var todo = TodoMock.object;
        var expectedResult = { status: true };
        TodoMock.expects('save').yields(null, expectedResult);
        todo.save((err, result) => {
            TodoMock.verify();
            TodoMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });
    it('should return error, if post not saved', done => {
        var TodoMock = sinon.mock(new Todo({ todo: 'Save new todo from mock'}));
        var todo = TodoMock.object;
        var expectedResult = { status: false };
        TodoMock.expects('save').yields(expectedResult, null);
        todo.save((err, result) => {
            TodoMock.verify();
            TodoMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });
});

describe('UPDATE todo', function(){
    it('should updated a todo by id', done => {
      var TodoMock = sinon.mock(new Todo({ completed: true}));
      var todo = TodoMock.object;
      var expectedResult = { status: true };
      TodoMock.expects('update').withArgs({_id: 12345}).yields(null, expectedResult);
      todo.update({_id: 12345}, (err, result) => {
        TodoMock.verify();
        TodoMock.restore(); 
        expect(result.status).to.be.true;
        done();
      });
    });
    it('should return error if update action is failed', done => {
      var TodoMock = sinon.mock(new Todo({ completed: true}));
      var todo = TodoMock.object;
      var expectedResult = { status: false };
      TodoMock.expects('update').withArgs({_id: 12345}).yields(expectedResult, null);
      todo.update({_id: 12345}, (err, result) => {
        TodoMock.verify();
        TodoMock.restore();
        expect(err.status).to.not.be.true;
        done();
      });
    });
  });


describe('DELETE todo', function(){
    it('should delete a todo by id', done => {
        var TodoMock = sinon.mock(Todo);
        var expectedResult = { status: true };
        TodoMock.expects('remove').withArgs({_id: 12345}).yields(null, expectedResult);
        Todo.remove({_id: 12345}, (err, result) => {
            TodoMock.verify();
            TodoMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });
    it('should return error if delete action is failed', done => {
        var TodoMock = sinon.mock(Todo);
        var expectedResult = { status: false };
        TodoMock.expects('remove').withArgs({_id: 12345}).yields(expectedResult, null);
        Todo.remove({_id: 12345}, (err, result) => {
            TodoMock.verify();
            TodoMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });
});