import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (!tasks.find(task => task.title === newTaskTitle)) {

      const newTask = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }
      setTasks([...tasks, newTask])
    }
    else {
      Alert.alert(
        'To-do já existente', 
        'Você já cadastrou um to-do com esse nome')
    }
    console.log(tasks)
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => {
      if (task.id === id ) {
        task.done = !task.done
        return task
      }
      else {
        return task
      }
    })
    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Deletar item', 
      'Tem certeza que deseja deletar este item?',
      [
        {
          text: 'Sim',
          onPress: ()=> {
            const updatedTasks = tasks.filter(task => task.id !== id)
            setTasks(updatedTasks)
          },
          style: 'destructive'
        },
        {
          text: 'Não',
          onPress: ()=> {console.log('Dismissed')},
          style: 'default'
        }
      ]
      )
  }
  function handleEditTask(id: number, newTaskTitle: string) {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        task.title = newTaskTitle
        return task
      } else {
        return task
      }
    })
    setTasks(updatedTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})