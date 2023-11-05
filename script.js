document.addEventListener('DOMContentLoaded', function () {
    // Wait for the DOM content to be fully loaded

    // Get elements
    var userInput = document.getElementById('user-input');
    var slider = document.getElementById('slider');
    var sliderValueDisplay = document.getElementById('slider-value');
    var generateQuizButton = document.getElementById('generate-quiz');

    // Update the displayed value when the slider value changes
    slider.addEventListener('input', function () {
        var selectedValue = slider.value;
        sliderValueDisplay.textContent = 'Selected value: ' + selectedValue;
    });

    // Add an event listener to the button for generating the quiz
    var textInput = userInput.value;
    var numberOfQuestions = slider.value;
    generateQuizButton.addEventListener('click', function () {

        // Call your API here with the text input and number of questions
        callApi(textInput, numberOfQuestions);
    });

    const promptText = textInput.value; // Change this to the text input by the user
    const numQuestions = numberOfQuestions.value; // Change this to generate a quiz with a different number of questions
    
    const prompt = `With the following text: ${promptText}\nGenerate a quiz consisting of ${numQuestions}, multiple choice questions with a high difficulty level. Include an answer key at the end of the quiz.\n`;
    
    // Function to call your API
    function callApi(textInput, numberOfQuestions) {
        // Replace 'your_api_endpoint' with the actual endpoint of your API
        fetch('https://api.cohere.ai/v1/generate', {
            method: 'POST', // or 'GET' based on your API requirements
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'BEARER FUFAxlCrLUL7ZOYSh5RAOFhadrYR99bQbWpaxXsA'
            },
            body: JSON.stringify({
                "model": "command",
                "prompt": prompt,
                "max_tokens": 300,
                "temperature": 0.9,
                "k": 0,
                "stop_sequences": [],
                "return_likelihoods": "NONE"
              }),
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response from your API
            console.log(data);
            document.querySelector('#quiz-display').innerHTML = data.generations[0].text 
            // You can update your UI or do further processing here
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});
