function checkAnswers() {
    var score = 0;
    var totalQuestions = 10;
  
    // Respuestas correctas
    var correctAnswers = {
      q1: "int",
      q2: "class MyClass {}",
      q3: "new",
      q4: "public void metodo() {}",
      q5: "int[] arr = new int[5];",
      q6: "extends",
      q7: "final",
      q8: "object",
      q9: "// comentario",
      q10: "try-catch"
    };
  
    var responses = [];
    var name = document.getElementById("name").value;
    
    // Verificar respuestas
    for (var i = 1; i <= totalQuestions; i++) {
      var selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
      var response = {
        question: document.querySelector(`#question${i} p`).textContent,
        userAnswer: selectedOption ? selectedOption.value : "No respondido",
        correctAnswer: correctAnswers[`q${i}`]
      };
  
      if (selectedOption && selectedOption.value === correctAnswers[`q${i}`]) {
        score++;
        response.status = "Correcta";
      } else {
        response.status = "Incorrecta";
      }
  
      responses.push(response);
    }
  
    // Mostrar resultados en la página
    document.getElementById("quizForm").style.display = "none";
    document.getElementById("results").style.display = "block";
    document.getElementById("score").innerText = `Tu puntaje es: ${score} de ${totalQuestions}`;
  
    // Generar el PDF
    document.getElementById("downloadPdf").onclick = function() {
      generatePDF(name, score, totalQuestions, responses);
    };
  }
  
  function generatePDF(name, score, totalQuestions, responses) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
  
    doc.setFontSize(16);
    doc.text("Examen de Java", 20, 20);
    doc.setFontSize(12);
    doc.text(`Nombre: ${name}`, 20, 30);
    doc.text(`Puntaje: ${score} de ${totalQuestions}`, 20, 40);
    
    let yPosition = 50;
    doc.text("Respuestas del examen:", 20, yPosition);
  
    responses.forEach((response, index) => {
      yPosition += 10;
      doc.text(`Pregunta ${index + 1}: ${response.question}`, 20, yPosition);
      doc.text(`Tu respuesta: ${response.userAnswer}`, 20, yPosition + 5);
      doc.text(`Respuesta correcta: ${response.correctAnswer}`, 20, yPosition + 10);
      doc.text(`Estado: ${response.status}`, 20, yPosition + 15);
      yPosition += 20;
    });
  
    doc.save("examen_resultado.pdf");
  }
  