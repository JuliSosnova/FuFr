<template>
    <div class="description-container">
      <div class="cat-animation">
        <img src="./walk-cat.gif" alt="Walking Cat" class="cat" />
      </div>
      <h1 class="title">О приюте</h1>
      <p class="intro">
        Приют пушистый друг основан в 2024 году. Его основателями стали Шарлотта Пушистая и Велес Первый Безхвостый. Совместно с иркутскими волонтерами они построили вольеры для животных. Большая часть животных была привезена из других приютов, которые не могли предоставить условия для животных.
      </p>
      <p class="mission">
        Миссия приюта «Пушистый друг» — поиск дома и ответственных хозяев для всех питомцев приюта. Для нас важно популяризировать ответственное отношение к животным, также уважение и любовь к ним.
      </p>
      <h2 class="subtitle">Наши задачи</h2>
      <p class="tasks">
        У нас есть определенные задачи, которые мы активно реализуем:
      </p>
      <ul class="task-list">
        <li>Привлекаем в приют, как можно больше людей. С целью поиска сподвижников, в том числе детей.</li>
        <li>Популяризируем кастрацию и стерилизацию животных.</li>
        <li>Продвигаем правильное содержание животных. Рассказываем об опасности самовыгула, необходимости убирать за своим животным вовремя прогулки и т. д.</li>
        <li>Для активного продвижения своих задач и поиска дома нашим питомцам мы используем средства массовой информации и социальные сети.</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    mounted() {
    
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundColor = "#F1FFF7";
  },
    name: "Description"
  };
  </script>
  
  <style scoped>
 
  .description-container {
    max-width: 800px; /* Limit the width of the content */
    margin: 10px auto; /* Center the container */
    padding: 20px; /* Add padding */
    background-color: #f9f9f9; /* Light background color */
    border-radius: 8px; /* Rounded corners */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
    position: relative; /* Allow positioning within the container */
  }
  
  .cat-animation {
    position: absolute; /* Position the cat relative to the container */
    top: -12%; /* Adjust this value to control the vertical position */
    left: -10px; /* Start position off-screen */
    animation: walk 20s linear infinite; /* Apply the walking animation */
  }
  
  .cat {
    width: 150px; /* Adjust the size of the cat image */
    height: auto; /* Maintain aspect ratio */
  }
  
  @keyframes walk {
    0% {
      transform: translateX(0); /* Start position */
    }
    50% {
      transform: translateX(700px); /* Move forward */
    }
    100% {
      transform: translateX(0); /* Move back to the start */
    }
  }
  
  .title {
    font-size: 2.5em; /* Larger font size for the title */
    color: #015319; /* Darker text color */
    text-align: center; /* Center the title */
    margin-bottom: 20px; /* Space below the title */
  }
  
  .intro, .mission {
    font-size: 1.2em; /* Slightly larger font size for paragraphs */
    line-height: 1.6; /* Increase line height for readability */
    color: #555; /* Darker gray for text */
    margin-bottom: 15px; /* Space below paragraphs */
  }
  
  .subtitle {
    font-size: 2em; /* Larger font size for subtitles */
    color: #015319; /* Darker text color */
    margin-top: 30px; /* Space above subtitle */
    margin-bottom: 10px; /* Space below subtitle */
  }
  
  .tasks {
    font-size: 1.2em; /* Font size for tasks */
    color: #555; /* Darker gray for text */
    margin-bottom: 10px; /* Space below tasks */
  }
  
  .task-list {
    list-style-type: disc; /* Use bullet points */
    padding-left: 20px; /* Indent the list */
  }
  
  .task-list li {
    margin-bottom: 8px; /* Space between list items */
    font-size: 1.1em; /* Slightly smaller font size for list items */
    color: #555; /* Darker gray for text */
  }
  </style>