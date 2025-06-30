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
    
    // Configura o número total de perguntas
    const totalQuestions = document.querySelectorAll('.question').length;
    totalElement.textContent = totalQuestions;
    
    // Adiciona evento de clique nas opções
    options.forEach(option => {
        option.addEventListener('click', function() {
            // Remove a seleção de outras opções na mesma pergunta
            const question = this.closest('.question');
            question.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Seleciona a opção clicada
            this.classList.add('selected');
            
            // Atualiza o array de opções selecionadas
            const questionIndex = Array.from(document.querySelectorAll('.question')).indexOf(question);
            selectedOptions[questionIndex] = this;
            
            // Verifica se todas as perguntas foram respondidas
            checkAllAnswered();
        });
    });
    
    // Verifica se todas as perguntas foram respondidas
    function checkAllAnswered() {
        const allAnswered = document.querySelectorAll('.question').length === 
                            document.querySelectorAll('.option.selected').length;
        submitBtn.disabled = !allAnswered;
    }
    
    // Evento de clique no botão de enviar
    submitBtn.addEventListener('click', function() {
        score = 0;
        
        // Verifica cada opção selecionada
        selectedOptions.forEach(option => {
            if (option && option.dataset.correct === "true") {
                score++;
                option.classList.add('correct');
            } else if (option) {
                option.classList.add('incorrect');
            }
        });
        
        // Mostra o resultado
        scoreElement.textContent = score;
        quizContainer.style.display = 'none';
        resultsContainer.style.display = 'block';
    });
    
    // Evento de clique no botão de reiniciar
    restartBtn.addEventListener('click', function() {
        // Reseta as seleções
        options.forEach(option => {
            option.classList.remove('selected', 'correct', 'incorrect');
        });
        
        selectedOptions = [];
        score = 0;
        submitBtn.disabled = true;
        
        // Mostra o quiz novamente
        quizContainer.style.display = 'block';
        resultsContainer.style.display = 'none';
    });
    
    // Desabilita o botão de enviar inicialmente
    submitBtn.disabled = true;
});