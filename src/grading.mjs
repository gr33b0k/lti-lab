// Replace the demonstration questions with your own three questions.
// Keep correct answers only on the server.
export const tasks = [
  {
    id: "q1",
    prompt: "Какое расширение файла обычно имеет бинарный модуль WebAssembly?",
    answer: ["wasm", ".wasm"],
    points: 3,
  },
  {
    id: "q2",
    prompt: "Как называется текстовый формат представления WebAssembly?",
    answer: ["wat", ".wat"],
    points: 3,
  },
  {
    id: "q3",
    prompt: "Назовите любой метод WebAssembly для создания экземпляра модуля",
    answer: [
      "webassembly.instantiate",
      "webassembly.instantiateStreaming",
      "instantiate",
      "instantiateStreaming",
      "webassembly.instantiate()",
      "webassembly.instantiateStreaming()",
      "instantiate()",
      "instantiateStreaming()",
    ],
    points: 4,
  },
];

export function normalize(value) {
  return value.trim().toLowerCase();
}

export function grade(answers) {
  if (!answers || typeof answers !== "object" || Array.isArray(answers)) {
    throw Object.assign(new Error("Нужен объект answers."), { status: 400 });
  }
  if (
    Object.keys(answers).length !== tasks.length ||
    Object.keys(answers).some((id) => !tasks.some((t) => t.id === id))
  ) {
    throw Object.assign(new Error("Передайте ровно три ответа: q1, q2, q3."), {
      status: 400,
    });
  }
  const items = tasks.map((task) => {
    const value = answers[task.id];
    if (typeof value !== "string" || value.length > 200) {
      throw Object.assign(
        new Error("Ответ должен быть строкой до 200 символов."),
        { status: 400 },
      );
    }
    const correct = task.answer.map(normalize).includes(normalize(value));
    return { id: task.id, correct, points: correct ? task.points : 0 };
  });
  return {
    scoreGiven: items.reduce((sum, item) => sum + item.points, 0),
    scoreMaximum: tasks.reduce((sum, task) => sum + task.points, 0),
    items,
  };
}
