"use client";
import Image from "next/image";
import React, { useState, useMemo } from "react";
import { CiTrophy } from "react-icons/ci";
import { useRouter } from "next/navigation";

const userProfile = {
  name: "Jeevan Kushwaha",
  description:
    "A motivated individual dedicated to self-improvement and teamwork.",
  streaks: 2,
  saharaPoints: 50,
  tasksAssigned: [
    {
      taskID: 1,
      taskName: "Daily Exercise",
      deadline: "2024-12-14",
      priority: "High",
      completed: false,
      selected: false,
    },
    {
      taskID: 2,
      taskName: "Team Meeting Preparation",
      deadline: "2024-12-15",
      priority: "Medium",
      completed: false,
      selected: false,
    },
    {
      taskID: 3,
      taskName: "Read a Chapter of 'Atomic Habits'",
      deadline: "2024-12-13",
      priority: "Low",
      completed: false,
      selected: false,
    },
  ],
};

function Profile() {
  const [priorityTasks, setPriorityTasks] = useState(userProfile.tasksAssigned);
  const [saharaPoints, setSaharaPoints] = useState(userProfile.saharaPoints);
  const [newTask, setNewTask] = useState("");
  const router = useRouter();

  // Calculate progress percentage
  const progress = useMemo(() => {
    const totalTasks = priorityTasks.length;
    const completedCount = priorityTasks.filter(
      (task) => task.completed
    ).length;
    return totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;
  }, [priorityTasks]);

  // Add a new task
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
        completed: false,
        selected: false,
      },
    ]);
    setNewTask("");
  };

  // Toggle task selection for completion
  const handleSelectTask = (taskID) => {
    setPriorityTasks((prev) =>
      prev.map((task) =>
        task.taskID === taskID ? { ...task, selected: !task.selected } : task
      )
    );
  };

  // Mark only selected tasks as completed and award points only for those
  const handleSubmitSelectedTasks = () => {
    let pointsEarned = 0;

    setPriorityTasks((prev) =>
      prev.map((task) => {
        if (task.selected && !task.completed) {
          pointsEarned += 10; // Award points for incomplete selected tasks
          return { ...task, completed: true, selected: false };
        }
        return task;
      })
    );

    setSaharaPoints((prev) => prev + pointsEarned);
  };

  return (
    <div className="max-w-md mx-auto p-4 font-sans">
      <header className="flex justify-between items-center background p-4 rounded-md shadow-md relative">
        <button
          className="absolute right-0 top-2 "
          onClick={() => router.push("/leaderboard")}
        >
          <CiTrophy color="blue" size={30} />
        </button>
        <div>
          <h1 className="text-2xl font-bold">Hi,</h1>
          <h2 className="text-lg font-medium">{userProfile.name}</h2>
          <p className="text-sm text-gray-600">{userProfile.description}</p>

          <h3 className="text-lg font-semibold mt-2 flex items-center">
            <span role="img" aria-label="fire">
              🔥
            </span>
            Streaks:{" "}
            <span className="font-bold text-black ml-1">
              {userProfile.streaks} days
            </span>
          </h3>
          <p className="text-sm text-gray-600">
            Keep going! Consistency builds character.
          </p>

          <h3 className="text-lg font-semibold mt-2">
            Sahara Points:{" "}
            <span className="font-bold text-black">{saharaPoints}</span>
          </h3>
        </div>

        <div className="relative w-20 h-20">
          <Image
            src="/user.jpeg"
            alt="Profile"
            width={60}
            height={60}
            className="rounded-full border-4 border-yellow-400 object-cover"
          />
        </div>
      </header>

      <main className="mt-4 space-y-4">
        <section className="background p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold">Task Targets</h3>
          <p className="text-sm text-gray-600 mt-1">
            One step at a time. Keep moving forward!
          </p>
          <div className="relative mt-2 h-2 bg-white rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-yellow-300 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm mt-1">{progress}% completed</p>
        </section>

        <section className="background p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold">Task Priority</h3>
          <ul className="mt-4 space-y-2">
            {priorityTasks.map((task) => (
              <li
                key={task.taskID}
                className={`flex items-center space-x-2 ${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
              >
                <input
                  type="checkbox"
                  id={`task-${task.taskID}`}
                  className="w-4 h-4"
                  onChange={() => handleSelectTask(task.taskID)}
                  checked={task.selected}
                  disabled={task.completed}
                />
                <label htmlFor={`task-${task.taskID}`} className="text-sm">
                  {task.taskName}
                </label>
              </li>
            ))}
          </ul>
          <button
            onClick={handleSubmitSelectedTasks}
            className="p-2 mt-4 bg-amber-600 text-white rounded-md"
          >
            Submit Selected Tasks
          </button>

          <div className="flex items-center mt-4 space-x-1 flex-wrap gap-2">
            <input
              type="text"
              placeholder="Add new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={handleAddTask}
              className="p-2 bg-amber-600 text-white rounded-md"
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
