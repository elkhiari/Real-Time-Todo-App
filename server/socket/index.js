const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

function allSocket(io) {
  io.on("connection", async (socket) => {
    socket.emit("task:getAll", await getAllTasks());
    socket.on("task:create", async (data) => {
      await createTask(data)
        .then(async (task) => {
          const Tasks = await getAllTasks();
          io.emit("task:getAll", Tasks);
          socket.emit("alert", "Task created successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    });

    socket.on("task:delete", async (id) => {
      await deleteTask(id)
        .then(async (task) => {
          const Tasks = await getAllTasks();
          io.emit("task:getAll", Tasks);
          socket.emit("alert", "Task deleted successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    });
  });
}

module.exports = { allSocket };
