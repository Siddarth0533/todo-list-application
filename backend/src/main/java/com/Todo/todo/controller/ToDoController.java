package com.Todo.todo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.Todo.todo.entity.ToDo;
import com.Todo.todo.service.ToDoService;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class ToDoController {
	@Autowired
	ToDoService todoservice;
	
	@PostMapping("/todos")
	public ToDo createTodo(@RequestBody ToDo todo) {
		return todoservice.CreateToDo(todo);
	}
	
	@PutMapping("/todos/{id}")
	public ToDo update(@PathVariable Long id,@RequestBody ToDo todo) {
		return todoservice.update(id,  todo);
	}
	
	@GetMapping()
	public List<ToDo> getAllTodos(){
		return (List<ToDo>)todoservice.getAllTodos();
	}
	@DeleteMapping("/todos/{id}")
	public void delete(@PathVariable Long id) {
		todoservice.delete(id);
	}
}
