import React, { useEffect, useRef, useState } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png'
import { Task } from './TasksList';

interface TaskItemProps {
  index: number;
  item: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, newTaskTitle: string) => void;
}

export function TaskItem({index, item, toggleTaskDone, removeTask, editTask}: TaskItemProps) {

  const [isItemBeingEdited, setIsItemBeingEdited] = useState(false)
  const [newItemValue, setNewItemValue] = useState(item.title)
  const textInputRef = useRef<TextInput>(null)

  function handleStartEditing() {
    setIsItemBeingEdited(true)
    console.log(isItemBeingEdited)
  }

  function handleCancelEditing() {
    setIsItemBeingEdited(false)
    setNewItemValue(item.title)
  }

  function handleSubmitEditing() {
    editTask(item.id, newItemValue)
    setIsItemBeingEdited(false)
  }

  useEffect(()=> {
    console.log(isItemBeingEdited)
    if (textInputRef.current) {
      if (isItemBeingEdited) {
        textInputRef.current.focus()
      } else {
        textInputRef.current.blur()
      }
    }
  }, [isItemBeingEdited])

  return (
    <>
      <View>
        <TouchableOpacity
        testID={`button-${index}`}
        activeOpacity={0.7}
        style={styles.taskButton}
        onPress={() => {toggleTaskDone(item.id)}}
        >
          <View
          testID={`marker-${index}`}
          style={(item.done) ? styles.taskMarkerDone : styles.taskMarker}
          >
          { item.done && (
            <Icon 
            name="check"
            size={12}
            color="#FFF"
            />
            )}
          </View>
        
          <TextInput
          style={(item.done) ? styles.taskTextDone : styles.taskText}
          value={newItemValue}
          onChangeText={setNewItemValue}
          editable={isItemBeingEdited}
          onSubmitEditing={handleSubmitEditing}
          ref={textInputRef}
          >
          </TextInput>
        </TouchableOpacity>
      </View>
        
      <View style={styles.iconsContainer}>
        {   isItemBeingEdited

            ? (<TouchableOpacity
            style={{ paddingHorizontal: 24 }}
            onPress={handleCancelEditing}
            >
                <Icon name={'x'} size={20} color='rgba(0, 0, 0, 0.2)'/>
            </TouchableOpacity>)

            : (<TouchableOpacity
              style={{ paddingHorizontal: 24 }}
              onPress={handleStartEditing}
              >
                  <Icon name={'edit'} size={20} color='rgba(0, 0, 0, 0.2)'/>
              </TouchableOpacity>)}
        <View style={{borderRightColor: 'rgba(0, 0, 0, 0.2)', borderRightWidth: 0.5}}/>
        <TouchableOpacity
          disabled={isItemBeingEdited}
          testID={`trash-${index}`}
          style={{ paddingHorizontal: 24 }}
          onPress={()=> {removeTask(item.id)}}
          >
              <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
      
      )
    }

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsContainer: {
    flexDirection: 'row'
  }
})