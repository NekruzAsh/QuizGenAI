document.addEventListener("DOMContentLoaded", function () {
  var userInput = document.getElementById("user-input");
  var slider = document.getElementById("slider");
  var sliderValueDisplay = document.getElementById("slider-value");
  var generateQuizButton = document.getElementById("generate-quiz");

  slider.addEventListener("input", function () {
    var selectedValue = slider.value;
    sliderValueDisplay.textContent = "Selected value: " + selectedValue;
  });

  generateQuizButton.addEventListener("click", function () {
    var textInput = userInput.value;
    var numberOfQuestions = slider.value;

    const promptText = textInput;
    const numQuestions = numberOfQuestions;
    const prompt = `With the following text: ${promptText}\nGenerate a quiz consisting of ${numQuestions}, multiple choice questions. Include an answer key at the end of each question.\n`;

    callApi(textInput, numberOfQuestions, prompt);
  });

  function callApi(textInput, numberOfQuestions, prompt) {
    fetch("https://api.cohere.ai/v1/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "BEARER FUFAxlCrLUL7ZOYSh5RAOFhadrYR99bQbWpaxXsA",
      },
      body: JSON.stringify({
        model: "command",
        prompt: prompt,
        max_tokens: 300,
        temperature: 0.9,
        k: 0,
        stop_sequences: [],
        return_likelihoods: "NONE",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);

        if (data.generations && data.generations.length > 0) {
          var quizDisplay = document.querySelector("#quiz-display");
          quizDisplay.innerHTML = data.generations[0].text;

          var questionContainers = quizDisplay.querySelectorAll(
            ".question-container"
          );
          questionContainers.forEach(function (container) {
            container.style.border = "2px solid #000";
            container.style.borderRadius = "5px";
            container.style.margin = "15px 0";
            container.style.padding = "10px";
            container.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";

            var answerContainers =
              container.querySelectorAll(".answer-container");
            answerContainers.forEach(function (answerContainer) {
              answerContainer.style.border = "2px solid #000";
              answerContainer.style.borderRadius = "5px";
              answerContainer.style.margin = "10px 0";
              answerContainer.style.padding = "8px";
              answerContainer.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
            });
          });
        } else {
          console.error("Error: No generations found in the API response.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  
});