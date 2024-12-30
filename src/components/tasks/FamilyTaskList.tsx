import React, { useEffect, useRef } from 'react';
import MemberColumn from './MemberColumn';
import { useFamilyMembers } from '../../hooks/useFamilyMembers';
import { celebrateCompletion } from '../../utils/celebration';
import type { Task } from '../../types';

interface FamilyTaskListProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
}

export default function FamilyTaskList({ tasks, onToggleTask }: FamilyTaskListProps) {
  const { members } = useFamilyMembers();
  const completionStatus = useRef<Record<string, boolean>>({});
  
  useEffect(() => {
    // Check each member's task completion status
    members.forEach(member => {
      const memberTasks = tasks.filter(task => task.assignedTo === member);
      const wasComplete = completionStatus.current[member];
      const isComplete = memberTasks.length > 0 && memberTasks.every(task => task.completed);
      
      // Celebrate if member just completed all tasks
      if (!wasComplete && isComplete) {
        celebrateCompletion();
      }
      
      completionStatus.current[member] = isComplete;
    });
  }, [tasks, members]);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {members.map((member) => (
        <MemberColumn
          key={member}
          member={member}
          tasks={tasks.filter(task => task.assignedTo === member)}
          onToggleTask={onToggleTask}
        />
      ))}
    </div>
  );
}