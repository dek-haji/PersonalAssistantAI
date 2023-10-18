import { process } from '/env'
import { Configuration, OpenAIApi } from 'openai'


const setupTextarea = document.getElementById('setup-textarea')
const setupInputContainer = document.getElementById('setup-input-container')
const movieBossText = document.getElementById('movie-boss-text')

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

document.getElementById("send-btn").addEventListener("click", () => {
  const userInput = setupTextarea.value;
   if (setupTextarea.value) {
    setupInputContainer.innerHTML = `<img src="images/loading.svg" class="loading" id="loading">`
    movieBossText.innerText = `Ok, just wait a second while my digital brain digests that...`
   }
  fetchBotReply(userInput);
  //fetchSynopsis(userInput);
  GetSugestion(userInput)
})

 async function fetchBotReply(outline){
  const response = await openai.createCompletion({
      model: 'text-davinci-003',
    prompt: `Generate a short message that says, be ready to understand more about "${outline}" sound educated and professional,
     ###
     outline: "${outline}"
     message: I 'll need to think about that. But your question is amazing! I love the bit about software development ideas!`,
    max_tokens: 60,
  })
   movieBossText.innerText = response.data.choices[0].text.trim();
}

async function fetchSynopsis(outline) {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Generate a short synopsis for a software developer information about "${outline}"`,
    max_tokens: 700,
  })
   document.getElementById('output-text').innerText = response.data.choices[0].text.trim()
}

async function GetSugestion(programingLanguage, programingDetails, title)
{
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Use a programing langauge and programing details to create a short synopsis for a software developer information
    ###
    Programing Language: Software Developer Languages and tools,
    Programing Details: Software development tool details which gives a detailed information example Software development is a complex process that requires a range of tools to aid developers in various tasks.These tools streamline development, improve collaboration, and enhance the quality of software products.,
    ###
    programingLanguage: ${programingLanguage},
    programingDetails: ${programingDetails}`,
    max_tokens: 100,
  })
  document.getElementById('output-text').innerText = response.data.choices[0].text.trim()
  document.getElementById('output-text').style.display = 'none'
  document.getElementById('output-text').style.display = 'block'
  GetTitle(title);

}

async function GetTitle(synopsis)
{
const response = await openai.createCompletion({
  model: 'text-davinci-003',
  prompt: `Generate a title for a software developer information, the title should be gripping, or flashy
  ###
  synopsis: ${synopsis}`,
  max_tokens: 25,
  temperature: 0.7,
})
  const openaiRespons = response.data.choices[0].text.trim()
  document.getElementById('output-title').innerText = openaiRespons;

}