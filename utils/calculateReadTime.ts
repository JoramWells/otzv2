export function calculateReadingTime(text: string){
    const wordsPerMinute = 200;
    const words = text.trim().length
    const readingTimeInMinutes = Math.ceil(words/wordsPerMinute) 
return readingTimeInMinutes
}