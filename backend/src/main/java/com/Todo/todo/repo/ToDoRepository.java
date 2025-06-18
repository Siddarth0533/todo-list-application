package com.Todo.todo.repo;

import org.springframework.data.repository.CrudRepository;

import com.Todo.todo.entity.ToDo;

public interface ToDoRepository extends CrudRepository<ToDo,Long>
{
	
}
