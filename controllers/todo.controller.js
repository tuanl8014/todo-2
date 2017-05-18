var Todo = require('../models/todo.model');

var TodoCtrl = {
    GetTodo: (req, res) => {
        Todo.find({}, (err, todos) => {
            if(err) {
                res.json({status: false, error: 'Something went wrong'});
                return;
            }
            res.json({status: true, todo: todos});
        });
    },
    PostTodo: (req, res) => {
        var todo = new Todo(req.body);
        todo.save((err, todo) => {
            if(err) {
                res.json({status: false, error: 'Something went wrong'});
                return;
            }
            res.json({status: true, message: 'Todo saved'});
        });
    },
    UpdateTodo: (req, res) => {
        var completed = req.body.completed;
        Todo.findById(req.params.id, (err, todo) => {
            todo.completed = completed;
            todo.save((err, todo) => {
                if(err) {
                    res.json({status: false, error: 'Status not updated'});
                }
                res.json({status: true, message: 'Status updated successfully'});
            });
        });
    },
    DeleteTodo: (req, res) => {
        Todo.remove({_id: req.params.id}, (err, todos) => {
        if(err) {
            res.json({status: false, error: 'Todo not deleted'});
            return;
        }
        res.json({status: true, message: 'Todo deleted successfully!!'});
        });
    }
}

module.exports = TodoCtrl;