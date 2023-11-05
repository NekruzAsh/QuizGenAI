document.addEventListener('DOMContentLoaded', function () {
    // Wait for the DOM content to be fully loaded

 
    var userInput = document.getElementById('user-input');
    var slider = document.getElementById('slider');
    var sliderValueDisplay = document.getElementById('slider-value');
    var generateQuizButton = document.getElementById('generate-quiz');

    
    slider.addEventListener('input', function () {
        var selectedValue = slider.value;
        sliderValueDisplay.textContent = 'Selected value: ' + selectedValue;
    });

  
    var textInput = userInput.value;
    var numberOfQuestions = slider.value;
    generateQuizButton.addEventListener('click', function () {

       
        callApi(textInput, numberOfQuestions);
    });

    const promptText = textInput.value; 
    const numQuestions = numberOfQuestions.value; 
    
    const prompt = `With the following text: ${promptText}\nGenerate a quiz consisting of ${numQuestions}, multiple choice questions with a high difficulty level. Include an answer key at the end of the quiz.\n`;
    
   
    function callApi(textInput, numberOfQuestions) {
        
        fetch('https://api.cohere.ai/v1/generate', {
            method: 'POST',
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
            
            console.log(data);
            document.querySelector('#quiz-display').innerHTML = data.generations[0].text 
            
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});
