const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then ((res) => res.json())
    .then (json => displayLessons(json.data));
}


const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch (url)
    .then (res => res.json())
    .then (data => displayLevelWord(data.data));

}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';

    if (words.length === 0) {
    wordContainer.innerHTML = `
    <div class="text-center col-span-full rounded py-10 space-y-6 font-bangla">
            <p class="text-xl font-medium text-gray-300">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bold text-3xl">নেক্সট Lesson এ যান</h2>
        </div>
    `;
    }

    words.forEach(word => {
        const card = document.createElement('div');
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center px-5 py-10 space-y-4">
            <h2 class="font-bold text-2xl">${word.word ? word.word : 'কোনও শব্দ পাওয়া যাইনি' }</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="text-2xl font-medium font-bangla">${word.meaning ? word.meaning : 'কোনও অর্থ নাই'} / ${word.pronunciation? word.pronunciation : 'কোনও উচ্ছারন নাই'}</div>
            <div class="flex justify-between items-center">
                <button class="btn"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;
        wordContainer.append(card);
    });
}

const displayLessons = (lessons) => {
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = '';

    for(let lesson of lessons) {
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
        <button onClick = 'loadLevelWord(${lesson.level_no})' class="btn btn-outline btn-primary">
                <i class="fa-solid fa-book-open"></i>
                Learn ${lesson.level_no}
            </button>
        `;
        levelContainer.append(btnDiv);
    }
}



loadLessons();