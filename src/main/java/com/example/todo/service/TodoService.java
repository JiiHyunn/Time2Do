package com.example.todo.service;

import com.example.todo.entity.Todo;
import com.example.todo.exception.ResourceNotFoundException;
import com.example.todo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {
    private final TodoRepository todoRepository;

    @Autowired
    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    public Optional<Todo> getTodoById(Long id) {
        return todoRepository.findById(id);
    }

    public Todo createTodo(Todo todo) {
        Todo createdTodo = new Todo(todo.getId(), todo.getTitle(), false);
        return todoRepository.save(createdTodo);
    }

    public Todo updateTodo(Long id, Todo todoDetails) {
        Todo todo = todoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Todo not found for this id :: " + id));
        todo.setTitle(todoDetails.getTitle());
        //todo.setDescription(todoDetails.getDescription());
        todo.setCompleted(todoDetails.isCompleted());
        return todoRepository.save(todo);
    }

    public void deleteTodo(Long id) {
        Todo todo = todoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Todo not found for this id :: " + id));
        todoRepository.delete(todo);
    }
}
