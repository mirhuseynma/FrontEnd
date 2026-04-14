// js DOM
// 1. Get element by ID
const myButton = document.getElementById('myButton');
myButton.innerText = 'I am a button';
console.log(myButton.innerText);

// 2. Get element by Class Name
const heading = document.getElementsByClassName('heading')[0];
console.log(heading.innerText);
heading.innerText = 'Welcome to My Website';
console.log(heading.innerText);

const paragraphs = document.getElementsByClassName('paragraph')[0];
console.log(paragraphs.innerText);
paragraphs.innerText = 'This is an updated paragraph.';
console.log(paragraphs.innerText);

// 3. Get element by Tag Name
const allParagraphs = document.getElementsByTagName('p');
console.log(allParagraphs);

// 4. Get element by Query Selector
const contextParagraph = document.querySelector('.context');
console.log(contextParagraph.innerText);
contextParagraph.innerText = 'This is the context paragraph updated using query selector.';
console.log(contextParagraph.innerText);

// 5. Get element by Query Selector All
const allButtons = document.querySelectorAll('button');
console.log(allButtons);

// 6. get element by neighbor
const buttonContainer = document.querySelector('.button-container');
const siblingParagraph = buttonContainer.previousElementSibling;
console.log(siblingParagraph.innerText);

const siblingHeading = buttonContainer.previousElementSibling.previousElementSibling;
console.log(siblingHeading.innerText);