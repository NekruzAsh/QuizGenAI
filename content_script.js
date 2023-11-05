


const prompt = "Once upon a time,";
const apiKey = "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";
const apiUrl = "https://api.openai.com/v1/chat/completions";






fetch(apiUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`,
  },
  body: JSON.stringify({ 
    
        "model": "text-davinci-003",
        "prompt": "Who is elon musk", 
        "max_tokens": 50, 
        "temperature": 0,

    }),
})


  .then(response => response.json())
  .then(data => console.log(data.choices[0].text))
  .catch(error => console.error(error));


