"use client";
import Image from "next/image";
import React, { useState, useMemo } from "react";

const userProfile = {
  name: "Jeevan Kushwaha",
  description:
    "A motivated individual dedicated to self-improvement and teamwork.",
  streaks: 14,
  tasksAssigned: [
    {
      taskID: 1,
      taskName: "Daily Exercise",
      deadline: "2024-12-14",
      priority: "High",
    },
    {
      taskID: 2,
      taskName: "Team Meeting Preparation",
      deadline: "2024-12-15",
      priority: "Medium",
    },
    {
      taskID: 3,
      taskName: "Read a Chapter of 'Atomic Habits'",
      deadline: "2024-12-13",
      priority: "Low",
    },
  ],
};

function Profile() {
  const [priorityTasks, setPriorityTasks] = useState(userProfile.tasksAssigned);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const progress = useMemo(() => {
    const totalTasks = priorityTasks.length + completedTasks.length;
    return totalTasks > 0
      ? Math.round((completedTasks.length / totalTasks) * 100)
      : 0;
  }, [priorityTasks, completedTasks]);

  const handleAddTask = () => {
    if (!newTask.trim()) {
      alert("Task cannot be empty");
      return;
    }
    setPriorityTasks((prev) => [
      ...prev,
      {
        taskID: Date.now(),
        taskName: newTask.trim(),
        deadline: "",
        priority: "Low",
      },
    ]);
    setNewTask("");
  };

  const handleCompleteTask = (task) => {
    setPriorityTasks((prev) => prev.filter((t) => t.taskID !== task.taskID));
    setCompletedTasks((prev) => [...prev, task]);
  };

  return (
    <div className="max-w-md mx-auto p-4 font-sans">
      <header className="flex justify-between items-center bg-yellow-200 p-4 rounded-md">
        <div>
          <h1 className="text-2xl font-bold">Hi,</h1>
          <h2 className="text-lg font-medium">{userProfile.name}</h2>
          <p className="text-sm text-gray-600">{userProfile.description}</p>

          <h3 className="text-lg font-semibold mt-2">Streaks</h3>
          <p className="text-sm">
            You have maintained a streak of{" "}
            <span className="font-bold">{userProfile.streaks}</span> days!
          </p>
        </div>

        <div className="relative w-24 h-24">
          <Image
            src="/user.jpeg"
            alt="Profile"
            layout="fill"
            className="rounded-full border-4 border-yellow-400 object-cover"
          />
        </div>
      </header>

      <main className="mt-4 space-y-4">
        <section className="bg-yellow-100 p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold">Task Targets</h3>
          <p className="text-sm text-gray-600 mt-1">
            One step at a time. Keep moving forward!
          </p>
          <div className="relative mt-2 h-2 bg-yellow-300 rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-yellow-500 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm mt-1">{progress}% completed</p>
        </section>

        {/* Task Priority Section */}
        <section className="bg-pink-100 p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold">Task Priority</h3>
          <ul className="mt-4 space-y-2">
            {priorityTasks.map((task) => (
              <li key={task.taskID} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`task-${task.taskID}`}
                  className="w-4 h-4"
                  onChange={() => handleCompleteTask(task)}
                />
                <label htmlFor={`task-${task.taskID}`} className="text-sm">
                  {task.taskName}
                </label>
              </li>
            ))}
          </ul>

          <div className="flex items-center mt-4 space-x-2">
            <input
              type="text"
              placeholder="Add new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={handleAddTask}
              className="p-2 bg-yellow-400 text-white rounded-md"
            >
              Add
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Profile;
