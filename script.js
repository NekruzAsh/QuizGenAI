document.addEventListener('DOMContentLoaded', function () {
    

    
    var userInput = document.getElementById('user-input');
    var slider = document.getElementById('slider');
    var sliderValueDisplay = document.getElementById('slider-value');
    var generateQuizButton = document.getElementById('generate-quiz');

   
    slider.addEventListener('input', function () {
        var selectedValue = slider.value;
        sliderValueDisplay.textContent = 'Selected value: ' + selectedValue;
    });

    generateQuizButton.addEventListener('click', function () {
        var textInput = userInput.value;
        var numberOfQuestions = slider.value;
    
       
        const promptText = textInput;
        const numQuestions = numberOfQuestions;
        const prompt = `With the following text: ${promptText}\nGenerate a quiz consisting of ${numQuestions}, multiple choice questions with a high difficulty level. Include an answer key at the end of the quiz.\n`;
    
        
        callApi(textInput, numberOfQuestions, prompt);
    });

    function callApi(textInput, numberOfQuestions, prompt) {
        
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
            
            console.log('API Response:', data);
        
            if (data.generations && data.generations.length > 0) {
                document.querySelector('#quiz-display').innerHTML = data.generations[0].text;
            } else {
                console.error('Error: No generations found in the API response.');
            }
        
            
        })

    .catch(error => {
        console.error('Error:', error);
    });}
});
