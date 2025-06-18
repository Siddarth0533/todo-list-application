package com.Todo.todo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Todo.todo.entity.ToDo;
import com.Todo.todo.repo.ToDoRepository;

@Service
public class ToDoService 
{
	@Autowired
	ToDoRepository todorepository;
	public ToDo CreateToDo(ToDo todo)
	{
		todorepository.save(todo);
		return todo;
	}
	public ToDo update(Long id, ToDo todo)
	{
		if(todorepository.existsById(id))
		{
			ToDo existing = todorepository.findById(id).get();
			if (todo.getTitle() != null) existing.setTitle(todo.getTitle());
			if (todo.getDescription() != null) existing.setDescription(todo.getDescription());
			existing.setCompleted(todo.isCompleted());
			todorepository.save(existing);
			return existing;
		}
		else
		{
			return null;
		}
	}
	public Iterable<ToDo> getAllTodos()
	{
		Iterable<ToDo> todos=todorepository.findAll();
		return todos;
	}
	public void delete(Long id) {
		todorepository.deleteById(id);
	}
}
