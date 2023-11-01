import { process } from '/env'
import { Configuration, OpenAIApi } from 'openai'
//import {fetchImage } from '/imageCreation.js'

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
  GetSugestion(userInput)
})

 async function fetchBotReply(outline){
  const response = await openai.createCompletion({
      model: 'text-davinci-003',
    prompt: `Generate a short message that says, be ready to understand more about "${outline}" sound educated and professional,
     ###
     outline: "${outline}"
     message: I 'll need to think about that. But your question is amazing! I love to learn software development ideas!`,
    max_tokens: 60,
  })
   movieBossText.innerText = response.data.choices[0].text.trim();
}


async function GetSugestion(programingLanguage, programingDetails, title )
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
  GetTitle(title);
}

async function GetTitle(outline)
{
const response = await openai.createCompletion({
  model: 'text-davinci-003',
  prompt: `Generate a title for the ${outline} about software development
  ###
  synopsis: `,
  max_tokens: 25,
  temperature: 0.7,
})
  const openaiRespons = response.data.choices[0].text.trim()
  document.getElementById('output-title').innerText = openaiRespons;
  // fetchImage(outline, openaiRespons);
  fetchImagePromt(openaiRespons, outline);
}

async function fetchImagePromt(title, synopsis) {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Give a short description of an image which could be used to train people based on a title and synopsis. The description should be rich in visual detail but contain no names.
    ###
    title: Love's Reacting
    synopsis: Write a brief summary of the history of artificial intelligence, including key milestones and influential figures in the field.
    ###
    title: C# Ninja
    synopsis: In a bustling city on the edge of time, where the neon lights never dim, tell me the story of a mysterious detective who can see into the future.How does this unique ability change their life and the cases they solve ?
    ###
    title: ${title}
    synopsis: ${synopsis}
    image description: 
    `,
    temperature: 0.8,
    max_tokens: 100
  })
  fetchImageURL(response.data.choices[0].text.trim())
}

async function fetchImageURL(prompt) {
  const response = await openai.createImage({
    prompt: `${prompt}. there should not be any names in the image.`,
    n: 1,
    size: '256x256',
    response_format: 'b64_json',
    max_tokens: 100
  })
  const imageFileOutput = document.getElementById("output-img-container")
  imageFileOutput.innerHTML = `<img src="data:image/png;base64${response.data.data.images[0].b64_json}" >`
}