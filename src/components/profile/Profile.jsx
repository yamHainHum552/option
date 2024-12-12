"use client";
import Image from "next/image";
import React, { useState } from "react";

const user = {
  userProfile: {
    name: "Arvind Pokhrel",
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
    tasksCompleted: [],
  },
};

function Profile() {
  const [priorityTasks, setPriorityTasks] = useState(
    user.userProfile.tasksAssigned
  );
  const [completedTasks, setCompletedTasks] = useState(
    user.userProfile.tasksCompleted
  );
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (!task) {
      alert("Don't leave the field empty");
      return;
    }
    const newTask = { taskID: Date.now(), taskName: task };
    setPriorityTasks([...priorityTasks, newTask]);
    setTask("");
  };

  const handleComplete = (task) => {
    setCompletedTasks([...completedTasks, task]);
    setPriorityTasks(priorityTasks.filter((t) => t.taskID !== task.taskID));
  };

  const progress = Math.round(
    (completedTasks.length / (priorityTasks.length + completedTasks.length)) *
      100
  );

  return (
    <div className="max-w-md mx-auto p-4 font-sans">
      <header className="flex justify-between items-center bg-yellow-200 p-4 rounded-md">
        <div>
          <h1 className="text-2xl font-bold">Hi,</h1>
          <h2 className="text-lg font-medium">{user.userProfile.name}</h2>
          <p className="text-sm text-gray-600">
            {user.userProfile.description}
          </p>

          <h3 className="text-lg font-semibold">Streaks</h3>
          <p className="text-sm">
            You have maintained a streak of{" "}
            <span className="font-bold">{user.userProfile.streaks}</span> days!
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
          <div className="mt-2">
            <h4 className="text-base font-medium">
              One step at a time. You'll get there.
            </h4>
            <p className="text-sm text-gray-600">
              Keep moving forward! Progress is key.
            </p>
            <div className="relative mt-2 h-2 bg-yellow-300 rounded-full">
              <div
                className="absolute top-0 left-0 h-full bg-yellow-500 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm mt-1">{progress}% completed</p>
          </div>
        </section>

        <section className="bg-pink-100 p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold">Task Priority</h3>
          <div className="mt-2">
            <ul className="mt-2 space-y-2">
              {priorityTasks.map((task) => (
                <li className="flex items-center space-x-2" key={task.taskID}>
                  <input
                    type="checkbox"
                    id={`task-${task.taskID}`}
                    className="w-4 h-4"
                    onChange={() => handleComplete(task)}
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
                placeholder="Add new sub task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded-md"
              />
              <button
                className="w-8 h-8 bg-yellow-400 text-white rounded-full flex items-center justify-center"
                onClick={handleAdd}
              >
                +
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Profile;
