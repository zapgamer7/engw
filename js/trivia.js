document.addEventListener('DOMContentLoaded', function() {
    const options = document.querySelectorAll('.option');
    const submitBtn = document.getElementById('submit-btn');
    const restartBtn = document.getElementById('restart-btn');
    const quizContainer = document.querySelector('.quiz-container');
    const resultsContainer = document.querySelector('.results');
    const scoreElement = document.getElementById('score');
    const totalElement = document.getElementById('total');
    
    let selectedOptions = [];
    let score = 0;
    
    const totalQuestions = document.querySelectorAll('.question').length;
    totalElement.textContent = totalQuestions;
    
    options.forEach(option => {
        option.addEventListener('click', function() {
            const question = this.closest('.question');
            question.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            this.classList.add('selected');
            
            const questionIndex = Array.from(document.querySelectorAll('.question')).indexOf(question);
            selectedOptions[questionIndex] = this;
            
            checkAllAnswered();
        });
    });
    
    function checkAllAnswered() {
        const allAnswered = document.querySelectorAll('.question').length === 
                            document.querySelectorAll('.option.selected').length;
        submitBtn.disabled = !allAnswered;
    }
    
    submitBtn.addEventListener('click', function() {
        score = 0;
        
        selectedOptions.forEach(option => {
            if (option && option.dataset.correct === "true") {
                score++;
                option.classList.add('correct');
            } else if (option) {
                option.classList.add('incorrect');
            }
        });
        
        scoreElement.textContent = score;
        quizContainer.style.display = 'none';
        resultsContainer.style.display = 'block';
    });
    
    restartBtn.addEventListener('click', function() {
        options.forEach(option => {
            option.classList.remove('selected', 'correct', 'incorrect');
        });
        
        selectedOptions = [];
        score = 0;
        submitBtn.disabled = true;
        
        quizContainer.style.display = 'block';
        resultsContainer.style.display = 'none';
    });
    
    submitBtn.disabled = true;
});